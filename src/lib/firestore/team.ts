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

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  imageUrl?: string;
  createdAt: number;
};

export function subscribeTeam(cb: (team: TeamMember[]) => void): Unsubscribe | null {
  if (!isFirebaseConfigured) {
    cb([]);
    return null;
  }
  const q = query(collection(getDb(), "team"), orderBy("createdAt", "asc"));
  return onSnapshot(
    q,
    (snap) => {
      cb(
        snap.docs.map((d) => {
          const data = d.data();
          return {
            id: d.id,
            name: (data.name as string) ?? "",
            role: (data.role as string) ?? "",
            imageUrl: (data.imageUrl as string) || undefined,
            createdAt: (data.createdAt as { toMillis?: () => number } | undefined)?.toMillis?.() ?? Date.now(),
          };
        })
      );
    },
    () => cb([])
  );
}

export async function addTeamMember(input: {
  name: string;
  role: string;
  imageUrl?: string;
}): Promise<void> {
  if (!isFirebaseConfigured) throw new Error("Firebase is not configured.");
  const { imageUrl, ...rest } = input;
  await addDoc(collection(getDb(), "team"), {
    ...rest,
    ...(imageUrl ? { imageUrl } : {}),
    createdAt: serverTimestamp(),
  });
}

export async function updateTeamMember(
  id: string,
  input: { name: string; role: string; imageUrl?: string }
): Promise<void> {
  if (!isFirebaseConfigured) throw new Error("Firebase is not configured.");
  await updateDoc(doc(getDb(), "team", id), {
    name: input.name,
    role: input.role,
    imageUrl: input.imageUrl ?? "",
  });
}

export async function deleteTeamMember(id: string): Promise<void> {
  if (!isFirebaseConfigured) throw new Error("Firebase is not configured.");
  await deleteDoc(doc(getDb(), "team", id));
}
