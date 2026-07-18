"use client";

import { useRouter } from "next/navigation";
import AdminBlogCard from "@/components/admin/AdminBlogCard";

export default function AdminBlogCommentsPage() {
  const router = useRouter();
  return (
    <AdminBlogCard
      activeTab="Comments"
      onTabChange={(t) => {
        if (t === "All Posts") router.push("/admin/blog");
        else if (t === "Add Post") router.push("/admin/blog/add");
      }}
    />
  );
}
