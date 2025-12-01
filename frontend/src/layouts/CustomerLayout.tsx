import { Outlet } from "react-router-dom";
import { DashboardShell } from "../components/layout/DashboardShell";
import { ShoppingBag, ClipboardList } from "lucide-react";

const menu = [
  { label: "Ürünler", to: "/app/explore", icon: <ShoppingBag className="h-4 w-4" /> },
  { label: "Siparişlerim", to: "/app/orders", icon: <ClipboardList className="h-4 w-4" /> },
];

export const CustomerLayout = () => (
  <DashboardShell sidebar={menu}>
    <Outlet />
  </DashboardShell>
);

