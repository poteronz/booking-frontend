import { Router, Request, Response } from 'express';
import { listingService } from '../services/listing.service';
import { authMiddleware } from '../middleware/auth.middleware';
import { requireRole } from '../middleware/role.middleware';
import { validate } from '../middleware/validate.middleware';
import { createListingSchema, updateListingSchema } from '../schemas/listing.schema';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const { search, categoryId, minPrice, maxPrice, city, page, limit } = req.query;
    const result = await listingService.getAll(
      {
        search: search as string,
        categoryId: categoryId as string,
        priceMin: minPrice ? Number(minPrice) : undefined,
        priceMax: maxPrice ? Number(maxPrice) : undefined,
        city: city as string,
      },
      parseInt(page as string) || 1,
      parseInt(limit as string) || 10,
    );
    res.json(result);
  } catch (error: any) {
    res.status(error.status || 500).json({ message: error.message || 'Ошибка сервера' });
  }
});

router.get('/my', authMiddleware, async (req: Request, res: Response) => {
  try {
    const listings = await listingService.getByOwner(req.user!.userId);
    res.json(listings);
  } catch (error: any) {
    res.status(error.status || 500).json({ message: error.message || 'Ошибка сервера' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const listing = await listingService.getById(req.params.id);
    res.json(listing);
  } catch (error: any) {
    res.status(error.status || 500).json({ message: error.message || 'Ошибка сервера' });
  }
});

router.post(
  '/',
  authMiddleware,
  requireRole('OWNER', 'ADMIN'),
  validate(createListingSchema),
  async (req: Request, res: Response) => {
    try {
      const listing = await listingService.create(req.body, req.user!.userId, req.user!.role);
      res.status(201).json(listing);
    } catch (error: any) {
      res.status(error.status || 500).json({ message: error.message || 'Ошибка сервера' });
    }
  },
);

router.patch(
  '/:id',
  authMiddleware,
  requireRole('OWNER', 'ADMIN'),
  validate(updateListingSchema),
  async (req: Request, res: Response) => {
    try {
      const listing = await listingService.update(
        req.params.id,
        req.body,
        req.user!.userId,
        req.user!.role,
      );
      res.json(listing);
    } catch (error: any) {
      res.status(error.status || 500).json({ message: error.message || 'Ошибка сервера' });
    }
  },
);

router.delete(
  '/:id',
  authMiddleware,
  requireRole('OWNER', 'ADMIN'),
  async (req: Request, res: Response) => {
    try {
      const result = await listingService.deactivate(req.params.id, req.user!.userId, req.user!.role);
      res.json(result);
    } catch (error: any) {
      res.status(error.status || 500).json({ message: error.message || 'Ошибка сервера' });
    }
  },
);

export default router;
