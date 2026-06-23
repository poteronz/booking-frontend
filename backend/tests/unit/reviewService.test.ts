import { describe, it, expect, vi, beforeEach } from 'vitest';
import { reviewService } from '../../src/services/review.service';
import { reviewRepository } from '../../src/repositories/review.repository';

vi.mock('../../src/repositories/review.repository', () => ({
  reviewRepository: {
    findByListing: vi.fn(),
    findByUserAndListing: vi.fn(),
    findById: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}));

const mockReview = {
  id: 'review-1',
  rating: 5,
  comment: 'Отлично!',
  userId: 'user-1',
  listingId: 'listing-1',
  user: { id: 'user-1', name: 'Иван Иванов', avatar: null },
};

describe('ReviewService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('create', () => {
    it('должен создать отзыв', async () => {
      vi.mocked(reviewRepository.findByUserAndListing).mockResolvedValue(null);
      vi.mocked(reviewRepository.create).mockResolvedValue(mockReview as any);

      const result = await reviewService.create(
        { rating: 5, comment: 'Отлично!', listingId: 'listing-1' },
        'user-1'
      );

      expect(result.rating).toBe(5);
      expect(reviewRepository.create).toHaveBeenCalledOnce();
    });

    it('должен запретить дублирование отзыва', async () => {
      vi.mocked(reviewRepository.findByUserAndListing).mockResolvedValue(mockReview as any);

      await expect(
        reviewService.create({ rating: 4, listingId: 'listing-1' }, 'user-1')
      ).rejects.toEqual({ status: 409, message: 'Вы уже оставляли отзыв для этого объекта' });
    });
  });
});
