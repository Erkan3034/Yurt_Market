import { motion } from "framer-motion";
import { TrendingUp, BellRing, ShieldCheck, Smartphone } from "lucide-react";

const features = [
  {
    icon: <BellRing className="h-5 w-5" />,
    title: "Akıllı bildirimler",
    description: "Sipariş, stok ve abonelik durumları eş zamanlı e-posta bildirimlerine dönüşür.",
  },
  {
    icon: <TrendingUp className="h-5 w-5" />,
    title: "Satıcı analitiği",
    description: "Son 30 günlük satış trendleri ve popüler ürün raporları otomatik hazırlanır.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Rol bazlı erişim",
    description: "Öğrenciler yalnızca kendi yurtlarındaki satıcıları görür, satıcı paneli gizli kalır.",
  },
  {
    icon: <Smartphone className="h-5 w-5" />,
    title: "PWA deneyimi",
    description: "Öğrenciler ana ekrana ekleyip native uygulama gibi hızlı sipariş deneyimi yaşar.",
  },
];

export const FeatureSection = () => (
  <section id="features" className="mx-auto max-w-6xl px-4">
    <div className="grid gap-8 rounded-3xl bg-white p-8 shadow-xl md:grid-cols-2">
      {features.map((feature, index) => (
        <motion.div
          key={feature.title}
          className="rounded-2xl border border-slate-100 p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-brand-50 p-3 text-brand-600">
            {feature.icon}
          </div>
          <p className="text-lg font-semibold text-slate-900">{feature.title}</p>
          <p className="mt-2 text-sm text-slate-500">{feature.description}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

