// Константы маршрутов приложения
export const ROUTES = {
  HOME: '/',
  LISTING: '/listing/:id',
  listingById: (id: number | string) => `/listing/${id}`,
  PROFILE: '/profile',
  AUTH: '/auth',
  ADMIN: '/admin',
} as const;
