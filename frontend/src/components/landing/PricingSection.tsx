import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "../ui/Modal";

const plans = [
  {
    id: "free",
    name: "Başlangıç",
    price: "0 ₺",
    description: "Her satıcı için 3 ürüne kadar ücretsiz.",
    perks: ["Sipariş bildirimi", "Temel stok uyarıları", "7/24 e-posta desteği"],
  },
  {
    id: "pro",
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
    id: "enterprise",
    name: "Enterprise",
    price: "Bize ulaşın",
    description: "Çoklu yurt ve franchise kurguları için.",
    perks: ["Çoklu yurt yönetimi", "Webhook & API erişimi", "SLA'li destek"],
  },
];

export const PricingSection = () => {
  const navigate = useNavigate();
  const [showPlansModal, setShowPlansModal] = useState(false);

  const handleStartAsSeller = () => {
    setShowPlansModal(true);
  };

  const handleSelectPlan = (planId: string) => {
    setShowPlansModal(false);
    // Kayıt sayfasına yönlendir, plan bilgisini query param olarak gönder
    navigate(`/auth/register?role=seller&plan=${planId}`);
  };

  return (
    <>
      <section id="pricing" className="mx-auto max-w-6xl px-4">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase text-brand-600">Planlar</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            Satışa başlamak için abonelik şart değil
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            3 ürüne kadar tamamen ücretsiz, sonrası için Pro plan.
          </p>
        </div>

        {/* MAĞAZA AÇ Butonu */}
        <div className="mb-8 text-center">
          <button
            onClick={handleStartAsSeller}
            className="rounded-full bg-brand-600 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-brand-500/30 hover:bg-brand-700 transition-colors"
          >
            MAĞAZA AÇ
          </button>
          <p className="mt-3 text-sm text-slate-500">
            Ücretsiz başla, 3 ürüne kadar sınırsız satış yap
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
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
                onClick={() => handleSelectPlan(plan.id)}
                className={`mt-6 w-full rounded-full px-4 py-2 text-sm font-semibold ${
                  plan.highlight
                    ? "bg-brand-600 text-white hover:bg-brand-700"
                    : "border border-slate-200 text-slate-700 hover:bg-slate-50"
                } transition-colors`}
              >
                {plan.highlight ? "Aboneliği başlat" : "Detaylı bilgi"}
              </button>
            </div>
          ))}
        </div>

        {/* Mağaza Açmak İsteyenler İçin Bilgi */}
        <div className="mt-12 rounded-3xl border border-brand-100 bg-brand-50/50 p-8 text-center">
          <h3 className="text-xl font-bold text-slate-900">Mağaza Açmak İster misin?</h3>
          <p className="mt-3 text-sm text-slate-600">
            Yurt Market'te satış yapmak çok kolay! Ücretsiz başla, ilk 3 ürününü ekle ve satışa başla.
            Daha fazla ürün eklemek istersen Pro plana geçebilirsin.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-brand-500" />
              <span>Ücretsiz kayıt</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-brand-500" />
              <span>3 ürüne kadar sınırsız</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-brand-500" />
              <span>Hızlı ödeme al</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-brand-500" />
              <span>7/24 destek</span>
            </div>
          </div>
          <button
            onClick={handleStartAsSeller}
            className="mt-6 rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 transition-colors"
          >
            Hemen Başla
          </button>
        </div>
      </section>

      {/* Planlar Modal */}
      <Modal
        isOpen={showPlansModal}
        onClose={() => setShowPlansModal(false)}
        title="Mağaza Planları"
      >
        <div className="space-y-4">
          <p className="text-slate-700">
            Mağaza açmak için kayıt olmak için bir plan seç. İstersen ücretsiz başlayıp sonra yükseltebilirsin.
          </p>
          <div className="space-y-3">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-2xl border p-4 ${
                  plan.highlight ? "border-brand-300 bg-brand-50" : "border-slate-200 bg-white"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900">{plan.name}</p>
                    <p className="text-sm text-slate-600">{plan.price}</p>
                    <p className="mt-1 text-xs text-slate-500">{plan.description}</p>
                  </div>
                  <button
                    onClick={() => handleSelectPlan(plan.id)}
                    className={`ml-4 rounded-full px-4 py-2 text-xs font-semibold ${
                      plan.highlight
                        ? "bg-brand-600 text-white hover:bg-brand-700"
                        : "border border-slate-300 text-slate-700 hover:bg-slate-50"
                    } transition-colors`}
                  >
                    Seç
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => setShowPlansModal(false)}
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            İptal
          </button>
        </div>
      </Modal>
    </>
  );
};
