import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { authStore } from "../../store/auth";

interface DashboardShellProps {
  sidebar: {
    label: string;
    to: string;
    icon?: ReactNode;
  }[];
  children: ReactNode;
}

export const DashboardShell = ({ sidebar, children }: DashboardShellProps) => {
  const location = useLocation();
  const { user, logout } = authStore();

  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="hidden w-64 flex-col border-r border-slate-200 bg-white p-6 md:flex">
        <p className="text-lg font-bold text-slate-900">Yurt Market</p>
        <p className="mt-1 text-xs uppercase text-slate-400">{user?.role === "seller" ? "Satıcı paneli" : "Öğrenci paneli"}</p>
        <nav className="mt-6 space-y-2">
          {sidebar.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold ${
                location.pathname === item.to
                  ? "bg-brand-50 text-brand-600"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          onClick={logout}
          className="mt-auto rounded-2xl border border-slate-200 px-4 py-2 text-sm text-slate-600"
        >
          Çıkış yap
        </button>
      </aside>
      <main className="flex-1 p-6">
        <div className="mb-4 flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 md:hidden">
          <p className="text-sm font-semibold text-slate-900">{user?.email}</p>
          <button className="text-xs text-brand-600" onClick={logout}>
            Çıkış
          </button>
        </div>
        {children}
      </main>
    </div>
  );
};

