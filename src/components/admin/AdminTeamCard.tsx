"use client";

import { useEffect, useState } from "react";
import {
  addTeamMember,
  deleteTeamMember,
  subscribeTeam,
  updateTeamMember,
  type TeamMember,
} from "@/lib/firestore/team";

function EditForm({
  initial,
  saving,
  onCancel,
  onSave,
}: {
  initial: { name: string; role: string; imageUrl: string };
  saving: boolean;
  onCancel: () => void;
  onSave: (v: { name: string; role: string; imageUrl: string }) => void;
}) {
  const [name, setName] = useState(initial.name);
  const [role, setRole] = useState(initial.role);
  const [imageUrl, setImageUrl] = useState(initial.imageUrl);

  return (
    <div className="space-y-2 text-left">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Full name"
        className="w-full rounded-md border border-line bg-bg px-2 py-1.5 text-xs text-white placeholder:text-muted focus:border-gold focus:outline-none"
      />
      <input
        type="text"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        placeholder="Role"
        className="w-full rounded-md border border-line bg-bg px-2 py-1.5 text-xs text-white placeholder:text-muted focus:border-gold focus:outline-none"
      />
      <input
        type="text"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="Image URL (optional)"
        className="w-full rounded-md border border-line bg-bg px-2 py-1.5 text-xs text-white placeholder:text-muted focus:border-gold focus:outline-none"
      />
      <div className="flex justify-center gap-2 pt-1">
        <button
          type="button"
          disabled={saving}
          onClick={() => onSave({ name: name.trim(), role: role.trim(), imageUrl: imageUrl.trim() })}
          className="btn-primary !px-3 !py-1.5 text-[11px] disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-line px-3 py-1.5 text-[11px] text-muted hover:text-white"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default function AdminTeamCard() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [savingEdit, setSavingEdit] = useState(false);

  useEffect(() => {
    const unsub = subscribeTeam(setTeam);
    return () => unsub?.();
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !role.trim()) return;
    setSaving(true);
    try {
      await addTeamMember({ name: name.trim(), role: role.trim(), imageUrl: imageUrl.trim() || undefined });
      setName("");
      setRole("");
      setImageUrl("");
    } catch {
      // ignore
    } finally {
      setSaving(false);
    }
  }

  async function handleSaveEdit(id: string, v: { name: string; role: string; imageUrl: string }) {
    if (!v.name || !v.role) return;
    setSavingEdit(true);
    try {
      await updateTeamMember(id, v);
      setEditingId(null);
    } catch {
      // ignore
    } finally {
      setSavingEdit(false);
    }
  }

  return (
    <div className="card !p-6 sm:!p-8" id="manage-team">
      <h2 className="text-center font-display text-xl font-semibold text-white sm:text-2xl">
        Manage <span className="text-gold">Team Members</span>
      </h2>
      <p className="mt-1 text-center text-xs text-muted">
        Shown on the About page. Add a photo URL (e.g. /team/founder-portrait.png) or leave blank for an
        initial avatar.
      </p>

      <form onSubmit={handleAdd} className="mt-6 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          required
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-white placeholder:text-muted focus:border-gold focus:outline-none sm:flex-1"
        />
        <input
          type="text"
          required
          placeholder="Role (e.g. Lead Developer)"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-white placeholder:text-muted focus:border-gold focus:outline-none sm:flex-1"
        />
        <input
          type="text"
          placeholder="Image URL (optional)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-white placeholder:text-muted focus:border-gold focus:outline-none sm:flex-1"
        />
        <button type="submit" disabled={saving} className="btn-primary shrink-0 justify-center disabled:opacity-60">
          {saving ? "Saving…" : "Add"}
        </button>
      </form>

      <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {team.map((member) => (
          <li key={member.id} className="rounded-lg border border-line p-4 text-center">
            {editingId === member.id ? (
              <EditForm
                initial={{ name: member.name, role: member.role, imageUrl: member.imageUrl ?? "" }}
                saving={savingEdit}
                onCancel={() => setEditingId(null)}
                onSave={(v) => handleSaveEdit(member.id, v)}
              />
            ) : (
              <>
                <div className="mx-auto flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-gold-gradient font-display text-lg font-bold text-bg">
                  {member.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={member.imageUrl} alt={member.name} className="h-full w-full object-cover object-top" />
                  ) : (
                    member.name.charAt(0)
                  )}
                </div>
                <p className="mt-2 text-xs font-semibold text-gold">{member.name}</p>
                <p className="text-[11px] text-muted">{member.role}</p>
                <div className="mt-2 flex justify-center gap-3">
                  <button
                    onClick={() => setEditingId(member.id)}
                    className="text-[11px] text-muted hover:text-gold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTeamMember(member.id)}
                    className="text-[11px] text-muted hover:text-rose-400"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
