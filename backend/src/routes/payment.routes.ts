import { Router, Request, Response } from 'express';
import { paymentService } from '../services/payment.service';
import { authMiddleware } from '../middleware/auth.middleware';
import { requireRole } from '../middleware/role.middleware';
import { validate } from '../middleware/validate.middleware';
import { createPaymentSchema, updatePaymentStatusSchema } from '../schemas/payment.schema';

const router = Router();

router.get('/booking/:bookingId', authMiddleware, async (req: Request, res: Response) => {
  try {
    const payment = await paymentService.getByBooking(req.params.bookingId);
    res.json(payment);
  } catch (error: any) {
    res.status(error.status || 500).json({ message: error.message || 'Ошибка сервера' });
  }
});

router.get('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const payment = await paymentService.getById(req.params.id);
    res.json(payment);
  } catch (error: any) {
    res.status(error.status || 500).json({ message: error.message || 'Ошибка сервера' });
  }
});

router.post('/', authMiddleware, validate(createPaymentSchema), async (req: Request, res: Response) => {
  try {
    const payment = await paymentService.create(req.body);
    res.status(201).json(payment);
  } catch (error: any) {
    res.status(error.status || 500).json({ message: error.message || 'Ошибка сервера' });
  }
});

router.patch(
  '/:id/status',
  authMiddleware,
  requireRole('ADMIN'),
  validate(updatePaymentStatusSchema),
  async (req: Request, res: Response) => {
    try {
      const payment = await paymentService.updateStatus(req.params.id, req.body.status);
      res.json(payment);
    } catch (error: any) {
      res.status(error.status || 500).json({ message: error.message || 'Ошибка сервера' });
    }
  },
);

export default router;
