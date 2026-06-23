// Форматирование даты в читаемый вид (русская локаль)
export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

// Короткий формат даты: 01.01.2024
export function formatDateShort(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString('ru-RU');
}
