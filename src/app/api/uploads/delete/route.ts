import { NextRequest, NextResponse } from "next/server";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getR2Client, R2_BUCKET, keyFromPublicUrl } from "@/lib/r2";
import { requireAdmin } from "@/lib/admin-verify";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    await requireAdmin(req.headers.get("authorization"));

    const body = await req.json().catch(() => ({}));
    const url = typeof body.url === "string" ? body.url : "";
    const key = keyFromPublicUrl(url);

    if (!key) {
      // Not one of our R2 URLs (e.g. an old firebasestorage.app URL that
      // hasn't been migrated yet) — treat as already gone rather than error.
      return NextResponse.json({ ok: true, skipped: true });
    }

    await getR2Client().send(new DeleteObjectCommand({ Bucket: R2_BUCKET, Key: key }));
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to delete file.";
    const status = /admin|token/i.test(message) ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
