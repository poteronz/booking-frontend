import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/app/store/authStore';
import { LoginForm, RegisterForm } from '@/features/auth';
import { ROUTES } from '@/shared/config/routes';
import { cn } from '@/shared/lib/cn';

export function AuthPage() {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.HOME);
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Левая панель с изображением */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80"
          alt="Уютная квартира"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-surface/30 to-surface" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-surface/50" />

        <div className="relative flex flex-col justify-end p-12">
          <div className="animate-fade-in-up">
            <span className="text-3xl font-extrabold gradient-text">BookIt</span>
            <h2 className="text-3xl font-bold text-white mt-4 leading-tight">
              Найдите идеальное жильё для любой поездки
            </h2>
            <p className="text-muted mt-3 max-w-md">
              Квартиры, дома и комнаты с реальными фотографиями и прозрачными ценами.
            </p>

            <div className="flex gap-6 mt-8">
              <div>
                <p className="text-2xl font-bold text-primary-fg">10+</p>
                <p className="text-sm text-muted">Городов</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary-fg">50+</p>
                <p className="text-sm text-muted">Объявлений</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary-fg">200+</p>
                <p className="text-sm text-muted">Гостей</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Правая панель с формой */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md animate-fade-in-up">
          {/* Логотип (мобильный) */}
          <div className="text-center mb-8">
            <span className="text-3xl font-extrabold gradient-text">BookIt</span>
            <p className="text-muted mt-2">Платформа бронирования жилья</p>
          </div>

          {/* Табы */}
          <div className="flex mb-6 bg-surface-2 rounded-xl p-1 border border-border">
            <button
              onClick={() => setIsLogin(true)}
              className={cn(
                'flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-300',
                isLogin
                  ? 'bg-primary text-white shadow-lg shadow-primary/25'
                  : 'text-muted hover:text-white',
              )}
            >
              Вход
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={cn(
                'flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-300',
                !isLogin
                  ? 'bg-primary text-white shadow-lg shadow-primary/25'
                  : 'text-muted hover:text-white',
              )}
            >
              Регистрация
            </button>
          </div>

          {/* Форма */}
          <div className="bg-surface-2 border border-border rounded-2xl p-6 glow-border">
            {isLogin ? <LoginForm /> : <RegisterForm />}
          </div>

          {/* Тестовые аккаунты */}
          <div className="mt-6 p-4 rounded-xl border border-border/50 bg-surface-2/50">
            <p className="text-xs text-muted mb-2 font-medium">Тестовые аккаунты:</p>
            <div className="space-y-1 text-xs text-muted">
              <p><span className="text-primary-fg">Админ:</span> admin@booking.com / admin123</p>
              <p><span className="text-primary-fg">Владелец:</span> owner1@booking.com / password123</p>
              <p><span className="text-primary-fg">Пользователь:</span> user1@booking.com / password123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
