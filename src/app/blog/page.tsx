import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import BlogHero from "@/components/BlogHero";
import BlogDiscover from "@/components/BlogDiscover";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import { getPublishedPosts } from "@/lib/firestore/blog";

export const metadata: Metadata = {
  title: "Blog — FAAH Technology",
  description: "Insights on design, development, and building great digital products.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <>
      <Navbar active="Blog" />
      <main>
        <BlogHero />
        <BlogDiscover />

        <section className="section pt-0">
          <div className="mx-auto max-w-2xl text-center">
            <p className="flex items-center justify-center gap-3 text-xs font-semibold tracking-[0.25em] text-gold">
              <span aria-hidden className="h-px w-5 bg-gradient-to-r from-transparent to-gold" />
              FEATURED ARTICLES
              <span aria-hidden className="h-px w-5 bg-gradient-to-l from-transparent to-gold" />
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold text-ink sm:text-3xl">
              Latest <span className="text-gold">Articles</span>
            </h2>
          </div>

          {posts.length === 0 ? (
            <p className="mt-10 py-16 text-center text-sm text-muted">
              No blog posts yet — check back soon.
            </p>
          ) : (
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="glow-card group block">
                  <div className="glow-card-inner border border-line">
                    <div className="relative aspect-[4/3] overflow-hidden bg-bg-card">
                      {post.coverImageUrl ? (
                        <Image
                          src={post.coverImageUrl}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-ink/20">
                          <span className="font-display text-sm">FAAH Technology</span>
                        </div>
                      )}
                    </div>
                    <div className="px-5 py-4">
                      <h2 className="font-display text-sm font-semibold text-gold">{post.title}</h2>
                      {post.excerpt && (
                        <p className="mt-1.5 line-clamp-2 text-xs text-muted">{post.excerpt}</p>
                      )}
                      <p className="mt-3 text-[11px] text-muted">
                        {new Date(post.createdAt).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        <CtaBanner
          title={
            <>
              Have a Project in Mind? <span className="text-gold">Let&apos;s Talk.</span>
            </>
          }
          subtitle="Share your vision with us, and we'll help you bring it to life with creative technology solutions."
          buttonText="LET'S TALK"
          icon="plane"
        />
      </main>
      <Footer />
    </>
  );
}
