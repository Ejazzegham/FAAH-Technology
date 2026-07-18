import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { getR2Client, R2_BUCKET, publicUrlFor } from "@/lib/r2";
import { requireAdmin } from "@/lib/admin-verify";

export const runtime = "nodejs";

// Issues a short-lived URL the browser can PUT a file to directly on R2.
// The file's bytes never pass through this server — only this small JSON
// request/response does. That matters at your scale (100k+ files, 5-10MB
// each): it keeps this route's own bandwidth and cold-start time tiny
// regardless of how large the files being uploaded are.
export async function POST(req: NextRequest) {
  try {
    await requireAdmin(req.headers.get("authorization"));

    const body = await req.json().catch(() => ({}));
    const folder = String(body.folder ?? "").trim();
    const fileName = String(body.fileName ?? "").trim();
    const contentType = String(body.contentType ?? "application/octet-stream");

    if (!folder || !fileName) {
      return NextResponse.json({ error: "folder and fileName are required." }, { status: 400 });
    }
    // Keep keys predictable and URL-safe; strip path separators so a crafted
    // fileName can't escape the intended folder.
    const safeName = fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
    const key = `${folder}/${Date.now()}-${safeName}`;

    const command = new PutObjectCommand({ Bucket: R2_BUCKET, Key: key, ContentType: contentType });
    const uploadUrl = await getSignedUrl(getR2Client(), command, { expiresIn: 300 });

    return NextResponse.json({ uploadUrl, key, publicUrl: publicUrlFor(key) });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to create upload URL.";
    const status = /admin|token/i.test(message) ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
