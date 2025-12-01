import { Outlet } from "react-router-dom";
import { DashboardShell } from "../components/layout/DashboardShell";
import { Package, ClipboardCheck, BarChart3, CreditCard } from "lucide-react";

const menu = [
  { label: "Ürünlerim", to: "/seller/products", icon: <Package className="h-4 w-4" /> },
  { label: "Siparişler", to: "/seller/orders", icon: <ClipboardCheck className="h-4 w-4" /> },
  { label: "Analitik", to: "/seller/analytics", icon: <BarChart3 className="h-4 w-4" /> },
  { label: "Abonelik", to: "/seller/subscription", icon: <CreditCard className="h-4 w-4" /> },
];

export const SellerLayout = () => (
  <DashboardShell sidebar={menu}>
    <Outlet />
  </DashboardShell>
);

