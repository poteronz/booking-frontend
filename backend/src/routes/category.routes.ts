import { Router, Request, Response } from 'express';
import { categoryService } from '../services/category.service';
import { authMiddleware } from '../middleware/auth.middleware';
import { requireRole } from '../middleware/role.middleware';
import { validate } from '../middleware/validate.middleware';
import { createCategorySchema, updateCategorySchema } from '../schemas/category.schema';

const router = Router();

/**
 * @openapi
 * /api/categories:
 *   get:
 *     tags: [Categories]
 *     summary: Получить все категории (публичный)
 *     responses:
 *       200: { description: Список категорий }
 */
router.get('/', async (_req: Request, res: Response) => {
  try {
    const categories = await categoryService.getAll();
    res.json(categories);
  } catch (error: any) {
    res.status(error.status || 500).json({ message: error.message || 'Ошибка сервера' });
  }
});

/**
 * @openapi
 * /api/categories:
 *   post:
 *     tags: [Categories]
 *     summary: Создать категорию (только админ)
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name: { type: string }
 *               description: { type: string }
 *               icon: { type: string }
 *     responses:
 *       201: { description: Категория создана }
 */
router.post(
  '/',
  authMiddleware,
  requireRole('ADMIN'),
  validate(createCategorySchema),
  async (req: Request, res: Response) => {
    try {
      const category = await categoryService.create(req.body);
      res.status(201).json(category);
    } catch (error: any) {
      res.status(error.status || 500).json({ message: error.message || 'Ошибка сервера' });
    }
  }
);

/**
 * @openapi
 * /api/categories/{id}:
 *   patch:
 *     tags: [Categories]
 *     summary: Обновить категорию (только админ)
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Категория обновлена }
 */
router.patch(
  '/:id',
  authMiddleware,
  requireRole('ADMIN'),
  validate(updateCategorySchema),
  async (req: Request, res: Response) => {
    try {
      const category = await categoryService.update(req.params.id, req.body);
      res.json(category);
    } catch (error: any) {
      res.status(error.status || 500).json({ message: error.message || 'Ошибка сервера' });
    }
  }
);

/**
 * @openapi
 * /api/categories/{id}:
 *   delete:
 *     tags: [Categories]
 *     summary: Удалить категорию (только админ)
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Категория удалена }
 */
router.delete(
  '/:id',
  authMiddleware,
  requireRole('ADMIN'),
  async (req: Request, res: Response) => {
    try {
      const result = await categoryService.delete(req.params.id);
      res.json(result);
    } catch (error: any) {
      res.status(error.status || 500).json({ message: error.message || 'Ошибка сервера' });
    }
  }
);

export default router;
