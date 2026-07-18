"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AdminBlogCard from "@/components/admin/AdminBlogCard";

function AddPostInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

  return (
    <AdminBlogCard
      activeTab="Add Post"
      initialEditId={editId}
      onTabChange={(t) => {
        if (t === "All Posts") router.push("/admin/blog");
        else if (t === "Comments") router.push("/admin/blog/comments");
      }}
    />
  );
}

export default function AdminAddPostPage() {
  return (
    <Suspense fallback={null}>
      <AddPostInner />
    </Suspense>
  );
}
