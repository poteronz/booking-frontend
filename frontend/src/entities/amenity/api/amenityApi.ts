import { api } from '@/shared/api/axiosInstance';
import type { Amenity } from '../model/types';

export const amenityApi = {
  getAll: () =>
    api.get<Amenity[]>('/amenities').then((r) => r.data),

  getById: (id: string) =>
    api.get<Amenity>(`/amenities/${id}`).then((r) => r.data),
};
