"use client";

import { useEffect, useState } from "react";
import {
  addService,
  deleteService,
  subscribeServices,
  SERVICE_ICON_OPTIONS,
  type Service,
} from "@/lib/firestore/services";

export default function AdminServicesCard() {
  const [services, setServices] = useState<Service[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState<string>(SERVICE_ICON_OPTIONS[0]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const unsub = subscribeServices(setServices);
    return () => unsub?.();
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    setSaving(true);
    try {
      await addService({ title: title.trim(), description: description.trim(), icon });
      setTitle("");
      setDescription("");
    } catch {
      // ignore
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="card !p-6 sm:!p-8" id="manage-services">
      <h2 className="text-center font-display text-xl font-semibold text-white sm:text-2xl">
        Manage <span className="text-gold">Services</span>
      </h2>
      <p className="mt-1 text-center text-xs text-muted">
        Shown in &quot;What We Do&quot; on the homepage and About page.
      </p>

      <form onSubmit={handleAdd} className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <input
          type="text"
          required
          placeholder="Service title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-white placeholder:text-muted focus:border-gold focus:outline-none"
        />
        <select
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
          className="w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-white focus:border-gold focus:outline-none"
        >
          {SERVICE_ICON_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <textarea
          required
          rows={2}
          placeholder="Short description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-white placeholder:text-muted focus:border-gold focus:outline-none sm:col-span-2"
        />
        <button
          type="submit"
          disabled={saving}
          className="btn-primary justify-center disabled:opacity-60 sm:col-span-2"
        >
          {saving ? "Saving…" : "Add Service"}
        </button>
      </form>

      <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <li key={s.id} className="rounded-lg border border-line p-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-gold">{s.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted">{s.description}</p>
              </div>
              <button
                aria-label="Delete"
                onClick={() => deleteService(s.id)}
                className="shrink-0 text-muted hover:text-rose-400"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0l-1 14a2 2 0 01-2 2H7a2 2 0 01-2-2L4 6h16z" />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
