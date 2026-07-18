import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  type Unsubscribe,
} from "firebase/firestore";
import { getDb, isFirebaseConfigured } from "@/lib/firebase";

export type Tag = { id: string; name: string };

function subscribeTagCollection(
  name: "categories" | "technologies",
  cb: (tags: Tag[]) => void
): Unsubscribe | null {
  if (!isFirebaseConfigured) {
    cb([]);
    return null;
  }
  const q = query(collection(getDb(), name), orderBy("createdAt", "asc"));
  return onSnapshot(
    q,
    (snap) => {
      cb(snap.docs.map((d) => ({ id: d.id, name: (d.data().name as string) ?? "" })));
    },
    () => cb([])
  );
}

export function subscribeCategories(cb: (tags: Tag[]) => void) {
  return subscribeTagCollection("categories", cb);
}

export function subscribeTechnologies(cb: (tags: Tag[]) => void) {
  return subscribeTagCollection("technologies", cb);
}

export async function addTag(name: "categories" | "technologies", value: string): Promise<void> {
  if (!isFirebaseConfigured) throw new Error("Firebase is not configured.");
  await addDoc(collection(getDb(), name), { name: value, createdAt: serverTimestamp() });
}

export async function deleteTag(name: "categories" | "technologies", id: string): Promise<void> {
  if (!isFirebaseConfigured) throw new Error("Firebase is not configured.");
  await deleteDoc(doc(getDb(), name, id));
}
