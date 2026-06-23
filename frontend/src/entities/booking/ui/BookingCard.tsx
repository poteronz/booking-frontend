import { useState } from 'react';
import { Badge } from '@/shared/ui';
import { formatDate } from '@/shared/lib/formatDate';
import { formatPrice } from '@/shared/lib/formatPrice';
import type { Booking } from '../model/types';

interface BookingCardProps {
  booking: Booking;
  onCancel?: (id: string) => void;
}

export function BookingCard({ booking, onCancel }: BookingCardProps) {
  const [cancelling, setCancelling] = useState(false);

  const handleCancel = async () => {
    if (!onCancel) return;
    setCancelling(true);
    try {
      await onCancel(booking.id);
    } finally {
      setCancelling(false);
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-surface-2 overflow-hidden transition-all duration-300 hover:border-primary/30 glow-border">
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-white truncate">
              {booking.listing?.title || `Бронирование #${booking.id.slice(0, 8)}`}
            </h3>
            <div className="flex items-center gap-2 mt-2 text-sm text-muted">
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{formatDate(booking.dateFrom)} — {formatDate(booking.dateTo)}</span>
            </div>
          </div>
          <Badge status={booking.status} />
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
          <div>
            <p className="text-xs text-muted">Итого</p>
            <p className="text-xl font-bold gradient-text">
              {formatPrice(booking.totalPrice)}
            </p>
          </div>
          {booking.status === 'PENDING' && onCancel && (
            <button
              onClick={handleCancel}
              disabled={cancelling}
              className="flex items-center gap-1.5 text-sm text-destructive hover:text-white hover:bg-destructive px-3 py-1.5 rounded-lg border border-destructive/30 transition-all duration-200 disabled:opacity-50"
            >
              {cancelling ? (
                <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
              ) : (
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
              Отменить
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
