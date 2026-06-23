import { z } from 'zod';

export const createReviewSchema = z.object({
  listingId: z.string().uuid('Некорректный ID объявления'),
  rating: z.number().int().min(1, 'Минимальная оценка 1').max(5, 'Максимальная оценка 5'),
  comment: z.string().optional(),
});

export const updateReviewSchema = z.object({
  rating: z.number().int().min(1).max(5).optional(),
  comment: z.string().optional(),
});
