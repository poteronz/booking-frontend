import { listingRepository } from '../repositories/listing.repository';
import prisma from '../lib/prisma';

interface ListingFilters {
  search?: string;
  categoryId?: string;
  priceMin?: number;
  priceMax?: number;
  city?: string;
  ownerId?: string;
}

export const listingService = {
  getAll: async (filters: ListingFilters, page: number = 1, limit: number = 10) => {
    const [listings, total] = await listingRepository.findAll(
      { ...filters, isActive: true },
      page,
      limit,
    );

    return {
      data: listings,
      total,
      page,
      pageSize: limit,
    };
  },

  getByOwner: async (ownerId: string) => {
    return listingRepository.findByOwner(ownerId);
  },

  getById: async (id: string) => {
    const listing = await listingRepository.findById(id);
    if (!listing) {
      throw { status: 404, message: 'Объект не найден' };
    }
    return listing;
  },

  create: async (data: any, userId: string, userRole: string) => {
    if (userRole !== 'OWNER' && userRole !== 'ADMIN') {
      throw { status: 403, message: 'Только владельцы могут создавать объявления' };
    }

    const { amenityIds, ...listingData } = data;

    return prisma.listing.create({
      data: {
        title: listingData.title,
        description: listingData.description,
        imageUrl: listingData.imageUrl,
        city: listingData.city,
        address: listingData.address,
        price: listingData.price,
        owner: { connect: { id: userId } },
        category: { connect: { id: listingData.categoryId } },
        amenities: amenityIds
          ? {
              create: amenityIds.map((amenityId: string) => ({
                amenity: { connect: { id: amenityId } },
              })),
            }
          : undefined,
      },
      include: {
        category: true,
        amenities: { include: { amenity: true } },
      },
    });
  },

  update: async (id: string, data: any, userId: string, userRole: string) => {
    const listing = await listingRepository.findById(id);
    if (!listing) {
      throw { status: 404, message: 'Объект не найден' };
    }
    if (listing.ownerId !== userId && userRole !== 'ADMIN') {
      throw { status: 403, message: 'Нет прав для редактирования этого объявления' };
    }

    const { amenityIds, categoryId, ...updateData } = data;

    if (amenityIds) {
      await prisma.listingAmenity.deleteMany({ where: { listingId: id } });
      await prisma.listingAmenity.createMany({
        data: amenityIds.map((amenityId: string) => ({ listingId: id, amenityId })),
      });
    }

    return listingRepository.update(id, {
      ...updateData,
      ...(categoryId && { category: { connect: { id: categoryId } } }),
    });
  },

  deactivate: async (id: string, userId: string, userRole: string) => {
    const listing = await listingRepository.findById(id);
    if (!listing) {
      throw { status: 404, message: 'Объект не найден' };
    }
    if (listing.ownerId !== userId && userRole !== 'ADMIN') {
      throw { status: 403, message: 'Нет прав для деактивации этого объявления' };
    }
    return listingRepository.deactivate(id);
  },
};
