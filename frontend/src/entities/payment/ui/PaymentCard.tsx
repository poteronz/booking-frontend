import { Card } from '@/shared/ui';
import { formatPrice } from '@/shared/lib/formatPrice';
import { cn } from '@/shared/lib/cn';
import type { Payment } from '../model/types';

interface PaymentCardProps {
  payment: Payment;
}

const statusColors: Record<string, string> = {
  PENDING: 'text-yellow-400',
  COMPLETED: 'text-green-400',
  REFUNDED: 'text-primary-fg',
  FAILED: 'text-destructive',
};

const statusLabels: Record<string, string> = {
  PENDING: 'Ожидает оплаты',
  COMPLETED: 'Оплачено',
  REFUNDED: 'Возвращено',
  FAILED: 'Ошибка',
};

const methodLabels: Record<string, string> = {
  CARD: 'Картой',
  CASH: 'Наличными',
  ONLINE: 'Онлайн',
};

export function PaymentCard({ payment }: PaymentCardProps) {
  return (
    <Card className="flex items-center justify-between">
      <div>
        <p className="font-semibold">{formatPrice(payment.amount)}</p>
        <p className="text-sm text-muted">{methodLabels[payment.method]}</p>
      </div>
      <span className={cn('text-sm font-medium', statusColors[payment.status])}>
        {statusLabels[payment.status]}
      </span>
    </Card>
  );
}
