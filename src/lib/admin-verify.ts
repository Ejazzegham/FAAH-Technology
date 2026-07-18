import { getAuth } from "firebase-admin/auth";
import { getAdminApp } from "@/lib/firebase-admin";
import { isAdminEmail } from "@/lib/admin-emails";

// Verifies that an API request came from a signed-in Firebase user on the
// admin allowlist. Firestore/Storage security rules don't protect Next.js
// API routes, so the R2 upload/delete routes check this themselves.

/** Throws if the request isn't from a signed-in admin. Returns their email on success. */
export async function requireAdmin(authHeader: string | null): Promise<{ email: string }> {
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) throw new Error("Missing admin auth token");

  const decoded = await getAuth(getAdminApp()).verifyIdToken(token);
  if (!isAdminEmail(decoded.email)) throw new Error("Signed-in account is not an admin");

  return { email: decoded.email! };
}
