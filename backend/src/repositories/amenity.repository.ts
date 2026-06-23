import prisma from '../lib/prisma';
import { Prisma } from '@prisma/client';

export const amenityRepository = {
  findAll: () => {
    return prisma.amenity.findMany({ orderBy: { name: 'asc' } });
  },

  create: (data: Prisma.AmenityCreateInput) => {
    return prisma.amenity.create({ data });
  },

  delete: (id: string) => {
    return prisma.amenity.delete({ where: { id } });
  },
};
