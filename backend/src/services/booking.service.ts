import { bookingRepository } from '../repositories/booking.repository';
import { listingRepository } from '../repositories/listing.repository';

// сервис бронирований — бизнес-логика
export const bookingService = {
  // получить бронирования текущего пользователя
  getByUser: async (userId: string) => {
    const bookings = await bookingRepository.findByUser(userId);
    return bookings;
  },

  // получить бронирование по id (только своё или админ)
  getById: async (id: string, userId: string, userRole: string) => {
    const booking = await bookingRepository.findById(id);
    if (!booking) {
      throw { status: 404, message: 'Бронирование не найдено' };
    }
    if (booking.userId !== userId && userRole !== 'ADMIN') {
      throw { status: 403, message: 'Нет доступа к этому бронированию' };
    }
    return booking;
  },

  // создать бронирование
  create: async (userId: string, dto: { listingId: string; dateFrom: string; dateTo: string }) => {
    // проверяем что листинг существует и активен
    const listing = await listingRepository.findById(dto.listingId);
    if (!listing) {
      throw { status: 404, message: 'Объект не найден' };
    }
    if (!listing.isActive) {
      throw { status: 404, message: 'Объект неактивен' };
    }

    const dateFrom = new Date(dto.dateFrom);
    const dateTo = new Date(dto.dateTo);

    if (dateFrom >= dateTo) {
      throw { status: 400, message: 'Дата окончания должна быть позже даты начала' };
    }

    // проверяем конфликт дат
    const conflict = await bookingRepository.findConflicting(dto.listingId, dateFrom, dateTo);
    if (conflict) {
      throw { status: 409, message: 'Даты пересекаются с существующим бронированием' };
    }

    // считаем стоимость: цена × количество дней
    const days = Math.ceil((dateTo.getTime() - dateFrom.getTime()) / (1000 * 60 * 60 * 24));
    const totalPrice = Number(listing.price) * days;

    const booking = await bookingRepository.create({
      dateFrom,
      dateTo,
      totalPrice,
      user: { connect: { id: userId } },
      listing: { connect: { id: dto.listingId } },
    });

    return booking;
  },

  // обновить бронирование (только PENDING)
  update: async (id: string, userId: string, dto: { dateFrom?: string; dateTo?: string }) => {
    const booking = await bookingRepository.findById(id);
    if (!booking) {
      throw { status: 404, message: 'Бронирование не найдено' };
    }
    if (booking.userId !== userId) {
      throw { status: 403, message: 'Нет прав для изменения этого бронирования' };
    }
    if (booking.status !== 'PENDING') {
      throw { status: 400, message: 'Можно изменять только бронирования в статусе PENDING' };
    }

    const updateData: any = {};
    if (dto.dateFrom) updateData.dateFrom = new Date(dto.dateFrom);
    if (dto.dateTo) updateData.dateTo = new Date(dto.dateTo);

    // пересчитываем стоимость если даты изменились
    if (dto.dateFrom || dto.dateTo) {
      const newFrom = dto.dateFrom ? new Date(dto.dateFrom) : booking.dateFrom;
      const newTo = dto.dateTo ? new Date(dto.dateTo) : booking.dateTo;
      const listing = await listingRepository.findById(booking.listingId);
      if (listing) {
        const days = Math.ceil((newTo.getTime() - newFrom.getTime()) / (1000 * 60 * 60 * 24));
        updateData.totalPrice = Number(listing.price) * days;
      }
    }

    return bookingRepository.update(id, updateData);
  },

  // отменить бронирование (status → CANCELLED)
  cancel: async (id: string, userId: string) => {
    const booking = await bookingRepository.findById(id);
    if (!booking) {
      throw { status: 404, message: 'Бронирование не найдено' };
    }
    if (booking.userId !== userId) {
      throw { status: 403, message: 'Нет прав для отмены этого бронирования' };
    }
    if (booking.status === 'CANCELLED') {
      throw { status: 400, message: 'Бронирование уже отменено' };
    }

    return bookingRepository.cancel(id);
  },
};
