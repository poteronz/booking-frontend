import { Router, Request, Response } from 'express';
import { userService } from '../services/user.service';
import { authMiddleware } from '../middleware/auth.middleware';
import { requireRole } from '../middleware/role.middleware';

const router = Router();

/**
 * @openapi
 * /api/users:
 *   get:
 *     tags: [Users]
 *     summary: Получить список пользователей (только админ)
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *     responses:
 *       200: { description: Список пользователей }
 */
router.get('/', authMiddleware, requireRole('ADMIN'), async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const result = await userService.getAll(page, limit);
    res.json(result);
  } catch (error: any) {
    res.status(error.status || 500).json({ message: error.message || 'Ошибка сервера' });
  }
});

/**
 * @openapi
 * /api/users/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Получить пользователя по ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Данные пользователя }
 *       404: { description: Не найден }
 */
router.get('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const user = await userService.getById(req.params.id);
    res.json(user);
  } catch (error: any) {
    res.status(error.status || 500).json({ message: error.message || 'Ошибка сервера' });
  }
});

/**
 * @openapi
 * /api/users/{id}:
 *   patch:
 *     tags: [Users]
 *     summary: Обновить профиль пользователя
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName: { type: string }
 *               lastName: { type: string }
 *               phone: { type: string }
 *               avatar: { type: string }
 *     responses:
 *       200: { description: Профиль обновлён }
 *       403: { description: Нет прав }
 */
router.patch('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const user = await userService.update(
      req.params.id,
      req.body,
      req.user!.userId,
      req.user!.role
    );
    res.json(user);
  } catch (error: any) {
    res.status(error.status || 500).json({ message: error.message || 'Ошибка сервера' });
  }
});

/**
 * @openapi
 * /api/users/{id}:
 *   delete:
 *     tags: [Users]
 *     summary: Удалить пользователя (только админ)
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Пользователь удалён }
 */
router.delete('/:id', authMiddleware, requireRole('ADMIN'), async (req: Request, res: Response) => {
  try {
    const result = await userService.delete(req.params.id);
    res.json(result);
  } catch (error: any) {
    res.status(error.status || 500).json({ message: error.message || 'Ошибка сервера' });
  }
});

export default router;
