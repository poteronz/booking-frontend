import { useState, useEffect } from 'react';
import { Header } from '@/widgets/Header';
import { BookingList } from '@/widgets/BookingList';
import { NotificationBell } from '@/widgets/NotificationBell';
import { useAuthStore } from '@/app/store/authStore';
import { Spinner } from '@/shared/ui';
import { listingApi, ListingCard } from '@/entities/listing';
import type { Listing } from '@/entities/listing';
import { cn } from '@/shared/lib/cn';

type Tab = 'bookings' | 'notifications' | 'listings';

const roleLabels: Record<string, string> = {
  USER: 'Пользователь',
  OWNER: 'Владелец',
  ADMIN: 'Администратор',
};

export function ProfilePage() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<Tab>('bookings');
  const [myListings, setMyListings] = useState<Listing[]>([]);
  const [listingsLoading, setListingsLoading] = useState(false);

  const isOwner = user?.role === 'OWNER';

  useEffect(() => {
    if (isOwner && activeTab === 'listings') {
      setListingsLoading(true);
      listingApi
        .getMy()
        .then(setMyListings)
        .catch(() => {})
        .finally(() => setListingsLoading(false));
    }
  }, [isOwner, activeTab]);

  const tabs: { key: Tab; label: string; icon: string; show: boolean }[] = [
    { key: 'bookings', label: 'Мои бронирования', icon: '📋', show: true },
    { key: 'notifications', label: 'Уведомления', icon: '🔔', show: true },
    { key: 'listings', label: 'Мои объявления', icon: '🏠', show: isOwner },
  ];

  return (
    <div className="min-h-screen bg-surface">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-6 flex flex-col gap-6">
        {/* Профиль пользователя */}
        <div className="relative overflow-hidden rounded-2xl border border-border bg-surface-2 animate-fade-in">
          {/* Фоновый градиент */}
          <div className="h-24 bg-gradient-to-r from-primary/30 via-accent/20 to-primary/10 animate-gradient" />

          <div className="px-6 pb-6">
            <div className="flex items-end gap-4 -mt-10">
              <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-3xl text-white font-bold border-4 border-surface-2 shadow-lg">
                {user?.name?.charAt(0) || '?'}
              </div>
              <div className="pb-1">
                <h1 className="text-xl font-bold text-white">{user?.name}</h1>
                <p className="text-muted text-sm">{user?.email}</p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <span className="text-xs text-primary-fg bg-primary/10 px-3 py-1 rounded-full border border-primary/20 font-medium">
                {roleLabels[user?.role || 'USER'] || user?.role}
              </span>
              <span className="text-xs text-muted">
                На платформе с {new Date().getFullYear()} года
              </span>
            </div>
          </div>
        </div>

        {/* Табы */}
        <div className="flex gap-2 bg-surface-2 rounded-xl p-1 border border-border">
          {tabs
            .filter((t) => t.show)
            .map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  'flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-300',
                  activeTab === tab.key
                    ? 'bg-primary text-white shadow-lg shadow-primary/25'
                    : 'text-muted hover:text-white hover:bg-surface',
                )}
              >
                <span>{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
        </div>

        {/* Контент табов */}
        <div className="animate-fade-in">
          {activeTab === 'bookings' && <BookingList />}

          {activeTab === 'notifications' && (
            <div className="flex flex-col gap-3">
              <NotificationBell />
            </div>
          )}

          {activeTab === 'listings' && isOwner && (
            <div>
              {listingsLoading ? (
                <div className="flex justify-center py-8">
                  <Spinner />
                </div>
              ) : myListings.length === 0 ? (
                <div className="text-center py-12 rounded-2xl border border-border bg-surface-2">
                  <span className="text-4xl mb-3 block">🏠</span>
                  <p className="text-muted">У вас пока нет объявлений</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {myListings.map((listing) => (
                    <ListingCard key={listing.id} listing={listing} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
