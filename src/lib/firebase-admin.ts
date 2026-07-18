import { getApps, initializeApp, cert, type App } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

// Shared Firebase Admin setup. Requires a service account key (Firebase
// console -> Project settings -> Service accounts -> Generate new private
// key), set as server-only env vars (never NEXT_PUBLIC_):
//   FIREBASE_ADMIN_PROJECT_ID
//   FIREBASE_ADMIN_CLIENT_EMAIL
//   FIREBASE_ADMIN_PRIVATE_KEY     paste the whole key; keep the \n escapes

export function getAdminApp(): App {
  if (getApps().length) return getApps()[0];
  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY;
  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      "Firebase Admin is not configured — set FIREBASE_ADMIN_PROJECT_ID, FIREBASE_ADMIN_CLIENT_EMAIL, FIREBASE_ADMIN_PRIVATE_KEY."
    );
  }
  return initializeApp({
    credential: cert({ projectId, clientEmail, privateKey: privateKey.replace(/\\n/g, "\n") }),
  });
}

/** Firestore accessed with admin privileges — bypasses security rules entirely, so use only from trusted server code (API routes), never exposed to the browser. */
export function getAdminDb(): Firestore {
  return getFirestore(getAdminApp());
}
