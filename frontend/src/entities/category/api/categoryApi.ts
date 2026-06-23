import { api } from '@/shared/api/axiosInstance';
import type { Category, CreateCategoryDto } from '../model/types';

export const categoryApi = {
  getAll: () => api.get<Category[]>('/categories').then((r) => r.data),
  getById: (id: string) => api.get<Category>(`/categories/${id}`).then((r) => r.data),
  create: (data: CreateCategoryDto) => api.post<Category>('/categories', data).then((r) => r.data),
  update: (id: string, data: Partial<CreateCategoryDto>) =>
    api.patch<Category>(`/categories/${id}`, data).then((r) => r.data),
  delete: (id: string) => api.delete(`/categories/${id}`),
};
