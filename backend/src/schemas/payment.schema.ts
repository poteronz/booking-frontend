import { z } from 'zod';

export const createPaymentSchema = z.object({
  bookingId: z.string().uuid('Некорректный ID бронирования'),
  method: z.enum(['CARD', 'CASH', 'ONLINE'], {
    message: 'Способ оплаты должен быть CARD, CASH или ONLINE',
  }),
});

export const updatePaymentStatusSchema = z.object({
  status: z.enum(['COMPLETED', 'FAILED', 'REFUNDED'], {
    message: 'Статус должен быть COMPLETED, FAILED или REFUNDED',
  }),
});
