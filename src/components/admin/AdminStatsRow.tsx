const ICONS: Record<string, JSX.Element> = {
  briefcase: <path d="M3 7h18v13H3zM8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />,
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M2 20c0-3.3 3.1-6 7-6s7 2.7 7 6M16 8a3 3 0 110-6M22 20c0-2.7-2-5-5-5.8" />
    </>
  ),
  star: <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.1 6.5L12 17.4l-5.8 3.1 1.1-6.5L2.5 9.4l6.6-.9L12 2.5z" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </>
  ),
  userPlus: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M2 20c0-3.3 3.1-6 7-6s7 2.7 7 6" />
      <path d="M19 8v6M22 11h-6" />
    </>
  ),
};

export type Stat = {
  label: string;
  value: string;
  change: string;
  up: boolean;
  icon: keyof typeof ICONS;
};

export default function AdminStatsRow({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {stats.map((stat) => (
        <div key={stat.label} className="card !p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-muted">{stat.label}</p>
              <p className="mt-2 font-display text-2xl font-bold text-white">{stat.value}</p>
            </div>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gold/40 text-gold">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {ICONS[stat.icon]}
              </svg>
            </span>
          </div>
          <p className={`mt-3 flex items-center gap-1 text-[11px] font-medium ${stat.up ? "text-emerald-400" : "text-rose-400"}`}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              {stat.up ? <path d="M12 19V5M5 12l7-7 7 7" /> : <path d="M12 5v14M5 12l7 7 7-7" />}
            </svg>
            {stat.change} from last month
          </p>
        </div>
      ))}
    </div>
  );
}
