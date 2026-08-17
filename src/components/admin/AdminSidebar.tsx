"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";

type SubItem = { label: string; href: string; tabValue: string };
type Item = {
  label: string;
  icon: JSX.Element;
  href?: string;
  children?: SubItem[];
};

const ICONS = {
  dashboard: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </>
  ),
  portfolio: <path d="M3 7h18v13H3zM8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />,
  services: <path d="M12 8a4 4 0 100 8 4 4 0 000-8zM12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />,
  pricing: <path d="M20.6 12.3L12.7 20.2a2 2 0 01-2.8 0L3 13.3V4h9.3l8.3 8.3a2 2 0 010 2.8zM7 8h.01" />,
  testimonials: <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" />,
  reviews: <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.1 6.5L12 17.4l-5.8 3.1 1.1-6.5L2.5 9.4l6.6-.9L12 2.5z" />,
  team: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M2 20c0-3.3 3.1-6 7-6s7 2.7 7 6M16 8a3 3 0 110-6M22 20c0-2.7-2-5-5-5.8" />
    </>
  ),
  clients: <path d="M17 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2M10 11a4 4 0 100-8 4 4 0 000 8zM21 21v-2a4 4 0 00-3-3.9" />,
  messages: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </>
  ),
  subscribers: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M2 20c0-3.3 3.1-6 7-6s7 2.7 7 6" />
      <path d="M19 8v6M22 11h-6" />
    </>
  ),
  pages: <path d="M6 2h9l5 5v15H6zM15 2v5h5" />,
  blog: <path d="M4 19.5A2.5 2.5 0 016.5 17H20M4 19.5A2.5 2.5 0 006.5 22H20V2H6.5A2.5 2.5 0 004 4.5v15z" />,
  seo: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </>
  ),
  appearance: <path d="M12 2a10 10 0 100 20 3 3 0 003-3 2 2 0 00-2-2h-1a2 2 0 01-2-2 2 2 0 012-2h3a4 4 0 004-4 8 8 0 00-7-7zM7 13a1 1 0 110-2 1 1 0 010 2zM8 8a1 1 0 110-2 1 1 0 010 2zM14 7a1 1 0 110-2 1 1 0 010 2z" />,
  users: <path d="M17 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2M10 11a4 4 0 100-8 4 4 0 000 8z" />,
  roles: <path d="M12 2l8 3v6c0 5-3.4 8.6-8 11-4.6-2.4-8-6-8-11V5l8-3zM9.5 12l1.8 1.8 3.2-4" />,
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 00.3 1.9l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.9-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1-1.6 1.7 1.7 0 00-1.9.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.9 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1 1.7 1.7 0 00-.3-1.9l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.9.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.9-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.9V9a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z" />
    </>
  ),
  backup: <path d="M21 12a9 9 0 11-3-6.7M21 3v6h-6" />,
  orders: (
    <>
      <path d="M6 2l1.5 4h9L18 2" />
      <rect x="3" y="6" width="18" height="15" rx="2" />
      <path d="M3 11h18M9 15h6" />
    </>
  ),
};

const NAV: Item[] = [
  { label: "Dashboard", icon: ICONS.dashboard, href: "/admin" },
  {
    label: "Portfolio",
    icon: ICONS.portfolio,
    href: "/admin/portfolio",
    children: [
      { label: "All Portfolio", href: "/admin/portfolio?tab=all", tabValue: "all" },
      { label: "Add Portfolio", href: "/admin/portfolio?tab=add", tabValue: "add" },
      { label: "Technologies", href: "/admin/portfolio?tab=tech", tabValue: "tech" },
    ],
  },
  { label: "Services", icon: ICONS.services, href: "/admin/services" },
  { label: "Pricing Packages", icon: ICONS.pricing, href: "/admin/pricing" },
  { label: "Testimonials", icon: ICONS.testimonials, href: "/admin/testimonials" },
  { label: "Reviews", icon: ICONS.reviews, href: "/admin/reviews" },
  { label: "Team Members", icon: ICONS.team, href: "/admin/team" },
  { label: "Clients", icon: ICONS.clients, href: "/admin/clients" },
  { label: "Orders", icon: ICONS.orders, href: "/admin/orders" },
  { label: "Messages", icon: ICONS.messages, href: "/admin/messages" },
  { label: "Subscribers", icon: ICONS.subscribers, href: "/admin/subscribers" },
  {
    label: "Pages",
    icon: ICONS.pages,
    href: "/admin/pages",
    children: [
      { label: "All Pages", href: "/admin/pages?tab=all", tabValue: "all" },
      { label: "Add Page", href: "/admin/pages?tab=add", tabValue: "add" },
    ],
  },
  {
    label: "Blog",
    icon: ICONS.blog,
    href: "/admin/blog",
    children: [
      { label: "All Posts", href: "/admin/blog?tab=posts", tabValue: "posts" },
      { label: "Add Post", href: "/admin/blog?tab=add", tabValue: "add" },
      { label: "Comments", href: "/admin/blog?tab=comments", tabValue: "comments" },
    ],
  },
  { label: "SEO Settings", icon: ICONS.seo, href: "/admin/seo" },
  { label: "Appearance", icon: ICONS.appearance, href: "/admin/appearance" },
  { label: "Users", icon: ICONS.users, href: "/admin/users" },
  { label: "Roles & Permissions", icon: ICONS.roles, href: "/admin/roles" },
  { label: "Settings", icon: ICONS.settings, href: "/admin/settings" },
  { label: "Backup & Restore", icon: ICONS.backup, href: "/admin/backup" },
];

