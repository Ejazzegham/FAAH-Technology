"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AdminPagesCard, { type PagesTab } from "@/components/admin/AdminPagesCard";

const TAB_FROM_QUERY: Record<string, PagesTab> = {
  all: "All Pages",
  add: "Add Page",
};
const QUERY_FROM_TAB: Record<PagesTab, string> = {
  "All Pages": "all",
  "Add Page": "add",
};

function PagesPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = TAB_FROM_QUERY[searchParams.get("tab") ?? ""] ?? "All Pages";

  return (
    <AdminPagesCard
      activeTab={activeTab}
      onTabChange={(t) => router.push(`/admin/pages?tab=${QUERY_FROM_TAB[t]}`)}
    />
  );
}

export default function PagesPage() {
  return (
    <Suspense fallback={null}>
      <PagesPageInner />
    </Suspense>
  );
}
