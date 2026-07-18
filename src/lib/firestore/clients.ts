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

export type Client = { id: string; name: string; createdAt: number };

export function subscribeClients(cb: (clients: Client[]) => void): Unsubscribe | null {
  if (!isFirebaseConfigured) {
    cb([]);
    return null;
  }
  const q = query(collection(getDb(), "clients"), orderBy("createdAt", "desc"));
  return onSnapshot(
    q,
    (snap) =>
      cb(
        snap.docs.map((d) => {
          const data = d.data();
          return {
            id: d.id,
            name: (data.name as string) ?? "",
            createdAt: (data.createdAt as { toMillis?: () => number } | undefined)?.toMillis?.() ?? Date.now(),
          };
        })
      ),
    () => cb([])
  );
}

export async function addClient(name: string): Promise<void> {
  if (!isFirebaseConfigured) throw new Error("Firebase is not configured.");
  await addDoc(collection(getDb(), "clients"), { name, createdAt: serverTimestamp() });
}

export async function deleteClient(id: string): Promise<void> {
  if (!isFirebaseConfigured) throw new Error("Firebase is not configured.");
  await deleteDoc(doc(getDb(), "clients", id));
}
