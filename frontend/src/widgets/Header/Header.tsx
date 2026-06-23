import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/app/store/authStore';
import { useNotificationStore } from '@/app/store/notificationStore';
import { Button } from '@/shared/ui';
import { ROUTES } from '@/shared/config/routes';

// Шапка приложения с навигацией
export function Header() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const { unreadCount } = useNotificationStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.HOME);
  };

  return (
    <header className="sticky top-0 z-40 glass border-b border-border/50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Логотип */}
        <Link to={ROUTES.HOME} className="flex items-center gap-2 group">
          <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
            <span className="text-primary-fg font-bold text-sm">B</span>
          </div>
          <span className="text-xl font-bold gradient-text">BookIt</span>
        </Link>

        {/* Навигация */}
        <nav className="flex items-center gap-3">
          <Link
            to={ROUTES.HOME}
            className="text-sm text-muted hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-surface-2"
          >
            Главная
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                to={ROUTES.PROFILE}
                className="text-sm text-muted hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-surface-2"
              >
                Профиль
              </Link>

              {/* Колокольчик уведомлений */}
              <Link
                to={ROUTES.PROFILE}
                className="relative text-muted hover:text-white p-2 rounded-lg hover:bg-surface-2 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                {unreadCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 h-4 w-4 rounded-full bg-destructive text-[10px] text-white flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </Link>

              {/* Аватар пользователя */}
              <div className="flex items-center gap-2 pl-1">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm text-white font-semibold">
                  {user?.name?.charAt(0) || '?'}
                </div>
                <span className="text-sm text-muted hidden md:block">{user?.name}</span>
              </div>

              {/* Ссылка на админку для ADMIN */}
              {user?.role === 'ADMIN' && (
                <Link
                  to={ROUTES.ADMIN}
                  className="text-sm text-primary-fg hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-surface-2"
                >
                  Админ
                </Link>
              )}

              <Button variant="ghost" size="sm" onClick={handleLogout}>
                Выйти
              </Button>
            </>
          ) : (
            <Link to={ROUTES.AUTH}>
              <Button size="sm">Войти</Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
