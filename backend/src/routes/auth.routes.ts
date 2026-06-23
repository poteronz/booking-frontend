import { Router, Request, Response } from 'express';
import { authService } from '../services/auth.service';
import { userService } from '../services/user.service';
import { validate } from '../middleware/validate.middleware';
import { authMiddleware } from '../middleware/auth.middleware';
import { registerSchema, loginSchema } from '../schemas/auth.schema';

const router = Router();

router.post('/register', validate(registerSchema), async (req: Request, res: Response) => {
  try {
    const result = await authService.register(req.body);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(error.status || 500).json({ message: error.message || 'Ошибка сервера' });
  }
});

router.post('/login', validate(loginSchema), async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.json(result);
  } catch (error: any) {
    res.status(error.status || 500).json({ message: error.message || 'Ошибка сервера' });
  }
});

router.get('/me', authMiddleware, async (req: Request, res: Response) => {
  try {
    const user = await userService.getById(req.user!.userId);
    res.json(user);
  } catch (error: any) {
    res.status(error.status || 500).json({ message: error.message || 'Ошибка сервера' });
  }
});

router.post('/logout', authMiddleware, async (_req: Request, res: Response) => {
  res.json({ message: 'Вы вышли из аккаунта' });
});

router.post('/refresh', async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      res.status(400).json({ message: 'Токен обновления обязателен' });
      return;
    }

    const tokens = await authService.refresh(refreshToken);
    res.json(tokens);
  } catch (error: any) {
    res.status(error.status || 500).json({ message: error.message || 'Ошибка сервера' });
  }
});

export default router;
