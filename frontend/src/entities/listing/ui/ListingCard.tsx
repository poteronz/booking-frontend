import { Link } from 'react-router-dom';
import { formatPrice } from '@/shared/lib/formatPrice';
import { ROUTES } from '@/shared/config/routes';
import type { Listing } from '../model/types';

interface ListingCardProps {
  listing: Listing;
}

export function ListingCard({ listing }: ListingCardProps) {
  const amenities = listing.amenities?.slice(0, 3) ?? [];
  const reviewCount = listing._count?.reviews ?? 0;

  return (
    <Link to={ROUTES.listingById(listing.id)} className="block h-full group">
      <div className="h-full overflow-hidden rounded-2xl border border-border bg-surface-2 transition-all duration-300 group-hover:border-primary/50 group-hover:-translate-y-2 group-hover:shadow-xl group-hover:shadow-primary/5 glow-border">
        {/* Изображение */}
        <div className="relative h-56 bg-surface-3 overflow-hidden">
          {listing.imageUrl ? (
            <img
              src={listing.imageUrl}
              alt={listing.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 via-surface-2 to-accent/10 flex items-center justify-center">
              <span className="text-6xl opacity-40">🏠</span>
            </div>
          )}

          {/* Градиентная тень снизу */}
          <div className="absolute inset-0 bg-gradient-to-t from-surface-2 via-transparent to-transparent opacity-60" />

          {/* Бейджи сверху */}
          <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
            <div className="flex flex-wrap gap-2">
              {listing.category && (
                <span className="inline-flex items-center gap-1 rounded-full glass px-2.5 py-1 text-xs font-medium text-primary-fg">
                  <span>{listing.category.icon}</span>
                  <span>{listing.category.name}</span>
                </span>
              )}
            </div>
            {reviewCount > 0 && (
              <span className="rounded-full glass px-2.5 py-1 text-xs text-yellow-400 flex items-center gap-1">
                <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
                {reviewCount}
              </span>
            )}
          </div>

          {/* Город внизу картинки */}
          {listing.city && (
            <div className="absolute bottom-3 left-3">
              <span className="inline-flex items-center gap-1.5 text-sm text-white/90">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {listing.city}
                {listing.address ? ` · ${listing.address}` : ''}
              </span>
            </div>
          )}
        </div>

        {/* Контент */}
        <div className="p-4 flex flex-col gap-3">
          <div className="min-h-[68px]">
            <h3 className="font-semibold text-white line-clamp-1 group-hover:text-primary-fg transition-colors">
              {listing.title}
            </h3>
            <p className="text-sm text-muted mt-1 line-clamp-2 leading-relaxed">
              {listing.description}
            </p>
          </div>

          {/* Удобства */}
          {amenities.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {amenities.map((item) => (
                <span
                  key={item.amenity.id}
                  className="rounded-full bg-surface border border-border px-2 py-0.5 text-xs text-muted"
                >
                  {item.amenity.icon} {item.amenity.name}
                </span>
              ))}
            </div>
          )}

          {/* Цена и инфо */}
          <div className="flex items-end justify-between gap-3 pt-2 border-t border-border/50">
            <div>
              <p className="text-2xl font-bold gradient-text">{formatPrice(listing.price)}</p>
              <p className="text-xs text-muted">за сутки</p>
            </div>
            <span className="text-xs text-muted bg-surface rounded-full px-2.5 py-1 border border-border/50 opacity-0 group-hover:opacity-100 transition-opacity">
              Подробнее →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
