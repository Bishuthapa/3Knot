import axios from "axios";

const API = axios.create({
  baseURL: "https://backend-1-02dj.onrender.com/api/v1",
});

// Automatically attach token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("mytoken");
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
