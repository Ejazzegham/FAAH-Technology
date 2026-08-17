"use client";

import Link from "next/link";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function AdminSubscribersChart({
  data,
  total,
  changeLabel,
}: {
  data: { month: string; value: number }[];
  total: number;
  changeLabel: string;
}) {
  return (
    <div className="card !p-6" id="manage-subscribers">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-base font-semibold text-white">Subscribers Overview</h3>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted">Last 12 months</span>
          <Link href="/admin/subscribers" className="text-xs font-semibold text-gold hover:underline">
            View all
          </Link>
        </div>
      </div>

      <p className="mt-4 font-display text-3xl font-bold text-white">{total}</p>
      <p className="text-xs text-muted">Total Subscribers</p>
      <p className="mt-1 flex items-center gap-1 text-[11px] font-medium text-emerald-400">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
        {changeLabel}
      </p>

      <div className="mt-4 h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ left: -20, right: 10 }}>
            <CartesianGrid stroke="#232329" vertical={false} />
            <XAxis dataKey="month" stroke="#9a9aa3" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis stroke="#9a9aa3" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip
              cursor={{ fill: "rgba(20,119,245,0.08)" }}
              contentStyle={{
                background: "#131318",
                border: "1px solid #232329",
                borderRadius: 8,
                fontSize: 12,
              }}
              labelStyle={{ color: "#f3f2ee" }}
            />
            <Bar dataKey="value" fill="#1477f5" radius={[4, 4, 0, 0]} maxBarSize={22} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
