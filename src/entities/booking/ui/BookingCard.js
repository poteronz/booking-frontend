import React from "react";
import { Card } from "../../../shared/ui/Card";
import { Button } from "../../../shared/ui/Button";

// карточка одного бронирования
function BookingCard(props) {
  var booking = props.booking;

  // определяем цвет бейджа в зависимости от статуса
  var badgeClass = "text-xs px-2 py-1 rounded-full font-semibold ";
  if (booking.status === "confirmed") {
    badgeClass = badgeClass + "bg-green-100 text-green-700";
  } else if (booking.status === "cancelled") {
    badgeClass = badgeClass + "bg-red-100 text-red-600";
  } else {
    badgeClass = badgeClass + "bg-yellow-100 text-yellow-700";
  }

  // текст статуса по-русски
  var statusText = "Ожидает";
  if (booking.status === "confirmed") {
    statusText = "Подтверждено";
  }
  if (booking.status === "cancelled") {
    statusText = "Отменено";
  }

  return (
    <Card>
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-bold text-blue-800">{booking.listingName}</h4>
          <p className="text-gray-500 text-sm mt-1">
            {booking.date} в {booking.time}
          </p>
          <p className="text-gray-400 text-sm">{booking.price} руб.</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className={badgeClass}>{statusText}</span>
          {booking.status !== "cancelled" && (
            <Button
              variant="danger"
              onClick={function () { props.onCancel(booking.id); }}
            >
              Отменить
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}

export { BookingCard };
