import axios from "axios";
import { logoutApi, refreshTokenApi } from "../api/auth";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, success) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(success);
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 → invalid/tampered token → seedha logout
    if (error.response.status === 401) {
      await logoutApi();
      return Promise.reject(error);
    }

    if (error.response.status === 403 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return axiosInstance(originalRequest);
          })
          .catch((error) => {
            return Promise.reject(error);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await refreshTokenApi();

        processQueue(null, true);

        return axiosInstance(originalRequest);
      } catch (error) {
        processQueue(error, null);

        try {
          await logoutApi();
        } catch (err) {}

        localStorage.removeItem("isLoggedIn");

        window.location.href = "/login";

        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
