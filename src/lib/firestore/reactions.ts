import { doc, onSnapshot, type Unsubscribe } from "firebase/firestore";
import { getDb, isFirebaseConfigured } from "@/lib/firebase";

export type ReactionKind = "like" | "favorite";

export type ProjectReactionCounts = {
  likes: number;
  favorites: number;
};

const VISITOR_ID_KEY = "hz_visitor_id";

/**
 * Every browser gets a random, anonymous id the first time it reacts to
 * anything. No sign-in, no personal info — it just stops the same visitor
 * from stacking up unlimited likes on one project and lets their heart/star
 * show as already-active if they come back later.
 */
export function getVisitorId(): string {
  if (typeof window === "undefined") return "";
  let id = window.localStorage.getItem(VISITOR_ID_KEY);
  if (!id) {
    id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `visitor-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    window.localStorage.setItem(VISITOR_ID_KEY, id);
  }
  return id;
}

function countsFromDoc(data: Record<string, unknown> | undefined): ProjectReactionCounts {
  return {
    likes: (data?.likeCount as number | undefined) ?? 0,
    favorites: (data?.favoriteCount as number | undefined) ?? 0,
  };
}

/**
 * Live-subscribes to a single project's shared like/favorite counts.
 * This still reads Firestore directly from the browser — reads on
 * `projects/{id}` are already public in the security rules, so no change
 * was needed there. Only the *writes* (below) go through the server.
 */
export function subscribeProjectReactionCounts(
  projectId: string,
  cb: (counts: ProjectReactionCounts) => void
): Unsubscribe | null {
  if (!isFirebaseConfigured || !projectId) {
    cb({ likes: 0, favorites: 0 });
    return null;
  }
  const ref = doc(getDb(), "projects", projectId);
  return onSnapshot(
    ref,
    (snap) => cb(countsFromDoc(snap.data())),
    () => cb({ likes: 0, favorites: 0 })
  );
}

/**
 * Which of like/favorite this particular visitor has already toggled on,
 * for one project. Goes through /api/reactions (server-side, Firebase
 * Admin) instead of reading Firestore directly, since there's no client
 * security rule granting read access to the reactions subcollection.
 */
export async function getVisitorReactions(
  projectId: string,
  visitorId: string
): Promise<{ liked: boolean; favorited: boolean }> {
  if (!projectId || !visitorId) {
    return { liked: false, favorited: false };
  }
  try {
    const res = await fetch(
      `/api/reactions?projectId=${encodeURIComponent(projectId)}&visitorId=${encodeURIComponent(visitorId)}`
    );
    if (!res.ok) return { liked: false, favorited: false };
    const data = await res.json();
    return { liked: Boolean(data.liked), favorited: Boolean(data.favorited) };
  } catch {
    return { liked: false, favorited: false };
  }
}

/**
 * Toggles a like or favorite for this visitor on one project. This calls
 * /api/reactions (server-side, Firebase Admin) rather than writing to
 * Firestore directly from the browser — the current security rules only
 * allow admin writes to `projects`, and there's no rule at all for the
 * reactions subcollection, so a direct client write would be rejected.
 * Doing the write on the server sidesteps that without touching the rules.
 */
export async function toggleReaction(
  projectId: string,
  visitorId: string,
  kind: ReactionKind
): Promise<void> {
  if (!projectId || !visitorId) {
    throw new Error("Missing project or visitor id.");
  }
  const res = await fetch("/api/reactions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ projectId, visitorId, kind }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error ?? "Failed to save reaction.");
  }
}
