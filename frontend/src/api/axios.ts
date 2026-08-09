import axios from "axios";

const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

const api = axios.create({
  baseURL: isLocalhost ? `${import.meta.env.VITE_API_URL}/api` : "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;