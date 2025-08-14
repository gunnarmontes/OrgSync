import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 15000
});

const PUBLIC_PATHS = [
  "/orgs/register/",
  "/orgs/login/",
  "/orgs/token/refresh/",
  "/orgs/token/verify/",
];

api.interceptors.request.use(
  function (config) {
    // Only attach Authorization header if not in public paths
    if (!PUBLIC_PATHS.includes(config.url)) {
      const token = localStorage.getItem(ACCESS_TOKEN);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default api;
