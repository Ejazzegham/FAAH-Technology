"use client";

import { useEffect, useState } from "react";
import { isFirebaseConfigured } from "@/lib/firebase";
import { uploadFile } from "@/lib/storage";
import { DEFAULT_SETTINGS, subscribeSettings, updateSettings } from "@/lib/firestore/settings";

const inputClass =
  "w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-white placeholder:text-muted focus:border-gold focus:outline-none";

export default function AdminAppearanceCard() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsub = subscribeSettings(setSettings);
    return () => unsub?.();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    setError(null);
    try {
      let logoUrl = settings.appearance.logoUrl;
      if (logoFile) {
        if (!isFirebaseConfigured) throw new Error("Firebase is not configured.");
        logoUrl = await uploadFile("site", logoFile);
      }
      await updateSettings({ appearance: { ...settings.appearance, logoUrl } });
      setLogoFile(null);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't save appearance settings.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="card !p-6 sm:!p-8" id="manage-appearance">
      <h2 className="text-center font-display text-xl font-semibold text-white sm:text-2xl">
        <span className="text-gold">Appearance</span>
      </h2>
      <p className="mt-1 text-center text-xs text-muted">
        Brand accent color, logo, and homepage/footer tagline.
      </p>

      <form onSubmit={handleSubmit} className="mx-auto mt-6 max-w-2xl space-y-5">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted">Accent Color</label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={settings.appearance.accentColor}
              onChange={(e) =>
                setSettings({ ...settings, appearance: { ...settings.appearance, accentColor: e.target.value } })
              }
              className="h-10 w-14 cursor-pointer rounded border border-line bg-bg"
            />
            <input
              type="text"
              value={settings.appearance.accentColor}
              onChange={(e) =>
                setSettings({ ...settings, appearance: { ...settings.appearance, accentColor: e.target.value } })
              }
              className={inputClass}
            />
          </div>
          <p className="mt-1 text-[11px] text-muted">
            Saved for reference — to fully re-theme the site, this hex value should be copied into
            the <code>--gold</code> CSS variable in globals.css (see Admin notes for details).
          </p>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted">Logo</label>
          <div className="flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoFile ? URL.createObjectURL(logoFile) : settings.appearance.logoUrl}
              alt="Current logo"
              className="h-14 w-14 rounded-md border border-line object-contain bg-white/5 p-1"
            />
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp,image/svg+xml"
              onChange={(e) => setLogoFile(e.target.files?.[0] ?? null)}
              className="block text-xs text-muted file:mr-3 file:rounded-md file:border-0 file:bg-gold-gradient file:px-3 file:py-2 file:text-xs file:font-semibold file:text-bg"
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted">Tagline</label>
          <input
            type="text"
            value={settings.appearance.tagline}
            onChange={(e) =>
              setSettings({ ...settings, appearance: { ...settings.appearance, tagline: e.target.value } })
            }
            className={inputClass}
          />
          <p className="mt-1 text-[11px] text-muted">Shown in the site footer.</p>
        </div>

        {error && <p className="text-xs text-rose-400">{error}</p>}
        <div className="flex items-center gap-3">
          <button type="submit" disabled={saving} className="btn-primary justify-center disabled:opacity-60">
            {saving ? "Saving…" : "Save Appearance"}
          </button>
          {saved && <span className="text-xs text-emerald-400">Saved!</span>}
        </div>
      </form>
    </div>
  );
}
