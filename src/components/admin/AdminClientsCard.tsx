"use client";

import { useState } from "react";
import { addClient, deleteClient, type Client } from "@/lib/firestore/clients";

export default function AdminClientsCard({ clients }: { clients: Client[] }) {
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setSaving(true);
    try {
      await addClient(name.trim());
      setName("");
    } catch {
      // ignore
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="card !p-6" id="manage-clients">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-base font-semibold text-white">Clients</h3>
        <span className="text-xs text-muted">{clients.length} total</span>
      </div>

      <form onSubmit={handleAdd} className="mt-4 flex gap-2">
        <input
          type="text"
          placeholder="Add a client name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-md border border-line bg-bg px-3 py-2 text-xs text-white placeholder:text-muted focus:border-gold focus:outline-none"
        />
        <button type="submit" disabled={saving} className="btn-primary shrink-0 !px-4 !py-2 !text-xs disabled:opacity-60">
          Add
        </button>
      </form>

      {clients.length === 0 ? (
        <p className="mt-6 text-center text-xs text-muted">No clients added yet.</p>
      ) : (
        <ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {clients.map((c) => (
            <li
              key={c.id}
              className="flex items-center justify-between rounded-md border border-line px-3 py-2 text-xs text-white"
            >
              {c.name}
              <button aria-label="Delete" onClick={() => deleteClient(c.id)} className="text-muted hover:text-rose-400">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0l-1 14a2 2 0 01-2 2H7a2 2 0 01-2-2L4 6h16z" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
