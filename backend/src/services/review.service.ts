import { reviewRepository } from '../repositories/review.repository';
import { notificationRepository } from '../repositories/notification.repository';
import { listingRepository } from '../repositories/listing.repository';

export const reviewService = {
  getByListing: async (listingId: string) => {
    return reviewRepository.findByListing(listingId);
  },

  create: async (
    data: { rating: number; comment?: string; listingId: string },
    userId: string,
  ) => {
    const existing = await reviewRepository.findByUserAndListing(userId, data.listingId);
    if (existing) {
      throw { status: 409, message: 'Вы уже оставляли отзыв для этого объекта' };
    }

    const review = await reviewRepository.create({
      rating: data.rating,
      comment: data.comment ?? '',
      user: { connect: { id: userId } },
      listing: { connect: { id: data.listingId } },
    });

    // Уведомление владельцу объявления о новом отзыве
    try {
      const listing = await listingRepository.findById(data.listingId);
      if (listing && listing.ownerId !== userId) {
        await notificationRepository.create({
          message: `Новый отзыв на «${listing.title}»: оценка ${data.rating}/5.`,
          type: 'NEW_REVIEW',
          user: { connect: { id: listing.ownerId } },
        });
      }
    } catch {
      // уведомления не критичны
    }

    return review;
  },

  update: async (id: string, data: { rating?: number; comment?: string }, userId: string) => {
    const review = await reviewRepository.findById(id);
    if (!review) {
      throw { status: 404, message: 'Отзыв не найден' };
    }

    if (review.userId !== userId) {
      throw { status: 403, message: 'Можно редактировать только свой отзыв' };
    }

    return reviewRepository.update(id, data);
  },

  delete: async (id: string, userId: string, userRole: string) => {
    const review = await reviewRepository.findById(id);
    if (!review) {
      throw { status: 404, message: 'Отзыв не найден' };
    }

    if (review.userId !== userId && userRole !== 'ADMIN') {
      throw { status: 403, message: 'Нет прав на удаление этого отзыва' };
    }

    await reviewRepository.delete(id);
    return { message: 'Отзыв удалён' };
  },
};
