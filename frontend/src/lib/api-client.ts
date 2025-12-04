import axios from "axios";
import { env } from "../config/env";
import { authStore } from "../store/auth";

const api = axios.create({
  baseURL: env.apiUrl,
  withCredentials: false,
});

api.interceptors.request.use((config) => {
  const token = authStore.getState().accessToken;
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = authStore.getState().refreshToken;
        if (!refreshToken) {
          authStore.getState().logout();
          return Promise.reject(error);
        }

        const { data } = await axios.post(
          `${env.apiUrl}/api/users/auth/refresh`,
          { refresh: refreshToken },
        );
        authStore.getState().setTokens(data.access, data.refresh);
        originalRequest.headers.Authorization = `Bearer ${data.access}`;
        return api(originalRequest);
      } catch (refreshError) {
        authStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export { api };

