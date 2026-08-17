import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/firestore/blog";
import { getPublishedPages } from "@/lib/firestore/pages";
import { getAllProjects } from "@/lib/projects";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://faahtechnology.com";

const STATIC_ROUTES = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "/portfolio", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/pricing", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/graphic-design", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/web-development", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/mobile-app-development", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/desktop-software", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, pages, projects] = await Promise.all([
    getPublishedPosts(),
    getPublishedPages(),
    getAllProjects(),
  ]);

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const postEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.updatedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const pageEntries: MetadataRoute.Sitemap = pages.map((p) => ({
    url: `${SITE_URL}/pages/${p.slug}`,
    lastModified: new Date(p.updatedAt),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const projectEntries: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${SITE_URL}/portfolio/${p.id}`,
    lastModified: p.createdAt ? new Date(p.createdAt) : undefined,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...postEntries, ...pageEntries, ...projectEntries];
}
