import { Truck, ShoppingBag, ShoppingCart } from "lucide-react";

const features = [
  {
    icon: <Truck className="h-8 w-8" />,
    title: "Hızlı Teslimat",
    description: "Siparişlerin dakikalar içinde doğrudan yurdunun kapısına gelsin, derslerini veya keyfini bölme.",
  },
  {
    icon: <ShoppingBag className="h-8 w-8" />,
    title: "Yurda Özel Ürünler",
    description: "Öğrencilerin en çok sevdiği atıştırmalıklar, içecekler ve temel ihtiyaçlar tek bir yerde.",
  },
  {
    icon: <ShoppingCart className="h-8 w-8" />,
    title: "Kolay Sipariş",
    description: "Birkaç dokunuşla istediğin ürünleri sepetine ekle ve siparişini kolayca tamamla.",
  },
];

export const FeatureSection = () => (
  <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
    <div className="mb-12 text-center">
      <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Neden Yurt Market?</h2>
      <p className="mt-4 text-lg text-slate-600">
        Öğrenciler için özel olarak tasarlanmış platformumuzla ihtiyaçlarınıza en hızlı ve kolay şekilde ulaşın.
      </p>
    </div>
    <div className="grid gap-8 md:grid-cols-3">
      {features.map((feature) => (
        <div
          key={feature.title}
          className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm transition-all hover:shadow-lg"
        >
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-100 text-brand-600">
            {feature.icon}
          </div>
          <h3 className="text-xl font-semibold text-slate-900">{feature.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">{feature.description}</p>
        </div>
      ))}
    </div>
  </section>
);
