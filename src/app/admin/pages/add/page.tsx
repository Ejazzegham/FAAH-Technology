"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AdminPagesCard from "@/components/admin/AdminPagesCard";

function AddPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

  return (
    <AdminPagesCard
      activeTab="Add Page"
      initialEditId={editId}
      onTabChange={(t) => {
        if (t === "All Pages") router.push("/admin/pages");
      }}
    />
  );
}

export default function AdminAddPagePage() {
  return (
    <Suspense fallback={null}>
      <AddPageInner />
    </Suspense>
  );
}
