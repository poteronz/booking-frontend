import { useEffect, useState } from 'react';
import { Spinner } from '@/shared/ui';
import { userApi, UserCard } from '@/entities/user';
import type { User } from '@/entities/user';

// Таблица пользователей в админ-панели
export function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    userApi
      .getAll()
      .then(setUsers)
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-lg font-semibold">Пользователи ({users.length})</h2>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
      {users.length === 0 && (
        <p className="text-muted text-sm">Нет пользователей</p>
      )}
    </div>
  );
}
