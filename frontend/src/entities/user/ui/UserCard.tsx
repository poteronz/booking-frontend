import { Card } from '@/shared/ui';
import type { User } from '../model/types';

interface UserCardProps {
  user: User;
}

const roleLabels: Record<string, string> = {
  USER: 'Пользователь',
  OWNER: 'Владелец',
  ADMIN: 'Администратор',
};

// Карточка пользователя (для админ-панели)
export function UserCard({ user }: UserCardProps) {
  return (
    <Card className="flex items-center gap-4">
      {/* Аватар-заглушка */}
      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary-fg font-semibold">
        {user.name.charAt(0).toUpperCase()}
      </div>
      <div className="flex-1">
        <p className="font-medium">{user.name}</p>
        <p className="text-sm text-muted">{user.email}</p>
      </div>
      <span className="text-xs text-primary-fg bg-primary/10 px-2 py-1 rounded-full">
        {roleLabels[user.role] || user.role}
      </span>
    </Card>
  );
}
