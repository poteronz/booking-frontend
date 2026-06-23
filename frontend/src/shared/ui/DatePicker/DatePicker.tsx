import { cn } from '@/shared/lib/cn';

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
  minDate?: string;
  maxDate?: string;
  label?: string;
  className?: string;
}

// Простой стилизованный date input
export function DatePicker({
  value,
  onChange,
  minDate,
  maxDate,
  label,
  className,
}: DatePickerProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm text-muted">{label}</label>}
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        min={minDate}
        max={maxDate}
        className={cn(
          'w-full rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm text-white',
          'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
          '[color-scheme:dark]',
          className,
        )}
      />
    </div>
  );
}
