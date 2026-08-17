"use client";

import Image from "next/image";
import Link from "next/link";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import LetsTalkButton from "./LetsTalkButton";
import { DEFAULT_SETTINGS, subscribeSettings } from "@/lib/firestore/settings";
import { useCustomerAuth } from "@/lib/use-customer-auth";
import { usePopoverPosition } from "@/lib/use-popover-position";

const HOME_LINK = {
  label: "Home",
  href: "/",
  icon: <path d="M3 11.5L12 4l9 7.5M5 10v9a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1v-9" />,
};

const NAV_LINKS = [
  {
    label: "Portfolio",
    href: "/portfolio",
    icon: <path d="M3 7h18v13H3zM8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />,
  },
  {
    label: "Pricing",
    href: "/pricing",
    icon: <path d="M20.6 12.3L12.7 20.2a2 2 0 01-2.8 0L3 13.3V4h9.3l8.3 8.3a2 2 0 010 2.8zM7 8h.01" />,
  },
  {
    label: "About",
    href: "/about",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 16v-4.5M12 8h.01" strokeLinecap="round" />
      </>
    ),
  },
  {
    label: "Blog",
    href: "/blog",
    icon: <path d="M4 19.5A2.5 2.5 0 016.5 17H20M4 19.5A2.5 2.5 0 006.5 22H20V2H6.5A2.5 2.5 0 004 4.5v15z" />,
  },
  {
    label: "Contact",
    href: "/contact",
    icon: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6 9-6" />
      </>
    ),
  },
];

const SERVICES = [
  {
    label: "Graphic Design",
    href: "/graphic-design",
    icon: (
      <>
        <circle cx="8" cy="8" r="3" />
        <circle cx="16" cy="8" r="3" />
        <path d="M4 20c0-3.3 2.7-6 6-6M20 20c0-3.3-2.7-6-6-6" />
      </>
    ),
  },
  {
    label: "Web Design",
    href: "/web-development",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="14" rx="2" />
        <path d="M3 9h18M8 20h8" />
      </>
    ),
  },
  {
    label: "Mobile App Design",
    href: "/mobile-app-development",
    icon: (
      <>
        <rect x="7" y="2.5" width="10" height="19" rx="2" />
        <path d="M11 18.5h2" strokeLinecap="round" />
      </>
    ),
  },
  {
    label: "Desktop App Design",
    href: "/desktop-software",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="12" rx="1.5" />
        <path d="M8 20h8M12 16v4" />
      </>
    ),
  },
];

function NavLinkIcon({ children }: { children: React.ReactNode }) {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
    >
      {children}
    </svg>
  );
}

function ServicesDesktopDropdown({ active }: { active: boolean }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const style = usePopoverPosition(triggerRef, open, { align: "left", width: 208, estimatedHeight: 220 });

  useEffect(() => setMounted(true), []);

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

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={open}
        className={`relative flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-gold ${
          active ? "text-gold" : "text-muted"
        }`}
      >
        Services
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
        {active && <span className="absolute -bottom-3 left-0 h-0.5 w-full bg-gold" />}
      </button>

      {open && mounted &&
        createPortal(
          <div
            ref={menuRef}
            style={style}
            className="z-50 overflow-hidden rounded-lg border border-line bg-bg-card shadow-lg shadow-black/50"
          >
            {SERVICES.map((service) => (
              <Link
                key={service.label}
                href={service.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 border-b border-line px-3 py-2.5 text-[13px] text-white/90 transition-colors last:border-b-0 hover:bg-gold/10 hover:text-gold"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center text-gold">
                  <NavLinkIcon>{service.icon}</NavLinkIcon>
                </span>
                {service.label}
              </Link>
            ))}
          </div>,
          document.body
        )}
    </div>
  );
}

