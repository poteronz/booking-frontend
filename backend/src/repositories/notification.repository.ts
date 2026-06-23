import prisma from '../lib/prisma';
import { Prisma } from '@prisma/client';

export const notificationRepository = {
  findByUser: (userId: string, page: number = 1, limit: number = 20) => {
    const skip = (page - 1) * limit;
    return Promise.all([
      prisma.notification.findMany({
        where: { userId },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.notification.count({ where: { userId } }),
      prisma.notification.count({ where: { userId, isRead: false } }),
    ]);
  },

  markAsRead: (id: string) => {
    return prisma.notification.update({
      where: { id },
      data: { isRead: true },
    });
  },

  markAllAsRead: (userId: string) => {
    return prisma.notification.updateMany({
      where: { userId, isRead: false },
      data: { isRead: true },
    });
  },

  create: (data: Prisma.NotificationCreateInput) => {
    return prisma.notification.create({ data });
  },

  delete: (id: string) => {
    return prisma.notification.delete({ where: { id } });
  },
};
