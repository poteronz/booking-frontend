import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../../src/app';
import { authService } from '../../src/services/auth.service';

vi.mock('../../src/services/auth.service', () => ({
  authService: {
    register: vi.fn(),
    login: vi.fn(),
    refresh: vi.fn(),
  },
}));

describe('Auth Router', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('POST /api/auth/login', () => {
    it('должен вернуть 200 и токены при успешном входе', async () => {
      const mockResponse = {
        user: { id: 'user-1', email: 'test@test.com', name: 'Иван Иванов', role: 'USER' },
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token',
      };

      vi.mocked(authService.login).mockResolvedValue(mockResponse);

      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'test@test.com', password: 'password123' });

      expect(res.status).toBe(200);
      expect(res.body.accessToken).toBe('mock-access-token');
      expect(res.body.user.email).toBe('test@test.com');
    });

    it('должен вернуть 401 при неверных данных', async () => {
      vi.mocked(authService.login).mockRejectedValue({
        status: 401,
        message: 'Неверный email или пароль',
      });

      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'test@test.com', password: 'wrong' });

      expect(res.status).toBe(401);
      expect(res.body.message).toBe('Неверный email или пароль');
    });
  });
});
