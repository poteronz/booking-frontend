import prisma from '../lib/prisma';
import { Prisma } from '@prisma/client';

export const categoryRepository = {
  findAll: () => {
    return prisma.category.findMany({
      include: { _count: { select: { listings: true } } },
      orderBy: { name: 'asc' },
    });
  },

  findById: (id: string) => {
    return prisma.category.findUnique({
      where: { id },
      include: { _count: { select: { listings: true } } },
    });
  },

  create: (data: Prisma.CategoryCreateInput) => {
    return prisma.category.create({ data });
  },

  update: (id: string, data: Prisma.CategoryUpdateInput) => {
    return prisma.category.update({ where: { id }, data });
  },

  delete: (id: string) => {
    return prisma.category.delete({ where: { id } });
  },
};
