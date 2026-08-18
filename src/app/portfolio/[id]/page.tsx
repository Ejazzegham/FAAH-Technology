import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectGallery from "@/components/ProjectGallery";
import ProjectReactions from "@/components/ProjectReactions";
import Lightfall from "@/components/Lightfall";
import { CATEGORY_LABELS, getProjectById } from "@/lib/projects";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const project = await getProjectById(params.id);
  if (!project) return { title: "Project Not Found — FAAH Technology" };
  return {
    title: `${project.title} — FAAH Technology Portfolio`,
    description: project.description || `${project.title} — ${CATEGORY_LABELS[project.category]} project by FAAH Technology.`,
    openGraph: {
      title: project.title,
      description: project.description || undefined,
      images: project.images?.[0] ? [{ url: project.images[0] }] : undefined,
    },
  };
}

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = await getProjectById(params.id);
  if (!project) notFound();

  const images = project.images ?? [];

  return (
    <>
      <Navbar />
      <main>
        <section className="relative overflow-hidden">
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-40">
            <Lightfall
              colors={["#A6C8FF", "#5227FF", "#FF9FFC"]}
              backgroundColor="#0A29FF"
              speed={0.5}
              streakCount={2}
              streakWidth={1}
              streakLength={1}
              glow={1}
              density={0.6}
              twinkle={1}
              zoom={3}
              backgroundGlow={0.5}
              opacity={1}
              mouseInteraction
              mouseStrength={0.5}
              mouseRadius={1}
            />
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute right-0 top-0 h-[600px] w-[600px] -translate-y-1/4 translate-x-1/4 rounded-full bg-gold/10 blur-3xl"
          />

          <div className="section relative z-10 max-w-5xl">
            <div className="flex justify-center">
              <Link
                href="/portfolio"
                className="group inline-flex items-center gap-2 rounded-full border border-line/80 bg-bg/80 px-4 py-2 text-xs font-semibold text-ink/90 backdrop-blur-sm transition-all duration-200 hover:border-gold/60 hover:bg-gold/10 hover:text-gold"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="transition-transform duration-200 group-hover:-translate-x-1"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Back to Portfolio
              </Link>
            </div>

            <div className="mt-6 flex flex-col items-center text-center">
              <p className="flex items-center gap-3 text-sm font-bold tracking-[0.25em] text-gold sm:text-base">
                <span aria-hidden className="h-px w-6 bg-gradient-to-r from-transparent to-gold" />
                {CATEGORY_LABELS[project.category].toUpperCase()}
                <span aria-hidden className="h-px w-6 bg-gradient-to-l from-transparent to-gold" />
              </p>
              <h1 className="rgb-text mt-3 text-center font-display text-5xl font-bold leading-[1.35] sm:text-6xl lg:text-7xl">
                {project.title}
              </h1>
              <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-1 text-xs text-muted">
                {project.client && <span>Client: {project.client}</span>}
                {project.technologies && <span>Tech: {project.technologies}</span>}
                <span>Status: {project.status ?? "Completed"}</span>
              </div>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary mt-5"
                >
                  Visit Live Site <span aria-hidden>↗</span>
                </a>
              )}
            </div>
          </div>
        </section>

        <section className="section -mt-4 max-w-5xl pt-0">
          {project.description && (
            <p className="mx-auto max-w-3xl text-center text-sm leading-relaxed text-muted">
              {project.description}
            </p>
          )}

          <div className="mt-6 flex justify-center">
            <ProjectReactions
              projectId={project.id}
              initialLikes={project.likeCount}
              initialFavorites={project.favoriteCount}
              size="lg"
            />
          </div>

          <div className="mt-10">
            {images.length > 0 ? (
              <ProjectGallery images={images} title={project.title} />
            ) : (
              <p className="text-sm text-muted">No images uploaded for this project yet.</p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
