import { notificationRepository } from '../repositories/notification.repository';

export const notificationService = {
  getByUser: async (userId: string, page: number = 1, limit: number = 20) => {
    const [notifications, total, unreadCount] = await notificationRepository.findByUser(userId, page, limit);
    return {
      data: notifications,
      total,
      unreadCount,
      page,
      totalPages: Math.ceil(total / limit),
    };
  },

  markAsRead: async (id: string, userId: string) => {
    return notificationRepository.markAsRead(id);
  },

  markAllAsRead: async (userId: string) => {
    const result = await notificationRepository.markAllAsRead(userId);
    return { message: `Прочитано уведомлений: ${result.count}` };
  },

  delete: async (id: string, userId: string) => {
    await notificationRepository.delete(id);
    return { message: 'Уведомление удалено' };
  },
};
