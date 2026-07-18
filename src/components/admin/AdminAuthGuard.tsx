"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { getFirebaseAuth, isFirebaseConfigured } from "@/lib/firebase";
import { isAdminEmail } from "@/lib/admin-emails";
import AdminLogin from "@/components/admin/AdminLogin";

export default function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setReady(true);
      return;
    }
    const unsub = onAuthStateChanged(getFirebaseAuth(), (u) => {
      setUser(u);
      setReady(true);
    });
    return () => unsub();
  }, []);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg">
        <p className="text-sm text-muted">Loading…</p>
      </div>
    );
  }

  if (!isFirebaseConfigured) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg px-6 text-center">
        <div className="max-w-sm">
          <p className="text-sm font-semibold text-white">Firebase isn&apos;t configured</p>
          <p className="mt-2 text-xs text-muted">
            Copy <code className="text-gold">.env.local.example</code> to{" "}
            <code className="text-gold">.env.local</code> and add your Firebase project keys to
            enable the admin dashboard.
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AdminLogin />;
  }

  // Signed in, but not on the admin allowlist (e.g. a customer account
  // created for placing an order). Don't show the dashboard shell — every
  // Firestore call would fail anyway since the security rules enforce the
  // same allowlist server-side.
  if (!isAdminEmail(user.email)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg px-6 text-center">
        <div className="max-w-sm">
          <p className="text-sm font-semibold text-white">This account doesn&apos;t have admin access</p>
          <p className="mt-2 text-xs text-muted">
            {user.email} is signed in, but isn&apos;t on the admin list for this site.
          </p>
          <button
            onClick={() => signOut(getFirebaseAuth())}
            className="btn-outline mt-5 justify-center"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
