"use client";

import { useEffect, useState } from "react";
import { DEFAULT_SETTINGS, subscribeSettings } from "@/lib/firestore/settings";

function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39a9.9 9.9 0 004.75 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2zm0 18.12h-.01a8.2 8.2 0 01-4.18-1.14l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 01-1.26-4.36c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 012.41 5.83c0 4.55-3.7 8.2-8.25 8.2zm4.52-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.13-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.36-.77-1.85-.2-.5-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.86-.87 2.09 0 1.23.9 2.42 1.02 2.59.12.17 1.76 2.7 4.28 3.78.6.26 1.06.41 1.43.53.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.19.21-.58.21-1.08.14-1.19-.06-.1-.23-.16-.48-.28z" />
    </svg>
  );
}

export default function WhatsAppButton({
  variant = "block",
  label = "Chat on WhatsApp",
  className = "",
}: {
  variant?: "block" | "inline";
  label?: string;
  className?: string;
}) {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  useEffect(() => {
    const unsub = subscribeSettings(setSettings);
    return () => unsub?.();
  }, []);

  const href = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(settings.whatsappMessage)}`;

  if (variant === "inline") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 rounded-md bg-[#25D366] px-5 py-2.5 text-xs font-semibold tracking-wide text-black transition-transform hover:-translate-y-0.5 ${className}`}
      >
        <WhatsAppIcon size={16} />
        {label}
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center gap-4 rounded-xl border border-[#25D366]/40 bg-[#25D366]/10 px-6 py-5 transition-colors hover:bg-[#25D366]/15 ${className}`}
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-black">
        <WhatsAppIcon size={22} />
      </span>
      <span>
        <span className="block text-sm font-semibold text-white">Chat on WhatsApp</span>
        <span className="block text-xs text-muted">
          {settings.contactPhone} · Usually replies within minutes
        </span>
      </span>
      <span aria-hidden className="ml-auto text-[#25D366]">
        →
      </span>
    </a>
  );
}
