"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export type TrendPoint = { day: string; value: number };

export default function AdminPerformanceChart({ data }: { data: TrendPoint[] }) {
  return (
    <div className="card !p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-base font-semibold text-white">Projects Added</h3>
        <span className="text-xs text-muted">Last 30 days</span>
      </div>

      <div className="mt-6 h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ left: -20, right: 10 }}>
            <defs>
              <linearGradient id="perfGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#d4a24e" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#d4a24e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#232329" vertical={false} />
            <XAxis dataKey="day" stroke="#9a9aa3" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} interval={4} />
            <YAxis stroke="#9a9aa3" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
            <Tooltip
              contentStyle={{
                background: "#131318",
                border: "1px solid #232329",
                borderRadius: 8,
                fontSize: 12,
              }}
              labelStyle={{ color: "#f3f2ee" }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#d4a24e"
              strokeWidth={2}
              fill="url(#perfGradient)"
              dot={false}
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
