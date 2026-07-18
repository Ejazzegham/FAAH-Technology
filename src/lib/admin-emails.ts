// The only email addresses allowed to use the admin dashboard.
//
// IMPORTANT: this list must be kept in sync with the ADMIN_EMAILS list in
// firestore.rules and storage.rules — this file only controls what the
// admin UI *shows*. The actual security boundary (what a signed-in account
// can read/write) is enforced by those two rules files. Update all three
// together whenever you add or remove an admin.
//
// To add a second admin: create their account in Firebase console →
// Authentication → Users → Add user, then add their email to all three
// places (here, firestore.rules, storage.rules).
export const ADMIN_EMAILS = ["ejazzegham@gmail.com", "hztechnology999@gmail.com"];

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.map((e) => e.toLowerCase()).includes(email.toLowerCase());
}
