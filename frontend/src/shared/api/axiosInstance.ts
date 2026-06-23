import axios from 'axios';

// Базовый URL берётся из переменных окружения или дефолтный /api
const baseURL = import.meta.env.VITE_API_URL || '/api';

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Интерцептор запросов — прикрепляем JWT токен из authStore
api.interceptors.request.use((config) => {
  // Динамический импорт стора чтобы избежать циклических зависимостей
  const stored = localStorage.getItem('auth-storage');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      const token = parsed?.state?.accessToken;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch {
      // Если не удалось распарсить — игнорируем
    }
  }
  return config;
});

// Интерцептор ответов — при 401 выполняем logout
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Очищаем стор авторизации при 401
      localStorage.removeItem('auth-storage');
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  },
);
