import { categoryRepository } from '../repositories/category.repository';

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export const categoryService = {
  getAll: async () => {
    return categoryRepository.findAll();
  },

  getById: async (id: string) => {
    const category = await categoryRepository.findById(id);
    if (!category) {
      throw { status: 404, message: 'Категория не найдена' };
    }
    return category;
  },

  create: async (data: { name: string; icon?: string; slug?: string }) => {
    return categoryRepository.create({
      name: data.name,
      icon: data.icon?.trim() || '📁',
      slug: data.slug?.trim() || slugify(data.name),
    });
  },

  update: async (id: string, data: { name?: string; icon?: string; slug?: string }) => {
    const category = await categoryRepository.findById(id);
    if (!category) {
      throw { status: 404, message: 'Категория не найдена' };
    }

    const updateData = {
      ...data,
      ...(data.name && !data.slug ? { slug: slugify(data.name) } : {}),
    };

    return categoryRepository.update(id, updateData);
  },

  delete: async (id: string) => {
    const category = await categoryRepository.findById(id);
    if (!category) {
      throw { status: 404, message: 'Категория не найдена' };
    }
    await categoryRepository.delete(id);
    return { message: 'Категория удалена' };
  },
};
