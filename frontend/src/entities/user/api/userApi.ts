import { api } from '@/shared/api/axiosInstance';
import type { User, LoginDto, RegisterDto, AuthResponse } from '../model/types';

export const userApi = {
  login: (data: LoginDto) => api.post<AuthResponse>('/auth/login', data).then((r) => r.data),
  register: (data: RegisterDto) => api.post<AuthResponse>('/auth/register', data).then((r) => r.data),
  getMe: () => api.get<User>('/auth/me').then((r) => r.data),
  getAll: () => api.get<{ data: User[] }>('/users').then((r) => r.data.data),
  update: (id: string, data: Partial<User>) => api.patch<User>(`/users/${id}`, data).then((r) => r.data),
};
