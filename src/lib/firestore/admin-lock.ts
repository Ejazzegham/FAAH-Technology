import { doc, getDoc, setDoc } from "firebase/firestore";
import { getDb, isFirebaseConfigured } from "@/lib/firebase";

const LOCK_DOC = "settings/adminLock";

/** True once an admin account has already been created — hides the signup option. */
export async function isSignupLocked(): Promise<boolean> {
  if (!isFirebaseConfigured) return false;
  try {
    const snap = await getDoc(doc(getDb(), LOCK_DOC));
    return snap.exists() && snap.data().locked === true;
  } catch {
    // If we can't read it (e.g. rules not deployed yet), don't block signup.
    return false;
  }
}

export async function lockSignup(): Promise<void> {
  if (!isFirebaseConfigured) return;
  try {
    await setDoc(doc(getDb(), LOCK_DOC), { locked: true, lockedAt: Date.now() });
  } catch {
    // Non-fatal — the account was still created, just couldn't set the flag.
  }
}
