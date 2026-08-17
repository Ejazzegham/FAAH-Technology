import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPublishedPageBySlug } from "@/lib/firestore/pages";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const page = await getPublishedPageBySlug(params.slug);
  if (!page) return { title: "Page Not Found — FAAH Technology" };
  return {
    title: `${page.title} — FAAH Technology`,
    description: page.content.slice(0, 160),
    alternates: { canonical: `/pages/${page.slug}` },
  };
}

export default async function CustomPage({ params }: { params: { slug: string } }) {
  const page = await getPublishedPageBySlug(params.slug);
  if (!page) notFound();

  return (
    <>
      <Navbar />
      <main>
        <section className="section max-w-3xl">
          <h1 className="font-display text-3xl font-semibold text-white sm:text-4xl">
            {page.title}
          </h1>
          <span aria-hidden className="mt-4 block h-px w-10 bg-gold" />
          <div className="mt-8 whitespace-pre-line text-sm leading-relaxed text-muted">
            {page.content}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
