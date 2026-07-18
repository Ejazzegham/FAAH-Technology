"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export type CategorySlice = { label: string; value: number; pct: string; color: string };

export default function AdminCategoriesDonut({ slices, total }: { slices: CategorySlice[]; total: number }) {
  return (
    <div className="card !p-6">
      <h3 className="font-display text-base font-semibold text-white">Project Categories</h3>

      {total === 0 ? (
        <p className="mt-8 text-center text-xs text-muted">No projects yet.</p>
      ) : (
      <div className="mt-4 flex flex-col items-center gap-6 sm:flex-row">
        <div className="relative h-44 w-44 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={slices}
                dataKey="value"
                nameKey="label"
                innerRadius="65%"
                outerRadius="100%"
                paddingAngle={2}
                stroke="none"
              >
                {slices.map((c) => (
                  <Cell key={c.label} fill={c.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <p className="font-display text-2xl font-bold text-white">{total}</p>
            <p className="text-[11px] text-muted">Total</p>
          </div>
        </div>

        <ul className="min-w-0 flex-1 space-y-2.5">
          {slices.map((c) => (
            <li key={c.label} className="flex items-center justify-between gap-3 text-xs">
              <span className="flex min-w-0 items-center gap-2 text-muted">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: c.color }}
                />
                <span className="truncate">{c.label}</span>
              </span>
              <span className="shrink-0 whitespace-nowrap font-medium text-white">
                {c.value} <span className="text-muted">({c.pct})</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
      )}
    </div>
  );
}
