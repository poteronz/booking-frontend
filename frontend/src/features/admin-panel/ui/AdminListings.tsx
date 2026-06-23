import { useEffect, useState } from 'react';
import { Button, Spinner, Card } from '@/shared/ui';
import { listingApi } from '@/entities/listing';
import type { Listing } from '@/entities/listing';
import { formatPrice } from '@/shared/lib/formatPrice';

// Управление объявлениями в админ-панели
export function AdminListings() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    listingApi
      .getAll()
      .then((res) => setListings(res.data))
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  // Деактивация объявления
  const handleDeactivate = async (id: string) => {
    try {
      await listingApi.deactivate(id);
      setListings((prev) =>
        prev.map((l) => (l.id === id ? { ...l, isActive: false } : l)),
      );
    } catch {
      // Ошибка
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">Объявления ({listings.length})</h2>

      <div className="flex flex-col gap-2">
        {listings.map((listing) => (
          <Card key={listing.id} className="flex items-center justify-between">
            <div>
              <p className="font-medium">
                {listing.title}
                {!listing.isActive && (
                  <span className="text-xs text-destructive ml-2">(неактивно)</span>
                )}
              </p>
              <p className="text-sm text-muted">
                {listing.city} — {formatPrice(listing.price)}/сутки
              </p>
            </div>
            {listing.isActive && (
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDeactivate(listing.id)}
              >
                Деактивировать
              </Button>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
