import { api } from '@/shared/api/axiosInstance';
import type { Booking, CreateBookingDto, BookingStatus } from '../model/types';

export const bookingApi = {
  getMy: () => api.get<Booking[]>('/bookings/my').then((r) => r.data),
  getAll: () => api.get<Booking[]>('/bookings').then((r) => r.data),
  getById: (id: string) => api.get<Booking>(`/bookings/${id}`).then((r) => r.data),
  create: (data: CreateBookingDto) => api.post<Booking>('/bookings', data).then((r) => r.data),
  updateStatus: (id: string, status: BookingStatus) =>
    api.patch<Booking>(`/bookings/${id}`, { status }).then((r) => r.data),
  cancel: (id: string) => api.delete<Booking>(`/bookings/${id}`).then((r) => r.data),
};
