import { Card } from '@/shared/ui';
import type { Category } from '../model/types';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Card className="flex items-start gap-4">
      <div className="h-12 w-12 rounded-xl bg-primary/15 flex items-center justify-center text-2xl shrink-0">
        {category.icon || '📁'}
      </div>
      <div className="flex-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-semibold text-primary-fg">{category.name}</h3>
            {category.description && (
              <p className="text-sm text-muted mt-1">{category.description}</p>
            )}
          </div>
          <span className="text-xs text-muted bg-surface-2 border border-border px-2 py-1 rounded-full whitespace-nowrap">
            {category._count?.listings ?? 0} объектов
          </span>
        </div>
      </div>
    </Card>
  );
}
