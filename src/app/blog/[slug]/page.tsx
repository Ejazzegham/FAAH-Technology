import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPublishedPostBySlug } from "@/lib/firestore/blog";
import BlogComments from "@/components/BlogComments";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPublishedPostBySlug(params.slug);
  if (!post) return { title: "Post Not Found — FAAH Technology" };
  return {
    title: `${post.title} — FAAH Technology Blog`,
    description: post.excerpt || post.content.slice(0, 160),
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt || post.content.slice(0, 160),
      type: "article",
      publishedTime: new Date(post.createdAt).toISOString(),
      images: post.coverImageUrl ? [{ url: post.coverImageUrl }] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPublishedPostBySlug(params.slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt || undefined,
    image: post.coverImageUrl || undefined,
    datePublished: new Date(post.createdAt).toISOString(),
    dateModified: new Date(post.updatedAt).toISOString(),
    author: { "@type": "Organization", name: "FAAH Technology" },
    publisher: { "@type": "Organization", name: "FAAH Technology" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main>
        <section className="section max-w-3xl">
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-gold/40 px-2.5 py-1 text-[11px] text-gold"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <h1 className="mt-4 font-display text-3xl font-semibold text-white sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-3 text-xs text-muted">
            {new Date(post.createdAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          {post.coverImageUrl && (
            <div className="rgb-box relative mt-8 aspect-[16/9] overflow-hidden rounded-xl bg-bg-card">
              <Image src={post.coverImageUrl} alt={post.title} fill className="object-cover" />
            </div>
          )}

          <div className="mt-8 whitespace-pre-line text-sm leading-relaxed text-muted">
            {post.content}
          </div>

          <BlogComments postId={post.id} />
        </section>
      </main>
      <Footer />
    </>
  );
}
