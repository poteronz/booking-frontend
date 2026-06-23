import prisma from '../lib/prisma';
import { Prisma } from '@prisma/client';

export const userRepository = {
  findById: (id: string) => {
    return prisma.user.findUnique({ where: { id } });
  },

  findByEmail: (email: string) => {
    return prisma.user.findUnique({ where: { email } });
  },

  findAll: (page: number = 1, limit: number = 10) => {
    const skip = (page - 1) * limit;
    return Promise.all([
      prisma.user.findMany({ skip, take: limit, orderBy: { createdAt: 'desc' } }),
      prisma.user.count(),
    ]);
  },

  create: (data: Prisma.UserCreateInput) => {
    return prisma.user.create({ data });
  },

  update: (id: string, data: Prisma.UserUpdateInput) => {
    return prisma.user.update({ where: { id }, data });
  },

  delete: (id: string) => {
    return prisma.user.delete({ where: { id } });
  },
};
