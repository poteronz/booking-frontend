import { useState } from 'react';
import { reviewApi } from '@/entities/review';
import type { Review, CreateReviewDto } from '@/entities/review';

// Хук для работы с отзывами
export function useReviewCrud() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = async (listingId: string) => {
    setIsLoading(true);
    try {
      const data = await reviewApi.getByListing(listingId);
      setReviews(data);
    } catch {
      setError('Не удалось загрузить отзывы');
    } finally {
      setIsLoading(false);
    }
  };

  const createReview = async (dto: CreateReviewDto) => {
    setIsLoading(true);
    setError(null);
    try {
      const review = await reviewApi.create(dto);
      setReviews((prev) => [review, ...prev]);
      return review;
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Ошибка отправки отзыва';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteReview = async (id: string) => {
    try {
      await reviewApi.delete(id);
      setReviews((prev) => prev.filter((r) => r.id !== id));
    } catch {
      setError('Не удалось удалить отзыв');
    }
  };

  return { reviews, fetchReviews, createReview, deleteReview, isLoading, error };
}
