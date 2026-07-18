import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebase-admin";

export const runtime = "nodejs";

// Handles the public like/favorite buttons. The browser never writes to
// Firestore directly for this feature — it calls this route, which uses
// Firebase Admin (server-only credentials) to make the write. Admin writes
// bypass Firestore security rules entirely, so this works with the existing
// rules unchanged (projects: admin-only write; no rule at all for the
// reactions subcollection).

const UUID_RE = /^[a-zA-Z0-9_-]{8,64}$/;

// Very small in-memory guard against a single visitor hammering the toggle
// button faster than a human could actually click it. Resets on deploy /
// per server instance — it's a speed bump, not a full rate limiter.
const lastToggleAt = new Map<string, number>();
const MIN_INTERVAL_MS = 400;

export async function GET(req: NextRequest) {
  const projectId = req.nextUrl.searchParams.get("projectId") ?? "";
  const visitorId = req.nextUrl.searchParams.get("visitorId") ?? "";

  if (!projectId || !visitorId || !UUID_RE.test(visitorId)) {
    return NextResponse.json({ liked: false, favorited: false });
  }

  try {
    const snap = await getAdminDb()
      .collection("projects")
      .doc(projectId)
      .collection("reactions")
      .doc(visitorId)
      .get();
    const data = snap.data();
    return NextResponse.json({
      liked: Boolean(data?.liked),
      favorited: Boolean(data?.favorited),
    });
  } catch (err) {
    console.error("GET /api/reactions failed:", err);
    return NextResponse.json({ liked: false, favorited: false });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const projectId = String(body.projectId ?? "");
    const visitorId = String(body.visitorId ?? "");
    const kind = body.kind === "favorite" ? "favorite" : body.kind === "like" ? "like" : null;

    if (!projectId || !visitorId || !UUID_RE.test(visitorId) || !kind) {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    const rateKey = `${visitorId}:${projectId}:${kind}`;
    const now = Date.now();
    const last = lastToggleAt.get(rateKey) ?? 0;
    if (now - last < MIN_INTERVAL_MS) {
      return NextResponse.json({ error: "Too many requests." }, { status: 429 });
    }
    lastToggleAt.set(rateKey, now);

    const db = getAdminDb();
    const projectRef = db.collection("projects").doc(projectId);
    const reactionRef = projectRef.collection("reactions").doc(visitorId);
    const field = kind === "like" ? "liked" : "favorited";
    const countField = kind === "like" ? "likeCount" : "favoriteCount";

    const result = await db.runTransaction(async (tx) => {
      const [projectSnap, reactionSnap] = await Promise.all([tx.get(projectRef), tx.get(reactionRef)]);
      if (!projectSnap.exists) {
        throw new Error("Project not found.");
      }

      const wasActive = Boolean(reactionSnap.data()?.[field]);
      const nowActive = !wasActive;

      tx.set(reactionRef, { [field]: nowActive }, { merge: true });
      tx.set(projectRef, { [countField]: FieldValue.increment(nowActive ? 1 : -1) }, { merge: true });

      return { nowActive };
    });

    return NextResponse.json({ ok: true, active: result.nowActive });
  } catch (err) {
    console.error("POST /api/reactions failed:", err);
    const message = err instanceof Error ? err.message : "Failed to save reaction.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
