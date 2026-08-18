"use client";

import { useEffect, useState } from "react";
import { submitContactMessage } from "@/lib/firestore/messages";
import WhatsAppButton from "@/components/WhatsAppButton";
import { DEFAULT_SETTINGS, subscribeSettings } from "@/lib/firestore/settings";

const ICONS = {
  phone: <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3.1-8.7A2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .3 2 .7 2.9a2 2 0 01-.4 2.1L8 10.1a16 16 0 006 6l1.4-1.4a2 2 0 012.1-.4c.9.4 1.9.6 2.9.7a2 2 0 011.7 2z" />,
  email: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </>
  ),
  address: (
    <>
      <path d="M12 22s7-6.3 7-12a7 7 0 10-14 0c0 5.7 7 12 7 12z" />
      <circle cx="12" cy="10" r="2.4" />
    </>
  ),
  hours: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
};

export default function ContactHeroForm() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  useEffect(() => {
    const unsub = subscribeSettings(setSettings);
    return () => unsub?.();
  }, []);

  const INFO = [
    { title: "Call Us", value: settings.contactPhone, icon: ICONS.phone },
    { title: "Email Us", value: settings.contactEmail, icon: ICONS.email },
    { title: "Visit Us", value: settings.address, icon: ICONS.address },
    { title: "Working Hours", value: settings.workingHours, icon: ICONS.hours },
  ];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSending(true);
    try {
      // Always save to Firestore first — this is what powers the Admin
      // dashboard's Messages panel and must succeed for the user to see
      // "Message sent!".
      await submitContactMessage({ name, email, subject, message });
      setSent(true);
    } catch {
      setError("Couldn't send your message right now. Please try again in a moment.");
      setSending(false);
      return;
    }

    // Also email a notification to the business inbox. This is a best-effort
    // step — if it fails (e.g. email isn't configured yet on the server) the
    // message is still safely stored in Firestore/Admin, so we don't block
    // or change the success state on it.
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });
    } catch {
      // ignore — message is already saved
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="section pt-0 grid grid-cols-1 gap-14 lg:grid-cols-2 lg:items-stretch">
      <div className="lg:order-2">
        <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.25em] text-gold">
          <span aria-hidden className="h-px w-5 bg-gradient-to-r from-transparent to-gold" />
          CONTACT INFORMATION
          <span aria-hidden className="h-px w-5 bg-gradient-to-l from-transparent to-gold" />
        </p>
        <h2 className="mt-3 font-display text-2xl font-semibold leading-tight text-ink sm:text-3xl">
          Reach Us <span className="text-gold">Directly</span>
        </h2>
        <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted">
          Have a project in mind or need expert advice? We&apos;d love to hear from you. Fill
          out the form and our team will get back to you as soon as possible.
        </p>

        <ul className="mt-8 space-y-6">
          {INFO.map((item) => (
            <li key={item.title} className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {item.icon}
                </svg>
              </span>
              <div>
                <p className="text-sm font-semibold text-gold">{item.title}</p>
                <p className="mt-0.5 whitespace-pre-line text-sm text-muted">{item.value}</p>
              </div>
            </li>
          ))}
        </ul>

        <WhatsAppButton className="mt-8" />
      </div>

      <div className="rgb-box flex flex-col rounded-xl p-8 lg:order-1" style={{ ["--box-fill" as string]: "#ffffff" }}>
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          </span>
          <div>
            <h2 className="font-display text-lg font-semibold text-ink">Send Us a Message</h2>
            <p className="text-xs text-muted">
              We&apos;re here to help and answer any question you might have.
            </p>
          </div>
        </div>

        {sent ? (
          <div className="mt-8 rounded-lg border border-gold/40 bg-gold/5 px-5 py-6 text-center">
            <p className="text-sm font-semibold text-gold">Message sent!</p>
            <p className="mt-1 text-xs text-muted">
              Thanks for reaching out — we&apos;ll get back to you shortly.
            </p>
          </div>
        ) : (
          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                type="text"
                required
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-md border border-line bg-bg px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-gold focus:outline-none"
              />
              <input
                type="email"
                required
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-line bg-bg px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-gold focus:outline-none"
              />
            </div>
            <input
              type="text"
              required
              placeholder="Your Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full rounded-md border border-line bg-bg px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-gold focus:outline-none"
            />
            <textarea
              required
              rows={6}
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full rounded-md border border-line bg-bg px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-gold focus:outline-none"
            />
            {error && <p className="text-xs text-rose-400">{error}</p>}
            <button type="submit" disabled={sending} className="btn-primary w-full justify-center disabled:opacity-60">
              {sending ? "Sending…" : "SEND MESSAGE"} <span aria-hidden>→</span>
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
