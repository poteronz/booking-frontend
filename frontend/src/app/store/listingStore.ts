import { create } from 'zustand';
import type { Listing } from '@/entities/listing';

// Состояние фильтров для поиска объявлений
export interface FilterState {
  search: string;
  categoryId: string;
  minPrice: string;
  maxPrice: string;
  city: string;
}

interface ListingState {
  listings: Listing[];
  totalCount: number;
  filters: FilterState;
  isLoading: boolean;
  setListings: (listings: Listing[], totalCount?: number) => void;
  setFilter: (key: keyof FilterState, value: string) => void;
  resetFilters: () => void;
  setLoading: (isLoading: boolean) => void;
}

const defaultFilters: FilterState = {
  search: '',
  categoryId: '',
  minPrice: '',
  maxPrice: '',
  city: '',
};

export const useListingStore = create<ListingState>()((set) => ({
  listings: [],
  totalCount: 0,
  filters: { ...defaultFilters },
  isLoading: false,

  setListings: (listings, totalCount) =>
    set({ listings, totalCount: totalCount ?? listings.length }),

  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    })),

  resetFilters: () => set({ filters: { ...defaultFilters } }),

  setLoading: (isLoading) => set({ isLoading }),
}));
