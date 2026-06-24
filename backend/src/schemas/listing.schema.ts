import { z } from 'zod';

export const createListingSchema = z.object({
  title: z.string().min(3, 'Заголовок минимум 3 символа'),
  description: z.string().min(10, 'Описание минимум 10 символов'),
  imageUrl: z.string().url('Некорректная ссылка на изображение').optional(),
  city: z.string().min(2, 'Город минимум 2 символа').optional(),
  address: z.string().min(3, 'Адрес минимум 3 символа').optional(),
  price: z.number().positive('Цена должна быть положительной'),
  categoryId: z.string().uuid('Некорректный ID категории'),
  amenityIds: z.array(z.string().uuid()).optional(),
});

export const updateListingSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().min(10).optional(),
  imageUrl: z.string().url('Некорректная ссылка на изображение').optional(),
  city: z.string().min(2, 'Город минимум 2 символа').optional(),
  address: z.string().min(3, 'Адрес минимум 3 символа').optional(),
  price: z.number().positive().optional(),
  categoryId: z.string().uuid().optional(),
  amenityIds: z.array(z.string().uuid()).optional(),
  isActive: z.boolean().optional(),
});
