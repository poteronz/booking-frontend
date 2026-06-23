import type { Amenity } from '../model/types';

interface AmenityCardProps {
  amenity: Amenity;
}

// Бейдж удобства (Wi-Fi, парковка и т.д.)
export function AmenityCard({ amenity }: AmenityCardProps) {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/5 border border-primary/20 text-sm text-primary-fg transition-colors hover:bg-primary/10">
      {amenity.icon && <span className="text-base">{amenity.icon}</span>}
      {amenity.name}
    </span>
  );
}
