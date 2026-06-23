import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/widgets/Header';
import { SearchFilters } from '@/widgets/SearchFilters';
import { ListingList } from '@/widgets/ListingList';
import { useSearchFilter } from '@/features/search-filter';
import { useListingStore } from '@/app/store/listingStore';
import { categoryApi } from '@/entities/category';
import type { Category } from '@/entities/category';
import { Card } from '@/shared/ui';
import { formatPrice } from '@/shared/lib/formatPrice';
import { ROUTES } from '@/shared/config/routes';

const heroImages = [
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1920&q=80',
];

const features = [
  {
    icon: '📸',
    title: 'Реальные фотографии',
    text: 'Каждое объявление содержит настоящие фото — никаких стоковых картинок.',
  },
  {
    icon: '💰',
    title: 'Прозрачные цены',
    text: 'Стоимость за сутки видна сразу, без скрытых комиссий и доплат.',
  },
  {
    icon: '⚡',
    title: 'Мгновенное бронирование',
    text: 'Выберите даты, проверьте сумму и оформите заявку за пару кликов.',
  },
  {
    icon: '🔒',
    title: 'Безопасные платежи',
    text: 'Защищённые транзакции и подтверждение каждого бронирования.',
  },
] as const;

const stats = [
  { label: 'Городов', value: '10+' },
  { label: 'Объявлений', value: '50+' },
  { label: 'Довольных гостей', value: '200+' },
] as const;

export function HomePage() {
  const { fetchListings } = useSearchFilter();
  const { listings, totalCount } = useListingStore();
  const [categories, setCategories] = useState<Category[]>([]);
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    fetchListings();
    categoryApi.getAll().then(setCategories).catch(() => {});
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Автоматическая смена фоновой картинки героя
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const averagePrice = useMemo(() => {
    if (listings.length === 0) return 0;
    const sum = listings.reduce((acc, l) => acc + Number(l.price), 0);
    return Math.round(sum / listings.length);
  }, [listings]);

  return (
    <div className="min-h-screen bg-surface">
      <Header />

      {/* === HERO СЕКЦИЯ === */}
      <section className="relative overflow-hidden">
        {/* Фоновое изображение с плавной сменой */}
        <div className="absolute inset-0">
          {heroImages.map((src, i) => (
            <img
              key={src}
              src={src}
              alt=""
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
              style={{ opacity: i === heroIndex ? 1 : 0 }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-surface/80 via-surface/70 to-surface" />
          <div className="absolute inset-0 bg-gradient-to-r from-surface/90 via-transparent to-surface/60" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl animate-fade-in-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary-fg mb-6 animate-pulse-glow">
              <span>✨</span>
              <span>Платформа бронирования жилья по всей России</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
              <span className="text-white">Найдите </span>
              <span className="gradient-text">идеальное жильё</span>
              <br />
              <span className="text-white">для любой поездки</span>
            </h1>

            <p className="text-lg md:text-xl text-muted max-w-2xl mb-8">
              Квартиры, дома и комнаты с реальными фотографиями, честными отзывами
              и понятной ценой за сутки. Бронируйте напрямую — без посредников.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#listings"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-medium transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
              >
                Смотреть варианты
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
              <Link
                to={ROUTES.AUTH}
                className="inline-flex items-center gap-2 glass text-white px-6 py-3 rounded-xl font-medium transition-all hover:scale-105"
              >
                Зарегистрироваться
              </Link>
            </div>
          </div>

          {/* Статистика */}
          <div className="mt-16 grid grid-cols-3 gap-4 max-w-md animate-fade-in-up delay-300">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl md:text-3xl font-bold gradient-text">{stat.value}</p>
                <p className="text-sm text-muted mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Индикаторы слайдера */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setHeroIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === heroIndex ? 'w-8 bg-primary' : 'w-4 bg-white/30'
              }`}
            />
          ))}
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-12 flex flex-col gap-16">
        {/* === КАТЕГОРИИ === */}
        <section className="animate-fade-in-up">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Популярные категории</h2>
              <p className="text-muted mt-1">Выберите тип жилья, который вам подходит</p>
            </div>
            <p className="text-sm text-primary-fg hidden md:block">{categories.length} категорий</p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {categories.map((category, i) => (
              <div
                key={category.id}
                className="group relative overflow-hidden rounded-2xl border border-border bg-surface-2 p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 glow-border"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors" />
                <div className="relative">
                  <div className="h-14 w-14 rounded-2xl bg-primary/15 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                    {category.icon || '📁'}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-1">{category.name}</h3>
                  <p className="text-sm text-muted">
                    {category._count?.listings ?? 0} объектов доступно
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* === ПРЕИМУЩЕСТВА === */}
        <section>
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Почему выбирают нас</h2>
            <p className="text-muted mt-2 max-w-lg mx-auto">
              Простой и удобный сервис, созданный для комфортного бронирования жилья
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className="group text-center p-6 rounded-2xl border border-border bg-surface-2/50 hover:bg-surface-2 transition-all duration-300 hover:border-primary/30 animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-3xl mb-4 group-hover:scale-110 group-hover:bg-primary/20 transition-all">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{feature.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* === ЖИВЫЕ МЕТРИКИ === */}
        <section className="relative overflow-hidden rounded-2xl border border-border">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-surface-2 to-accent/10 animate-gradient" />
          <div className="relative grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
            <div className="p-8 text-center">
              <p className="text-4xl font-extrabold gradient-text">{totalCount}</p>
              <p className="text-muted mt-2">Доступных вариантов</p>
            </div>
            <div className="p-8 text-center">
              <p className="text-4xl font-extrabold gradient-text">{categories.length}</p>
              <p className="text-muted mt-2">Категорий жилья</p>
            </div>
            <div className="p-8 text-center">
              <p className="text-4xl font-extrabold gradient-text">
                {averagePrice ? formatPrice(averagePrice) : '—'}
              </p>
              <p className="text-muted mt-2">Средняя цена за сутки</p>
            </div>
          </div>
        </section>

        {/* === ПОИСК И КАТАЛОГ === */}
        <section id="listings" className="flex flex-col gap-6 scroll-mt-20">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Каталог жилья</h2>
            <p className="text-muted mt-1">Используйте фильтры, чтобы найти подходящий вариант</p>
          </div>
          <SearchFilters onSearch={fetchListings} />
          <ListingList />
        </section>

        {/* === CTA СЕКЦИЯ === */}
        <section className="relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1920&q=80"
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/90 to-surface/70" />
          </div>
          <div className="relative p-10 md:p-16">
            <h2 className="text-2xl md:text-4xl font-bold text-white max-w-lg">
              Готовы найти своё идеальное жильё?
            </h2>
            <p className="text-muted mt-3 max-w-md">
              Зарегистрируйтесь, чтобы бронировать жильё, оставлять отзывы и получать уведомления о новых объявлениях.
            </p>
            <Link
              to={ROUTES.AUTH}
              className="mt-6 inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-xl font-medium transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
            >
              Начать бронирование
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </section>
      </main>

      {/* === FOOTER === */}
      <footer className="border-t border-border mt-8">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xl font-bold gradient-text">BookIt</span>
              <span className="text-sm text-muted">— платформа бронирования жилья</span>
            </div>
            <p className="text-sm text-muted">
              &copy; {new Date().getFullYear()} BookIt. Учебный проект. Все данные демонстрационные.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
