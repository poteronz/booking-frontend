import { ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        'bg-surface-2 border border-border rounded-2xl p-4',
        'transition-all duration-300 hover:border-primary/30',
        className,
      )}
    >
      {children}
    </div>
  );
}
