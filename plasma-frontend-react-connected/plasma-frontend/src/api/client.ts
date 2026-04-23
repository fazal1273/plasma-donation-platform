import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8081";

export const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("plasma_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("plasma_token");
      localStorage.removeItem("plasma_user_v1");
    }
    return Promise.reject(err);
  }
);
