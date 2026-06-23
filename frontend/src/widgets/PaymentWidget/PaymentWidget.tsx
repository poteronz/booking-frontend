import { useEffect, useState } from 'react';
import { Button, Select } from '@/shared/ui';
import { PaymentCard } from '@/entities/payment';
import { usePayment } from '@/features/payment-flow';
import type { PaymentMethod } from '@/entities/payment';

interface PaymentWidgetProps {
  bookingId: string;
}

export function PaymentWidget({ bookingId }: PaymentWidgetProps) {
  const { payment, createPayment, fetchPayment, isLoading, error } = usePayment();
  const [method, setMethod] = useState<PaymentMethod>('CARD');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      setLoaded(true);
      fetchPayment(bookingId);
    }
  }, [bookingId, fetchPayment, loaded]);

  const handlePay = async () => {
    try {
      await createPayment({ bookingId, method });
    } catch {
      // ошибка обрабатывается в хуке
    }
  };

  if (payment) {
    return (
      <div className="flex flex-col gap-3">
        <h3 className="font-semibold">Оплата</h3>
        <PaymentCard payment={payment} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-semibold">Оплата</h3>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <Select
        label="Способ оплаты"
        value={method}
        onChange={(v) => setMethod(v as PaymentMethod)}
        options={[
          { value: 'CARD', label: 'Банковская карта' },
          { value: 'CASH', label: 'Наличные' },
          { value: 'ONLINE', label: 'Онлайн' },
        ]}
      />
      <Button onClick={handlePay} isLoading={isLoading}>
        Оплатить
      </Button>
    </div>
  );
}
