import { useEffect } from 'react';
import { useBookingStore } from '@/app/store/bookingStore';
import { BookingCard } from '@/entities/booking';
import { useBookingCrud } from '@/features/booking-crud';
import { Spinner } from '@/shared/ui';

// Список бронирований текущего пользователя
export function BookingList() {
  const { bookings } = useBookingStore();
  const { fetchMyBookings, cancelBooking, isLoading } = useBookingCrud();

  useEffect(() => {
    fetchMyBookings();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center py-12 rounded-2xl border border-border bg-surface-2">
        <span className="text-4xl mb-3 block">📋</span>
        <p className="text-muted">У вас пока нет бронирований</p>
        <p className="text-muted/50 text-sm mt-1">Перейдите в каталог, чтобы забронировать жильё</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-muted">
        Всего бронирований: {bookings.length}
      </p>
      {bookings.map((booking) => (
        <BookingCard
          key={booking.id}
          booking={booking}
          onCancel={cancelBooking}
        />
      ))}
    </div>
  );
}
