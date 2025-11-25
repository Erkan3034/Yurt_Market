import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const HeroSection = () => (
  <section className="mx-auto flex max-w-6xl flex-col items-center gap-12 px-4 pt-12 text-center md:flex-row md:text-left">
    <div className="flex-1 space-y-6">
      <motion.p
        className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1 text-sm font-medium text-brand-600"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        Kampüs içi lojistik <span className="text-xs text-brand-400">Yeni</span>
      </motion.p>
      <motion.h1
        className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        Aynı yurttaki satıcılardan <span className="text-brand-600">dakikalar içinde</span> atıştırmalık al.
      </motion.h1>
      <motion.p
        className="max-w-xl text-lg text-slate-600"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        Yurt Market, öğrencilerin yalnızca kendi yurtlarında listelenen satıcıları görmesini sağlar,
        stokları otomatik yönetir, siparişleri tek panelden takip eder.
      </motion.p>
      <motion.div
        className="flex flex-col gap-3 text-sm text-slate-600 sm:flex-row"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <Link
          to="/auth/register"
          className="rounded-full bg-brand-600 px-6 py-3 text-center font-semibold text-white shadow-lg shadow-brand-500/30"
        >
          Hemen kayıt ol
        </Link>
        <a
          href="#pricing"
          className="rounded-full border border-slate-200 px-6 py-3 text-center font-semibold text-slate-700"
        >
          Satıcı planlarını incele
        </a>
      </motion.div>
      <motion.div
        className="flex flex-wrap items-center gap-6 text-left text-sm text-slate-500"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <p className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
          24/7 destek
        </p>
        <p className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
          Komisyonsuz satış
        </p>
        <p className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
          Cari takip & kargo gerektirmez
        </p>
      </motion.div>
    </div>
    <motion.div
      className="flex flex-1 flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl shadow-brand-100/80"
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 }}
    >
      <p className="text-sm font-semibold text-slate-500">Gerçek zamanlı sipariş akışı</p>
      <div className="space-y-4">
        {["KampüsX Snack Bar", "Yurt B Gece Kantini", "Stüdyo Kahve"].map((vendor, idx) => (
          <div
            key={vendor}
            className="rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3 text-left text-sm"
          >
            <p className="font-semibold text-slate-800">{vendor}</p>
            <p className="text-slate-500">Yeni sipariş • {15 - idx * 3} dk</p>
          </div>
        ))}
      </div>
      <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white px-4 py-3 text-left text-sm text-emerald-700">
        Stok seviyesi kritik seviyeye ulaşan ürünler otomatik olarak satıcı panelinde vurgulanır.
      </div>
    </motion.div>
  </section>
);

