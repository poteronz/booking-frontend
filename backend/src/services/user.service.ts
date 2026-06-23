import { userRepository } from '../repositories/user.repository';

// Исключаем пароль из ответа
function excludePassword(user: any) {
  const { password, ...rest } = user;
  return rest;
}

export const userService = {
  getAll: async (page: number = 1, limit: number = 10) => {
    const [users, total] = await userRepository.findAll(page, limit);
    return {
      data: users.map(excludePassword),
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  },

  getById: async (id: string) => {
    const user = await userRepository.findById(id);
    if (!user) {
      throw { status: 404, message: 'Пользователь не найден' };
    }
    return excludePassword(user);
  },

  update: async (id: string, data: any, requesterId: string, requesterRole: string) => {
    // Можно редактировать только свой профиль (или админ)
    if (id !== requesterId && requesterRole !== 'ADMIN') {
      throw { status: 403, message: 'Можно редактировать только свой профиль' };
    }

    const user = await userRepository.findById(id);
    if (!user) {
      throw { status: 404, message: 'Пользователь не найден' };
    }

    // Не даём менять роль и пароль через этот эндпоинт
    const { role, password, ...safeData } = data;
    const updated = await userRepository.update(id, safeData);
    return excludePassword(updated);
  },

  delete: async (id: string) => {
    const user = await userRepository.findById(id);
    if (!user) {
      throw { status: 404, message: 'Пользователь не найден' };
    }
    await userRepository.delete(id);
    return { message: 'Пользователь удалён' };
  },
};
