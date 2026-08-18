"use client";

import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase";
import { useCustomerAuth } from "@/lib/use-customer-auth";
import { ensureCustomerProfile } from "@/lib/firestore/customers";
import { submitOrder } from "@/lib/firestore/orders";

const inputClass =
  "w-full rounded-md border border-line bg-bg px-3 py-2.5 text-sm text-ink placeholder:text-muted focus:border-gold focus:outline-none";

export default function OrderModal({
  categoryLabel,
  tierName,
  price,
  onClose,
}: {
  categoryLabel: string;
  tierName: string;
  price: string;
  onClose: () => void;
}) {
  const { user, ready } = useCustomerAuth();

  const [authMode, setAuthMode] = useState<"signin" | "signup">("signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  const [projectDetails, setProjectDetails] = useState("");
  const [orderError, setOrderError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  async function handleAuth(e: React.FormEvent) {
    e.preventDefault();
    setAuthError(null);
    setAuthLoading(true);
    try {
      const auth = getFirebaseAuth();
      if (authMode === "signup") {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(cred.user, { displayName: name });
        await ensureCustomerProfile(cred.user.uid, name, email);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      const code = (err as { code?: string }).code ?? "";
      if (code.includes("email-already-in-use")) {
        setAuthError("That email is already registered — try signing in instead.");
        setAuthMode("signin");
      } else if (code.includes("invalid-credential") || code.includes("wrong-password") || code.includes("user-not-found")) {
        setAuthError("Incorrect email or password.");
      } else if (code.includes("weak-password")) {
        setAuthError("Password should be at least 6 characters.");
      } else if (code.includes("invalid-email")) {
        setAuthError("That doesn't look like a valid email address.");
      } else {
        setAuthError("Something went wrong. Please try again.");
      }
    } finally {
      setAuthLoading(false);
    }
  }

  async function handleOrderSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setOrderError(null);
    setSubmitting(true);
    try {
      await submitOrder({
        uid: user.uid,
        customerName: user.displayName || name || "—",
        customerEmail: user.email ?? "",
        categoryLabel,
        tierName,
        price,
        projectDetails: projectDetails.trim(),
      });
      setDone(true);
    } catch {
      setOrderError("Couldn't submit your order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="rgb-box max-h-[90vh] w-full max-w-md overflow-y-auto rounded-xl p-6 sm:p-8"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold tracking-wide text-gold">{categoryLabel}</p>
            <h2 className="mt-1 font-display text-lg font-semibold text-ink">
              Order — {tierName} <span className="text-muted">({price})</span>
            </h2>
          </div>
          <button onClick={onClose} aria-label="Close" className="text-muted hover:text-ink">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {!ready ? (
          <p className="mt-6 text-sm text-muted">Loading…</p>
        ) : done ? (
          <div className="mt-6 text-center">
            <p className="text-sm font-semibold text-emerald-400">Order submitted!</p>
            <p className="mt-2 text-xs text-muted">
              We&apos;ve received your request and will reach out to you at {user?.email} shortly.
            </p>
            <button onClick={onClose} className="btn-primary mt-5 justify-center">
              Close
            </button>
          </div>
        ) : !user ? (
          <>
            <p className="mt-3 text-xs text-muted">
              {authMode === "signup"
                ? "Create a free account to place this order — it only takes a moment."
                : "Sign in to continue placing this order."}
            </p>
            <form onSubmit={handleAuth} className="mt-5 space-y-3">
              {authMode === "signup" && (
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClass}
                />
              )}
              <input
                type="email"
                required
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
              />
              <input
                type="password"
                required
                minLength={6}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass}
              />
              {authError && <p className="text-xs text-rose-400">{authError}</p>}
              <button type="submit" disabled={authLoading} className="btn-primary w-full justify-center disabled:opacity-60">
                {authLoading ? "Please wait…" : authMode === "signup" ? "Create Account & Continue" : "Sign In & Continue"}
              </button>
            </form>
            <button
              onClick={() => {
                setAuthMode((m) => (m === "signup" ? "signin" : "signup"));
                setAuthError(null);
              }}
              className="mt-3 w-full text-center text-xs text-muted hover:text-gold"
            >
              {authMode === "signup" ? "Already have an account? Sign in" : "New here? Create an account"}
            </button>
          </>
        ) : (
          <form onSubmit={handleOrderSubmit} className="mt-5 space-y-3">
            <p className="text-xs text-muted">
              Signed in as <span className="text-ink">{user.email}</span>
            </p>
            <textarea
              required
              rows={5}
              placeholder="Tell us about your project — goals, timeline, anything useful…"
              value={projectDetails}
              onChange={(e) => setProjectDetails(e.target.value)}
              className={inputClass}
            />
            {orderError && <p className="text-xs text-rose-400">{orderError}</p>}
            <button type="submit" disabled={submitting} className="btn-primary w-full justify-center disabled:opacity-60">
              {submitting ? "Submitting…" : "Submit Order"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
