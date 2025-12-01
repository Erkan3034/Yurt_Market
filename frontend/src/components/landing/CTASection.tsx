import { Link } from "react-router-dom";

export const CTASection = () => (
  <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
    <div className="rounded-3xl bg-brand-100 px-8 py-12 lg:px-16">
      <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
        <div className="text-center lg:text-left">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Binlerce Öğrenciye Katıl!</h2>
          <p className="mt-3 text-base text-slate-600">
            Yurt hayatını kolaylaştıran pazar yerine hemen kaydol, fırsatları kaçırma.
          </p>
        </div>
        <Link
          to="/auth/register"
          className="flex-shrink-0 rounded-full bg-brand-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-brand-500/30 transition-all hover:bg-brand-700 hover:shadow-xl hover:shadow-brand-500/40"
        >
          Hemen Kaydol
        </Link>
      </div>
    </div>
  </section>
);
