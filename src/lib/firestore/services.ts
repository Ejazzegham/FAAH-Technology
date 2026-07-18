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

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: string;
  createdAt: number;
};

export const SERVICE_ICON_OPTIONS = [
  "graphic",
  "web",
  "mobile",
  "desktop",
  "custom",
  "seo",
  "marketing",
  "video",
  "writing",
] as const;

export function subscribeServices(cb: (services: Service[]) => void): Unsubscribe | null {
  if (!isFirebaseConfigured) {
    cb([]);
    return null;
  }
  const q = query(collection(getDb(), "services"), orderBy("createdAt", "asc"));
  return onSnapshot(
    q,
    (snap) => {
      cb(
        snap.docs.map((d) => {
          const data = d.data();
          return {
            id: d.id,
            title: (data.title as string) ?? "",
            description: (data.description as string) ?? "",
            icon: (data.icon as string) ?? "custom",
            createdAt: (data.createdAt as { toMillis?: () => number } | undefined)?.toMillis?.() ?? Date.now(),
          };
        })
      );
    },
    () => cb([])
  );
}

export async function addService(input: { title: string; description: string; icon: string }): Promise<void> {
  if (!isFirebaseConfigured) throw new Error("Firebase is not configured.");
  await addDoc(collection(getDb(), "services"), { ...input, createdAt: serverTimestamp() });
}

export async function deleteService(id: string): Promise<void> {
  if (!isFirebaseConfigured) throw new Error("Firebase is not configured.");
  await deleteDoc(doc(getDb(), "services", id));
}
