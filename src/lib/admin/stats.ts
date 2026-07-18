export function pctChange(current: number, previous: number): { label: string; up: boolean } {
  if (previous === 0) {
    return current > 0 ? { label: "New this month", up: true } : { label: "No change", up: true };
  }
  const change = ((current - previous) / previous) * 100;
  const up = change >= 0;
  return { label: `${up ? "+" : ""}${change.toFixed(1)}% from last month`, up };
}

export function startOfMonth(offset: number): number {
  const d = new Date();
  d.setDate(1);
  d.setHours(0, 0, 0, 0);
  d.setMonth(d.getMonth() + offset);
  return d.getTime();
}
