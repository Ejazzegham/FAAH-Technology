"use client";

import { Suspense, useState } from "react";
import { usePathname } from "next/navigation";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";
import { AdminDataProvider, useAdminData } from "@/lib/admin/AdminDataContext";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";
import AdminFooter from "@/components/admin/AdminFooter";

const TITLES: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/portfolio": "Portfolio",
  "/admin/services": "Services",
  "/admin/pricing": "Pricing Packages",
  "/admin/testimonials": "Testimonials",
  "/admin/reviews": "Reviews",
  "/admin/team": "Team Members",
  "/admin/clients": "Clients",
  "/admin/orders": "Orders",
  "/admin/messages": "Messages",
  "/admin/subscribers": "Subscribers",
  "/admin/pages": "Pages",
  "/admin/blog": "Blog",
  "/admin/seo": "SEO Settings",
  "/admin/appearance": "Appearance",
  "/admin/users": "Users",
  "/admin/roles": "Roles & Permissions",
  "/admin/settings": "Settings",
  "/admin/backup": "Backup & Restore",
};

function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, messages, orders } = useAdminData();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const title = TITLES[pathname] ?? "Dashboard";

  return (
    <div className="min-h-screen bg-bg">
      <Suspense fallback={<div className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-line bg-bg-soft lg:block" />}>
        <AdminSidebar
          messageBadge={messages.filter((m) => !m.read).length}
          orderBadge={orders.filter((o) => o.status === "New").length}
          mobileOpen={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />
      </Suspense>

      <div className="lg:ml-72">
        <AdminTopbar
          title={title}
          email={user?.email}
          unreadCount={messages.filter((m) => !m.read).length}
          onOpenMobile={() => setMobileSidebarOpen(true)}
        />

        <main className="mx-auto max-w-7xl space-y-6 px-6 py-6">{children}</main>

        <AdminFooter />
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthGuard>
      <AdminDataProvider>
        <AdminShell>{children}</AdminShell>
      </AdminDataProvider>
    </AdminAuthGuard>
  );
}
