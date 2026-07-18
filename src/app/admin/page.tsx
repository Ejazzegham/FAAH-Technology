"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { CATEGORY_LABELS, type Project } from "@/lib/projects";
import { useAdminData } from "@/lib/admin/AdminDataContext";
import AdminStatsRow, { type Stat } from "@/components/admin/AdminStatsRow";
import AdminPerformanceChart from "@/components/admin/AdminPerformanceChart";
import AdminCategoriesDonut, { type CategorySlice } from "@/components/admin/AdminCategoriesDonut";
import AdminRecentProjects from "@/components/admin/AdminRecentProjects";
import AdminRecentReviews from "@/components/admin/AdminRecentReviews";
import AdminSubscribersChart from "@/components/admin/AdminSubscribersChart";
import AdminLatestMessages from "@/components/admin/AdminLatestMessages";
import AdminClientsCard from "@/components/admin/AdminClientsCard";
import AdminOrdersCard from "@/components/admin/AdminOrdersCard";

const DONUT_COLORS = ["#f2b134", "#2fd0c9", "#7c4dff", "#ff4d6d", "#3a3a42", "#6b6b74"];

function pctChange(current: number, previous: number): { label: string; up: boolean } {
  if (previous === 0) {
    return current > 0 ? { label: "New this month", up: true } : { label: "No change", up: true };
  }
  const change = ((current - previous) / previous) * 100;
  const up = change >= 0;
  return { label: `${up ? "+" : ""}${change.toFixed(1)}% from last month`, up };
}

function startOfMonth(offset: number) {
  const d = new Date();
  d.setDate(1);
  d.setHours(0, 0, 0, 0);
  d.setMonth(d.getMonth() + offset);
  return d.getTime();
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const {
    projects,
    messages,
    subscribers,
    reviews,
    clients,
    setEditingProjectId,
    handleDeleteProject,
    handleDeleteReview,
    handleMarkMessageRead,
    handleDeleteMessage,
  } = useAdminData();

  function startEdit(project: Project) {
    setEditingProjectId(project.id);
    router.push("/admin/portfolio?tab=add");
  }

  const thisMonthStart = startOfMonth(0);
  const lastMonthStart = startOfMonth(-1);

  const projectsThisMonth = projects.filter((p) => (p.createdAt ?? 0) >= thisMonthStart).length;
  const projectsLastMonth = projects.filter(
    (p) => (p.createdAt ?? 0) >= lastMonthStart && (p.createdAt ?? 0) < thisMonthStart
  ).length;

  const subsThisMonth = subscribers.filter((s) => s.createdAt >= thisMonthStart).length;
  const subsLastMonth = subscribers.filter((s) => s.createdAt >= lastMonthStart && s.createdAt < thisMonthStart).length;

  const messagesThisMonth = messages.filter((m) => m.createdAt >= thisMonthStart).length;
  const messagesLastMonth = messages.filter((m) => m.createdAt >= lastMonthStart && m.createdAt < thisMonthStart).length;

  const reviewsThisMonth = reviews.filter((r) => r.createdAt >= thisMonthStart).length;
  const reviewsLastMonth = reviews.filter((r) => r.createdAt >= lastMonthStart && r.createdAt < thisMonthStart).length;

  const clientsThisMonth = clients.filter((c) => c.createdAt >= thisMonthStart).length;
  const clientsLastMonth = clients.filter((c) => c.createdAt >= lastMonthStart && c.createdAt < thisMonthStart).length;

  const projChange = pctChange(projectsThisMonth, projectsLastMonth);
  const clientChange = pctChange(clientsThisMonth, clientsLastMonth);
  const reviewChange = pctChange(reviewsThisMonth, reviewsLastMonth);
  const messageChange = pctChange(messagesThisMonth, messagesLastMonth);
  const subChange = pctChange(subsThisMonth, subsLastMonth);

  const stats: Stat[] = [
    { label: "Total Projects", value: String(projects.length), change: projChange.label, up: projChange.up, icon: "briefcase" },
    { label: "Total Clients", value: String(clients.length), change: clientChange.label, up: clientChange.up, icon: "users" },
    { label: "Total Reviews", value: String(reviews.length), change: reviewChange.label, up: reviewChange.up, icon: "star" },
    { label: "Messages", value: String(messages.length), change: messageChange.label, up: messageChange.up, icon: "mail" },
    { label: "Subscribers", value: String(subscribers.length), change: subChange.label, up: subChange.up, icon: "userPlus" },
  ];

  const categorySlices: CategorySlice[] = useMemo(() => {
    const counts = new Map<string, number>();
    projects.forEach((p) => {
      const label = CATEGORY_LABELS[p.category];
      counts.set(label, (counts.get(label) ?? 0) + 1);
    });
    const total = projects.length || 1;
    return Array.from(counts.entries()).map(([label, value], i) => ({
      label,
      value,
      pct: `${((value / total) * 100).toFixed(1)}%`,
      color: DONUT_COLORS[i % DONUT_COLORS.length],
    }));
  }, [projects]);

  const projectsTrend = useMemo(() => {
    const days = 30;
    const points: { day: string; value: number }[] = [];
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date();
      d.setHours(0, 0, 0, 0);
      d.setDate(d.getDate() - i);
      const next = d.getTime() + 86400000;
      const count = projects.filter((p) => (p.createdAt ?? 0) >= d.getTime() && (p.createdAt ?? 0) < next).length;
      points.push({ day: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }), value: count });
    }
    return points;
  }, [projects]);

  const subscribersMonthly = useMemo(() => {
    const points: { month: string; value: number }[] = [];
    for (let i = 11; i >= 0; i--) {
      const d = new Date();
      d.setDate(1);
      d.setHours(0, 0, 0, 0);
      d.setMonth(d.getMonth() - i);
      const next = new Date(d);
      next.setMonth(next.getMonth() + 1);
      const count = subscribers.filter((s) => s.createdAt >= d.getTime() && s.createdAt < next.getTime()).length;
      points.push({ month: d.toLocaleDateString("en-US", { month: "short" }), value: count });
    }
    return points;
  }, [subscribers]);

  return (
    <>
      <AdminStatsRow stats={stats} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AdminPerformanceChart data={projectsTrend} />
        </div>
        <AdminCategoriesDonut slices={categorySlices} total={projects.length} />
      </div>

      <AdminRecentProjects projects={projects} onEdit={startEdit} onDelete={handleDeleteProject} />

      <AdminRecentReviews reviews={reviews} onDelete={handleDeleteReview} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AdminSubscribersChart data={subscribersMonthly} total={subscribers.length} changeLabel={subChange.label} />
        <AdminLatestMessages
          messages={messages}
          onMarkRead={handleMarkMessageRead}
          onDelete={handleDeleteMessage}
        />
      </div>

      <AdminClientsCard clients={clients} />

      <AdminOrdersCard />
    </>
  );
}
