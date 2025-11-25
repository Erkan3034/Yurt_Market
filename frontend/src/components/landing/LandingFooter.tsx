import { Link } from "react-router-dom";

const footerLinks = [
  {
    title: "Platform",
    items: [
      { label: "Özellikler", href: "#features" },
      { label: "Güvenlik", href: "#security" },
      { label: "API", href: "#api" },
    ],
  },
  {
    title: "Kaynaklar",
    items: [
      { label: "Dokümantasyon", href: "#docs" },
      { label: "Destek", href: "#support" },
      { label: "Statü", href: "#status" },
    ],
  },
  {
    title: "Şirket",
    items: [
      { label: "Hakkımızda", href: "#about" },
      { label: "Kariyer", href: "#careers" },
      { label: "Basın", href: "#press" },
    ],
  },
];

export const LandingFooter = () => (
  <footer className="mt-24 border-t border-slate-200 bg-white">
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12 md:flex-row md:items-start md:justify-between">
      <div>
        <p className="text-lg font-semibold text-slate-900">Yurt Market</p>
        <p className="mt-2 max-w-sm text-sm text-slate-500">
          Öğrencilerin kendi yurtlarında satıcılarla buluştuğu, stokların otomatik
          yönetildiği ve siparişlerin dakikalar içinde teslim edildiği Türkiye’nin ilk
          mikro market ağı.
        </p>
        <p className="mt-4 text-xs text-slate-400">© {new Date().getFullYear()} Yurt Market. Tüm hakları saklıdır.</p>
      </div>
      <div className="grid flex-1 gap-8 sm:grid-cols-3">
        {footerLinks.map((group) => (
          <div key={group.title}>
            <p className="text-sm font-semibold text-slate-900">{group.title}</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-500">
              {group.items.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="hover:text-brand-600">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="space-y-3 text-sm text-slate-500">
        <p>Bize ulaşın: hello@yurtmarket.com</p>
        <div className="flex gap-3">
          <Link to="https://github.com/Erkan3034" target="_blank" className="hover:text-brand-600">
            GitHub
          </Link>
          <a href="https://twitter.com" target="_blank" className="hover:text-brand-600">
            Twitter
          </a>
          <a href="https://www.linkedin.com" target="_blank" className="hover:text-brand-600">
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  </footer>
);

