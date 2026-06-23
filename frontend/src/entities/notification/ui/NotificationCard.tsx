import { cn } from '@/shared/lib/cn';
import { formatDate } from '@/shared/lib/formatDate';
import type { Notification } from '../model/types';

interface NotificationCardProps {
  notification: Notification;
  onMarkRead?: (id: string) => void;
}

const typeIcons: Record<string, string> = {
  BOOKING_CONFIRMED: '✅',
  BOOKING_CANCELLED: '❌',
  PAYMENT_RECEIVED: '💰',
  NEW_REVIEW: '⭐',
  SYSTEM: '🔔',
};

export function NotificationCard({ notification, onMarkRead }: NotificationCardProps) {
  return (
    <div
      className={cn(
        'flex gap-3 p-4 rounded-xl border transition-all duration-200 cursor-pointer',
        notification.isRead
          ? 'bg-surface-2/50 border-border/50 hover:border-border'
          : 'bg-surface-2 border-primary/30 hover:border-primary/50 glow-border',
      )}
      onClick={() => !notification.isRead && onMarkRead?.(notification.id)}
    >
      <div className="text-xl shrink-0 mt-0.5">
        {typeIcons[notification.type] || '🔔'}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className={cn(
            'text-sm leading-relaxed',
            notification.isRead ? 'text-muted' : 'text-white',
          )}>
            {notification.message}
          </p>
          {!notification.isRead && (
            <span className="h-2.5 w-2.5 rounded-full bg-primary shrink-0 mt-1.5 animate-pulse" />
          )}
        </div>
        <p className="text-xs text-muted/60 mt-1">{formatDate(notification.createdAt)}</p>
      </div>
    </div>
  );
}
