import { paymentRepository } from '../repositories/payment.repository';
import { bookingRepository } from '../repositories/booking.repository';

const VALID_TRANSITIONS: Record<string, string[]> = {
  PENDING: ['COMPLETED', 'FAILED'],
  COMPLETED: ['REFUNDED'],
  FAILED: [],
  REFUNDED: [],
};

export const paymentService = {
  getById: async (id: string) => {
    const payment = await paymentRepository.findById(id);
    if (!payment) {
      throw { status: 404, message: 'Платёж не найден' };
    }
    return payment;
  },

  getByBooking: async (bookingId: string) => {
    return paymentRepository.findByBooking(bookingId);
  },

  create: async (data: { bookingId: string; method: string }) => {
    const booking = await bookingRepository.findById(data.bookingId);
    if (!booking) {
      throw { status: 404, message: 'Бронирование не найдено' };
    }

    const existing = await paymentRepository.findByBooking(data.bookingId);
    if (existing) {
      throw { status: 409, message: 'Для этого бронирования уже есть платёж' };
    }

    return paymentRepository.create({
      amount: Number(booking.totalPrice),
      method: data.method as any,
      booking: { connect: { id: data.bookingId } },
    });
  },

  updateStatus: async (id: string, status: string) => {
    const payment = await paymentRepository.findById(id);
    if (!payment) {
      throw { status: 404, message: 'Платёж не найден' };
    }

    const allowed = VALID_TRANSITIONS[payment.status];
    if (!allowed || !allowed.includes(status)) {
      throw {
        status: 400,
        message: `Нельзя изменить статус платежа с ${payment.status} на ${status}`,
      };
    }

    return paymentRepository.updateStatus(id, status);
  },
};
