import { Link } from "react-router-dom";

export const CTASection = () => (
  <section className="mx-auto max-w-5xl rounded-3xl bg-slate-900 px-6 py-12 text-center text-white shadow-2xl">
    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-200">
      7 gün ücretsiz deneyin
    </p>
    <h2 className="mt-4 text-3xl font-bold">
      Yurt Market'i hemen devreye alın, öğrencilerinizin sipariş deneyimini iyileştirin.
    </h2>
    <p className="mt-3 text-sm text-slate-300">
      Kurulum yalnızca 1 saat sürer. Lojistik entegrasyon gerektirmez.
    </p>
    <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
      <Link
        to="/auth/register"
        className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900"
      >
        Satıcı olarak başla
      </Link>
      <a
        href="mailto:turguterkan55@gmail.com"
        className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white"
      >
        Demo iste
      </a>
    </div>
  </section>
);

