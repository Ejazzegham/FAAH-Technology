"use client";

import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  updateProfile,
} from "firebase/auth";
import { Eye, EyeOff, Mail, Lock, User as UserIcon, CheckCircle2, ArrowLeft, Loader2 } from "lucide-react";
import { getFirebaseAuth, isFirebaseConfigured } from "@/lib/firebase";
import { ensureCustomerProfile } from "@/lib/firestore/customers";

type Mode = "signin" | "signup" | "forgot";

const FEATURES = [
  "Track every order in one place",
  "Faster checkout on future projects",
  "Direct line to our support team",
];

// How long each half of the slide transition takes (slide-out, then
// slide-in). The mode/side swap happens instantly in between, while the
// card is fully off-screen and invisible, so it's never seen.
const SWITCH_MS = 320;
const SLIDE_DISTANCE = 40; // px the card travels during each half

const fieldClass =
  "w-full rounded-[8px] border border-line bg-bg py-2.5 pl-10 pr-3 text-sm text-white placeholder:text-muted focus:border-gold focus:outline-none";
const fieldWithToggleClass =
  "w-full rounded-[8px] border border-line bg-bg py-2.5 pl-10 pr-10 text-sm text-white placeholder:text-muted focus:border-gold focus:outline-none";

function friendlyError(err: unknown, providerLabel?: string): string {
  const code = (err as { code?: string })?.code ?? "";
  if (code.includes("email-already-in-use")) return "That email is already registered — try signing in instead.";
  if (code.includes("invalid-credential") || code.includes("wrong-password") || code.includes("user-not-found"))
    return "Incorrect email or password.";
  if (code.includes("weak-password")) return "Password should be at least 6 characters.";
  if (code.includes("invalid-email")) return "That doesn't look like a valid email address.";
  if (code.includes("too-many-requests")) return "Too many attempts. Please wait a moment and try again.";
  if (code.includes("popup-closed-by-user") || code.includes("cancelled-popup-request")) return "";
  if (code.includes("account-exists-with-different-credential"))
    return "An account already exists with this email using a different sign-in method.";
  if (code.includes("popup-blocked")) return "Your browser blocked the sign-in popup. Please allow popups for this site and try again.";
  if (code.includes("operation-not-allowed"))
    return providerLabel
      ? `${providerLabel} sign-in isn't turned on yet for this project. Please contact the site owner.`
      : "This sign-in method isn't turned on yet. Please contact the site owner.";
  if (code.includes("network-request-failed")) return "Network error. Check your connection and try again.";
  return "Something went wrong. Please try again.";
}

