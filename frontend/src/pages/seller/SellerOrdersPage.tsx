import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchMyOrders, orderAction } from "../../services/orders";
import { toast } from "react-hot-toast";
import { Spinner } from "../../components/ui/Spinner";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import dayjs from "dayjs";
import "dayjs/locale/tr";

dayjs.locale("tr");

const getStatusInfo = (status: string) => {
  switch (status) {
    case "ONAY":
      return { label: "Onaylandı", className: "bg-green-100 text-green-700" };
    case "PENDING":
      return { label: "Beklemede", className: "bg-yellow-100 text-yellow-700" };
    case "IPTAL":
      return { label: "İptal Edildi", className: "bg-slate-100 text-slate-700" };
    case "RED":
      return { label: "Reddedildi", className: "bg-red-100 text-red-700" };
    default:
      return { label: status, className: "bg-slate-100 text-slate-700" };
  }
};

export const SellerOrdersPage = () => {
  const queryClient = useQueryClient();
  const [expandedOrders, setExpandedOrders] = useState<Set<number>>(new Set());
  const { data, isLoading } = useQuery({
    queryKey: ["orders", "seller"],
    queryFn: () => fetchMyOrders("seller"),
  });

  const mutation = useMutation({
    mutationFn: ({ id, action }: { id: number; action: "approve" | "reject" | "cancel" }) =>
      orderAction(action, id),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["orders", "seller"] });
      const label =
        variables.action === "approve"
          ? "Sipariş onaylandı"
          : variables.action === "reject"
          ? "Sipariş reddedildi"
          : "Sipariş iptal edildi";
      toast.success(label);
    },
    onError: () => toast.error("İşlem başarısız"),
  });

  const toggleOrder = (orderId: number) => {
    setExpandedOrders((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(orderId)) {
        newSet.delete(orderId);
      } else {
        newSet.add(orderId);
      }
      return newSet;
    });
  };

  if (isLoading) return <Spinner label="Siparişler yükleniyor..." />;

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-slate-900">Sipariş yönetimi</h1>
      <div className="space-y-4">
        {data?.map((order) => {
          const isExpanded = expandedOrders.has(order.id);
          const statusInfo = getStatusInfo(order.status);
          const orderDate = dayjs(order.created_at).format("D MMMM YYYY");

          return (
            <div key={order.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-lg font-semibold text-slate-900">#{order.id}</p>
                  <p className="mt-1 text-sm text-slate-600">
                    {orderDate} - ₺{Number(order.total_amount).toFixed(2).replace(".", ",")}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusInfo.className}`}>
                    {statusInfo.label}
                  </span>
                  <button
                    onClick={() => toggleOrder(order.id)}
                    className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                  >
                    {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Sipariş Detayları */}
              {isExpanded && (
                <div className="mt-4 space-y-4 border-t border-slate-200 pt-4">
                  {/* Sipariş İçeriği */}
                  <div>
                    <h4 className="mb-2 text-sm font-semibold text-slate-900">Sipariş İçeriği</h4>
                    <ul className="space-y-1 text-sm text-slate-600">
                      {order.items.map((item) => (
                        <li key={item.id}>
                          {item.product_name} x{item.quantity} = ₺{Number(item.unit_price * item.quantity).toFixed(2).replace(".", ",")}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Müşteri Bilgileri */}
                  <div>
                    <h4 className="mb-2 text-sm font-semibold text-slate-900">Müşteri Bilgileri</h4>
                    <div className="space-y-1 text-sm text-slate-600">
                      <p><span className="font-medium">E-posta:</span> {order.customer_email || "N/A"}</p>
                      <p><span className="font-medium">Telefon:</span> {order.customer_phone || "N/A"}</p>
                      {order.customer_room && (
                        <p><span className="font-medium">Adres:</span> {order.customer_room}</p>
                      )}
                    </div>
                  </div>

                  {/* Ödeme ve Teslimat Bilgileri */}
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="mb-2 text-sm font-semibold text-slate-900">Ödeme Bilgileri</h4>
                      <div className="space-y-1 text-sm text-slate-600">
                        <p><span className="font-medium">Yöntem:</span> {order.payment_method_display || "Teslim Anında Ödeme"}</p>
                        <p><span className="font-medium">Toplam:</span> ₺{Number(order.total_amount).toFixed(2).replace(".", ",")}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="mb-2 text-sm font-semibold text-slate-900">Teslimat Bilgileri</h4>
                      <div className="space-y-1 text-sm text-slate-600">
                        <p><span className="font-medium">Şekil:</span> {order.delivery_type_display || "Müşteri Alacak"}</p>
                        {order.delivery_address && (
                          <p><span className="font-medium">Adres:</span> {order.delivery_address}</p>
                        )}
                        {order.delivery_phone && (
                          <p><span className="font-medium">Telefon:</span> {order.delivery_phone}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Sipariş Notu */}
                  {order.notes && (
                    <div>
                      <h4 className="mb-2 text-sm font-semibold text-slate-900">Sipariş Notu</h4>
                      <p className="text-sm text-slate-600">{order.notes}</p>
                    </div>
                  )}

                  {/* Aksiyon Butonları */}
                  {order.status === "PENDING" && (
                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => mutation.mutate({ id: order.id, action: "approve" })}
                        disabled={mutation.isPending}
                        className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-600 hover:bg-emerald-100 disabled:opacity-50"
                      >
                        Onayla
                      </button>
                      <button
                        onClick={() => mutation.mutate({ id: order.id, action: "reject" })}
                        disabled={mutation.isPending}
                        className="rounded-full bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-600 hover:bg-amber-100 disabled:opacity-50"
                      >
                        Reddet
                      </button>
                      <button
                        onClick={() => mutation.mutate({ id: order.id, action: "cancel" })}
                        disabled={mutation.isPending}
                        className="rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-100 disabled:opacity-50"
                      >
                        İptal
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
        {!data?.length && <p className="text-sm text-slate-500">Henüz sipariş yok.</p>}
      </div>
    </div>
  );
};

