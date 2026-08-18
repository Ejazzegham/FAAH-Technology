"use client";

import Link from "next/link";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { DEFAULT_SETTINGS, subscribeSettings } from "@/lib/firestore/settings";
import { usePopoverPosition } from "@/lib/use-popover-position";

type Props = {
  label?: string;
  variant?: "primary" | "outline";
  triggerClassName?: string;
  wrapperClassName?: string;
  align?: "left" | "right";
  onNavigate?: () => void;
};

const MENU_WIDTH = 240;

export default function LetsTalkButton({
  label = "LET'S TALK",
  variant = "primary",
  triggerClassName,
  wrapperClassName = "",
  align = "right",
  onNavigate,
}: Props) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Popover renders through a portal into document.body and is positioned
  // with `position: fixed` computed from the trigger's real screen
  // coordinates — this is what lets it escape a rounded CTA card's
  // `overflow: hidden`, or the mobile nav drawer's own stacking, instead of
  // getting clipped like a normal `position: absolute` child would.
  const style = usePopoverPosition(triggerRef, open, { align, width: MENU_WIDTH, estimatedHeight: 168 });

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const unsub = subscribeSettings(setSettings);
    return () => unsub?.();
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as Node;
      if (
        triggerRef.current && !triggerRef.current.contains(target) &&
        menuRef.current && !menuRef.current.contains(target)
      ) {
        setOpen(false);
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  const baseTriggerClass = variant === "primary" ? "btn-primary" : "btn-outline";

  function close() {
    setOpen(false);
    onNavigate?.();
  }

  return (
    <div className={`relative inline-block ${wrapperClassName}`}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={triggerClassName ?? `${baseTriggerClass} shrink-0`}
        aria-haspopup="true"
        aria-expanded={open}
      >
        {label} <span aria-hidden>→</span>
      </button>

      {open && mounted &&
        createPortal(
          <div
            ref={menuRef}
            style={style}
            className="z-50 overflow-hidden rounded-lg border border-gold/30 bg-bg-card shadow-lg shadow-black/50"
          >
            <Link
              href="/contact"
              onClick={close}
              className="flex items-center gap-3 px-4 py-3 text-left text-sm text-ink/90 transition-colors hover:bg-gold/10 hover:text-gold"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 7l9 6 9-6" />
                </svg>
              </span>
              <span>
                <span className="block font-semibold">Send a Message</span>
                <span className="block text-[11px] text-muted">Use our contact form</span>
              </span>
            </Link>
            <a
              href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(settings.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              className="flex items-center gap-3 border-t border-line px-4 py-3 text-left text-sm text-ink/90 transition-colors hover:bg-[#25D366]/10 hover:text-[#25D366]"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#25D366]/50 text-[#25D366]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                </svg>
              </span>
              <span>
                <span className="block font-semibold">Chat on WhatsApp</span>
                <span className="block text-[11px] text-muted">{settings.contactPhone}</span>
              </span>
            </a>
          </div>,
          document.body
        )}
    </div>
  );
}
