import { Request, Response, NextFunction } from 'express';

// Фабрика мидлвара для проверки ролей
export const requireRole = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ message: 'Не авторизован' });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({ message: 'Недостаточно прав' });
      return;
    }

    next();
  };
};