export default function Navbar({ active = "Home" }: { active?: string }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const { user } = useCustomerAuth();
  const accountHref = user ? "/account" : "/login";
  const isServicesActive = active === "Services";

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const unsub = subscribeSettings(setSettings);
    return () => unsub?.();
  }, []);

  // Lock page scroll behind the drawer while it's open, and let Escape
  // close it — small touches that make it feel like a real app menu.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-bg/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-10">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={settings.appearance.logoUrl}
            alt="FAAH Technology"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
            priority
          />
          <span className="font-display text-sm font-semibold leading-tight tracking-wide text-white">
            FAAH
            <span className="block text-[10px] font-medium tracking-[0.3em] text-muted">
              TECHNOLOGY
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          <Link
            href={HOME_LINK.href}
            className={`relative text-sm font-medium transition-colors hover:text-gold ${
              HOME_LINK.label === active ? "text-gold" : "text-muted"
            }`}
          >
            {HOME_LINK.label}
            {HOME_LINK.label === active && (
              <span className="absolute -bottom-3 left-0 h-0.5 w-full bg-gold" />
            )}
          </Link>

          <ServicesDesktopDropdown active={isServicesActive} />

          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`relative text-sm font-medium transition-colors hover:text-gold ${
                link.label === active ? "text-gold" : "text-muted"
              }`}
            >
              {link.label}
              {link.label === active && (
                <span className="absolute -bottom-3 left-0 h-0.5 w-full bg-gold" />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <Link
            href={accountHref}
            aria-label="My Account"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-gold hover:text-gold"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7" />
            </svg>
          </Link>
          <LetsTalkButton
            triggerClassName="inline-flex items-center gap-2 rounded-md border border-gold/50 px-5 py-2.5 text-xs font-semibold tracking-wide text-gold transition-colors hover:bg-gold hover:text-bg"
          />
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-gold/50 hover:text-gold lg:hidden"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Mobile drawer — rendered through a portal straight into
          document.body, so it's always the true top-most layer covering
          the whole screen, regardless of where Navbar sits in the page. */}
      {open && mounted && createPortal(
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="mobile-nav-overlay absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div className="mobile-nav-panel absolute inset-y-0 right-0 flex w-[82%] max-w-sm flex-col border-l border-gold/15 bg-bg-soft shadow-2xl">
            <div className="flex items-center justify-between border-b border-line px-6 py-5">
              <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2">
                <Image
                  src={settings.appearance.logoUrl}
                  alt="FAAH Technology"
                  width={32}
                  height={32}
                  className="h-8 w-8 object-contain"
                />
                <span className="font-display text-sm font-semibold text-white">
                  FAAH
                  <span className="block text-[9px] font-medium tracking-[0.3em] text-muted">
                    TECHNOLOGY
                  </span>
                </span>
              </Link>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted hover:border-gold/50 hover:text-gold"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <nav className="no-scrollbar flex-1 space-y-1 overflow-y-auto px-4 py-6">
              <Link
                href={HOME_LINK.href}
                onClick={() => setOpen(false)}
                style={{ animationDelay: "0.05s" }}
                className={`mobile-nav-item flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold transition-colors ${
                  HOME_LINK.label === active
                    ? "bg-gold/10 text-gold"
                    : "text-muted hover:bg-white/5 hover:text-white"
                }`}
              >
                <NavLinkIcon>{HOME_LINK.icon}</NavLinkIcon>
                <span className="flex-1">{HOME_LINK.label}</span>
                {HOME_LINK.label === active && <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold" />}
              </Link>

              <div className="mobile-nav-item" style={{ animationDelay: "0.1s" }}>
                <button
                  type="button"
                  onClick={() => setMobileServicesOpen((v) => !v)}
                  aria-expanded={mobileServicesOpen}
                  className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold transition-colors ${
                    isServicesActive
                      ? "bg-gold/10 text-gold"
                      : "text-muted hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <NavLinkIcon>
                    <circle cx="8" cy="8" r="3" />
                    <circle cx="16" cy="8" r="3" />
                    <path d="M4 20c0-3.3 2.7-6 6-6M20 20c0-3.3-2.7-6-6-6" />
                  </NavLinkIcon>
                  <span className="flex-1 text-left">Services</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`shrink-0 transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>

                {mobileServicesOpen && (
                  <div className="mt-1 space-y-1 pl-6">
                    {SERVICES.map((service) => (
                      <Link
                        key={service.label}
                        href={service.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm text-muted transition-colors hover:bg-white/5 hover:text-white"
                      >
                        <NavLinkIcon>{service.icon}</NavLinkIcon>
                        <span>{service.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {NAV_LINKS.map((link, i) => {
                const isActive = link.label === active;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    style={{ animationDelay: `${0.15 + i * 0.05}s` }}
                    className={`mobile-nav-item flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold transition-colors ${
                      isActive
                        ? "bg-gold/10 text-gold"
                        : "text-muted hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <NavLinkIcon>{link.icon}</NavLinkIcon>
                    <span className="flex-1">{link.label}</span>
                    {isActive && <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold" />}
                  </Link>
                );
              })}

              <div
                className="mobile-nav-item my-3 h-px bg-line"
                style={{ animationDelay: `${0.2 + NAV_LINKS.length * 0.05}s` }}
                aria-hidden
              />

              <Link
                href={accountHref}
                onClick={() => setOpen(false)}
                style={{ animationDelay: `${0.25 + NAV_LINKS.length * 0.05}s` }}
                className={`mobile-nav-item flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold transition-colors ${
                  active === "Account" ? "bg-gold/10 text-gold" : "text-muted hover:bg-white/5 hover:text-white"
                }`}
              >
                <NavLinkIcon>
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7" />
                </NavLinkIcon>
                <span className="flex-1">My Account</span>
              </Link>
            </nav>

            <div
              className="mobile-nav-item border-t border-line px-4 py-5"
              style={{ animationDelay: `${0.3 + NAV_LINKS.length * 0.05}s` }}
            >
              <LetsTalkButton
                variant="primary"
                wrapperClassName="w-full"
                triggerClassName="btn-primary w-full justify-center"
                align="left"
                onNavigate={() => setOpen(false)}
              />
            </div>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
}
