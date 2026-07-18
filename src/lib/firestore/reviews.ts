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
  type Unsubscribe,
} from "firebase/firestore";
import { getDb, isFirebaseConfigured } from "@/lib/firebase";

export type Review = {
  id: string;
  name: string;
  rating: number;
  text: string;
  createdAt: number;
};

function docToReview(id: string, data: Record<string, unknown>): Review {
  return {
    id,
    name: (data.name as string) ?? "Anonymous",
    rating: (data.rating as number) ?? 5,
    text: (data.text as string) ?? "",
    createdAt: (data.createdAt as { toMillis?: () => number } | undefined)?.toMillis?.() ?? Date.now(),
  };
}

export async function getReviews(): Promise<Review[]> {
  if (!isFirebaseConfigured) return [];
  try {
    const q = query(collection(getDb(), "reviews"), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map((d) => docToReview(d.id, d.data()));
  } catch {
    return [];
  }
}

export function subscribeReviews(cb: (reviews: Review[]) => void): Unsubscribe | null {
  if (!isFirebaseConfigured) {
    cb([]);
    return null;
  }
  const q = query(collection(getDb(), "reviews"), orderBy("createdAt", "desc"));
  return onSnapshot(
    q,
    (snap) => cb(snap.docs.map((d) => docToReview(d.id, d.data()))),
    () => cb([])
  );
}

export async function addReview(input: { name: string; rating: number; text: string }): Promise<void> {
  if (!isFirebaseConfigured) throw new Error("Firebase is not configured.");
  await addDoc(collection(getDb(), "reviews"), { ...input, createdAt: serverTimestamp() });
}

export async function deleteReview(id: string): Promise<void> {
  if (!isFirebaseConfigured) throw new Error("Firebase is not configured.");
  await deleteDoc(doc(getDb(), "reviews", id));
}
