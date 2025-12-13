import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  product_id: number;
  quantity: number;
}

interface CartState {
  items: Record<number, number>; // product_id -> quantity
  addItem: (productId: number, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (productId: number) => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: {},
      addItem: (productId, quantity = 1) => {
        set((state) => ({
          items: {
            ...state.items,
            [productId]: (state.items[productId] || 0) + quantity,
          },
        }));
      },
      removeItem: (productId) => {
        set((state) => {
          const next = { ...state.items };
          delete next[productId];
          return { items: next };
        });
      },
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set((state) => ({
          items: {
            ...state.items,
            [productId]: quantity,
          },
        }));
      },
      clearCart: () => {
        set({ items: {} });
      },
      getItemQuantity: (productId) => {
        return get().items[productId] || 0;
      },
      getTotalItems: () => {
        return Object.values(get().items).reduce((sum, qty) => sum + qty, 0);
      },
    }),
    {
      name: "yurt-market-cart",
      partialize: (state) => ({ items: state.items }),
    },
  ),
);

