import { useState } from 'react';
import { listingApi } from '@/entities/listing';
import type { CreateListingDto, Listing } from '@/entities/listing';

// Хук для CRUD операций с объявлениями
export function useListingCrud() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createListing = async (dto: CreateListingDto): Promise<Listing> => {
    setIsLoading(true);
    setError(null);
    try {
      const listing = await listingApi.create(dto);
      return listing;
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Ошибка создания объявления';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateListing = async (id: string, dto: Partial<CreateListingDto>): Promise<Listing> => {
    setIsLoading(true);
    setError(null);
    try {
      const listing = await listingApi.update(id, dto);
      return listing;
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Ошибка обновления объявления';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deactivateListing = async (id: string) => {
    try {
      await listingApi.deactivate(id);
    } catch {
      setError('Не удалось деактивировать объявление');
    }
  };

  return { createListing, updateListing, deactivateListing, isLoading, error };
}
