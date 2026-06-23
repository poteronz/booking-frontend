import type { User } from '../../user';

export interface Review {
  id: string;
  rating: number;
  comment: string;
  userId: string;
  user?: User;
  listingId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateReviewDto {
  listingId: string;
  rating: number;
  comment: string;
}
