import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getAuth, type Auth } from "firebase/auth";

// Reads from NEXT_PUBLIC_FIREBASE_* env vars (see .env.local.example).
// Firebase Storage is no longer used here — file uploads moved to
// Cloudflare R2 (see src/lib/r2.ts and src/lib/storage.ts). Firestore
// (database) and Auth (admin login) stay on Firebase.
//
// No hardcoded fallback keys on purpose: set .env.local for local/dev use,
// and your hosting provider's env vars for production.
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

function getFirebaseApp(): FirebaseApp {
  return getApps().length ? getApp() : initializeApp(firebaseConfig);
}

// Lazily created so this file can be imported on the server without crashing
// when env vars aren't set (e.g. during a build without .env.local yet).
let _db: Firestore | null = null;
let _auth: Auth | null = null;

export function getDb(): Firestore {
  if (!_db) _db = getFirestore(getFirebaseApp());
  return _db;
}

export function getFirebaseAuth(): Auth {
  if (!_auth) _auth = getAuth(getFirebaseApp());
  return _auth;
}

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId
);
