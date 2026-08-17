"use client";

import { useState } from "react";
import Image from "next/image";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getFirebaseAuth, isFirebaseConfigured } from "@/lib/firebase";

// Sign-in only, on purpose — there is no "create account" option here.
// This admin panel is meant for a single owner account. If you ever need a
// second admin, add their email to ADMIN_EMAILS in firestore.rules /
// storage.rules and create their Firebase Auth user from the Firebase
// console (Authentication → Users → Add user), not from this page.
export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!isFirebaseConfigured) {
      setError("Firebase isn't configured. Add your keys to .env.local first.");
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(getFirebaseAuth(), email, password);
    } catch (err) {
      const code = (err as { code?: string }).code ?? "";
      if (code.includes("invalid-credential") || code.includes("wrong-password") || code.includes("user-not-found")) {
        setError("Incorrect email or password.");
      } else if (code.includes("too-many-requests")) {
        setError("Too many attempts. Please wait a moment and try again.");
      } else if (code.includes("operation-not-allowed")) {
        setError(
          "Email/Password sign-in isn't enabled for this Firebase project yet. Go to Firebase console → Authentication → Sign-in method → enable Email/Password."
        );
      } else if (code.includes("invalid-email")) {
        setError("That doesn't look like a valid email address.");
      } else {
        setError(`Something went wrong${code ? ` (${code})` : ""}. Please try again.`);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-6">
      <div className="w-full max-w-sm rounded-xl border border-line bg-bg-card p-8">
        <div className="flex flex-col items-center text-center">
          <Image
            src="/logo/faah_logo_512x512.png"
            alt="FAAH Technology"
            width={48}
            height={48}
            className="h-12 w-12 object-contain"
          />
          <h1 className="mt-4 font-display text-lg font-semibold text-white">Admin Sign In</h1>
          <p className="mt-1 text-xs text-muted">Sign in to manage your website.</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="email"
            required
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-line bg-bg px-4 py-2.5 text-sm text-white placeholder:text-muted focus:border-gold focus:outline-none"
          />
          <input
            type="password"
            required
            minLength={6}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-line bg-bg px-4 py-2.5 text-sm text-white placeholder:text-muted focus:border-gold focus:outline-none"
          />

          {error && <p className="text-xs text-rose-400">{error}</p>}

          <button type="submit" disabled={loading} className="btn-primary w-full justify-center disabled:opacity-60">
            {loading ? "Please wait…" : "SIGN IN"}
          </button>
        </form>
      </div>
    </div>
  );
}
