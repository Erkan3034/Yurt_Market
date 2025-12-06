import { api } from "../lib/api-client";

export interface ToggleStoreResponse {
  store_is_open: boolean;
  message: string;
}

export const toggleStoreStatus = async () => {
  const { data } = await api.post<ToggleStoreResponse>("/api/users/seller/toggle-store");
  return data;
};

