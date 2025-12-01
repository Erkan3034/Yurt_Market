import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export const LandingNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: "Mağaza Aç", to: "/auth/register?role=seller" },
    { label: "Giriş Yap", to: "/auth/login" },
  ];

  return (
<header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-black/10 shadow-sm py-4 transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-100">
              <div className="h-6 w-6 rounded bg-brand-500" />
            </div>
            <span className="text-xl font-bold text-slate-900">Yurt Market</span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-4">
            {menuItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-sm font-semibold text-slate-700 hover:text-brand-600 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 hover:text-brand-600 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {/* Mobilde açılan menünün de cam gibi görünmesini istersen buraya da bg-white/xxx ekleyebilirsin */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-slate-200/60 pt-4">
            <div className="flex flex-col gap-3">
              {menuItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm font-semibold text-slate-700 hover:text-brand-600 transition-colors py-2"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
