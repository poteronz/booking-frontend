import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/app/store/authStore';
import { ROUTES } from '@/shared/config/routes';
import type { UserRole } from '@/entities/user';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

// Защищённый маршрут — проверяет авторизацию и роль
export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuthStore();

  // Не авторизован — на страницу входа
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.AUTH} replace />;
  }

  // Нет нужной роли — на главную
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return <>{children}</>;
}
