import { useQuery } from "@tanstack/react-query";
import { fetchPopularSellers } from "../../services/analytics";
import { authStore } from "../../store/auth";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar } from "recharts";

export const AnalyticsPage = () => {
  const dormId = authStore((state) => state.user?.dorm_id ?? 1);
  const { data, isLoading } = useQuery({
    queryKey: ["analytics-popular", dormId],
    queryFn: () => fetchPopularSellers(dormId),
  });

  if (isLoading) return <p>Analitik veriler yükleniyor...</p>;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Popüler satıcı sıralaması</h2>
        <p className="text-sm text-slate-500">Son 30 gün.</p>
        <div className="mt-6 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data ?? []}>
              <XAxis dataKey="seller_id" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="score" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Kısa notlar</h2>
        <ul className="mt-4 space-y-3 text-sm text-slate-600">
          <li>• Onaylanan siparişler analytics'e otomatik işlenir.</li>
          <li>• Popüler satıcı listesi Celery worker ile arka planda yenilenir.</li>
          <li>• Satıcı skorları toplam ciroya göre hesaplanır.</li>
        </ul>
      </div>
    </div>
  );
};

