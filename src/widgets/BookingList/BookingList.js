import React, { useState } from "react";
import { getBookingsByUser, BookingCard } from "../../entities/booking";
import { cancelBooking } from "../../features/booking-crud";

// виджет - список записей пользователя
function BookingList(props) {
  var [statusFilter, setStatusFilter] = useState("all");
  var [, forceUpdate] = useState(0); // для перерисовки после отмены

  var userBookings = getBookingsByUser(props.userId);

  // filter — фильтруем по статусу
  var filtered = userBookings.filter(function (booking) {
    if (statusFilter === "all") {
      return true;
    }
    return booking.status === statusFilter;
  });

  function handleCancel(bookingId) {
    cancelBooking(bookingId);
    // обновляем компонент
    forceUpdate(function (n) { return n + 1; });
  }

  return (
    <div>
      <div className="mb-4 flex gap-2">
        <button
          className={statusFilter === "all"
            ? "px-3 py-1.5 rounded-lg text-sm font-bold bg-blue-600 text-white"
            : "px-3 py-1.5 rounded-lg text-sm bg-gray-200 text-gray-700 hover:bg-gray-300"}
          onClick={function () { setStatusFilter("all"); }}
        >
          Все
        </button>
        <button
          className={statusFilter === "pending"
            ? "px-3 py-1.5 rounded-lg text-sm font-bold bg-yellow-500 text-white"
            : "px-3 py-1.5 rounded-lg text-sm bg-gray-200 text-gray-700 hover:bg-gray-300"}
          onClick={function () { setStatusFilter("pending"); }}
        >
          Ожидают
        </button>
        <button
          className={statusFilter === "confirmed"
            ? "px-3 py-1.5 rounded-lg text-sm font-bold bg-green-600 text-white"
            : "px-3 py-1.5 rounded-lg text-sm bg-gray-200 text-gray-700 hover:bg-gray-300"}
          onClick={function () { setStatusFilter("confirmed"); }}
        >
          Подтверждённые
        </button>
        <button
          className={statusFilter === "cancelled"
            ? "px-3 py-1.5 rounded-lg text-sm font-bold bg-red-600 text-white"
            : "px-3 py-1.5 rounded-lg text-sm bg-gray-200 text-gray-700 hover:bg-gray-300"}
          onClick={function () { setStatusFilter("cancelled"); }}
        >
          Отменённые
        </button>
      </div>

      {filtered.length === 0 && (
        <p className="text-gray-500 text-center py-8">Записей пока нет</p>
      )}

      <div className="flex flex-col gap-4">
        {/* map — выводим карточки записей */}
        {filtered.map(function (booking) {
          return (
            <BookingCard
              key={booking.id}
              booking={booking}
              onCancel={function () { handleCancel(booking.id); }}
            />
          );
        })}
      </div>
    </div>
  );
}

export { BookingList };
