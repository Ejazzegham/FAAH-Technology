"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { onAuthStateChanged, type User } from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase";
import { subscribeMessages } from "@/lib/firestore/messages";
import { subscribeAllOrders } from "@/lib/firestore/orders";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";
import AdminFooter from "@/components/admin/AdminFooter";

const PAGE_TITLES: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/portfolio": "All Portfolio",
  "/admin/portfolio/add": "Add Portfolio",
  "/admin/portfolio/technologies": "Technologies",
  "/admin/services": "Services",
  "/admin/pricing": "Pricing Packages",
  "/admin/testimonials": "Testimonials",
  "/admin/reviews": "Reviews",
  "/admin/team": "Team Members",
  "/admin/clients": "Clients",
  "/admin/orders": "Orders",
  "/admin/messages": "Messages",
  "/admin/subscribers": "Subscribers",
  "/admin/pages": "All Pages",
  "/admin/pages/add": "Add Page",
  "/admin/blog": "All Posts",
  "/admin/blog/add": "Add Post",
  "/admin/blog/comments": "Comments",
  "/admin/seo": "SEO Settings",
  "/admin/appearance": "Appearance",
  "/admin/users": "Users",
  "/admin/roles": "Roles & Permissions",
  "/admin/settings": "Settings",
  "/admin/backup": "Backup & Restore",
};

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [unread, setUnread] = useState(0);
  const [newOrders, setNewOrders] = useState(0);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => onAuthStateChanged(getFirebaseAuth(), setUser), []);

  useEffect(() => {
    const unsub = subscribeMessages((msgs) => setUnread(msgs.filter((m) => !m.read).length));
    return () => unsub?.();
  }, []);

  useEffect(() => {
    const unsub = subscribeAllOrders((orders) => setNewOrders(orders.filter((o) => o.status === "New").length));
    return () => unsub?.();
  }, []);

  const title = PAGE_TITLES[pathname ?? "/admin"] ?? "Dashboard";

  return (
    <div className="min-h-screen bg-bg">
      <AdminSidebar
        messageBadge={unread}
        orderBadge={newOrders}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      <div className="lg:ml-72">
        <AdminTopbar
          title={title}
          email={user?.email}
          unreadCount={unread}
          onOpenMobile={() => setMobileSidebarOpen(true)}
        />

        <main className="mx-auto max-w-7xl space-y-6 px-6 py-6">{children}</main>

        <AdminFooter />
      </div>
    </div>
  );
}
