import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from '@/shared/config/routes';
import { ProtectedRoute } from './ProtectedRoute';

import { HomePage } from '@/pages/home';
import { ListingPage } from '@/pages/listing';
import { ProfilePage } from '@/pages/profile';
import { AuthPage } from '@/pages/auth';
import { AdminPage } from '@/pages/admin';

// Маршруты приложения
export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <HomePage />,
  },
  {
    path: ROUTES.LISTING,
    element: <ListingPage />,
  },
  {
    path: ROUTES.PROFILE,
    element: (
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.AUTH,
    element: <AuthPage />,
  },
  {
    path: ROUTES.ADMIN,
    element: (
      <ProtectedRoute allowedRoles={['ADMIN']}>
        <AdminPage />
      </ProtectedRoute>
    ),
  },
]);
