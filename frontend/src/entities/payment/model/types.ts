export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
export type PaymentMethod = 'CARD' | 'CASH' | 'ONLINE';

export interface Payment {
  id: string;
  amount: number;
  status: PaymentStatus;
  method: PaymentMethod;
  bookingId: string;
  createdAt: string;
}

export interface CreatePaymentDto {
  bookingId: string;
  method: PaymentMethod;
}
