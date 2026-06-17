import { bookings } from "../../../entities/booking";

// создать новое бронирование
function createBooking(userId, listing, date, time) {
  var newBooking = {
    id: Date.now(),
    userId: userId,
    listingId: listing.id,
    listingName: listing.name,
    price: listing.price,
    date: date,
    time: time,
    status: "confirmed"
  };
  bookings.push(newBooking);
  return newBooking;
}

// отменить бронирование по id
function cancelBooking(bookingId) {
  for (var i = 0; i < bookings.length; i++) {
    if (bookings[i].id === bookingId) {
      bookings[i].status = "cancelled";
      return true;
    }
  }
  return false;
}

export { createBooking, cancelBooking };
