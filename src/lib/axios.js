import axios from 'axios';
import { tokenStorageName } from '@/helpers/constants.js';

const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
});

api.interceptors.request.use((config) => {
  // Simula una autenticación real al recuperar el token almacenado en localStorage e inyectándolo en las cabeceras
  const token = localStorage.getItem(tokenStorageName);

  if (token) {
    config.headers.Authorization = 'Bearer ' + token;
  }

  return config;
});

export default api;
