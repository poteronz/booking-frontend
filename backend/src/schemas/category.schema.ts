import { z } from 'zod';

export const createCategorySchema = z.object({
  name: z.string().min(1, 'Название обязательно'),
  icon: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
});

export const updateCategorySchema = z.object({
  name: z.string().min(1).optional(),
  icon: z.string().optional(),
  slug: z.string().optional(),
});
