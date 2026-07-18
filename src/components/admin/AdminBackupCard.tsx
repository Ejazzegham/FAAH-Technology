"use client";

import { useState } from "react";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { getDb, isFirebaseConfigured } from "@/lib/firebase";

const COLLECTIONS = [
  "projects",
  "categories",
  "technologies",
  "services",
  "team",
  "pricingTiers",
  "reviews",
  "clients",
  "messages",
  "subscribers",
  "pages",
  "blogPosts",
  "blogComments",
  "settings",
];

export default function AdminBackupCard() {
  const [exporting, setExporting] = useState(false);
  const [importing, setImporting] = useState(false);
  const [status, setStatus] = useState<{ type: "ok" | "error"; text: string } | null>(null);

  async function handleExport() {
    if (!isFirebaseConfigured) {
      setStatus({ type: "error", text: "Firebase isn't configured, so there's nothing to export yet." });
      return;
    }
    setExporting(true);
    setStatus(null);
    try {
      const db = getDb();
      const data: Record<string, Record<string, unknown>[]> = {};
      for (const name of COLLECTIONS) {
        const snap = await getDocs(collection(db, name));
        data[name] = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      }
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `hz-technology-backup-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      setStatus({ type: "ok", text: "Backup downloaded." });
    } catch {
      setStatus({ type: "error", text: "Couldn't export data. Please try again." });
    } finally {
      setExporting(false);
    }
  }

  async function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!isFirebaseConfigured) {
      setStatus({ type: "error", text: "Firebase isn't configured — can't restore." });
      return;
    }
    if (
      !confirm(
        "This will overwrite existing documents with matching IDs from the backup file. Continue?"
      )
    ) {
      return;
    }
    setImporting(true);
    setStatus(null);
    try {
      const text = await file.text();
      const data = JSON.parse(text) as Record<string, Record<string, unknown>[]>;
      const db = getDb();
      let count = 0;
      for (const [collectionName, docs] of Object.entries(data)) {
        if (!COLLECTIONS.includes(collectionName) || !Array.isArray(docs)) continue;
        for (const docData of docs) {
          const { id, ...rest } = docData as { id?: string };
          if (!id) continue;
          await setDoc(doc(db, collectionName, id), rest);
          count++;
        }
      }
      setStatus({ type: "ok", text: `Restored ${count} document(s) from the backup file.` });
    } catch {
      setStatus({ type: "error", text: "That file couldn't be read — make sure it's a backup exported from here." });
    } finally {
      setImporting(false);
    }
  }

  return (
    <div className="card !p-6 sm:!p-8" id="manage-backup">
      <h2 className="text-center font-display text-xl font-semibold text-white sm:text-2xl">
        Backup <span className="text-gold">& Restore</span>
      </h2>
      <p className="mt-1 text-center text-xs text-muted">
        Download everything (portfolio, services, team, pricing, reviews, clients, messages,
        subscribers, pages, blog, settings) as one JSON file, or restore from a previous backup.
      </p>

      <div className="mx-auto mt-6 flex max-w-md flex-col gap-4">
        <button onClick={handleExport} disabled={exporting} className="btn-primary justify-center disabled:opacity-60">
          {exporting ? "Preparing backup…" : "Download Full Backup (.json)"}
        </button>

        <label className="btn-outline cursor-pointer justify-center">
          {importing ? "Restoring…" : "Restore From Backup File"}
          <input type="file" accept="application/json" onChange={handleImport} disabled={importing} className="hidden" />
        </label>

        {status && (
          <p className={`text-center text-xs ${status.type === "ok" ? "text-emerald-400" : "text-rose-400"}`}>
            {status.text}
          </p>
        )}

        <p className="text-center text-[11px] text-muted">
          Tip: download a backup before making big changes, and keep a copy somewhere safe (e.g.
          Google Drive) — this file is not stored anywhere else automatically.
        </p>
      </div>
    </div>
  );
}
