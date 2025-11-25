import { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authStore } from "../../store/auth";
import { Menu } from "lucide-react";
import { useState } from "react";

const links = [
  { href: "#features", label: "Özellikler" },
  { href: "#products", label: "Öne çıkanlar" },
  { href: "#pricing", label: "Planlar" },
  { href: "#faq", label: "SSS" },
];

export const LandingNavbar = () => {
  const navigate = useNavigate();
  const { user, logout } = authStore();
  const [open, setOpen] = useState(false);

  const cta = useMemo(() => {
    if (!user) {
      return { label: "Giriş Yap", action: () => navigate("/auth/login") };
    }
    if (user.role === "seller") {
      return { label: "Satıcı Paneli", action: () => navigate("/seller/products") };
    }
    return { label: "Sipariş Ver", action: () => navigate("/app/explore") };
  }, [user, navigate]);

  return (
    <header className="fixed inset-x-0 top-0 z-20 border-b border-slate-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-brand-100 p-2 text-brand-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zm0 7L2 4v13h20V4l-10 5zm0 5l-10-5v9l10 5 10-5v-9l-10 5z" />
            </svg>
          </div>
          <div>
            <p className="text-lg font-semibold text-slate-900">Yurt Market</p>
            <p className="text-xs text-slate-500">İzole kampüsler için micro-marketplace</p>
          </div>
        </div>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          {links.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-brand-600">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <button
              onClick={logout}
              className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-600 hover:border-slate-300"
            >
              Çıkış yap
            </button>
          ) : (
            <Link
              to="/auth/register"
              className="rounded-full border border-brand-200 px-4 py-2 text-sm text-brand-600 hover:bg-brand-50"
            >
              Kayıt ol
            </Link>
          )}
          <button
            onClick={cta.action}
            className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-brand-500/30"
          >
            {cta.label}
          </button>
        </div>
        <button
          className="rounded-full border border-slate-200 p-2 text-slate-600 md:hidden"
          onClick={() => setOpen((prev) => !prev)}
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>
      {open && (
        <div className="bg-white px-4 pb-4 md:hidden">
          <nav className="flex flex-col gap-3 text-sm font-medium text-slate-600">
            {links.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 hover:bg-slate-50"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-2">
            {user ? (
              <button
                onClick={logout}
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-600"
              >
                Çıkış yap
              </button>
            ) : (
              <Link
                to="/auth/register"
                onClick={() => setOpen(false)}
                className="rounded-xl border border-brand-200 px-4 py-2 text-center text-sm text-brand-600"
              >
                Kayıt ol
              </Link>
            )}
            <button
              onClick={() => {
                setOpen(false);
                cta.action();
              }}
              className="rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white"
            >
              {cta.label}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

