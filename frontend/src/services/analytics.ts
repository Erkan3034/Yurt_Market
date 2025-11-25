import { api } from "../lib/api-client";

export interface PopularSeller {
  seller_id: number;
  score: number;
  rank: number;
}

export const fetchPopularSellers = async (dormId: number) => {
  const { data } = await api.get<PopularSeller[]>(`/api/analytics/popular-sellers?dorm=${dormId}`);
  return data;
};

