import { useEffect, useState } from 'react';
import { Input, Select, Button } from '@/shared/ui';
import { useListingStore } from '@/app/store/listingStore';
import { categoryApi } from '@/entities/category';
import type { Category } from '@/entities/category';

interface SearchFiltersProps {
  onSearch: () => void;
}

// Панель фильтров для поиска объявлений
export function SearchFilters({ onSearch }: SearchFiltersProps) {
  const { filters, setFilter, resetFilters } = useListingStore();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    categoryApi.getAll().then(setCategories).catch(() => {});
  }, []);

  const handleReset = () => {
    resetFilters();
    onSearch();
  };

  return (
    <div className="rounded-2xl border border-border bg-surface-2 p-5 glow-border">
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-5 h-5 text-primary-fg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        <h3 className="font-medium text-white">Фильтры</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
        <Input
          placeholder="Поиск по названию..."
          value={filters.search}
          onChange={(e) => setFilter('search', e.target.value)}
        />
        <Input
          placeholder="Город"
          value={filters.city}
          onChange={(e) => setFilter('city', e.target.value)}
        />
        <Select
          placeholder="Все категории"
          value={filters.categoryId}
          onChange={(v) => setFilter('categoryId', v)}
          options={categories.map((c) => ({
            value: String(c.id),
            label: `${c.icon} ${c.name}`,
          }))}
        />
        <Input
          type="number"
          placeholder="Цена от"
          value={filters.minPrice}
          onChange={(e) => setFilter('minPrice', e.target.value)}
        />
        <Input
          type="number"
          placeholder="Цена до"
          value={filters.maxPrice}
          onChange={(e) => setFilter('maxPrice', e.target.value)}
        />
      </div>

      <div className="flex gap-2 mt-4">
        <Button onClick={onSearch}>
          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Найти
        </Button>
        <Button variant="ghost" onClick={handleReset}>
          Сбросить
        </Button>
      </div>
    </div>
  );
}
