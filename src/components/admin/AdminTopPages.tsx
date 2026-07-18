import { TOP_PAGES } from "@/lib/admin-data";

export default function AdminTopPages() {
  return (
    <div className="card !p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-base font-semibold text-white">Top Pages by Views</h3>
        <a href="#" className="text-xs font-semibold text-gold hover:underline">
          View All
        </a>
      </div>

      <table className="mt-5 w-full text-left text-xs">
        <thead>
          <tr className="border-b border-line text-muted">
            <th className="pb-3 pr-3 font-medium">#</th>
            <th className="pb-3 pr-3 font-medium">Page Name</th>
            <th className="pb-3 font-medium">Views</th>
          </tr>
        </thead>
        <tbody>
          {TOP_PAGES.map((p) => (
            <tr key={p.id} className="border-b border-line/60 last:border-0">
              <td className="py-3 pr-3 text-muted">{p.id}</td>
              <td className="py-3 pr-3 font-medium text-white">{p.page}</td>
              <td className="py-3 text-gold">{p.views}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
