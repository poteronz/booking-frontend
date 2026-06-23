import prisma from '../lib/prisma';
import { BookingStatus, Prisma } from '@prisma/client';

// репозиторий бронирований — только Prisma-запросы
export const bookingRepository = {
  // получить бронирования пользователя
  findByUser: (userId: string) => {
    return prisma.booking.findMany({
      where: { userId },
      include: {
        listing: { select: { id: true, title: true, price: true } },
        payment: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  },

  // получить бронирование по id
  findById: (id: string) => {
    return prisma.booking.findUnique({
      where: { id },
      include: {
        listing: {
          include: {
            owner: { select: { id: true, name: true } },
          },
        },
        user: { select: { id: true, name: true, email: true } },
        payment: true,
      },
    });
  },

  // проверка пересечения дат для одного листинга
  findConflicting: (listingId: string, dateFrom: Date, dateTo: Date, excludeId?: string) => {
    const where: Prisma.BookingWhereInput = {
      listingId,
      status: { not: BookingStatus.CANCELLED },
      dateFrom: { lt: dateTo },
      dateTo: { gt: dateFrom },
    };
    if (excludeId) {
      where.id = { not: excludeId };
    }
    return prisma.booking.findFirst({ where });
  },

  // создать бронирование
  create: (data: Prisma.BookingCreateInput) => {
    return prisma.booking.create({
      data,
      include: { listing: true, payment: true },
    });
  },

  // обновить бронирование
  update: (id: string, data: Prisma.BookingUpdateInput) => {
    return prisma.booking.update({
      where: { id },
      data,
      include: { listing: true, payment: true },
    });
  },

  // отменить бронирование
  cancel: (id: string) => {
    return prisma.booking.update({
      where: { id },
      data: { status: BookingStatus.CANCELLED },
    });
  },
};
