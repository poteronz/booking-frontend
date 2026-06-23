import { useState } from 'react';
import { Button, Input } from '@/shared/ui';
import { useAuth } from '../model/useAuth';

export function RegisterForm() {
  const { register, isLoading, error } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register({ name, email, password });
    } catch {
      // handled in hook
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Регистрация</h2>

      {error && <p className="text-sm text-destructive bg-destructive/10 p-2 rounded-lg">{error}</p>}

      <Input label="Имя" placeholder="Иван Иванов" value={name} onChange={(e) => setName(e.target.value)} required />
      <Input label="Email" type="email" placeholder="user@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <Input
        label="Пароль"
        type="password"
        placeholder="Минимум 6 символов"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength={6}
      />

      <Button type="submit" isLoading={isLoading}>
        Зарегистрироваться
      </Button>
    </form>
  );
}
