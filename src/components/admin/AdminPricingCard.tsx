"use client";

import { useEffect, useState } from "react";
import { PRICING_GROUPS } from "@/lib/pricing";
import {
  addPricingTier,
  deletePricingTier,
  subscribePricingTiers,
  updatePricingTier,
  type FirestorePricingTier,
} from "@/lib/firestore/pricing";

const inputClass =
  "w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-white placeholder:text-muted focus:border-gold focus:outline-none";

// Real groups + subcategories, straight from the actual /pricing page catalog
// (src/lib/pricing.ts) — so whatever you manage here is guaranteed to be the
// same category shown to visitors, instead of a disconnected list.
const GROUP_OPTIONS = PRICING_GROUPS.map((g) => ({
  groupLabel: g.label,
  subcategories: g.subcategories.map((s) => ({ slug: s.slug, label: s.label })),
}));

const emptyForm = {
  tierName: "",
  price: "",
  priceNote: "One Time",
  badge: "",
  stars: 5,
  features: "",
  cta: "ORDER NOW",
  highlighted: false,
};

export default function AdminPricingCard() {
  const [groupIndex, setGroupIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(
    GROUP_OPTIONS[0]?.subcategories[0]?.slug ?? null
  );
  const [tiers, setTiers] = useState<FirestorePricingTier[]>([]);

  const [showTierForm, setShowTierForm] = useState(false);
  const [editingTier, setEditingTier] = useState<FirestorePricingTier | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [savingTier, setSavingTier] = useState(false);

  useEffect(() => {
    if (!selected) return;
    const unsub = subscribePricingTiers(selected, setTiers);
    return () => unsub?.();
  }, [selected]);

  const currentSubcategories = GROUP_OPTIONS[groupIndex]?.subcategories ?? [];
  const selectedLabel = currentSubcategories.find((s) => s.slug === selected)?.label;

  function startAdd() {
    setEditingTier(null);
    setForm(emptyForm);
    setShowTierForm(true);
  }

  function startEdit(tier: FirestorePricingTier) {
    setEditingTier(tier);
    setForm({
      tierName: tier.name,
      price: tier.price,
      priceNote: tier.priceNote,
      badge: tier.badge ?? "",
      stars: tier.stars,
      features: tier.features.join("\n"),
      cta: tier.cta,
      highlighted: tier.highlighted ?? false,
    });
    setShowTierForm(true);
  }

  async function handleDelete(tier: FirestorePricingTier) {
    if (tier.isDefault) {
      // Not a real document yet — nothing to delete on the server. Just
      // let them know instead of silently failing.
      alert(
        "This is the default tier (not customized yet), so there's nothing to delete. Edit it if you want to change it."
      );
      return;
    }
    if (!confirm(`Delete "${tier.name}"?`)) return;
    try {
      await deletePricingTier(tier.id);
    } catch {
      alert("Couldn't delete this tier. Please try again.");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selected || !form.tierName.trim() || !form.price.trim()) return;
    setSavingTier(true);
    try {
      const input = {
        categorySlug: selected,
        name: form.tierName.trim(),
        price: form.price.trim(),
        priceNote: form.priceNote.trim() || "One Time",
        badge: form.badge.trim() || undefined,
        stars: form.stars,
        features: form.features
          .split("\n")
          .map((f) => f.trim())
          .filter(Boolean),
        cta: form.cta.trim() || "ORDER NOW",
        highlighted: form.highlighted,
      };
      // Editing a default (non-real) tier creates a real one instead of
      // trying to update a document that doesn't exist yet.
      if (editingTier && !editingTier.isDefault) {
        await updatePricingTier(editingTier.id, input);
      } else {
        await addPricingTier(input);
      }
      setShowTierForm(false);
      setEditingTier(null);
      setForm(emptyForm);
    } catch {
      alert("Couldn't save this tier. Please try again.");
    } finally {
      setSavingTier(false);
    }
  }

  return (
    <div className="card !p-6 sm:!p-8" id="manage-pricing">
      <h2 className="text-center font-display text-xl font-semibold text-white sm:text-2xl">
        Manage <span className="text-gold">Pricing Packages</span>
      </h2>
      <p className="mt-1 text-center text-xs text-muted">
        Pick one of the real service categories from the Pricing page, then add or edit tiers for
        it. Categories left untouched keep showing their default pricing — nothing breaks if you
        don&apos;t manage every one.
      </p>

      <div className="mx-auto mt-6 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted">Service Group</label>
          <select
            value={groupIndex}
            onChange={(e) => {
              const idx = Number(e.target.value);
              setGroupIndex(idx);
              setSelected(GROUP_OPTIONS[idx]?.subcategories[0]?.slug ?? null);
              setShowTierForm(false);
              setEditingTier(null);
            }}
            className={inputClass}
          >
            {GROUP_OPTIONS.map((g, i) => (
              <option key={g.groupLabel} value={i}>
                {g.groupLabel}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted">Category</label>
          <select
            value={selected ?? ""}
            onChange={(e) => {
              setSelected(e.target.value);
              setShowTierForm(false);
              setEditingTier(null);
            }}
            className={inputClass}
          >
            {currentSubcategories.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selected && (
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-white">
              Tiers for <span className="text-gold">{selectedLabel}</span>
            </p>
            <button
              onClick={() => (showTierForm ? setShowTierForm(false) : startAdd())}
              className="text-xs font-semibold text-gold hover:underline"
            >
              {showTierForm ? "Cancel" : "+ Add Tier"}
            </button>
          </div>

          {showTierForm && (
            <form onSubmit={handleSubmit} className="mt-4 grid grid-cols-1 gap-3 rounded-lg border border-line p-4 sm:grid-cols-2">
              <p className="text-xs font-semibold text-gold sm:col-span-2">
                {editingTier ? `Editing "${editingTier.name}"` : "New Tier"}
              </p>
              <input type="text" required placeholder="Tier name (e.g. Starter)" value={form.tierName} onChange={(e) => setForm({ ...form, tierName: e.target.value })} className={inputClass} />
              <input type="text" required placeholder="Price (e.g. $25 or Custom)" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className={inputClass} />
              <input type="text" placeholder="Price note (e.g. One Time)" value={form.priceNote} onChange={(e) => setForm({ ...form, priceNote: e.target.value })} className={inputClass} />
              <input type="text" placeholder="Badge (optional, e.g. MOST POPULAR)" value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} className={inputClass} />
              <select value={form.stars} onChange={(e) => setForm({ ...form, stars: Number(e.target.value) })} className={inputClass}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n} star{n > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
              <input type="text" placeholder="Button text (e.g. ORDER NOW)" value={form.cta} onChange={(e) => setForm({ ...form, cta: e.target.value })} className={inputClass} />
              <textarea
                rows={4}
                placeholder={"Features, one per line"}
                value={form.features}
                onChange={(e) => setForm({ ...form, features: e.target.value })}
                className={`${inputClass} sm:col-span-2`}
              />
              <label className="flex items-center gap-2 text-xs text-muted sm:col-span-2">
                <input type="checkbox" checked={form.highlighted} onChange={(e) => setForm({ ...form, highlighted: e.target.checked })} className="h-4 w-4 rounded border-line accent-gold" />
                Highlight this tier (gold border)
              </label>
              <button type="submit" disabled={savingTier} className="btn-primary justify-center disabled:opacity-60 sm:col-span-2">
                {savingTier ? "Saving…" : editingTier ? "Save Changes" : "Save Tier"}
              </button>
            </form>
          )}

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {tiers.map((t) => (
              <div key={t.id} className="rounded-lg border border-line p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {t.name}
                      {t.isDefault && (
                        <span className="ml-1.5 rounded-full bg-white/10 px-1.5 py-0.5 text-[9px] font-normal text-muted">
                          default
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-gold">
                      {t.price} <span className="text-muted">· {t.priceNote}</span>
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button aria-label="Edit" onClick={() => startEdit(t)} className="text-muted hover:text-gold">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
                      </svg>
                    </button>
                    <button aria-label="Delete" onClick={() => handleDelete(t)} className="text-muted hover:text-rose-400">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0l-1 14a2 2 0 01-2 2H7a2 2 0 01-2-2L4 6h16z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <ul className="mt-2 space-y-1 text-[11px] text-muted">
                  {t.features.slice(0, 4).map((f) => (
                    <li key={f}>• {f}</li>
                  ))}
                  {t.features.length > 4 && <li>+{t.features.length - 4} more</li>}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
