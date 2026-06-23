import { describe, it, expect, vi, beforeEach } from 'vitest';
import { listingService } from '../../src/services/listing.service';
import { listingRepository } from '../../src/repositories/listing.repository';
import prisma from '../../src/lib/prisma';

vi.mock('../../src/repositories/listing.repository', () => ({
  listingRepository: {
    findAll: vi.fn(),
    findById: vi.fn(),
    findByOwner: vi.fn(),
    update: vi.fn(),
    deactivate: vi.fn(),
  },
}));

// prisma мокается глобально в tests/setup.ts

const mockListing = {
  id: 'listing-1',
  title: 'Квартира',
  description: 'Описание квартиры для тестов',
  price: 3000,
  address: 'ул. Тестовая, 1',
  city: 'Москва',
  isActive: true,
  ownerId: 'owner-1',
  categoryId: 'cat-1',
  category: { id: 'cat-1', name: 'Квартиры' },
  amenities: [],
};

describe('ListingService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('create', () => {
    it('должен создать объявление для OWNER', async () => {
      vi.mocked(prisma.listing.create).mockResolvedValue(mockListing as any);

      const result = await listingService.create(
        {
          title: 'Квартира',
          description: 'Описание квартиры для тестов',
          price: 3000,
          address: 'ул. Тестовая, 1',
          city: 'Москва',
          categoryId: 'cat-1',
        },
        'owner-1',
        'OWNER'
      );

      expect(result).toBeDefined();
      expect(prisma.listing.create).toHaveBeenCalledOnce();
    });

    it('должен отклонить создание для обычного USER', async () => {
      await expect(
        listingService.create(
          {
            title: 'Квартира',
            description: 'Описание',
            price: 3000,
            address: 'ул. Тестовая, 1',
            city: 'Москва',
            categoryId: 'cat-1',
          },
          'user-1',
          'USER'
        )
      ).rejects.toEqual({ status: 403, message: 'Только владельцы могут создавать объявления' });
    });
  });

  describe('update', () => {
    it('должен обновить своё объявление', async () => {
      vi.mocked(listingRepository.findById).mockResolvedValue(mockListing as any);
      vi.mocked(listingRepository.update).mockResolvedValue({
        ...mockListing,
        title: 'Обновлено',
      } as any);

      const result = await listingService.update(
        'listing-1',
        { title: 'Обновлено' },
        'owner-1',
        'OWNER'
      );

      expect(result.title).toBe('Обновлено');
    });

    it('должен запретить обновление чужого объявления', async () => {
      vi.mocked(listingRepository.findById).mockResolvedValue(mockListing as any);

      await expect(
        listingService.update('listing-1', { title: 'Хак' }, 'other-user', 'OWNER')
      ).rejects.toEqual({ status: 403, message: 'Нет прав для редактирования этого объявления' });
    });

    it('должен выбросить 404 для несуществующего объявления', async () => {
      vi.mocked(listingRepository.findById).mockResolvedValue(null);

      await expect(
        listingService.update('bad-id', { title: 'X' }, 'owner-1', 'OWNER')
      ).rejects.toEqual({ status: 404, message: 'Объект не найден' });
    });
  });
});
