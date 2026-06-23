import { useState } from 'react';
import { paymentApi } from '@/entities/payment';
import type { Payment, CreatePaymentDto, PaymentStatus } from '@/entities/payment';

// Хук для работы с оплатой
export function usePayment() {
  const [payment, setPayment] = useState<Payment | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPayment = async (dto: CreatePaymentDto) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await paymentApi.create(dto);
      setPayment(data);
      return data;
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Ошибка создания платежа';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updatePaymentStatus = async (id: string, status: PaymentStatus) => {
    try {
      const data = await paymentApi.updateStatus(id, status);
      setPayment(data);
    } catch {
      setError('Не удалось обновить статус платежа');
    }
  };

  const fetchPayment = async (bookingId: string) => {
    setIsLoading(true);
    try {
      const data = await paymentApi.getByBooking(bookingId);
      setPayment(data);
    } catch {
      // Платёж может не существовать — это нормально
      setPayment(null);
    } finally {
      setIsLoading(false);
    }
  };

  return { payment, createPayment, updatePaymentStatus, fetchPayment, isLoading, error };
}
