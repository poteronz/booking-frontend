import { describe, it, expect, vi, beforeEach } from 'vitest';
import { paymentService } from '../../src/services/payment.service';
import { paymentRepository } from '../../src/repositories/payment.repository';

vi.mock('../../src/repositories/payment.repository', () => ({
  paymentRepository: {
    findById: vi.fn(),
    findByBooking: vi.fn(),
    create: vi.fn(),
    updateStatus: vi.fn(),
  },
}));

const mockPayment = {
  id: 'payment-1',
  amount: 12000,
  method: 'CARD',
  status: 'PENDING',
  bookingId: 'booking-1',
  booking: { id: 'booking-1' },
};

describe('PaymentService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('updateStatus', () => {
    it('должен перевести PENDING -> COMPLETED', async () => {
      vi.mocked(paymentRepository.findById).mockResolvedValue(mockPayment as any);
      vi.mocked(paymentRepository.updateStatus).mockResolvedValue({
        ...mockPayment,
        status: 'COMPLETED',
      } as any);

      const result = await paymentService.updateStatus('payment-1', 'COMPLETED');
      expect(result.status).toBe('COMPLETED');
    });

    it('должен запретить невалидный переход PENDING -> REFUNDED', async () => {
      vi.mocked(paymentRepository.findById).mockResolvedValue(mockPayment as any);

      await expect(paymentService.updateStatus('payment-1', 'REFUNDED')).rejects.toEqual({
        status: 400,
        message: 'Нельзя изменить статус платежа с PENDING на REFUNDED',
      });
    });

    it('должен запретить переход из FAILED', async () => {
      vi.mocked(paymentRepository.findById).mockResolvedValue({
        ...mockPayment,
        status: 'FAILED',
      } as any);

      await expect(paymentService.updateStatus('payment-1', 'COMPLETED')).rejects.toEqual({
        status: 400,
        message: 'Нельзя изменить статус платежа с FAILED на COMPLETED',
      });
    });
  });
});
