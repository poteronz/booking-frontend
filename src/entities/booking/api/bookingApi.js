// моковые данные бронирований (заглушка)

var bookings = [];

// получить все бронирования конкретного пользователя
function getBookingsByUser(userId) {
  var result = [];
  for (var i = 0; i < bookings.length; i++) {
    if (bookings[i].userId === userId) {
      result.push(bookings[i]);
    }
  }
  return result;
}

// получить все бронирования (для админа)
function getAllBookings() {
  return bookings;
}

export { bookings, getBookingsByUser, getAllBookings };
