import { api } from '@/shared/api/axiosInstance';
import type {
  Listing,
  CreateListingDto,
  ListingQueryParams,
  ListingListResponse,
} from '../model/types';

export const listingApi = {
  getAll: (params?: ListingQueryParams) =>
    api.get<ListingListResponse>('/listings', { params }).then((r) => r.data),

  getById: (id: string) => api.get<Listing>(`/listings/${id}`).then((r) => r.data),

  create: (data: CreateListingDto) => api.post<Listing>('/listings', data).then((r) => r.data),

  update: (id: string, data: Partial<CreateListingDto>) =>
    api.patch<Listing>(`/listings/${id}`, data).then((r) => r.data),

  deactivate: (id: string) => api.delete<Listing>(`/listings/${id}`).then((r) => r.data),

  getMy: () => api.get<Listing[]>('/listings/my').then((r) => r.data),
};
