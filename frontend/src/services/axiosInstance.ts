import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/",
});

// Adiciona o token antes de cada requisição
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercepta respostas com erro (ex: token inválido)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Token expirado ou inválido");
      // Aqui no futuro podemos: fazer logout automático ou tentar refresh token
    }
    return Promise.reject(error);
  }
);

export default api;
