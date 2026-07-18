"use client";

import { useState } from "react";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateEmail,
  updatePassword,
  type User,
} from "firebase/auth";

const inputClass =
  "w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-white placeholder:text-muted focus:border-gold focus:outline-none";

export default function AdminAccountCard({ user }: { user: User | null }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newEmail, setNewEmail] = useState(user?.email ?? "");
  const [newPassword, setNewPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "error"; text: string } | null>(null);

  async function handleReauthAndUpdate(
    e: React.FormEvent,
    apply: () => Promise<void>
  ) {
    e.preventDefault();
    if (!user || !user.email) return;
    if (!currentPassword) {
      setMessage({ type: "error", text: "Enter your current password to confirm this change." });
      return;
    }
    setSaving(true);
    setMessage(null);
    try {
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      await apply();
      setCurrentPassword("");
      setNewPassword("");
      setMessage({ type: "ok", text: "Saved successfully." });
    } catch (err) {
      const code = (err as { code?: string })?.code ?? "";
      const friendly =
        code === "auth/wrong-password" || code === "auth/invalid-credential"
          ? "That current password isn't right."
          : "Couldn't save that change. Please try again.";
      setMessage({ type: "error", text: friendly });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="card !p-6 sm:!p-8" id="manage-account">
      <h2 className="text-center font-display text-xl font-semibold text-white sm:text-2xl">
        Account <span className="text-gold">& Access</span>
      </h2>
      <p className="mt-1 text-center text-xs text-muted">
        Manage your own admin login here. Covers the &quot;Users&quot; and &quot;Roles &amp;
        Permissions&quot; menu items.
      </p>

      <div className="mx-auto mt-6 max-w-2xl space-y-8">
        <div className="rounded-lg border border-line p-4">
          <p className="text-sm font-semibold text-white">Signed in as</p>
          <p className="mt-1 text-sm text-gold">{user?.email ?? "—"}</p>
          {user?.metadata?.creationTime && (
            <p className="mt-1 text-[11px] text-muted">
              Account created {new Date(user.metadata.creationTime).toLocaleDateString()}
            </p>
          )}
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold text-white">Change Email</p>
          <form
            onSubmit={(e) => handleReauthAndUpdate(e, () => updateEmail(user!, newEmail.trim()))}
            className="space-y-3"
          >
            <input
              type="email"
              placeholder="New email address"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className={inputClass}
            />
            <input
              type="password"
              placeholder="Current password (to confirm)"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className={inputClass}
            />
            <button type="submit" disabled={saving} className="btn-outline disabled:opacity-60">
              {saving ? "Saving…" : "Update Email"}
            </button>
          </form>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold text-white">Change Password</p>
          <form
            onSubmit={(e) =>
              handleReauthAndUpdate(e, () => updatePassword(user!, newPassword))
            }
            className="space-y-3"
          >
            <input
              type="password"
              placeholder="New password (min. 6 characters)"
              minLength={6}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={inputClass}
            />
            <input
              type="password"
              placeholder="Current password (to confirm)"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className={inputClass}
            />
            <button type="submit" disabled={saving} className="btn-outline disabled:opacity-60">
              {saving ? "Saving…" : "Update Password"}
            </button>
          </form>
        </div>

        {message && (
          <p className={`text-xs ${message.type === "ok" ? "text-emerald-400" : "text-rose-400"}`}>
            {message.text}
          </p>
        )}

        <div className="rounded-lg border border-line bg-bg-card p-4">
          <p className="text-xs font-semibold tracking-wide text-gold">HOW ACCESS WORKS HERE</p>
          <p className="mt-2 text-xs leading-relaxed text-muted">
            Admin access is limited to a specific list of email addresses (see{" "}
            <code>ADMIN_EMAILS</code> in <code>firestore.rules</code>, <code>storage.rules</code>,
            and <code>src/lib/admin-emails.ts</code> — all three must match). Customers who create
            an account to place an order are a completely separate group with much narrower
            access: they can only ever read or write their own order and profile, never anything
            else. There are no in-between roles (e.g. &quot;editor&quot;) yet — every email on the
            admin list has full access to everything in this dashboard. To add a second admin,
            create their account in Firebase console → Authentication → Users → Add user, then add
            their email to all three places above.
          </p>
        </div>
      </div>
    </div>
  );
}
