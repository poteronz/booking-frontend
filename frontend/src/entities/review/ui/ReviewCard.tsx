import { formatDate } from '@/shared/lib/formatDate';
import type { Review } from '../model/types';

interface ReviewCardProps {
  review: Review;
}

// Отображение звёзд рейтинга
function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${star <= rating ? 'text-yellow-400 fill-current' : 'text-muted/20 fill-current'}`}
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      ))}
    </div>
  );
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="rounded-xl border border-border bg-surface-2 p-4 transition-all duration-200 hover:border-primary/20">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/30 to-accent/20 flex items-center justify-center text-sm text-primary-fg font-semibold">
            {review.user?.name?.charAt(0) || '?'}
          </div>
          <div>
            <p className="text-sm font-medium text-white">{review.user?.name || 'Пользователь'}</p>
            <p className="text-xs text-muted">{formatDate(review.createdAt)}</p>
          </div>
        </div>
        <Stars rating={review.rating} />
      </div>
      <p className="text-sm text-muted leading-relaxed">{review.comment}</p>
    </div>
  );
}
