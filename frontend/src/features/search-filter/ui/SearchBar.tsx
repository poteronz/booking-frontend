import { Input } from '@/shared/ui';
import { useListingStore } from '@/app/store/listingStore';

// Поисковая строка для фильтрации объявлений
export function SearchBar() {
  const { filters, setFilter } = useListingStore();

  return (
    <Input
      placeholder="Поиск по названию или городу..."
      value={filters.search}
      onChange={(e) => setFilter('search', e.target.value)}
    />
  );
}
