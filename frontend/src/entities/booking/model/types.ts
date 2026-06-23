import type { Listing } from '../../listing';
import type { User } from '../../user';

export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';

export interface Booking {
  id: string;
  dateFrom: string;
  dateTo: string;
  totalPrice: number;
  status: BookingStatus;
  userId: string;
  user?: User;
  listingId: string;
  listing?: Listing;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookingDto {
  listingId: string;
  dateFrom: string;
  dateTo: string;
}
