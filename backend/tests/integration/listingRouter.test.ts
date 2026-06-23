import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../../src/app';
import { listingService } from '../../src/services/listing.service';

vi.mock('../../src/services/listing.service', () => ({
  listingService: {
    getAll: vi.fn(),
    getById: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    deactivate: vi.fn(),
  },
}));

describe('Listing Router', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET /api/listings', () => {
    it('должен вернуть 200 и массив объявлений', async () => {
      const mockResult = {
        data: [
          { id: 'l1', title: 'Квартира 1', price: 3000 },
          { id: 'l2', title: 'Квартира 2', price: 5000 },
        ],
        total: 2,
        page: 1,
        totalPages: 1,
      };

      vi.mocked(listingService.getAll).mockResolvedValue(mockResult as any);

      const res = await request(app).get('/api/listings');

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data).toHaveLength(2);
      expect(res.body.total).toBe(2);
    });
  });
});
