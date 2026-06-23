import { useState } from 'react';
import { useAuthStore } from '@/app/store/authStore';
import { userApi } from '@/entities/user';
import type { LoginDto, RegisterDto } from '@/entities/user';

// Хук для работы с авторизацией
export function useAuth() {
  const { login: storeLogin, logout: storeLogout } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (data: LoginDto) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await userApi.login(data);
      storeLogin(res.user, res.accessToken);
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Ошибка входа';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterDto) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await userApi.register(data);
      storeLogin(res.user, res.accessToken);
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Ошибка регистрации';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    storeLogout();
  };

  return { login, register, logout, isLoading, error };
}
