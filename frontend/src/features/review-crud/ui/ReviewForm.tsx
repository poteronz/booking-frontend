import { useState } from 'react';
import { Button, Input } from '@/shared/ui';
import { useReviewCrud } from '../model/useReviewCrud';

interface ReviewFormProps {
  listingId: string;
  onSuccess?: () => void;
}

export function ReviewForm({ listingId, onSuccess }: ReviewFormProps) {
  const { createReview, isLoading, error } = useReviewCrud();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createReview({ listingId, rating, comment });
      setComment('');
      setRating(5);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      onSuccess?.();
    } catch {
      // ошибка обрабатывается в хуке
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-surface-2 p-4 flex flex-col gap-3">
      <h3 className="font-semibold flex items-center gap-2">
        <span>✍️</span> Оставить отзыв
      </h3>

      {error && (
        <p className="text-sm text-destructive bg-destructive/10 p-2 rounded-lg border border-destructive/20">
          {error}
        </p>
      )}

      {success && (
        <p className="text-sm text-success bg-success/10 p-2 rounded-lg border border-success/20">
          Отзыв отправлен!
        </p>
      )}

      {/* Выбор рейтинга */}
      <div>
        <p className="text-xs text-muted mb-1.5">Ваша оценка</p>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className="transition-all duration-200 hover:scale-125"
            >
              <svg
                className={`w-7 h-7 ${star <= rating ? 'text-yellow-400 fill-current' : 'text-muted/20 fill-current'}`}
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
            </button>
          ))}
        </div>
      </div>

      <Input
        placeholder="Расскажите о вашем опыте..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
      />

      <Button type="submit" size="sm" isLoading={isLoading}>
        Отправить отзыв
      </Button>
    </form>
  );
}
