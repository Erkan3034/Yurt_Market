import { useState } from "react";
import { Modal } from "../ui/Modal";

interface CartItem {
  product_id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface OrderConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  cartTotal: number;
  onConfirm: (paymentMethod: string, notes: string, deliveryType: string, deliveryAddress: string, deliveryPhone: string) => void;
  isLoading?: boolean;
  sellerInfo?: {
    phone?: string;
    room?: string;
  };
}

const paymentMethods = [
  { id: "cash_on_delivery", label: "Teslim Anında Ödeme", icon: "💵" },
];

export const OrderConfirmModal = ({
  isOpen,
  onClose,
  cartItems,
  cartTotal,
  onConfirm,
  isLoading = false,
  sellerInfo,
}: OrderConfirmModalProps) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("cash_on_delivery");
  const [deliveryType, setDeliveryType] = useState<"customer_pickup" | "seller_delivery">("customer_pickup");
  const [roomNumber, setRoomNumber] = useState("");
  const [block, setBlock] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const handleConfirm = () => {
    if (!selectedPaymentMethod) {
      return;
    }
    if (!roomNumber.trim() || !phone.trim()) {
      return;
    }
    const deliveryAddress = block.trim() ? `${block} Blok, ${roomNumber} No` : `${roomNumber} No`;
    onConfirm(selectedPaymentMethod, notes, deliveryType, deliveryAddress, phone);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Sipariş Onayı">
      <div className="space-y-6">
        {/* Sipariş Özeti */}
        <div>
          <h4 className="mb-3 text-sm font-semibold text-slate-900">Sipariş Özeti</h4>
          <div className="space-y-2 rounded-lg border border-slate-200 bg-slate-50 p-4">
            {cartItems.map((item) => (
              <div key={item.product_id} className="flex items-center justify-between text-sm">
                <span className="text-slate-700">
                  {item.name} <span className="text-slate-400">x{item.quantity}</span>
                </span>
                <span className="font-semibold text-slate-900">
                  ₺{(item.price * item.quantity).toFixed(2).replace(".", ",")}
                </span>
              </div>
            ))}
            <div className="mt-3 border-t border-slate-300 pt-3">
              <div className="flex items-center justify-between">
                <span className="text-base font-semibold text-slate-900">Toplam</span>
                <span className="text-lg font-bold text-brand-600">
                  ₺{cartTotal.toFixed(2).replace(".", ",")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Ödeme Yöntemi */}
        <div>
          <h4 className="mb-3 text-sm font-semibold text-slate-900">Ödeme Yöntemi</h4>
          <div className="space-y-2">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedPaymentMethod(method.id)}
                className={`w-full rounded-lg border-2 p-4 text-left transition-all ${
                  selectedPaymentMethod === method.id
                    ? "border-brand-500 bg-brand-50"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{method.icon}</span>
                  <span className="font-semibold text-slate-900">{method.label}</span>
                  {selectedPaymentMethod === method.id && (
                    <div className="ml-auto h-5 w-5 rounded-full bg-brand-500 flex items-center justify-center">
                      <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Teslimat Bilgileri */}
        <div>
          <h4 className="mb-3 text-sm font-semibold text-slate-900">Teslimat Bilgileri</h4>
          
          {/* Teslimat Tipi */}
          <div className="mb-4 space-y-2">
            <label className="block text-sm font-medium text-slate-700">Teslimat Şekli</label>
            <div className="space-y-2">
              <button
                onClick={() => setDeliveryType("customer_pickup")}
                className={`w-full rounded-lg border-2 p-3 text-left transition-all ${
                  deliveryType === "customer_pickup"
                    ? "border-brand-500 bg-brand-50"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-900">Müşteri Alacak</span>
                  {deliveryType === "customer_pickup" && (
                    <div className="ml-auto h-4 w-4 rounded-full bg-brand-500 flex items-center justify-center">
                      <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
                {sellerInfo && (
                  <p className="mt-1 text-xs text-slate-500">
                    Satıcı: {sellerInfo.phone} {sellerInfo.room && `- ${sellerInfo.room}`}
                  </p>
                )}
              </button>
              <button
                onClick={() => setDeliveryType("seller_delivery")}
                className={`w-full rounded-lg border-2 p-3 text-left transition-all ${
                  deliveryType === "seller_delivery"
                    ? "border-brand-500 bg-brand-50"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-900">Satıcı Getirecek</span>
                  {deliveryType === "seller_delivery" && (
                    <div className="ml-auto h-4 w-4 rounded-full bg-brand-500 flex items-center justify-center">
                      <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
              </button>
            </div>
          </div>

          {/* Adres Bilgileri */}
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Blok <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={block}
                  onChange={(e) => setBlock(e.target.value)}
                  placeholder="Örn: A"
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Oda No <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={roomNumber}
                  onChange={(e) => setRoomNumber(e.target.value)}
                  placeholder="Örn: 101"
                  required
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                İletişim Numarası <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="05XX XXX XX XX"
                required
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
            </div>
          </div>
        </div>

        {/* Sipariş Notu */}
        <div>
          <h4 className="mb-3 text-sm font-semibold text-slate-900">Sipariş Notu (Opsiyonel)</h4>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Satıcıya iletmek istediğiniz notu buraya yazabilirsiniz..."
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            rows={4}
          />
          <p className="mt-2 text-xs text-slate-500">
            Bu not satıcı tarafından görülebilir ve siparişinizle birlikte iletilir.
          </p>
        </div>

        {/* Butonlar */}
        <div className="flex gap-3 pt-4">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-50"
          >
            İptal
          </button>
          <button
            onClick={handleConfirm}
            disabled={isLoading || !selectedPaymentMethod || !roomNumber.trim() || !phone.trim()}
            className="flex-1 rounded-lg bg-brand-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Oluşturuluyor..." : "Siparişi Onayla"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

