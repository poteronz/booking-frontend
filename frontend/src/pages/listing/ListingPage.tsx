import { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '@/widgets/Header';
import { BookingForm } from '@/widgets/BookingForm';
import { ReviewList } from '@/widgets/ReviewList';
import { Spinner, Button } from '@/shared/ui';
import { AmenityCard } from '@/entities/amenity';
import { listingApi } from '@/entities/listing';
import type { Listing } from '@/entities/listing';
import { formatPrice } from '@/shared/lib/formatPrice';
import { ROUTES } from '@/shared/config/routes';

export function ListingPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [listing, setListing] = useState<Listing | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    listingApi
      .getById(id)
      .then(setListing)
      .catch(() => navigate(ROUTES.HOME))
      .finally(() => setIsLoading(false));
  }, [id, navigate]);

  const amenityCount = useMemo(() => listing?.amenities?.length ?? 0, [listing]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface">
        <Header />
        <div className="flex justify-center py-20">
          <Spinner size="lg" />
        </div>
      </div>
    );
  }

  if (!listing) return null;

  return (
    <div className="min-h-screen bg-surface">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-6">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mb-4">
          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Назад
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Главное изображение */}
            <div className="rounded-2xl overflow-hidden relative min-h-[360px] border border-border animate-fade-in">
              {listing.imageUrl ? (
                <img
                  src={listing.imageUrl}
                  alt={listing.title}
                  className="w-full h-full object-cover min-h-[360px]"
                />
              ) : (
                <div className="w-full h-full min-h-[360px] bg-gradient-to-br from-primary/20 via-surface-2 to-accent/10 flex items-center justify-center">
                  <span className="text-7xl opacity-40">🏡</span>
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/30 to-transparent" />

              <div className="absolute left-0 right-0 bottom-0 p-6 flex flex-wrap items-end justify-between gap-3">
                <div className="max-w-2xl">
                  {listing.category && (
                    <span className="inline-flex items-center gap-1 rounded-full glass px-3 py-1 text-xs font-medium text-primary-fg">
                      <span>{listing.category.icon}</span>
                      <span>{listing.category.name}</span>
                    </span>
                  )}
                  <h1 className="text-2xl md:text-4xl font-bold mt-2 text-white">{listing.title}</h1>
                  {listing.city && (
                    <p className="text-muted mt-2 flex items-center gap-1.5">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {listing.city}
                      {listing.address ? ` · ${listing.address}` : ''}
                    </p>
                  )}
                </div>

                <div className="text-right">
                  <p className="text-3xl font-bold gradient-text">{formatPrice(listing.price)}</p>
                  <p className="text-sm text-muted">за сутки</p>
                </div>
              </div>
            </div>

            {/* Статистика */}
            <div className="grid grid-cols-3 gap-3 animate-fade-in-up">
              <div className="rounded-xl border border-border bg-surface-2 p-4 text-center glow-border">
                <p className="text-sm text-muted">Отзывов</p>
                <p className="text-2xl font-bold gradient-text mt-1">{listing._count?.reviews ?? 0}</p>
              </div>
              <div className="rounded-xl border border-border bg-surface-2 p-4 text-center glow-border">
                <p className="text-sm text-muted">Бронирований</p>
                <p className="text-2xl font-bold gradient-text mt-1">{listing._count?.bookings ?? 0}</p>
              </div>
              <div className="rounded-xl border border-border bg-surface-2 p-4 text-center glow-border">
                <p className="text-sm text-muted">Удобств</p>
                <p className="text-2xl font-bold gradient-text mt-1">{amenityCount}</p>
              </div>
            </div>

            {/* Описание и удобства */}
            <div className="rounded-2xl border border-border bg-surface-2 p-6 flex flex-col gap-5 animate-fade-in-up delay-200">
              <div>
                <h2 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary-fg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                  Описание
                </h2>
                <p className="text-muted leading-relaxed">{listing.description}</p>
              </div>

              {listing.amenities && listing.amenities.length > 0 && (
                <div>
                  <h2 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary-fg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Удобства
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {listing.amenities.map((amenity) => (
                      <AmenityCard key={amenity.amenity.id} amenity={amenity.amenity} />
                    ))}
                  </div>
                </div>
              )}

              {listing.owner && (
                <div className="border-t border-border pt-5">
                  <h2 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary-fg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Хозяин жилья
                  </h2>
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold">
                      {listing.owner.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-white">{listing.owner.name}</p>
                      <p className="text-sm text-muted">Проверенный хозяин</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <ReviewList listingId={listing.id} />
          </div>

          {/* Боковая панель */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 flex flex-col gap-4">
              <div className="rounded-2xl border border-border bg-surface-2 p-5 glow-border">
                <p className="text-sm text-muted">Сервис бронирования</p>
                <p className="text-lg font-semibold text-white mt-1">Проверяйте даты и цену без лишних кликов</p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted">
                  <span className="rounded-full bg-surface border border-border px-2.5 py-1 flex items-center gap-1">
                    <span>📸</span> Реальные фото
                  </span>
                  <span className="rounded-full bg-surface border border-border px-2.5 py-1 flex items-center gap-1">
                    <span>💰</span> Прозрачная цена
                  </span>
                  <span className="rounded-full bg-surface border border-border px-2.5 py-1 flex items-center gap-1">
                    <span>⚡</span> Быстро
                  </span>
                </div>
              </div>

              <BookingForm listingId={listing.id} pricePerDay={listing.price} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
