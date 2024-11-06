import axios from "axios";

const api = axios.create({
  baseURL: "https://sunrise-team-9r4u.vercel.app/?vercelToolbarCode=U7zoauBtAKKmYPq/api", 
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
