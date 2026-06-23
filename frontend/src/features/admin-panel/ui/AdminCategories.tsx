import { useEffect, useState } from 'react';
import { Button, Input, Spinner } from '@/shared/ui';
import { categoryApi, CategoryCard } from '@/entities/category';
import type { Category } from '@/entities/category';

// Управление категориями в админ-панели
export function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    categoryApi
      .getAll()
      .then(setCategories)
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    try {
      const cat = await categoryApi.create({ name: newName.trim() });
      setCategories((prev) => [...prev, cat]);
      setNewName('');
    } catch {
      // Ошибка
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await categoryApi.delete(id);
      setCategories((prev) => prev.filter((c) => c.id !== id));
    } catch {
      // Ошибка
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">Категории ({categories.length})</h2>

      {/* Форма добавления категории */}
      <form onSubmit={handleCreate} className="flex gap-2">
        <Input
          placeholder="Название категории"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <Button type="submit" size="sm">
          Добавить
        </Button>
      </form>

      <div className="flex flex-col gap-2">
        {categories.map((cat) => (
          <div key={cat.id} className="flex items-center gap-2">
            <div className="flex-1">
              <CategoryCard category={cat} />
            </div>
            <Button
              variant="danger"
              size="sm"
              onClick={() => handleDelete(cat.id)}
            >
              Удалить
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
