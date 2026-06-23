import { describe, it, expect, vi, beforeEach } from 'vitest';
import bcrypt from 'bcrypt';
import { authService } from '../../src/services/auth.service';
import { userRepository } from '../../src/repositories/user.repository';

// Мокаем репозиторий
vi.mock('../../src/repositories/user.repository', () => ({
  userRepository: {
    findByEmail: vi.fn(),
    findById: vi.fn(),
    create: vi.fn(),
  },
}));

vi.mock('bcrypt', () => ({
  default: {
    hash: vi.fn(),
    compare: vi.fn(),
  },
}));

const mockUser = {
  id: 'user-1',
  email: 'test@test.com',
  password: 'hashed-password',
  name: 'Иван Иванов',
  role: 'USER',
};

describe('AuthService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('register', () => {
    it('должен зарегистрировать нового пользователя', async () => {
      vi.mocked(userRepository.findByEmail).mockResolvedValue(null);
      vi.mocked(bcrypt.hash).mockResolvedValue('hashed-password' as never);
      vi.mocked(userRepository.create).mockResolvedValue(mockUser as any);

      const result = await authService.register({
        email: 'test@test.com',
        password: 'password123',
        name: 'Иван Иванов',
      });

      expect(result.user.email).toBe('test@test.com');
      expect(result.accessToken).toBeDefined();
      expect(result.refreshToken).toBeDefined();
      expect(userRepository.create).toHaveBeenCalledOnce();
    });

    it('должен выбросить ошибку при дублировании email', async () => {
      vi.mocked(userRepository.findByEmail).mockResolvedValue(mockUser as any);

      await expect(
        authService.register({
          email: 'test@test.com',
          password: 'password123',
          name: 'Иван Иванов',
        })
      ).rejects.toEqual({ status: 409, message: 'Пользователь с таким email уже существует' });
    });
  });

  describe('login', () => {
    it('должен вернуть токены при правильных данных', async () => {
      vi.mocked(userRepository.findByEmail).mockResolvedValue(mockUser as any);
      vi.mocked(bcrypt.compare).mockResolvedValue(true as never);

      const result = await authService.login('test@test.com', 'password123');

      expect(result.user.email).toBe('test@test.com');
      expect(result.accessToken).toBeDefined();
      expect(result.refreshToken).toBeDefined();
    });

    it('должен выбросить ошибку при неверном пароле', async () => {
      vi.mocked(userRepository.findByEmail).mockResolvedValue(mockUser as any);
      vi.mocked(bcrypt.compare).mockResolvedValue(false as never);

      await expect(authService.login('test@test.com', 'wrong')).rejects.toEqual({
        status: 401,
        message: 'Неверный email или пароль',
      });
    });

    it('должен выбросить ошибку если пользователь не найден', async () => {
      vi.mocked(userRepository.findByEmail).mockResolvedValue(null);

      await expect(authService.login('noone@test.com', 'pass')).rejects.toEqual({
        status: 401,
        message: 'Неверный email или пароль',
      });
    });
  });
});
