import { useEffect } from 'react';
import { Spinner } from '@/shared/ui';
import { ReviewCard } from '@/entities/review';
import { ReviewForm } from '@/features/review-crud';
import { useReviewCrud } from '@/features/review-crud';
import { useAuthStore } from '@/app/store/authStore';

interface ReviewListProps {
  listingId: string;
}

// Список отзывов для конкретного объявления
export function ReviewList({ listingId }: ReviewListProps) {
  const { reviews, fetchReviews, isLoading } = useReviewCrud();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    fetchReviews(listingId);
  }, [listingId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">
        Отзывы ({reviews.length})
      </h3>

      {/* Форма отзыва для авторизованных */}
      {isAuthenticated && (
        <ReviewForm listingId={listingId} onSuccess={() => fetchReviews(listingId)} />
      )}

      {isLoading ? (
        <div className="flex justify-center py-4">
          <Spinner />
        </div>
      ) : reviews.length === 0 ? (
        <p className="text-muted text-sm">Отзывов пока нет</p>
      ) : (
        <div className="flex flex-col gap-3">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}
    </div>
  );
}
