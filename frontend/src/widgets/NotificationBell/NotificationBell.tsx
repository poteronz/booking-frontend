import { useEffect } from 'react';
import { useNotificationStore } from '@/app/store/notificationStore';
import { useNotifications } from '@/features/notification-read';
import { NotificationCard } from '@/entities/notification';
import { Button } from '@/shared/ui';

// Список уведомлений (отображается в профиле)
export function NotificationBell() {
  const { notifications, unreadCount } = useNotificationStore();
  const { fetchNotifications, handleMarkAsRead, handleMarkAllAsRead } = useNotifications();

  useEffect(() => {
    fetchNotifications();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex flex-col gap-3">
      {/* Заголовок с действием */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted">
          Уведомлений: {notifications.length}
          {unreadCount > 0 && (
            <span className="ml-2 text-primary-fg">({unreadCount} непрочитанных)</span>
          )}
        </p>
        {unreadCount > 0 && (
          <Button variant="ghost" size="sm" onClick={handleMarkAllAsRead}>
            Прочитать все
          </Button>
        )}
      </div>

      {/* Список уведомлений */}
      {notifications.length === 0 ? (
        <div className="text-center py-12 rounded-2xl border border-border bg-surface-2">
          <span className="text-4xl mb-3 block">🔔</span>
          <p className="text-muted">Нет уведомлений</p>
        </div>
      ) : (
        notifications.map((n) => (
          <NotificationCard
            key={n.id}
            notification={n}
            onMarkRead={handleMarkAsRead}
          />
        ))
      )}
    </div>
  );
}
