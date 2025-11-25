const plans = [
  {
    name: "Başlangıç",
    price: "0 ₺",
    description: "Her satıcı için 3 ürüne kadar ücretsiz.",
    perks: ["Sipariş bildirimi", "Temel stok uyarıları", "7/24 e-posta desteği"],
  },
  {
    name: "Pro Satıcı",
    price: "199 ₺ / ay",
    highlight: true,
    description: "Limitsiz ürün, gelişmiş analitik ve müşteri takibi.",
    perks: [
      "Limitsiz ürün & kategori",
      "Satıcı analitiği + trend raporları",
      "Öncelikli destek & eğitim",
      "Anlık abonelik hatırlatıcıları",
    ],
  },
  {
    name: "Enterprise",
    price: "Bize ulaşın",
    description: "Çoklu yurt ve franchise kurguları için.",
    perks: ["Çoklu yurt yönetimi", "Webhook & API erişimi", "SLA'li destek"],
  },
];

export const PricingSection = () => (
  <section id="pricing" className="mx-auto max-w-6xl px-4">
    <div className="mb-10 text-center">
      <p className="text-sm font-semibold uppercase text-brand-600">Planlar</p>
      <h2 className="mt-2 text-3xl font-bold text-slate-900">
        Satışa başlamak için abonelik şart değil
      </h2>
      <p className="mt-2 text-sm text-slate-500">3 ürüne kadar tamamen ücretsiz, sonrası için Pro plan.</p>
    </div>
    <div className="grid gap-6 md:grid-cols-3">
      {plans.map((plan) => (
        <div
          key={plan.name}
          className={`rounded-3xl border p-6 ${
            plan.highlight
              ? "border-brand-200 bg-white shadow-2xl shadow-brand-100"
              : "border-slate-200 bg-white"
          }`}
        >
          <p className="text-sm font-semibold text-brand-600">{plan.name}</p>
          <p className="mt-4 text-3xl font-bold text-slate-900">{plan.price}</p>
          <p className="mt-2 text-sm text-slate-500">{plan.description}</p>
          <ul className="mt-6 space-y-2 text-sm text-slate-600">
            {plan.perks.map((perk) => (
              <li key={perk} className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-brand-500" />
                {perk}
              </li>
            ))}
          </ul>
          <button
            className={`mt-6 w-full rounded-full px-4 py-2 text-sm font-semibold ${
              plan.highlight ? "bg-brand-600 text-white" : "border border-slate-200 text-slate-700"
            }`}
          >
            {plan.highlight ? "Aboneliği başlat" : "Detaylı bilgi"}
          </button>
        </div>
      ))}
    </div>
  </section>
);

