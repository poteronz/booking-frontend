import { useCallback } from 'react';
import { useListingStore } from '@/app/store/listingStore';
import { listingApi } from '@/entities/listing';
import type { ListingQueryParams } from '@/entities/listing';

// Хук для поиска и фильтрации объявлений
export function useSearchFilter() {
  const { filters, setFilter, resetFilters, setListings, setLoading } = useListingStore();

  // Загрузить объявления с текущими фильтрами
  const fetchListings = useCallback(async () => {
    setLoading(true);
    try {
      const params: ListingQueryParams = {};
      if (filters.search) params.search = filters.search;
      if (filters.categoryId) params.categoryId = filters.categoryId;
      if (filters.minPrice) params.minPrice = Number(filters.minPrice);
      if (filters.maxPrice) params.maxPrice = Number(filters.maxPrice);
      if (filters.city) params.city = filters.city;

      const res = await listingApi.getAll(params);
      setListings(res.data, res.total);
    } catch {
      setListings([], 0);
    } finally {
      setLoading(false);
    }
  }, [filters, setListings, setLoading]);

  return { filters, setFilter, resetFilters, fetchListings };
}
