import { useListingStore } from '@/app/store/listingStore';
import { ListingCard } from '@/entities/listing';
import { Spinner } from '@/shared/ui';

// Сетка карточек объявлений
export function ListingList() {
  const { listings, isLoading, totalCount } = useListingStore();

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner size="lg" />
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <div className="text-center py-16 rounded-2xl border border-border bg-surface-2">
        <span className="text-5xl mb-4 block">🔍</span>
        <p className="text-lg text-muted">Ничего не найдено</p>
        <p className="text-muted/50 text-sm mt-1">
          Попробуйте изменить параметры поиска или сбросить фильтры
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between gap-3 text-sm text-muted">
        <p>
          Найдено <span className="text-primary-fg font-medium">{totalCount}</span> вариантов
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {listings.map((listing, i) => (
          <div
            key={listing.id}
            className="animate-fade-in-up"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <ListingCard listing={listing} />
          </div>
        ))}
      </div>
    </div>
  );
}
