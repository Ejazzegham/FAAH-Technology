"use client";

import { getFirebaseAuth } from "@/lib/firebase";

// Drop-in replacement for the old firebase/storage helpers (uploadBytes /
// getDownloadURL / deleteObject), now backed by Cloudflare R2. Uploads go
// straight from the browser to R2 via a presigned URL — this server never
// sees the file bytes. Deletes go through a small API route since deleting
// needs R2's secret credentials.

async function authHeader(): Promise<Record<string, string>> {
  const user = getFirebaseAuth().currentUser;
  if (!user) throw new Error("You must be signed in as an admin to upload files.");
  const token = await user.getIdToken();
  return { Authorization: `Bearer ${token}` };
}

// Portfolio images were being uploaded straight from the source file (often
// full camera/export resolution, several MB each). next/image resizes them
// on request, but the server still has to fetch and decode that huge
// original every time it needs a new size — that's most of what made the
// portfolio feel slow to load. Shrinking to a sane max dimension and
// re-encoding as WebP client-side, before the file ever leaves the browser,
// cuts most uploads down by 80-95% with no visible quality loss at the
// sizes the site actually displays them (thumbnails and a large lightbox
// view, never print resolution).
const MAX_DIMENSION = 2200;
const WEBP_QUALITY = 0.85;
const SKIP_BELOW_BYTES = 400 * 1024; // small files aren't worth re-encoding

async function compressImage(file: File): Promise<File> {
  if (!file.type.startsWith("image/") || file.size < SKIP_BELOW_BYTES) return file;

  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height));
    const width = Math.round(bitmap.width * scale);
    const height = Math.round(bitmap.height * scale);

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(bitmap, 0, 0, width, height);
    bitmap.close?.();

    // WebP (unlike JPEG) keeps transparency, so it works for both photos
    // and logos/graphics with a transparent background.
    const blob: Blob | null = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/webp", WEBP_QUALITY)
    );

    // Only use the compressed version if it's actually smaller — guards
    // against edge cases (already-tiny images, unusual source formats).
    if (!blob || blob.size >= file.size) return file;

    const newName = file.name.replace(/\.[^./]+$/, "") + ".webp";
    return new File([blob], newName, { type: "image/webp" });
  } catch {
    // Decode failure, unsupported format, etc. — upload the original
    // rather than blocking the admin's upload.
    return file;
  }
}

/** Uploads one file under `folder/` on R2 and returns its public URL. */
export async function uploadFile(folder: string, rawFile: File): Promise<string> {
  const file = await compressImage(rawFile);
  const presignRes = await fetch("/api/uploads/presign", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(await authHeader()) },
    body: JSON.stringify({ folder, fileName: file.name, contentType: file.type }),
  });
  if (!presignRes.ok) {
    const { error } = await presignRes.json().catch(() => ({ error: "Could not start upload." }));
    throw new Error(error);
  }
  const { uploadUrl, publicUrl } = await presignRes.json();

  const putRes = await fetch(uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": file.type || "application/octet-stream" },
    body: file,
  });
  if (!putRes.ok) throw new Error(`Upload failed for ${file.name}.`);

  return publicUrl as string;
}

/** Same as uploadFile, but retries once after a short delay on transient failure
 * (dropped connection, R2 hiccup, etc.) before giving up. Matters a lot once
 * batches get into the hundreds of files — a single blip shouldn't be fatal. */
async function uploadFileWithRetry(folder: string, file: File): Promise<string> {
  try {
    return await uploadFile(folder, file);
  } catch (err) {
    await new Promise((r) => setTimeout(r, 800));
    try {
      return await uploadFile(folder, file);
    } catch {
      throw err instanceof Error ? err : new Error(`Upload failed for ${file.name}.`);
    }
  }
}

export type UploadItem = { key: string; file: File };
export type UploadResult = { key: string; url: string } | { key: string; error: string };

/**
 * Uploads several files in small concurrent batches and returns a result per
 * item, keyed by the `key` you passed in (so callers can match failures back
 * to whatever they're tracking, e.g. a gallery item id).
 *
 * Deliberately resilient for large batches (100-200+ images): one file
 * failing (after its automatic retry) does NOT abort the rest — every other
 * file still gets uploaded, and only the genuinely failed ones come back in
 * the results as `{ error }` so the caller can offer to retry just those.
 */
export async function uploadFiles(
  folder: string,
  items: UploadItem[],
  onProgress?: (done: number, total: number) => void
): Promise<UploadResult[]> {
  const BATCH_SIZE = 5;
  const total = items.length;
  let done = 0;
  const results: UploadResult[] = [];

  for (let i = 0; i < items.length; i += BATCH_SIZE) {
    const batch = items.slice(i, i + BATCH_SIZE);
    const settled = await Promise.allSettled(batch.map((item) => uploadFileWithRetry(folder, item.file)));
    settled.forEach((res, idx) => {
      const key = batch[idx].key;
      results.push(
        res.status === "fulfilled"
          ? { key, url: res.value }
          : { key, error: res.reason instanceof Error ? res.reason.message : "Upload failed." }
      );
      done++;
      onProgress?.(done, total);
    });
  }

  return results;
}

/** Deletes a previously uploaded file by its public URL. Never throws — same "best effort" behavior as before. */
export async function deleteFile(url: string): Promise<void> {
  try {
    const res = await fetch("/api/uploads/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(await authHeader()) },
      body: JSON.stringify({ url }),
    });
    if (!res.ok) {
      const { error } = await res.json().catch(() => ({ error: "" }));
      console.warn("R2 delete failed:", error);
    }
  } catch (err) {
    console.warn("R2 delete failed:", err);
  }
}
