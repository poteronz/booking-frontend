import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../../src/app';
import { bookingService } from '../../src/services/booking.service';
import { createAuthToken } from '../helpers/createAuthToken';

vi.mock('../../src/services/booking.service', () => ({
  bookingService: {
    getByUser: vi.fn(),
    getById: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    cancel: vi.fn(),
  },
}));

describe('Booking Router', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('POST /api/bookings', () => {
    it('должен вернуть 401 без токена', async () => {
      const res = await request(app)
        .post('/api/bookings')
        .send({
          listingId: '550e8400-e29b-41d4-a716-446655440000',
          dateFrom: '2024-03-01T00:00:00.000Z',
          dateTo: '2024-03-05T00:00:00.000Z',
        });

      expect(res.status).toBe(401);
    });

    it('должен вернуть 201 с валидным токеном', async () => {
      const token = createAuthToken('user-1', 'USER');

      const mockBooking = {
        id: 'booking-1',
        dateFrom: '2024-03-01',
        dateTo: '2024-03-05',
        totalPrice: 12000,
        status: 'PENDING',
      };

      vi.mocked(bookingService.create).mockResolvedValue(mockBooking as any);

      const res = await request(app)
        .post('/api/bookings')
        .set('Authorization', `Bearer ${token}`)
        .send({
          listingId: '550e8400-e29b-41d4-a716-446655440000',
          dateFrom: '2024-03-01T00:00:00.000Z',
          dateTo: '2024-03-05T00:00:00.000Z',
        });

      expect(res.status).toBe(201);
      expect(res.body.totalPrice).toBe(12000);
    });
  });
});
