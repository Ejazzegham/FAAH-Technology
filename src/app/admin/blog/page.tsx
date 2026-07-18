"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AdminBlogCard, { type BlogTab } from "@/components/admin/AdminBlogCard";

const TAB_FROM_QUERY: Record<string, BlogTab> = {
  posts: "All Posts",
  add: "Add Post",
  comments: "Comments",
};
const QUERY_FROM_TAB: Record<BlogTab, string> = {
  "All Posts": "posts",
  "Add Post": "add",
  Comments: "comments",
};

function BlogPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = TAB_FROM_QUERY[searchParams.get("tab") ?? ""] ?? "All Posts";

  return (
    <AdminBlogCard
      activeTab={activeTab}
      onTabChange={(t) => router.push(`/admin/blog?tab=${QUERY_FROM_TAB[t]}`)}
    />
  );
}

export default function BlogPage() {
  return (
    <Suspense fallback={null}>
      <BlogPageInner />
    </Suspense>
  );
}
