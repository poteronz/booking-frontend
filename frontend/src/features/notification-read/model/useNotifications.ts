import { useNotificationStore } from '@/app/store/notificationStore';
import { notificationApi } from '@/entities/notification';

// Хук для работы с уведомлениями
export function useNotifications() {
  const { setNotifications, markAsRead, markAllAsRead } = useNotificationStore();

  const fetchNotifications = async () => {
    try {
      const data = await notificationApi.getMy();
      setNotifications(data);
    } catch {
      // Тихо обрабатываем ошибку — уведомления не критичны
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      await notificationApi.markAsRead(id);
      markAsRead(id);
    } catch {
      // Игнорируем ошибку
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await notificationApi.markAllAsRead();
      markAllAsRead();
    } catch {
      // Игнорируем ошибку
    }
  };

  return { fetchNotifications, handleMarkAsRead, handleMarkAllAsRead };
}
