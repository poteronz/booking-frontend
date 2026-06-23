import { useState } from 'react';
import { Button, Input } from '@/shared/ui';
import { useAuth } from '../model/useAuth';

// Форма входа
export function LoginForm() {
  const { login, isLoading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });
    } catch {
      // Ошибка обрабатывается в хуке
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Вход</h2>

      {error && (
        <p className="text-sm text-destructive bg-destructive/10 p-2 rounded-lg">
          {error}
        </p>
      )}

      <Input
        label="Email"
        type="email"
        placeholder="user@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <Input
        label="Пароль"
        type="password"
        placeholder="Введите пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <Button type="submit" isLoading={isLoading}>
        Войти
      </Button>
    </form>
  );
}
