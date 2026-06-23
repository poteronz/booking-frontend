import { vi } from 'vitest';

// Мокаем Prisma-клиент для всех тестов
vi.mock('../src/lib/prisma', () => {
  return {
    default: {
      user: {
        findUnique: vi.fn(),
        findMany: vi.fn(),
        count: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
      },
      listing: {
        findUnique: vi.fn(),
        findMany: vi.fn(),
        count: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
      },
      booking: {
        findUnique: vi.fn(),
        findMany: vi.fn(),
        findFirst: vi.fn(),
        count: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
      },
      category: {
        findUnique: vi.fn(),
        findMany: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
      },
      review: {
        findUnique: vi.fn(),
        findMany: vi.fn(),
        count: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
      },
      payment: {
        findUnique: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
      },
      amenity: {
        findMany: vi.fn(),
        create: vi.fn(),
        delete: vi.fn(),
      },
      notification: {
        findMany: vi.fn(),
        count: vi.fn(),
        update: vi.fn(),
        updateMany: vi.fn(),
        create: vi.fn(),
        delete: vi.fn(),
      },
      listingAmenity: {
        deleteMany: vi.fn(),
        createMany: vi.fn(),
      },
    },
    prisma: undefined as any, // будет перезаписан ниже
  };
});

// Мокаем переменные окружения
process.env.JWT_SECRET = 'test-secret';
process.env.JWT_REFRESH_SECRET = 'test-refresh-secret';
