import { doc, getDoc, setDoc } from "firebase/firestore";
import { getDb, isFirebaseConfigured } from "@/lib/firebase";

export type CustomerProfile = {
  uid: string;
  name: string;
  email: string;
  createdAt: number;
};

export async function ensureCustomerProfile(uid: string, name: string, email: string): Promise<void> {
  if (!isFirebaseConfigured) return;
  const ref = doc(getDb(), "customers", uid);
  const existing = await getDoc(ref);
  if (!existing.exists()) {
    await setDoc(ref, { uid, name, email, createdAt: Date.now() });
  }
}
