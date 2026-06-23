import prisma from '../lib/prisma';
import { Prisma } from '@prisma/client';

const reviewUserSelect = {
  id: true,
  email: true,
  name: true,
  role: true,
  createdAt: true,
  updatedAt: true,
} as const;

export const reviewRepository = {
  findByListing: (listingId: string) => {
    return prisma.review.findMany({
      where: { listingId },
      include: {
        user: { select: reviewUserSelect },
      },
      orderBy: { createdAt: 'desc' },
    });
  },

  findByUserAndListing: (userId: string, listingId: string) => {
    return prisma.review.findFirst({
      where: { userId, listingId },
    });
  },

  findById: (id: string) => {
    return prisma.review.findUnique({ where: { id } });
  },

  create: (data: Prisma.ReviewCreateInput) => {
    return prisma.review.create({
      data,
      include: {
        user: { select: reviewUserSelect },
      },
    });
  },

  update: (id: string, data: Prisma.ReviewUpdateInput) => {
    return prisma.review.update({
      where: { id },
      data,
      include: {
        user: { select: reviewUserSelect },
      },
    });
  },

  delete: (id: string) => {
    return prisma.review.delete({ where: { id } });
  },
};
