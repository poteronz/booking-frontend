import prisma from '../lib/prisma';
import { Prisma } from '@prisma/client';

interface ListingFilters {
  search?: string;
  categoryId?: string;
  priceMin?: number;
  priceMax?: number;
  city?: string;
  ownerId?: string;
  isActive?: boolean;
}

const listingInclude = {
  category: true,
  owner: { select: { id: true, email: true, name: true, role: true, createdAt: true, updatedAt: true } },
  amenities: { include: { amenity: true } },
  _count: { select: { reviews: true, bookings: true } },
} as const;

export const listingRepository = {
  findAll: (filters: ListingFilters = {}, page: number = 1, limit: number = 10) => {
    const where: Prisma.ListingWhereInput = {};

    if (filters.categoryId) where.categoryId = filters.categoryId;
    if (filters.ownerId) where.ownerId = filters.ownerId;
    if (filters.isActive !== undefined) where.isActive = filters.isActive;
    if (filters.search) {
      where.OR = [
        { title: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } },
        { city: { contains: filters.search, mode: 'insensitive' } },
        { address: { contains: filters.search, mode: 'insensitive' } },
      ];
    }
    if (filters.city) {
      where.city = { contains: filters.city, mode: 'insensitive' };
    }
    if (filters.priceMin !== undefined || filters.priceMax !== undefined) {
      where.price = {
        ...(filters.priceMin !== undefined ? { gte: filters.priceMin } : {}),
        ...(filters.priceMax !== undefined ? { lte: filters.priceMax } : {}),
      };
    }

    const skip = (page - 1) * limit;

    return Promise.all([
      prisma.listing.findMany({
        where,
        skip,
        take: limit,
        include: listingInclude,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.listing.count({ where }),
    ]);
  },

  findByOwner: (ownerId: string) => {
    return prisma.listing.findMany({
      where: { ownerId },
      include: listingInclude,
      orderBy: { createdAt: 'desc' },
    });
  },

  findById: (id: string) => {
    return prisma.listing.findUnique({
      where: { id },
      include: {
        ...listingInclude,
        reviews: {
          include: {
            user: {
              select: { id: true, email: true, name: true, role: true, createdAt: true, updatedAt: true },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  },

  create: (data: Prisma.ListingCreateInput) => {
    return prisma.listing.create({
      data,
      include: listingInclude,
    });
  },

  update: (id: string, data: Prisma.ListingUpdateInput) => {
    return prisma.listing.update({
      where: { id },
      data,
      include: listingInclude,
    });
  },

  deactivate: (id: string) => {
    return prisma.listing.update({
      where: { id },
      data: { isActive: false },
    });
  },
};
