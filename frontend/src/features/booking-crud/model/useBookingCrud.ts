import { useState } from 'react';
import { useBookingStore } from '@/app/store/bookingStore';
import { bookingApi } from '@/entities/booking';
import type { CreateBookingDto } from '@/entities/booking';

// Хук для CRUD операций с бронированиями
export function useBookingCrud() {
  const { setBookings, addBooking, updateBooking } = useBookingStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Получить мои бронирования
  const fetchMyBookings = async () => {
    setIsLoading(true);
    try {
      const data = await bookingApi.getMy();
      setBookings(data);
    } catch {
      setError('Не удалось загрузить бронирования');
    } finally {
      setIsLoading(false);
    }
  };

  // Создать бронирование
  const createBooking = async (dto: CreateBookingDto) => {
    setIsLoading(true);
    setError(null);
    try {
      const booking = await bookingApi.create(dto);
      addBooking(booking);
      return booking;
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Ошибка создания бронирования';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Отменить бронирование
  const cancelBooking = async (id: string) => {
    try {
      const updated = await bookingApi.cancel(id);
      updateBooking(id, updated);
    } catch {
      setError('Не удалось отменить бронирование');
    }
  };

  return { fetchMyBookings, createBooking, cancelBooking, isLoading, error };
}
