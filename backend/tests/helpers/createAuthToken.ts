import jwt from 'jsonwebtoken';

// Утилита для создания тестового JWT
export function createAuthToken(userId: string, role: string = 'USER'): string {
  return jwt.sign(
    { userId, role },
    process.env.JWT_SECRET || 'test-secret',
    { expiresIn: '15m' }
  );
}
