import { Router, Request, Response } from 'express';
import { amenityRepository } from '../repositories/amenity.repository';
import { authMiddleware } from '../middleware/auth.middleware';
import { requireRole } from '../middleware/role.middleware';

const router = Router();

/**
 * @openapi
 * /api/amenities:
 *   get:
 *     tags: [Amenities]
 *     summary: Получить все удобства (публичный)
 *     responses:
 *       200: { description: Список удобств }
 */
router.get('/', async (_req: Request, res: Response) => {
  try {
    const amenities = await amenityRepository.findAll();
    res.json(amenities);
  } catch (error: any) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

/**
 * @openapi
 * /api/amenities:
 *   post:
 *     tags: [Amenities]
 *     summary: Создать удобство (только админ)
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
 *               icon: { type: string }
 *     responses:
 *       201: { description: Удобство создано }
 */
router.post('/', authMiddleware, requireRole('ADMIN'), async (req: Request, res: Response) => {
  try {
    const amenity = await amenityRepository.create(req.body);
    res.status(201).json(amenity);
  } catch (error: any) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

/**
 * @openapi
 * /api/amenities/{id}:
 *   delete:
 *     tags: [Amenities]
 *     summary: Удалить удобство (только админ)
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Удобство удалено }
 */
router.delete('/:id', authMiddleware, requireRole('ADMIN'), async (req: Request, res: Response) => {
  try {
    await amenityRepository.delete(req.params.id);
    res.json({ message: 'Удобство удалено' });
  } catch (error: any) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

export default router;
