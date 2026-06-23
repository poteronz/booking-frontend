import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Мидлвар аутентификации — проверяет JWT из заголовка Authorization
export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Токен не предоставлен' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as {
      userId: string;
      role: string;
    };

    req.user = { userId: decoded.userId, role: decoded.role };
    next();
  } catch {
    res.status(401).json({ message: 'Невалидный или просроченный токен' });
  }
};
