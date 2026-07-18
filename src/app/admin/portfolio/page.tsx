"use client";

import { Suspense, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAdminData } from "@/lib/admin/AdminDataContext";
import AdminManagePortfolio, { type Tab } from "@/components/admin/AdminManagePortfolio";
import type { Project } from "@/lib/projects";

const TAB_FROM_QUERY: Record<string, Tab> = {
  all: "All Portfolio",
  add: "Add Portfolio",
  tech: "Technologies",
};
const QUERY_FROM_TAB: Record<Tab, string> = {
  "All Portfolio": "all",
  "Add Portfolio": "add",
  Technologies: "tech",
};

function PortfolioPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { projects, editingProjectId, setEditingProjectId, handleDeleteProject } = useAdminData();

  const activeTab = TAB_FROM_QUERY[searchParams.get("tab") ?? ""] ?? "All Portfolio";
  const editingProject: Project | null = useMemo(
    () => projects.find((p) => p.id === editingProjectId) ?? null,
    [projects, editingProjectId]
  );

  function setTab(tab: Tab) {
    router.push(`/admin/portfolio?tab=${QUERY_FROM_TAB[tab]}`);
  }

  function startEdit(project: Project) {
    setEditingProjectId(project.id);
    setTab("Add Portfolio");
  }

  return (
    <AdminManagePortfolio
      projects={projects}
      editingProject={editingProject}
      onEdit={startEdit}
      onDelete={handleDeleteProject}
      onDoneEditing={() => setEditingProjectId(null)}
      activeTab={activeTab}
      onTabChange={(t) => {
        setTab(t);
        if (t !== "Add Portfolio") setEditingProjectId(null);
      }}
    />
  );
}

export default function PortfolioPage() {
  return (
    <Suspense fallback={null}>
      <PortfolioPageInner />
    </Suspense>
  );
}
