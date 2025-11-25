import { api } from "../lib/api-client";
import { Order } from "../types";

export const fetchMyOrders = async (role: "customer" | "seller" = "customer") => {
  const params = role === "seller" ? "?role=seller" : "";
  const { data } = await api.get<Order[]>(`/api/orders/${params}`);
  return data;
};

export const createOrder = async (payload: {
  notes?: string;
  items: { product_id: number; quantity: number }[];
}) => {
  const { data } = await api.post<Order>("/api/orders", payload);
  return data;
};

export const orderAction = async (
  action: "approve" | "reject" | "cancel",
  orderId: number,
  note?: string,
) => {
  const { data } = await api.post<Order>(`/api/orders/${orderId}/${action}`, {
    note,
  });
  return data;
};