function passwordStrength(pw: string): { label: string; color: string; width: string } {
  if (!pw) return { label: "", color: "bg-line", width: "0%" };
  let score = 0;
  if (pw.length >= 6) score++;
  if (pw.length >= 10) score++;
  if (/[A-Z]/.test(pw) && /[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 1) return { label: "Weak", color: "bg-rose-500", width: "33%" };
  if (score <= 2) return { label: "Fair", color: "bg-amber-500", width: "66%" };
  return { label: "Strong", color: "bg-emerald-500", width: "100%" };
}

export default function AuthScreen() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("signin");
  const [redirectTo, setRedirectTo] = useState("/account");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [agree, setAgree] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  // Drives the sliding transition whenever the card swaps sides / mode.
  // "exiting": card slides + fades out toward slideDir.
  // "entering": card is instantly (no transition) placed on the opposite
  //   side, opacity 0, ready to animate back to center.
  // "idle": resting at center, fully visible.
  const [phase, setPhase] = useState<"idle" | "exiting" | "entering">("idle");
  const [slideDir, setSlideDir] = useState<1 | -1>(1); // 1 = slide left→right, -1 = right→left
  const switchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const r = params.get("redirect");
    if (r) setRedirectTo(r);
    if (params.get("mode") === "signup") setMode("signup");
  }, []);

  useEffect(() => {
    return () => {
      if (switchTimer.current) clearTimeout(switchTimer.current);
    };
  }, []);

  function switchMode(next: Mode) {
    if (next === mode || phase !== "idle") return;

    // Sign up lives on the right, sign in/forgot on the left — slide the
    // same direction the visual panel is about to travel.
    if (next === "signup") setSlideDir(1);
    else if (next === "signin" && mode === "signup") setSlideDir(-1);

    setPhase("exiting");
    if (switchTimer.current) clearTimeout(switchTimer.current);
    switchTimer.current = setTimeout(() => {
      setError(null);
      setInfo(null);
      setMode(next);
      // Snap (no transition) to the opposite edge, invisible...
      setPhase("entering");
      // ...then, once painted, animate back to center.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setPhase("idle"));
      });
    }, SWITCH_MS);
  }

  async function finishAuth(uid: string, fallbackName: string, mail: string) {
    await ensureCustomerProfile(uid, fallbackName || mail.split("@")[0], mail);
    router.push(redirectTo);
    router.refresh();
  }

  async function handleEmailSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);

    if (!isFirebaseConfigured) {
      setError("Sign-in isn't configured yet. Please contact the site owner.");
      return;
    }
    if (mode === "signup" && password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }
    if (mode === "signup" && !agree) {
      setError("Please agree to the Terms and Privacy Policy to continue.");
      return;
    }

    setLoading(true);
    try {
      const auth = getFirebaseAuth();
      await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);

      if (mode === "signup") {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(cred.user, { displayName: name });
        await finishAuth(cred.user.uid, name, email);
      } else {
        const cred = await signInWithEmailAndPassword(auth, email, password);
        await finishAuth(cred.user.uid, cred.user.displayName ?? "", cred.user.email ?? email);
      }
    } catch (err) {
      const code = (err as { code?: string })?.code ?? "";
      const msg = friendlyError(err);
      if (msg) setError(msg);
      if (code.includes("email-already-in-use")) setMode("signin");
    } finally {
      setLoading(false);
    }
  }

  async function handleForgotSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    if (!isFirebaseConfigured) {
      setError("Sign-in isn't configured yet. Please contact the site owner.");
      return;
    }
    setLoading(true);
    try {
      await sendPasswordResetEmail(getFirebaseAuth(), email);
      setInfo(`If an account exists for ${email}, a reset link is on its way — check your inbox.`);
    } catch (err) {
      setError(friendlyError(err) || "Couldn't send the reset email. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // Sign up pushes the visual panel to the right (and the form to the left).
  // Sign in / forgot keep the visual panel on the left.
  const brandOnRight = mode === "signup";
  const strength = passwordStrength(password);

  const cardStyle: CSSProperties =
    phase === "exiting"
      ? {
          transform: `translateX(${slideDir === 1 ? -SLIDE_DISTANCE : SLIDE_DISTANCE}px)`,
          opacity: 0,
          transition: `transform ${SWITCH_MS}ms cubic-bezier(0.22, 1, 0.36, 1), opacity ${SWITCH_MS}ms ease`,
        }
      : phase === "entering"
        ? {
            transform: `translateX(${slideDir === 1 ? SLIDE_DISTANCE : -SLIDE_DISTANCE}px)`,
            opacity: 0,
            transition: "none",
          }
        : {
            transform: "translateX(0px)",
            opacity: 1,
            transition: `transform ${SWITCH_MS}ms cubic-bezier(0.22, 1, 0.36, 1), opacity ${SWITCH_MS}ms ease`,
          };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-bg px-4 py-10 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl">
        <Link
          href="/"
          className="mb-5 inline-flex items-center gap-1.5 text-xs font-medium text-muted transition-colors hover:text-gold"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to home
        </Link>

        {/* Horizontal rounded auth card — 8px radius, not the whole page */}
        <div
          className="rgb-box grid w-full grid-cols-1 overflow-hidden rounded-[8px] shadow-2xl lg:grid-cols-2 lg:min-h-[600px]"
          style={cardStyle}
        >
          {/* Visual panel — desktop only, same logo both modes, swaps sides */}
          <div
            className={`relative hidden overflow-hidden bg-bg-soft lg:flex lg:flex-col lg:justify-center lg:px-14 xl:px-16 ${
              brandOnRight ? "lg:order-2" : "lg:order-1"
            }`}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-3xl"
            />
            <div key={mode} className="auth-fade-in relative mx-auto max-w-sm text-center">
              <Image
                src="/logo/faah_logo_1024x1024.png"
                alt="FAAH Technology"
                width={220}
                height={220}
                className="mx-auto w-44 drop-shadow-[0_0_60px_rgba(20,119,245,0.35)]"
                priority
              />
              <h2 className="mt-6 font-display text-2xl font-semibold text-white">
                {mode === "signup" ? "Join FAAH Technology" : mode === "forgot" ? "Forgot your password?" : "Welcome Back"}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {mode === "signup"
                  ? "Create an account to place orders, track progress, and manage everything from one dashboard."
                  : mode === "forgot"
                    ? "No worries — enter your email and we'll send you a link to get back in."
                    : "Sign in to view your orders, track projects, and stay connected with FAAH Technology."}
              </p>
              <ul className="mt-8 space-y-3 text-left">
                {FEATURES.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-white/90">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-gold" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Form panel */}
          <div
            className={`flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-14 lg:px-12 lg:py-16 ${
              brandOnRight ? "lg:order-1" : "lg:order-2"
            }`}
          >
            <div className="mx-auto w-full max-w-sm">
              {/* Compact brand header on mobile */}
              <div className="mb-8 flex items-center gap-3 lg:hidden">
                <Image
                  src="/logo/faah_logo_512x512.png"
                  alt="FAAH Technology"
                  width={40}
                  height={40}
                  className="h-10 w-10 object-contain"
                />
                <span className="font-display text-sm font-semibold leading-tight tracking-wide text-white">
                  FAAH
                  <span className="block text-[10px] font-medium tracking-[0.3em] text-muted">TECHNOLOGY</span>
                </span>
              </div>

              <div key={mode} className="auth-fade-in">
                {mode !== "forgot" ? (
                  <>
                    <h1 className="font-display text-2xl font-semibold text-white">
                      {mode === "signin" ? "Sign In" : "Create Your Account"}
                    </h1>
                    <p className="mt-2 text-sm text-muted">
                      {mode === "signin"
                        ? "Welcome back! Please enter your details."
                        : "Let's get you set up — it only takes a minute."}
                    </p>

                    <form onSubmit={handleEmailSubmit} className="mt-8 space-y-4">
                      {mode === "signup" && (
                        <div className="relative">
                          <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                          <input
                            type="text"
                            required
                            placeholder="Full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={fieldClass}
                            autoComplete="name"
                          />
                        </div>
                      )}

                      <div className="relative">
                        <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                        <input
                          type="email"
                          required
                          placeholder="Email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={fieldClass}
                          autoComplete="email"
                        />
                      </div>

                      <div>
                        <div className="relative">
                          <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                          <input
                            type={showPassword ? "text" : "password"}
                            required
                            minLength={6}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={fieldWithToggleClass}
                            autoComplete={mode === "signin" ? "current-password" : "new-password"}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword((v) => !v)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-gold"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                        {mode === "signup" && password && (
                          <div className="mt-1.5 flex items-center gap-2">
                            <div className="h-1 flex-1 overflow-hidden rounded-full bg-line">
                              <div className={`h-full ${strength.color} transition-all duration-300`} style={{ width: strength.width }} />
                            </div>
                            <span className="text-[10px] text-muted">{strength.label}</span>
                          </div>
                        )}
                      </div>

                      {mode === "signup" && (
                        <div className="relative">
                          <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                          <input
                            type={showConfirm ? "text" : "password"}
                            required
                            minLength={6}
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={fieldWithToggleClass}
                            autoComplete="new-password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirm((v) => !v)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-gold"
                            aria-label={showConfirm ? "Hide password" : "Show password"}
                          >
                            {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      )}

                      {mode === "signin" ? (
                        <div className="flex items-center justify-between text-xs">
                          <label className="flex items-center gap-2 text-muted">
                            <input
                              type="checkbox"
                              checked={rememberMe}
                              onChange={(e) => setRememberMe(e.target.checked)}
                              className="h-3.5 w-3.5 rounded border-line bg-bg accent-[#1477f5]"
                            />
                            Remember me
                          </label>
                          <button
                            type="button"
                            onClick={() => switchMode("forgot")}
                            className="font-medium text-gold hover:underline"
                          >
                            Forgot password?
                          </button>
                        </div>
                      ) : (
                        <label className="flex items-start gap-2 text-xs text-muted">
                          <input
                            type="checkbox"
                            checked={agree}
                            onChange={(e) => setAgree(e.target.checked)}
                            className="mt-0.5 h-3.5 w-3.5 rounded border-line bg-bg accent-[#1477f5]"
                          />
                          <span>
                            I agree to the{" "}
                            <Link href="/terms" className="text-gold hover:underline">
                              Terms
                            </Link>{" "}
                            and{" "}
                            <Link href="/privacy" className="text-gold hover:underline">
                              Privacy Policy
                            </Link>
                            .
                          </span>
                        </label>
                      )}

                      {error && <p className="text-xs text-rose-400">{error}</p>}
                      {info && <p className="text-xs text-emerald-400">{info}</p>}

                      <button type="submit" disabled={loading} className="btn-primary w-full justify-center rounded-[8px] disabled:opacity-60">
                        {loading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : mode === "signin" ? (
                          "SIGN IN"
                        ) : (
                          "CREATE ACCOUNT"
                        )}
                      </button>
                    </form>

                    <p className="mt-8 text-center text-sm text-muted">
                      {mode === "signin" ? "New to FAAH Technology?" : "Already have an account?"}{" "}
                      <button
                        type="button"
                        onClick={() => switchMode(mode === "signin" ? "signup" : "signin")}
                        className="font-semibold text-gold hover:underline"
                      >
                        {mode === "signin" ? "Create an account" : "Sign in"}
                      </button>
                    </p>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => switchMode("signin")}
                      className="mb-6 flex items-center gap-1.5 text-xs font-medium text-muted hover:text-gold"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" /> Back to sign in
                    </button>
                    <h1 className="font-display text-2xl font-semibold text-white">Reset your password</h1>
                    <p className="mt-2 text-sm text-muted">
                      Enter the email linked to your account and we&apos;ll send you a reset link.
                    </p>

                    <form onSubmit={handleForgotSubmit} className="mt-8 space-y-4">
                      <div className="relative">
                        <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                        <input
                          type="email"
                          required
                          placeholder="Email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={fieldClass}
                          autoComplete="email"
                        />
                      </div>
                      {error && <p className="text-xs text-rose-400">{error}</p>}
                      {info && <p className="text-xs text-emerald-400">{info}</p>}
                      <button type="submit" disabled={loading} className="btn-primary w-full justify-center rounded-[8px] disabled:opacity-60">
                        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "SEND RESET LINK"}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
