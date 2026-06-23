import { describe, it, expect, vi, beforeEach } from 'vitest';
import { bookingService } from '../../src/services/booking.service';
import { bookingRepository } from '../../src/repositories/booking.repository';
import { listingRepository } from '../../src/repositories/listing.repository';

vi.mock('../../src/repositories/booking.repository', () => ({
  bookingRepository: {
    findByUser: vi.fn(),
    findById: vi.fn(),
    findConflicting: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    cancel: vi.fn(),
  },
}));

vi.mock('../../src/repositories/listing.repository', () => ({
  listingRepository: {
    findById: vi.fn(),
  },
}));

const mockListing = {
  id: 'listing-1',
  title: 'Квартира',
  price: 3000,
  isActive: true,
  ownerId: 'owner-1',
};

const mockBooking = {
  id: 'booking-1',
  dateFrom: new Date('2024-03-01'),
  dateTo: new Date('2024-03-05'),
  totalPrice: 12000,
  status: 'PENDING' as const,
  userId: 'user-1',
  listingId: 'listing-1',
  listing: { ...mockListing, ownerId: 'owner-1' },
  payment: null,
};

describe('BookingService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('create', () => {
    it('должен создать бронирование и рассчитать стоимость', async () => {
      vi.mocked(listingRepository.findById).mockResolvedValue(mockListing as any);
      vi.mocked(bookingRepository.findConflicting).mockResolvedValue(null);
      vi.mocked(bookingRepository.create).mockResolvedValue(mockBooking as any);

      const result = await bookingService.create('user-1', {
        listingId: 'listing-1',
        dateFrom: '2024-03-01T00:00:00.000Z',
        dateTo: '2024-03-05T00:00:00.000Z',
      });

      expect(result).toBeDefined();
      // Проверяем, что create был вызван с правильной totalPrice (3000 * 4 дня = 12000)
      const createCall = vi.mocked(bookingRepository.create).mock.calls[0][0] as any;
      expect(createCall.totalPrice).toBe(12000);
    });

    it('должен выбросить ошибку для неактивного листинга', async () => {
      vi.mocked(listingRepository.findById).mockResolvedValue({
        ...mockListing,
        isActive: false,
      } as any);

      await expect(
        bookingService.create('user-1', {
          listingId: 'listing-1',
          dateFrom: '2024-03-01T00:00:00.000Z',
          dateTo: '2024-03-05T00:00:00.000Z',
        })
      ).rejects.toEqual({ status: 404, message: 'Объект неактивен' });
    });

    it('должен выбросить ошибку при конфликте дат', async () => {
      vi.mocked(listingRepository.findById).mockResolvedValue(mockListing as any);
      vi.mocked(bookingRepository.findConflicting).mockResolvedValue(mockBooking as any);

      await expect(
        bookingService.create('user-1', {
          listingId: 'listing-1',
          dateFrom: '2024-03-02T00:00:00.000Z',
          dateTo: '2024-03-04T00:00:00.000Z',
        })
      ).rejects.toEqual({ status: 409, message: 'Даты пересекаются с существующим бронированием' });
    });
  });

  describe('cancel', () => {
    it('должен отменить бронирование владельца', async () => {
      vi.mocked(bookingRepository.findById).mockResolvedValue(mockBooking as any);
      vi.mocked(bookingRepository.cancel).mockResolvedValue({
        ...mockBooking,
        status: 'CANCELLED',
      } as any);

      const result = await bookingService.cancel('booking-1', 'user-1');
      expect(result.status).toBe('CANCELLED');
    });

    it('должен выбросить ошибку при отмене чужого бронирования', async () => {
      vi.mocked(bookingRepository.findById).mockResolvedValue(mockBooking as any);

      await expect(bookingService.cancel('booking-1', 'other-user')).rejects.toEqual({
        status: 403,
        message: 'Нет прав для отмены этого бронирования',
      });
    });

    it('должен выбросить ошибку при повторной отмене', async () => {
      vi.mocked(bookingRepository.findById).mockResolvedValue({
        ...mockBooking,
        status: 'CANCELLED',
      } as any);

      await expect(bookingService.cancel('booking-1', 'user-1')).rejects.toEqual({
        status: 400,
        message: 'Бронирование уже отменено',
      });
    });
  });
});
