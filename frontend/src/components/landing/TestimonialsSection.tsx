const testimonials = [
  {
    quote:
      "Satıcı panelindeki otomatik stok düşme özelliği sayesinde sipariş iptalleri %40 azaldı.",
    author: "Deniz K.",
    title: "Yurt B gece kantini",
  },
  {
    quote:
      "Öğrenciler yalnızca kendi yurtlarını görebildiği için lojistik planlamamız çok daha net.",
    author: "İlayda A.",
    title: "KampüsX sosyal tesisler",
  },
  {
    quote: "Analitik raporlar hangi ürünün hangi saatlerde satıldığını net gösteriyor.",
    author: "Yusuf D.",
    title: "Studio Coffee Truck",
  },
];

export const TestimonialsSection = () => (
  <section id="testimonials" className="mx-auto max-w-6xl px-4">
    <div className="grid gap-6 md:grid-cols-3">
      {testimonials.map((item) => (
        <div key={item.author} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-lg font-semibold text-slate-900">“{item.quote}”</p>
          <p className="mt-6 text-sm font-semibold text-slate-700">{item.author}</p>
          <p className="text-xs uppercase tracking-wide text-slate-400">{item.title}</p>
        </div>
      ))}
    </div>
  </section>
);

