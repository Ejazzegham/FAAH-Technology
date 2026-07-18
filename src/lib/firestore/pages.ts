import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  type Unsubscribe,
} from "firebase/firestore";
import { getDb, isFirebaseConfigured } from "@/lib/firebase";

export type Page = {
  id: string;
  title: string;
  slug: string;
  content: string;
  published: boolean;
  createdAt: number;
  updatedAt: number;
};

function docToPage(id: string, data: Record<string, unknown>): Page {
  return {
    id,
    title: (data.title as string) ?? "",
    slug: (data.slug as string) ?? "",
    content: (data.content as string) ?? "",
    published: Boolean(data.published),
    createdAt: (data.createdAt as { toMillis?: () => number } | undefined)?.toMillis?.() ?? Date.now(),
    updatedAt: (data.updatedAt as { toMillis?: () => number } | undefined)?.toMillis?.() ?? Date.now(),
  };
}

/** Live-subscribes to all pages, for the admin dashboard. */
export function subscribePages(cb: (pages: Page[]) => void): Unsubscribe | null {
  if (!isFirebaseConfigured) {
    cb([]);
    return null;
  }
  const q = query(collection(getDb(), "pages"), orderBy("createdAt", "desc"));
  return onSnapshot(
    q,
    (snap) => cb(snap.docs.map((d) => docToPage(d.id, d.data()))),
    () => cb([])
  );
}

/** Fetches all published custom pages — for the sitemap. */
export async function getPublishedPages(): Promise<Page[]> {
  if (!isFirebaseConfigured) return [];
  try {
    const { getDocs, where } = await import("firebase/firestore");
    const q = query(collection(getDb(), "pages"), where("published", "==", true));
    const snap = await getDocs(q);
    return snap.docs.map((d) => docToPage(d.id, d.data()));
  } catch (err) {
    console.error("getPublishedPages failed:", err);
    return [];
  }
}

/** Fetches a single published page by slug (server or client). Returns null if not found/published. */
export async function getPublishedPageBySlug(slug: string): Promise<Page | null> {
  if (!isFirebaseConfigured) return null;
  try {
    const { getDocs, where } = await import("firebase/firestore");
    // published == true must be a real query constraint, not a post-fetch
    // filter — the Firestore security rules only allow signed-out visitors
    // to read pages where published == true, and reject queries that
    // aren't provably restricted to documents the rule would allow.
    const q = query(
      collection(getDb(), "pages"),
      where("slug", "==", slug),
      where("published", "==", true)
    );
    const snap = await getDocs(q);
    const match = snap.docs[0];
    return match ? docToPage(match.id, match.data()) : null;
  } catch (err) {
    console.error("getPublishedPageBySlug failed:", err);
    return null;
  }
}

export async function addPage(input: { title: string; slug: string; content: string; published: boolean }) {
  if (!isFirebaseConfigured) throw new Error("Firebase is not configured.");
  await addDoc(collection(getDb(), "pages"), {
    ...input,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function updatePage(
  id: string,
  input: { title: string; slug: string; content: string; published: boolean }
) {
  if (!isFirebaseConfigured) throw new Error("Firebase is not configured.");
  await setDoc(
    doc(getDb(), "pages", id),
    { ...input, updatedAt: serverTimestamp() },
    { merge: true }
  );
}

export async function deletePage(id: string) {
  if (!isFirebaseConfigured) throw new Error("Firebase is not configured.");
  await deleteDoc(doc(getDb(), "pages", id));
}

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