function NavIcon({ children }: { children: JSX.Element }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
    >
      {children}
    </svg>
  );
}

export default function AdminSidebar({
  messageBadge,
  orderBadge,
  mobileOpen = false,
  onCloseMobile,
}: {
  messageBadge?: number;
  orderBadge?: number;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab");

  const [openMenu, setOpenMenu] = useState<string | null>(
    NAV.find((n) => n.children && pathname.startsWith(n.href ?? "\0"))?.label ?? null
  );

  const sidebarBody = (
    <>
      <div className="flex items-center gap-2 border-b border-line px-6 py-5">
        <Image
          src="/logo/faah_logo_512x512.png"
          alt="FAAH Technology"
          width={36}
          height={36}
          className="h-9 w-9 object-contain"
        />
        <div>
          <p className="font-display text-sm font-semibold leading-tight text-white">
            TECHNOLOGY
          </p>
          <p className="text-[10px] tracking-[0.2em] text-muted">ADMIN PANEL</p>
        </div>
        <button
          onClick={onCloseMobile}
          aria-label="Close menu"
          className="ml-auto rounded-md p-1.5 text-muted hover:bg-white/5 hover:text-white lg:hidden"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <nav className="no-scrollbar flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {NAV.map((item) => {
          const isTopActive = pathname === item.href;
          const isOpen = openMenu === item.label;
          const badge =
            item.label === "Messages" && messageBadge
              ? String(messageBadge)
              : item.label === "Orders" && orderBadge
              ? String(orderBadge)
              : undefined;

          if (!item.children) {
            return (
              <Link
                key={item.label}
                href={item.href ?? "#"}
                onClick={onCloseMobile}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                  isTopActive
                    ? "bg-gold-gradient font-semibold text-bg"
                    : "text-muted hover:bg-white/5 hover:text-white"
                }`}
              >
                <NavIcon>{item.icon}</NavIcon>
                <span className="flex-1 text-left">{item.label}</span>
                {badge && (
                  <span className="rounded-full bg-gold px-2 py-0.5 text-[10px] font-bold text-bg">
                    {badge}
                  </span>
                )}
              </Link>
            );
          }

          return (
            <div key={item.label}>
              <button
                onClick={() => setOpenMenu(isOpen ? null : item.label)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                  isTopActive && !isOpen
                    ? "bg-gold-gradient font-semibold text-bg"
                    : "text-muted hover:bg-white/5 hover:text-white"
                }`}
              >
                <NavIcon>{item.icon}</NavIcon>
                <span className="flex-1 text-left">{item.label}</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                >
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {isOpen && (
                <div className="mt-1 space-y-1 border-l border-line pl-8">
                  {item.children.map((sub, i) => {
                    const subActive =
                      isTopActive && (currentTab === sub.tabValue || (!currentTab && i === 0));
                    return (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        onClick={onCloseMobile}
                        className={`block w-full rounded-md px-3 py-1.5 text-left text-xs ${
                          subActive ? "text-gold" : "text-muted hover:text-white"
                        }`}
                      >
                        {sub.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="border-t border-line p-4">
        <a
          href="/"
          className="flex items-center justify-center gap-2 rounded-lg border border-gold/50 px-4 py-2.5 text-xs font-semibold text-gold hover:bg-gold hover:text-bg"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="12" cy="12" r="3" />
            <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
          </svg>
          Preview Website
        </a>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 flex-col border-r border-line bg-bg-soft lg:flex">
        {sidebarBody}
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={onCloseMobile}
            aria-hidden
          />
          <aside className="absolute inset-y-0 left-0 flex w-72 flex-col border-r border-line bg-bg-soft">
            {sidebarBody}
          </aside>
        </div>
      )}
    </>
  );
}
