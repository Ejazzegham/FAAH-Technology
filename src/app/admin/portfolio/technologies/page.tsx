"use client";

import { useRouter } from "next/navigation";
import AdminManagePortfolio from "@/components/admin/AdminManagePortfolio";
import { usePortfolioAdmin } from "@/lib/admin/hooks";

export default function AdminPortfolioTechnologiesPage() {
  const router = useRouter();
  const { projects, handleDeleteProject } = usePortfolioAdmin();

  return (
    <AdminManagePortfolio
      projects={projects}
      editingProject={null}
      onEdit={(p) => router.push(`/admin/portfolio/add?edit=${p.id}`)}
      onDelete={handleDeleteProject}
      onDoneEditing={() => {}}
      activeTab="Technologies"
      onTabChange={(t) => {
        if (t === "All Portfolio") router.push("/admin/portfolio");
        else if (t === "Add Portfolio") router.push("/admin/portfolio/add");
      }}
    />
  );
}
