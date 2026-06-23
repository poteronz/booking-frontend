import { Router, Request, Response } from 'express';
import { bookingService } from '../services/booking.service';
import { authMiddleware } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { createBookingSchema, updateBookingSchema } from '../schemas/booking.schema';

const router = Router();

const getCurrentUserBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await bookingService.getByUser(req.user!.userId);
    res.json(bookings);
  } catch (error: any) {
    res.status(error.status || 500).json({ message: error.message || 'Ошибка сервера' });
  }
};

router.get('/my', authMiddleware, getCurrentUserBookings);
router.get('/', authMiddleware, getCurrentUserBookings);

router.get('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const booking = await bookingService.getById(req.params.id, req.user!.userId, req.user!.role);
    res.json(booking);
  } catch (error: any) {
    res.status(error.status || 500).json({ message: error.message || 'Ошибка сервера' });
  }
});

router.post('/', authMiddleware, validate(createBookingSchema), async (req: Request, res: Response) => {
  try {
    const booking = await bookingService.create(req.user!.userId, req.body);
    res.status(201).json(booking);
  } catch (error: any) {
    res.status(error.status || 500).json({ message: error.message || 'Ошибка сервера' });
  }
});

router.patch('/:id', authMiddleware, validate(updateBookingSchema), async (req: Request, res: Response) => {
  try {
    const booking = await bookingService.update(req.params.id, req.user!.userId, req.body);
    res.json(booking);
  } catch (error: any) {
    res.status(error.status || 500).json({ message: error.message || 'Ошибка сервера' });
  }
});

router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const result = await bookingService.cancel(req.params.id, req.user!.userId);
    res.json(result);
  } catch (error: any) {
    res.status(error.status || 500).json({ message: error.message || 'Ошибка сервера' });
  }
});

export default router;
