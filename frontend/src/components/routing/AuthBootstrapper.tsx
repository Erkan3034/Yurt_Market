import { useEffect } from "react";
import { fetchCurrentUser } from "../../services/auth";
import { authStore } from "../../store/auth";

export const AuthBootstrapper = () => {
  const accessToken = authStore((state) => state.accessToken);
  const user = authStore((state) => state.user);

  useEffect(() => {
    if (accessToken && !user) {
      fetchCurrentUser().catch(() => authStore.getState().logout());
    }
  }, [accessToken, user]);

  return null;
};

