import Image from "next/image";
import Link from "next/link";
import { CATEGORY_LABELS, getFeaturedProjects } from "@/lib/projects";

export default async function Projects() {
  const projects = await getFeaturedProjects(4);

  if (projects.length === 0) return null;

  return (
    <section id="portfolio" className="section">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.25em] text-gold">
            <span aria-hidden className="h-px w-5 bg-gradient-to-r from-transparent to-gold" />
            MY WORK
            <span aria-hidden className="h-px w-5 bg-gradient-to-l from-transparent to-gold" />
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
            Featured Projects
          </h2>
        </div>
        <Link href="/portfolio" className="btn-outline">
          VIEW ALL PROJECTS <span aria-hidden>→</span>
        </Link>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/portfolio/${project.id}`}
            className="rgb-box group block overflow-hidden rounded-xl bg-bg-card"
          >
            {project.images && project.images.length > 0 ? (
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={project.images[0]}
                  alt={`${project.title} — ${CATEGORY_LABELS[project.category]} project by FAAH Technology`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            ) : (
              <div
                className={`flex aspect-[4/3] items-center justify-center bg-gradient-to-br ${project.color}`}
              >
                <span className="font-display text-sm font-medium tracking-wide text-white/30">
                  {CATEGORY_LABELS[project.category]}
                </span>
              </div>
            )}
            <div className="flex items-center justify-between px-5 py-4">
              <div>
                <h3 className="font-display text-sm font-semibold text-gold">
                  {project.title}
                </h3>
                <p className="text-xs text-muted">{CATEGORY_LABELS[project.category]}</p>
              </div>
              <span aria-hidden className="text-gold transition-transform group-hover:translate-x-1">
                →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
