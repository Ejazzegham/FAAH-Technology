"use client";

import { useEffect, useState } from "react";
import {
  addPage,
  deletePage,
  slugify,
  subscribePages,
  updatePage,
  type Page,
} from "@/lib/firestore/pages";

const TABS = ["All Pages", "Add Page"] as const;
export type PagesTab = (typeof TABS)[number];

const inputClass =
  "w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-white placeholder:text-muted focus:border-gold focus:outline-none";

function AllPagesTab({
  pages,
  onEdit,
  onDelete,
}: {
  pages: Page[];
  onEdit: (p: Page) => void;
  onDelete: (p: Page) => void;
}) {
  if (pages.length === 0) {
    return (
      <p className="py-10 text-center text-sm text-muted">
        No pages yet. Click &quot;Add Page&quot; above to create your first one.
      </p>
    );
  }
  return (
    <ul className="space-y-2">
      {pages.map((p) => (
        <li
          key={p.id}
          className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-line px-4 py-3"
        >
          <div>
            <p className="text-sm font-semibold text-white">{p.title}</p>
            <p className="text-xs text-muted">
              /pages/{p.slug} ·{" "}
              <span className={p.published ? "text-emerald-400" : "text-amber-400"}>
                {p.published ? "Published" : "Draft"}
              </span>
            </p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => onEdit(p)} className="text-xs font-semibold text-gold hover:underline">
              Edit
            </button>
            <button
              onClick={() => onDelete(p)}
              className="text-xs font-semibold text-rose-400 hover:underline"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

function AddPageForm({ editingPage, onDone }: { editingPage: Page | null; onDone: () => void }) {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (editingPage) {
      setTitle(editingPage.title);
      setSlug(editingPage.slug);
      setContent(editingPage.content);
      setPublished(editingPage.published);
      setSlugTouched(true);
    } else {
      setTitle("");
      setSlug("");
      setContent("");
      setPublished(true);
      setSlugTouched(false);
    }
  }, [editingPage]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !slug.trim()) return;
    setSaving(true);
    setError(null);
    try {
      const input = { title: title.trim(), slug: slugify(slug), content, published };
      if (editingPage) {
        await updatePage(editingPage.id, input);
      } else {
        await addPage(input);
      }
      onDone();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save this page.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1.5 block text-xs font-medium text-muted">Page Title</label>
        <input
          type="text"
          required
          placeholder="e.g. Privacy Policy"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (!slugTouched) setSlug(slugify(e.target.value));
          }}
          className={inputClass}
        />
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-medium text-muted">
          URL Slug — visitors will see it at /pages/{slug || "your-slug"}
        </label>
        <input
          type="text"
          required
          placeholder="privacy-policy"
          value={slug}
          onChange={(e) => {
            setSlug(e.target.value);
            setSlugTouched(true);
          }}
          className={inputClass}
        />
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-medium text-muted">Content</label>
        <textarea
          rows={10}
          placeholder="Write the page content here…"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={inputClass}
        />
      </div>
      <label className="flex items-center gap-2 text-xs text-muted">
        <input
          type="checkbox"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
          className="h-4 w-4 rounded border-line accent-gold"
        />
        Published (visible to visitors)
      </label>
      {error && <p className="text-xs text-rose-400">{error}</p>}
      <div className="flex gap-3">
        <button type="submit" disabled={saving} className="btn-primary justify-center disabled:opacity-60">
          {saving ? "Saving…" : editingPage ? "Save Changes" : "Create Page"}
        </button>
        {editingPage && (
          <button type="button" onClick={onDone} className="btn-outline justify-center">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default function AdminPagesCard({
  activeTab,
  onTabChange,
  initialEditId,
}: {
  activeTab: PagesTab;
  onTabChange: (t: PagesTab) => void;
  initialEditId?: string | null;
}) {
  const [pages, setPages] = useState<Page[]>([]);
  const [editingPage, setEditingPage] = useState<Page | null>(null);

  useEffect(() => {
    const unsub = subscribePages(setPages);
    return () => unsub?.();
  }, []);

  // If a specific page id was passed in via the URL (e.g. navigating to
  // /admin/pages/add?edit=<id>), pre-select it for editing once the pages
  // list has loaded.
  useEffect(() => {
    if (!initialEditId) return;
    const match = pages.find((p) => p.id === initialEditId);
    if (match) setEditingPage(match);
  }, [initialEditId, pages]);

  async function handleDelete(page: Page) {
    if (!confirm(`Delete "${page.title}"? This can't be undone.`)) return;
    try {
      await deletePage(page.id);
    } catch {
      alert("Couldn't delete this page. Please try again.");
    }
  }

  return (
    <div className="card !p-6 sm:!p-8" id="manage-pages">
      <h2 className="text-center font-display text-xl font-semibold text-white sm:text-2xl">
        Manage <span className="text-gold">Pages</span>
      </h2>
      <p className="mt-1 text-center text-xs text-muted">
        Custom pages, published at /pages/&lt;slug&gt; (e.g. Privacy Policy, Terms of Service).
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-2 border-b border-line pb-4">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => {
              onTabChange(t);
              if (t !== "Add Page") setEditingPage(null);
            }}
            className={`rounded-md px-4 py-2 text-xs font-semibold transition-colors ${
              activeTab === t ? "bg-gold-gradient text-bg" : "border border-line text-muted hover:text-white"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {activeTab === "All Pages" && (
          <AllPagesTab
            pages={pages}
            onEdit={(p) => {
              setEditingPage(p);
              onTabChange("Add Page");
            }}
            onDelete={handleDelete}
          />
        )}
        {activeTab === "Add Page" && (
          <AddPageForm
            editingPage={editingPage}
            onDone={() => {
              setEditingPage(null);
              onTabChange("All Pages");
            }}
          />
        )}
      </div>
    </div>
  );
}