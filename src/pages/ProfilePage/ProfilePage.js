import React from "react";
import { BookingList } from "../../widgets/BookingList";

// страница профиля - записи пользователя
function ProfilePage(props) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Мои записи</h2>
      <BookingList userId={props.userId} />
    </div>
  );
}

export { ProfilePage };
