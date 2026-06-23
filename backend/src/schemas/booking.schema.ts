import { z } from 'zod';

export const createBookingSchema = z.object({
  listingId: z.string().uuid('Некорректный ID объекта'),
  dateFrom: z.string({ required_error: 'Дата начала обязательна' }),
  dateTo: z.string({ required_error: 'Дата окончания обязательна' }),
});

export const updateBookingSchema = z.object({
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
});
