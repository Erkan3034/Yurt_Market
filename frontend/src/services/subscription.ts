import { api } from "../lib/api-client";
import { SubscriptionStatus } from "../types";

export const fetchSubscriptionStatus = async () => {
  const { data } = await api.get<SubscriptionStatus>("/api/subscription/status");
  return data;
};

export const startSubscription = async (planId: number) => {
  const { data } = await api.post("/api/subscription/start", { plan_id: planId });
  return data as {
    subscription_id: number;
    plan: string;
    expires_at: string;
    payment_session: {
      provider: string;
      checkout_url: string;
      success_url: string;
      cancel_url: string;
    };
  };
};

