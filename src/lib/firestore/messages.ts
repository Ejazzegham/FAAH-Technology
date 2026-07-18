import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  type Unsubscribe,
} from "firebase/firestore";
import { getDb, isFirebaseConfigured } from "@/lib/firebase";

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: number;
};

export async function submitContactMessage(input: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<void> {
  if (!isFirebaseConfigured) throw new Error("Firebase is not configured.");
  await addDoc(collection(getDb(), "messages"), {
    ...input,
    read: false,
    createdAt: serverTimestamp(),
  });
}

export function subscribeMessages(cb: (messages: ContactMessage[]) => void): Unsubscribe | null {
  if (!isFirebaseConfigured) {
    cb([]);
    return null;
  }
  const q = query(collection(getDb(), "messages"), orderBy("createdAt", "desc"));
  return onSnapshot(
    q,
    (snap) =>
      cb(
        snap.docs.map((d) => {
          const data = d.data();
          return {
            id: d.id,
            name: (data.name as string) ?? "",
            email: (data.email as string) ?? "",
            subject: (data.subject as string) ?? "",
            message: (data.message as string) ?? "",
            read: Boolean(data.read),
            createdAt: (data.createdAt as { toMillis?: () => number } | undefined)?.toMillis?.() ?? Date.now(),
          };
        })
      ),
    () => cb([])
  );
}

export async function markMessageRead(id: string, read = true): Promise<void> {
  if (!isFirebaseConfigured) throw new Error("Firebase is not configured.");
  await updateDoc(doc(getDb(), "messages", id), { read });
}

export async function deleteMessage(id: string): Promise<void> {
  if (!isFirebaseConfigured) throw new Error("Firebase is not configured.");
  await deleteDoc(doc(getDb(), "messages", id));
}
