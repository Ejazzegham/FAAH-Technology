"use client";

import type { Project } from "@/lib/projects";
import { CATEGORY_LABELS } from "@/lib/projects";

function formatDate(ms: number) {
  return new Date(ms).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function AdminRecentProjects({
  projects,
  onEdit,
  onDelete,
}: {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
}) {
  const rows = projects.slice(0, 5);

  return (
    <div className="card !p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-base font-semibold text-white">Recent Projects</h3>
        <span className="text-xs text-muted">{projects.length} total</span>
      </div>

      {rows.length === 0 ? (
        <p className="mt-6 text-center text-xs text-muted">
          No projects yet — add one from Manage Portfolio below.
        </p>
      ) : (
        <ul className="mt-5 grid grid-cols-1 gap-3 lg:grid-cols-2">
          {rows.map((p, i) => (
            <li key={p.id} className="rounded-lg border border-line p-3 text-xs">
              <div className="flex items-start justify-between gap-2">
                <div className="flex min-w-0 items-center gap-2">
                  <span className="shrink-0 text-muted">{i + 1}.</span>
                  <p className="truncate font-medium text-white">{p.title}</p>
                </div>
                <span
                  className={`shrink-0 rounded px-2 py-1 text-[10px] font-semibold ${
                    p.status === "Completed"
                      ? "bg-emerald-500/15 text-emerald-400"
                      : "bg-gold/15 text-gold"
                  }`}
                >
                  {p.status ?? "Completed"}
                </span>
              </div>

              <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-muted">
                <span>{CATEGORY_LABELS[p.category]}</span>
                <span className="truncate">{p.client || "—"}</span>
                <span>{formatDate(p.createdAt ?? Date.now())}</span>
              </div>

              <div className="mt-2.5 flex items-center gap-3 border-t border-line/60 pt-2.5 text-muted">
                {p.link && (
                  <a href={p.link} target="_blank" rel="noreferrer" aria-label="View" className="hover:text-gold">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </a>
                )}
                <button aria-label="Edit" onClick={() => onEdit(p)} className="hover:text-gold">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
                  </svg>
                </button>
                <button aria-label="Delete" onClick={() => onDelete(p)} className="hover:text-rose-400">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0l-1 14a2 2 0 01-2 2H7a2 2 0 01-2-2L4 6h16z" />
                  </svg>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
