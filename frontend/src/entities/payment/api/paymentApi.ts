import { api } from '@/shared/api/axiosInstance';
import type { Payment, CreatePaymentDto, PaymentStatus } from '../model/types';

export const paymentApi = {
  getByBooking: (bookingId: string) =>
    api.get<Payment>(`/payments/booking/${bookingId}`).then((r) => r.data),

  create: (data: CreatePaymentDto) => api.post<Payment>('/payments', data).then((r) => r.data),

  updateStatus: (id: string, status: PaymentStatus) =>
    api.patch<Payment>(`/payments/${id}/status`, { status }).then((r) => r.data),
};
