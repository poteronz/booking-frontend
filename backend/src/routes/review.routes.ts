import { Router, Request, Response } from 'express';
import { reviewService } from '../services/review.service';
import { authMiddleware } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { createReviewSchema, updateReviewSchema } from '../schemas/review.schema';

const router = Router();

const handleGetByListing = async (req: Request, res: Response) => {
  try {
    const listingId = (req.params.listingId || req.query.listingId) as string | undefined;
    if (!listingId) {
      res.status(400).json({ message: 'Требуется listingId' });
      return;
    }

    const reviews = await reviewService.getByListing(listingId);
    res.json(reviews);
  } catch (error: any) {
    res.status(error.status || 500).json({ message: error.message || 'Ошибка сервера' });
  }
};

router.get('/listing/:listingId', handleGetByListing);
router.get('/', handleGetByListing);

router.post('/', authMiddleware, validate(createReviewSchema), async (req: Request, res: Response) => {
  try {
    const review = await reviewService.create(req.body, req.user!.userId);
    res.status(201).json(review);
  } catch (error: any) {
    res.status(error.status || 500).json({ message: error.message || 'Ошибка сервера' });
  }
});

router.patch(
  '/:id',
  authMiddleware,
  validate(updateReviewSchema),
  async (req: Request, res: Response) => {
    try {
      const review = await reviewService.update(req.params.id, req.body, req.user!.userId);
      res.json(review);
    } catch (error: any) {
      res.status(error.status || 500).json({ message: error.message || 'Ошибка сервера' });
    }
  },
);

router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const result = await reviewService.delete(req.params.id, req.user!.userId, req.user!.role);
    res.json(result);
  } catch (error: any) {
    res.status(error.status || 500).json({ message: error.message || 'Ошибка сервера' });
  }
});

export default router;
