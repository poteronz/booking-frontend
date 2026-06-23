import { useState } from 'react';
import { Header } from '@/widgets/Header';
import { AdminUsers, AdminCategories, AdminListings } from '@/features/admin-panel';
import { cn } from '@/shared/lib/cn';

type AdminTab = 'users' | 'categories' | 'listings';

export function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>('users');

  const tabs: { key: AdminTab; label: string; icon: string }[] = [
    { key: 'users', label: 'Пользователи', icon: '👥' },
    { key: 'categories', label: 'Категории', icon: '📂' },
    { key: 'listings', label: 'Объявления', icon: '🏠' },
  ];

  return (
    <div className="min-h-screen bg-surface">
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-6 flex flex-col gap-6">
        <div className="animate-fade-in">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <svg className="w-6 h-6 text-primary-fg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Панель администратора
          </h1>
          <p className="text-muted mt-1">Управление пользователями, категориями и объявлениями</p>
        </div>

        {/* Табы */}
        <div className="flex gap-2 bg-surface-2 rounded-xl p-1 border border-border">
          {tabs.map((tab) => (
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
              {tab.label}
            </button>
          ))}
        </div>

        <div className="animate-fade-in">
          {activeTab === 'users' && <AdminUsers />}
          {activeTab === 'categories' && <AdminCategories />}
          {activeTab === 'listings' && <AdminListings />}
        </div>
      </main>
    </div>
  );
}
