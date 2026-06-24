import { useState, useEffect } from 'react';
import { Header } from '@/widgets/Header';
import { BookingList } from '@/widgets/BookingList';
import { NotificationBell } from '@/widgets/NotificationBell';
import { useAuthStore } from '@/app/store/authStore';
import { Button, Input, Spinner } from '@/shared/ui';
import { listingApi, ListingCard } from '@/entities/listing';
import { categoryApi } from '@/entities/category';
import type { Listing } from '@/entities/listing';
import type { Category } from '@/entities/category';
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
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [createForm, setCreateForm] = useState({
    title: '', description: '', price: '', city: '', address: '', imageUrl: '', categoryId: '',
  });
  const [createError, setCreateError] = useState('');
  const [creating, setCreating] = useState(false);

  const isOwner = user?.role === 'OWNER';

  const loadMyListings = () => {
    setListingsLoading(true);
    listingApi
      .getMy()
      .then(setMyListings)
      .catch(() => {})
      .finally(() => setListingsLoading(false));
  };

  useEffect(() => {
    if (isOwner && activeTab === 'listings') {
      loadMyListings();
      categoryApi.getAll().then(setCategories).catch(() => {});
    }
  }, [isOwner, activeTab]);

  const handleCreateListing = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateError('');
    if (!createForm.title || !createForm.description || !createForm.price || !createForm.categoryId) {
      setCreateError('Заполните все обязательные поля');
      return;
    }
    setCreating(true);
    try {
      await listingApi.create({
        title: createForm.title,
        description: createForm.description,
        price: Number(createForm.price),
        categoryId: createForm.categoryId,
        city: createForm.city || undefined,
        address: createForm.address || undefined,
        imageUrl: createForm.imageUrl || undefined,
      });
      setCreateForm({ title: '', description: '', price: '', city: '', address: '', imageUrl: '', categoryId: '' });
      setShowCreateForm(false);
      loadMyListings();
    } catch (err: any) {
      setCreateError(err?.response?.data?.message || 'Ошибка при создании');
    } finally {
      setCreating(false);
    }
  };

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
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">Мои объявления ({myListings.length})</h2>
                <Button size="sm" onClick={() => setShowCreateForm(!showCreateForm)}>
                  {showCreateForm ? 'Отмена' : '+ Создать объявление'}
                </Button>
              </div>

              {showCreateForm && (
                <form onSubmit={handleCreateListing} className="flex flex-col gap-3 p-4 rounded-2xl border border-border bg-surface-2">
                  <h3 className="text-sm font-semibold text-white">Новое объявление</h3>
                  {createError && <p className="text-sm text-destructive">{createError}</p>}
                  <Input placeholder="Название *" value={createForm.title} onChange={(e) => setCreateForm(f => ({ ...f, title: e.target.value }))} />
                  <textarea
                    placeholder="Описание (мин. 10 символов) *"
                    className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm text-white placeholder:text-muted focus:outline-none focus:border-primary"
                    rows={3}
                    value={createForm.description}
                    onChange={(e) => setCreateForm(f => ({ ...f, description: e.target.value }))}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <Input placeholder="Цена за сутки *" type="number" value={createForm.price} onChange={(e) => setCreateForm(f => ({ ...f, price: e.target.value }))} />
                    <select
                      className="bg-surface border border-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
                      value={createForm.categoryId}
                      onChange={(e) => setCreateForm(f => ({ ...f, categoryId: e.target.value }))}
                    >
                      <option value="">Категория *</option>
                      {categories.map(c => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Input placeholder="Город" value={createForm.city} onChange={(e) => setCreateForm(f => ({ ...f, city: e.target.value }))} />
                    <Input placeholder="Адрес" value={createForm.address} onChange={(e) => setCreateForm(f => ({ ...f, address: e.target.value }))} />
                  </div>
                  <Input placeholder="URL изображения" value={createForm.imageUrl} onChange={(e) => setCreateForm(f => ({ ...f, imageUrl: e.target.value }))} />
                  <Button type="submit" disabled={creating}>{creating ? 'Создание...' : 'Создать'}</Button>
                </form>
              )}

              {listingsLoading ? (
                <div className="flex justify-center py-8">
                  <Spinner />
                </div>
              ) : myListings.length === 0 && !showCreateForm ? (
                <div className="text-center py-12 rounded-2xl border border-border bg-surface-2">
                  <span className="text-4xl mb-3 block">🏠</span>
                  <p className="text-muted">У вас пока нет объявлений</p>
                  <p className="text-sm text-muted mt-1">Нажмите «Создать объявление» выше</p>
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
