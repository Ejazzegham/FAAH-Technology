"use client";

import { useEffect, useState } from "react";
import { DEFAULT_SETTINGS, subscribeSettings, updateSettings } from "@/lib/firestore/settings";

const inputClass =
  "w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-white placeholder:text-muted focus:border-gold focus:outline-none";

export default function AdminSeoCard() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const unsub = subscribeSettings(setSettings);
    return () => unsub?.();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      await updateSettings({ seo: settings.seo });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch {
      alert("Couldn't save SEO settings. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="card !p-6 sm:!p-8" id="manage-seo">
      <h2 className="text-center font-display text-xl font-semibold text-white sm:text-2xl">
        SEO <span className="text-gold">Settings</span>
      </h2>
      <p className="mt-1 text-center text-xs text-muted">
        Controls how the homepage appears in Google search results and when shared on social
        media.
      </p>

      <form onSubmit={handleSubmit} className="mx-auto mt-6 max-w-2xl space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted">Site Title</label>
          <input
            type="text"
            value={settings.seo.title}
            onChange={(e) => setSettings({ ...settings, seo: { ...settings.seo, title: e.target.value } })}
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted">Meta Description</label>
          <textarea
            rows={3}
            value={settings.seo.description}
            onChange={(e) =>
              setSettings({ ...settings, seo: { ...settings.seo, description: e.target.value } })
            }
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted">Keywords (comma separated)</label>
          <input
            type="text"
            value={settings.seo.keywords}
            onChange={(e) => setSettings({ ...settings, seo: { ...settings.seo, keywords: e.target.value } })}
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted">
            Social Share Image URL (Open Graph)
          </label>
          <input
            type="text"
            value={settings.seo.ogImage}
            onChange={(e) => setSettings({ ...settings, seo: { ...settings.seo, ogImage: e.target.value } })}
            className={inputClass}
          />
        </div>
        <div className="flex items-center gap-3">
          <button type="submit" disabled={saving} className="btn-primary justify-center disabled:opacity-60">
            {saving ? "Saving…" : "Save SEO Settings"}
          </button>
          {saved && <span className="text-xs text-emerald-400">Saved!</span>}
        </div>
      </form>
    </div>
  );
}
