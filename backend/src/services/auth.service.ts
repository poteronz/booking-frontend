import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userRepository } from '../repositories/user.repository';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh-secret';

// генерация пары токенов (access + refresh)
function generateTokens(userId: string, role: string) {
  const accessToken = jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ userId, role }, JWT_REFRESH_SECRET, { expiresIn: '7d' });
  return { accessToken, refreshToken };
}

export const authService = {
  // регистрация нового пользователя
  register: async (dto: { email: string; password: string; name: string }) => {
    // проверяем, не занят ли email
    const existing = await userRepository.findByEmail(dto.email);
    if (existing) {
      throw { status: 409, message: 'Пользователь с таким email уже существует' };
    }

    // хешируем пароль bcrypt с saltRounds = 10
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await userRepository.create({
      email: dto.email,
      name: dto.name,
      password: hashedPassword,
    });

    const tokens = generateTokens(user.id, user.role);

    // возвращаем пользователя без пароля + токены
    return {
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
      ...tokens,
    };
  },

  // вход — проверяем пароль и выдаём токены
  login: async (email: string, password: string) => {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw { status: 401, message: 'Неверный email или пароль' };
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw { status: 401, message: 'Неверный email или пароль' };
    }

    const tokens = generateTokens(user.id, user.role);

    return {
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
      ...tokens,
    };
  },

  // обновление access-токена по refresh
  refresh: async (refreshToken: string) => {
    try {
      const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as {
        userId: string;
        role: string;
      };

      const user = await userRepository.findById(decoded.userId);
      if (!user) {
        throw { status: 401, message: 'Пользователь не найден' };
      }

      const tokens = generateTokens(user.id, user.role);
      return tokens;
    } catch (error: any) {
      if (error.status) throw error;
      throw { status: 401, message: 'Невалидный refresh токен' };
    }
  },
};
