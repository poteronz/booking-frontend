import prisma from '../lib/prisma';
import { Prisma } from '@prisma/client';

export const paymentRepository = {
  findById: (id: string) => {
    return prisma.payment.findUnique({
      where: { id },
      include: { booking: true },
    });
  },

  findByBooking: (bookingId: string) => {
    return prisma.payment.findUnique({
      where: { bookingId },
      include: { booking: true },
    });
  },

  create: (data: Prisma.PaymentCreateInput) => {
    return prisma.payment.create({
      data,
      include: { booking: true },
    });
  },

  updateStatus: (id: string, status: string) => {
    return prisma.payment.update({
      where: { id },
      data: { status: status as any },
      include: { booking: true },
    });
  },
};
