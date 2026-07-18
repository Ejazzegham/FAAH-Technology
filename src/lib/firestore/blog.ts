import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
  type Unsubscribe,
} from "firebase/firestore";
import { getDb, isFirebaseConfigured } from "@/lib/firebase";
import { uploadFile } from "@/lib/storage";
import { slugify } from "@/lib/firestore/pages";

export { slugify };

export async function uploadCoverImage(postId: string, file: File): Promise<string> {
  if (!isFirebaseConfigured) throw new Error("Firebase is not configured.");
  return uploadFile(`blog/${postId}`, file);
}

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  tags: string[];
  published: boolean;
  createdAt: number;
  updatedAt: number;
};

export type BlogComment = {
  id: string;
  postId: string;
  name: string;
  email: string;
  comment: string;
  approved: boolean;
  createdAt: number;
};

function docToPost(id: string, data: Record<string, unknown>): BlogPost {
  return {
    id,
    title: (data.title as string) ?? "",
    slug: (data.slug as string) ?? "",
    excerpt: (data.excerpt as string) ?? "",
    content: (data.content as string) ?? "",
    coverImageUrl: (data.coverImageUrl as string) ?? "",
    tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
    published: Boolean(data.published),
    createdAt: (data.createdAt as { toMillis?: () => number } | undefined)?.toMillis?.() ?? Date.now(),
    updatedAt: (data.updatedAt as { toMillis?: () => number } | undefined)?.toMillis?.() ?? Date.now(),
  };
}

function docToComment(id: string, data: Record<string, unknown>): BlogComment {
  return {
    id,
    postId: (data.postId as string) ?? "",
    name: (data.name as string) ?? "",
    email: (data.email as string) ?? "",
    comment: (data.comment as string) ?? "",
    approved: Boolean(data.approved),
    createdAt: (data.createdAt as { toMillis?: () => number } | undefined)?.toMillis?.() ?? Date.now(),
  };
}

/** Live-subscribes to all posts (published + drafts), for the admin dashboard. */
export function subscribePosts(cb: (posts: BlogPost[]) => void): Unsubscribe | null {
  if (!isFirebaseConfigured) {
    cb([]);
    return null;
  }
  const q = query(collection(getDb(), "blogPosts"), orderBy("createdAt", "desc"));
  return onSnapshot(
    q,
    (snap) => cb(snap.docs.map((d) => docToPost(d.id, d.data()))),
    () => cb([])
  );
}

/** Fetches all published posts, newest first — for the public /blog list page. */
export async function getPublishedPosts(): Promise<BlogPost[]> {
  if (!isFirebaseConfigured) return [];
  try {
    // The `published` filter must be part of the query itself (not just a
    // client-side .filter() after fetching everything) — the Firestore
    // security rules only allow reading blogPosts where published == true
    // for non-admins, and rules reject a query outright if it isn't
    // provably restricted to documents the rule would allow.
    const q = query(
      collection(getDb(), "blogPosts"),
      where("published", "==", true),
      orderBy("createdAt", "desc")
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => docToPost(d.id, d.data()));
  } catch (err) {
    console.error("getPublishedPosts failed — check that the blogPosts composite index (published, createdAt) is deployed:", err);
    return [];
  }
}

/** Fetches a single published post by slug — for the public /blog/[slug] page. */
export async function getPublishedPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!isFirebaseConfigured) return null;
  try {
    // Same reasoning as getPublishedPosts(): published == true has to be a
    // real query constraint, not a post-fetch filter, to satisfy the
    // security rules for a signed-out visitor.
    const q = query(
      collection(getDb(), "blogPosts"),
      where("slug", "==", slug),
      where("published", "==", true)
    );
    const snap = await getDocs(q);
    const match = snap.docs[0];
    return match ? docToPost(match.id, match.data()) : null;
  } catch (err) {
    console.error("getPublishedPostBySlug failed:", err);
    return null;
  }
}

export async function addPost(input: {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  tags: string[];
  published: boolean;
}) {
  if (!isFirebaseConfigured) throw new Error("Firebase is not configured.");
  await addDoc(collection(getDb(), "blogPosts"), {
    ...input,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function updatePost(
  id: string,
  input: {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    coverImageUrl: string;
    tags: string[];
    published: boolean;
  }
) {
  if (!isFirebaseConfigured) throw new Error("Firebase is not configured.");
  await setDoc(doc(getDb(), "blogPosts", id), { ...input, updatedAt: serverTimestamp() }, { merge: true });
}

export async function deletePost(id: string) {
  if (!isFirebaseConfigured) throw new Error("Firebase is not configured.");
  await deleteDoc(doc(getDb(), "blogPosts", id));
}

/** Live-subscribes to ALL comments (pending + approved), for admin moderation. */
export function subscribeAllComments(cb: (comments: BlogComment[]) => void): Unsubscribe | null {
  if (!isFirebaseConfigured) {
    cb([]);
    return null;
  }
  const q = query(collection(getDb(), "blogComments"), orderBy("createdAt", "desc"));
  return onSnapshot(
    q,
    (snap) => cb(snap.docs.map((d) => docToComment(d.id, d.data()))),
    () => cb([])
  );
}

/** Live-subscribes to approved comments for a single post — for the public post page. */
export function subscribeApprovedComments(
  postId: string,
  cb: (comments: BlogComment[]) => void
): Unsubscribe | null {
  if (!isFirebaseConfigured) {
    cb([]);
    return null;
  }
  const q = query(
    collection(getDb(), "blogComments"),
    where("postId", "==", postId),
    where("approved", "==", true),
    orderBy("createdAt", "desc")
  );
  return onSnapshot(
    q,
    (snap) => cb(snap.docs.map((d) => docToComment(d.id, d.data()))),
    (err) => {
      console.error("subscribeApprovedComments failed — check that the blogComments composite index (postId, approved, createdAt) is deployed:", err);
      cb([]);
    }
  );
}

export async function submitComment(input: { postId: string; name: string; email: string; comment: string }) {
  if (!isFirebaseConfigured) throw new Error("Firebase is not configured.");
  await addDoc(collection(getDb(), "blogComments"), {
    ...input,
    approved: false,
    createdAt: serverTimestamp(),
  });
}

export async function setCommentApproved(id: string, approved: boolean) {
  if (!isFirebaseConfigured) throw new Error("Firebase is not configured.");
  await setDoc(doc(getDb(), "blogComments", id), { approved }, { merge: true });
}

export async function deleteComment(id: string) {
  if (!isFirebaseConfigured) throw new Error("Firebase is not configured.");
  await deleteDoc(doc(getDb(), "blogComments", id));
}
