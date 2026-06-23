import { Router, Request, Response } from 'express';
import { notificationService } from '../services/notification.service';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

/**
 * @openapi
 * /api/notifications:
 *   get:
 *     tags: [Notifications]
 *     summary: Получить уведомления текущего пользователя
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 20 }
 *     responses:
 *       200: { description: Список уведомлений }
 */
router.get('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const result = await notificationService.getByUser(req.user!.userId, page, limit);
    res.json(result);
  } catch (error: any) {
    res.status(error.status || 500).json({ message: error.message || 'Ошибка сервера' });
  }
});

/**
 * @openapi
 * /api/notifications/{id}/read:
 *   patch:
 *     tags: [Notifications]
 *     summary: Пометить уведомление как прочитанное
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Уведомление прочитано }
 */
router.patch('/:id/read', authMiddleware, async (req: Request, res: Response) => {
  try {
    const notification = await notificationService.markAsRead(req.params.id, req.user!.userId);
    res.json(notification);
  } catch (error: any) {
    res.status(error.status || 500).json({ message: error.message || 'Ошибка сервера' });
  }
});

/**
 * @openapi
 * /api/notifications/read-all:
 *   patch:
 *     tags: [Notifications]
 *     summary: Пометить все уведомления как прочитанные
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200: { description: Все уведомления прочитаны }
 */
router.patch('/read-all', authMiddleware, async (req: Request, res: Response) => {
  try {
    const result = await notificationService.markAllAsRead(req.user!.userId);
    res.json(result);
  } catch (error: any) {
    res.status(error.status || 500).json({ message: error.message || 'Ошибка сервера' });
  }
});

/**
 * @openapi
 * /api/notifications/{id}:
 *   delete:
 *     tags: [Notifications]
 *     summary: Удалить уведомление
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Уведомление удалено }
 */
router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const result = await notificationService.delete(req.params.id, req.user!.userId);
    res.json(result);
  } catch (error: any) {
    res.status(error.status || 500).json({ message: error.message || 'Ошибка сервера' });
  }
});

export default router;
