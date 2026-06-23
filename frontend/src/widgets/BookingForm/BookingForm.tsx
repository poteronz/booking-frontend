import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, DatePicker } from '@/shared/ui';
import { formatPrice } from '@/shared/lib/formatPrice';
import { useBookingCrud } from '@/features/booking-crud';
import { useAuthStore } from '@/app/store/authStore';
import { ROUTES } from '@/shared/config/routes';

interface BookingFormProps {
  listingId: string;
  pricePerDay: number;
  onSuccess?: () => void;
}

export function BookingForm({ listingId, pricePerDay, onSuccess }: BookingFormProps) {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const { createBooking, isLoading, error } = useBookingCrud();

  const today = new Date().toISOString().split('T')[0];
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [success, setSuccess] = useState(false);

  const { nights, totalPrice } = useMemo(() => {
    if (!dateFrom || !dateTo) return { nights: 0, totalPrice: 0 };
    const start = new Date(dateFrom);
    const end = new Date(dateTo);
    const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    if (diff <= 0) return { nights: 0, totalPrice: 0 };
    return { nights: diff, totalPrice: diff * pricePerDay };
  }, [dateFrom, dateTo, pricePerDay]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (nights <= 0) return;
    try {
      await createBooking({ listingId, dateFrom, dateTo });
      setSuccess(true);
      onSuccess?.();
      setTimeout(() => {
        setDateFrom('');
        setDateTo('');
        setSuccess(false);
      }, 3000);
    } catch {
      // ошибка обрабатывается в хуке
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="rounded-2xl border border-border bg-surface-2 p-5 text-center glow-border">
        <div className="text-3xl mb-3">🔒</div>
        <p className="text-muted mb-3">Войдите в аккаунт, чтобы забронировать</p>
        <Button size="sm" onClick={() => navigate(ROUTES.AUTH)}>
          Войти
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-surface-2 p-5 flex flex-col gap-4 glow-border">
      <h3 className="font-semibold text-lg flex items-center gap-2">
        <svg className="w-5 h-5 text-primary-fg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Забронировать
      </h3>

      {error && (
        <p className="text-sm text-destructive bg-destructive/10 p-3 rounded-xl border border-destructive/20">
          {error}
        </p>
      )}

      {success && (
        <p className="text-sm text-success bg-success/10 p-3 rounded-xl border border-success/20 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Бронирование создано!
        </p>
      )}

      <DatePicker label="Дата заезда" value={dateFrom} onChange={setDateFrom} minDate={today} />
      <DatePicker label="Дата выезда" value={dateTo} onChange={setDateTo} minDate={dateFrom || today} />

      {nights > 0 && (
        <div className="border-t border-border pt-3 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted">
              {formatPrice(pricePerDay)} x {nights} {nights === 1 ? 'сутки' : nights < 5 ? 'суток' : 'суток'}
            </span>
            <span className="text-white">{formatPrice(totalPrice)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg pt-2 border-t border-border/50">
            <span className="text-white">Итого</span>
            <span className="gradient-text">{formatPrice(totalPrice)}</span>
          </div>
        </div>
      )}

      <Button type="submit" isLoading={isLoading} disabled={nights <= 0} size="lg" className="w-full">
        {nights > 0 ? `Забронировать за ${formatPrice(totalPrice)}` : 'Выберите даты'}
      </Button>
    </form>
  );
}
