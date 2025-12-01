import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative mt-16 min-h-[600px] flex items-center justify-start bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background Image Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-20 lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Yurt Hayatını Kolaylaştıran Pazar Yerin
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-white/90 sm:text-xl">
            Atıştırmalık, içecek ve tüm ihtiyaçların anında kapında. Yurt Market ile yurt yaşamını daha keyifli hale getir.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/app/explore"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-brand-500/30 transition-all hover:bg-brand-700 hover:shadow-xl hover:shadow-brand-500/40"
            >
              <ShoppingBag className="h-5 w-5" />
              Hemen Keşfet
            </Link>
            <Link
              to="/auth/register?role=seller"
              className="inline-flex items-center justify-center rounded-full border-2 border-white bg-transparent px-8 py-4 text-base font-semibold text-white transition-all hover:bg-white/10"
            >
              Satıcı Ol
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
