import React, { useState } from "react";
import { Button } from "../../../shared/ui/Button";
import { Select } from "../../../shared/ui/Select";

// форма создания бронирования
function BookingForm(props) {
  var [date, setDate] = useState("");
  var [time, setTime] = useState("");
  var [error, setError] = useState("");

  // генерируем слоты времени
  var timeSlots = [];
  for (var h = 9; h <= 18; h++) {
    timeSlots.push(h + ":00");
    if (h < 18) {
      timeSlots.push(h + ":30");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (date === "" || time === "") {
      setError("Выберите дату и время!");
      return;
    }

    props.onSubmit(date, time);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-4">
      {error !== "" && (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm">{error}</div>
      )}

      <div>
        <label className="text-sm font-medium text-gray-600 block mb-1">Дата</label>
        <input
          type="date"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
          value={date}
          onChange={function (e) { setDate(e.target.value); }}
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-600 block mb-1">Время</label>
        <Select value={time} onChange={function (e) { setTime(e.target.value); }}>
          <option value="">Выберите время</option>
          {/* map — выводим каждый слот */}
          {timeSlots.map(function (slot) {
            return <option key={slot} value={slot}>{slot}</option>;
          })}
        </Select>
      </div>

      <Button variant="success" type="submit">
        Подтвердить запись
      </Button>
    </form>
  );
}

export { BookingForm };
