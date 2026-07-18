"use client";

import { useEffect, useState } from "react";
import { DEFAULT_SETTINGS, subscribeSettings, updateSettings, type SiteSettings } from "@/lib/firestore/settings";

const inputClass =
  "w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-white placeholder:text-muted focus:border-gold focus:outline-none";

const SOCIAL_FIELDS: { key: keyof SiteSettings["social"]; label: string; placeholder: string }[] = [
  { key: "linkedin", label: "LinkedIn", placeholder: "https://linkedin.com/company/…" },
  { key: "facebook", label: "Facebook", placeholder: "https://facebook.com/…" },
  { key: "instagram", label: "Instagram", placeholder: "https://instagram.com/…" },
  { key: "twitter", label: "X (Twitter)", placeholder: "https://x.com/…" },
  { key: "behance", label: "Behance", placeholder: "https://behance.net/…" },
  { key: "dribbble", label: "Dribbble", placeholder: "https://dribbble.com/…" },
  { key: "github", label: "GitHub", placeholder: "https://github.com/…" },
  { key: "youtube", label: "YouTube", placeholder: "https://youtube.com/@…" },
];

export default function AdminSettingsCard() {
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
      await updateSettings({
        contactEmail: settings.contactEmail,
        contactPhone: settings.contactPhone,
        whatsappNumber: settings.whatsappNumber,
        whatsappMessage: settings.whatsappMessage,
        address: settings.address,
        workingHours: settings.workingHours,
        social: settings.social,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch {
      alert("Couldn't save settings. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="card !p-6 sm:!p-8" id="manage-settings">
      <h2 className="text-center font-display text-xl font-semibold text-white sm:text-2xl">
        General <span className="text-gold">Settings</span>
      </h2>
      <p className="mt-1 text-center text-xs text-muted">
        Contact details, WhatsApp number, and social links used across the site (footer, contact
        page, the WhatsApp button).
      </p>

      <form onSubmit={handleSubmit} className="mx-auto mt-6 max-w-2xl space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted">Contact Email</label>
            <input
              type="email"
              value={settings.contactEmail}
              onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted">Contact Phone (display)</label>
            <input
              type="text"
              value={settings.contactPhone}
              onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted">
              WhatsApp Number (digits only, with country code, no +)
            </label>
            <input
              type="text"
              placeholder="923455163857"
              value={settings.whatsappNumber}
              onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value.replace(/[^0-9]/g, "") })}
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted">Default WhatsApp Message</label>
            <input
              type="text"
              value={settings.whatsappMessage}
              onChange={(e) => setSettings({ ...settings, whatsappMessage: e.target.value })}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted">Address</label>
          <input
            type="text"
            value={settings.address}
            onChange={(e) => setSettings({ ...settings, address: e.target.value })}
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted">Working Hours</label>
          <textarea
            rows={3}
            value={settings.workingHours}
            onChange={(e) => setSettings({ ...settings, workingHours: e.target.value })}
            className={inputClass}
          />
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold tracking-wide text-gold">SOCIAL LINKS</p>
          <p className="mb-3 text-[11px] text-muted">
            Leave blank to hide that icon from the site footer.
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {SOCIAL_FIELDS.map((f) => (
              <div key={f.key}>
                <label className="mb-1.5 block text-xs font-medium text-muted">{f.label}</label>
                <input
                  type="text"
                  placeholder={f.placeholder}
                  value={settings.social[f.key]}
                  onChange={(e) =>
                    setSettings({ ...settings, social: { ...settings.social, [f.key]: e.target.value } })
                  }
                  className={inputClass}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button type="submit" disabled={saving} className="btn-primary justify-center disabled:opacity-60">
            {saving ? "Saving…" : "Save Settings"}
          </button>
          {saved && <span className="text-xs text-emerald-400">Saved!</span>}
        </div>
      </form>
    </div>
  );
}
