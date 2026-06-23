import { api } from '@/shared/api/axiosInstance';
import type { Review, CreateReviewDto } from '../model/types';

export const reviewApi = {
  getByListing: (listingId: string) =>
    api.get<Review[]>(`/reviews/listing/${listingId}`).then((r) => r.data),

  create: (data: CreateReviewDto) => api.post<Review>('/reviews', data).then((r) => r.data),

  update: (id: string, data: Partial<CreateReviewDto>) =>
    api.patch<Review>(`/reviews/${id}`, data).then((r) => r.data),

  delete: (id: string) => api.delete(`/reviews/${id}`),
};
