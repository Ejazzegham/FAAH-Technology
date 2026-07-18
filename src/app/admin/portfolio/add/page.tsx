"use client";

import { Suspense, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AdminManagePortfolio from "@/components/admin/AdminManagePortfolio";
import { usePortfolioAdmin } from "@/lib/admin/hooks";

function AddPortfolioInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");
  const { projects, handleDeleteProject } = usePortfolioAdmin();
  const editingProject = useMemo(
    () => (editId ? projects.find((p) => p.id === editId) ?? null : null),
    [editId, projects]
  );

  return (
    <AdminManagePortfolio
      projects={projects}
      editingProject={editingProject}
      onEdit={(p) => router.push(`/admin/portfolio/add?edit=${p.id}`)}
      onDelete={handleDeleteProject}
      onDoneEditing={() => router.push("/admin/portfolio/add")}
      activeTab="Add Portfolio"
      onTabChange={(t) => {
        if (t === "All Portfolio") router.push("/admin/portfolio");
        else if (t === "Technologies") router.push("/admin/portfolio/technologies");
      }}
    />
  );
}

export default function AdminAddPortfolioPage() {
  return (
    <Suspense fallback={null}>
      <AddPortfolioInner />
    </Suspense>
  );
}
