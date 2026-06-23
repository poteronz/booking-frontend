import { api } from '@/shared/api/axiosInstance';
import type { Notification } from '../model/types';

export const notificationApi = {
  getMy: () => api.get<{ data: Notification[] }>('/notifications').then((r) => r.data.data),
  markAsRead: (id: string) => api.patch<Notification>(`/notifications/${id}/read`).then((r) => r.data),
  markAllAsRead: () => api.patch('/notifications/read-all'),
};
