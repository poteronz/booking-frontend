import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import listingRoutes from './listing.routes';
import bookingRoutes from './booking.routes';
import categoryRoutes from './category.routes';
import reviewRoutes from './review.routes';
import paymentRoutes from './payment.routes';
import amenityRoutes from './amenity.routes';
import notificationRoutes from './notification.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/listings', listingRoutes);
router.use('/bookings', bookingRoutes);
router.use('/categories', categoryRoutes);
router.use('/reviews', reviewRoutes);
router.use('/payments', paymentRoutes);
router.use('/amenities', amenityRoutes);
router.use('/notifications', notificationRoutes);

export default router;
