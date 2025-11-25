import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authStore } from "../store/auth";

export const useAuthGuard = (requiredRole?: "seller" | "student") => {
  const navigate = useNavigate();
  const user = authStore((state) => state.user);

  useEffect(() => {
    if (!user) {
      navigate("/auth/login");
      return;
    }
    if (requiredRole && user.role !== requiredRole) {
      navigate(user.role === "seller" ? "/seller/products" : "/app/explore");
    }
  }, [user, navigate, requiredRole]);

  return { user };
};

