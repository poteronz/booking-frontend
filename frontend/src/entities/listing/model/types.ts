import type { Category } from '../../category';
import type { User } from '../../user';

export interface ListingAmenity {
  amenity: { id: string; name: string; icon: string };
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  isActive: boolean;
  ownerId: string;
  owner?: User;
  categoryId: string;
  category?: Category;
  amenities?: ListingAmenity[];
  _count?: { reviews: number; bookings: number };
  createdAt: string;
  updatedAt: string;
  imageUrl?: string;
  city?: string;
  address?: string;
}

export interface CreateListingDto {
  title: string;
  description: string;
  price: number;
  categoryId: string;
  imageUrl?: string;
  city?: string;
  address?: string;
  amenityIds?: string[];
}

export interface ListingQueryParams {
  search?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  priceMax?: number;
  city?: string;
  page?: number;
  pageSize?: number;
}

export interface ListingListResponse {
  data: Listing[];
  total: number;
  page: number;
  pageSize: number;
}
