import React, { useState } from "react";
import { ListingList } from "../../widgets/ListingList";
import { BookingForm } from "../../features/booking-crud";
import { createBooking } from "../../features/booking-crud";
import { Modal } from "../../shared/ui/Modal";

// главная страница - список услуг
function HomePage(props) {
  var [selectedListing, setSelectedListing] = useState(null);
  var [showModal, setShowModal] = useState(false);
  var [successMsg, setSuccessMsg] = useState("");

  function handleBook(listing) {
    setSelectedListing(listing);
    setShowModal(true);
    setSuccessMsg("");
  }

  function handleSubmitBooking(date, time) {
    createBooking(props.userId, selectedListing, date, time);
    setShowModal(false);
    setSuccessMsg("Вы записались на «" + selectedListing.name + "» на " + date + " в " + time);
    setSelectedListing(null);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Доступные услуги</h2>

      {successMsg !== "" && (
        <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-4">
          {successMsg}
        </div>
      )}

      <ListingList onBook={handleBook} />

      <Modal isOpen={showModal} onClose={function () { setShowModal(false); }}>
        <h3 className="text-lg font-bold text-gray-800 mb-2">
          Запись на: {selectedListing ? selectedListing.name : ""}
        </h3>
        {selectedListing && (
          <p className="text-sm text-gray-500 mb-2">
            {selectedListing.category} — {selectedListing.price} ₽
          </p>
        )}
        <BookingForm onSubmit={handleSubmitBooking} />
      </Modal>
    </div>
  );
}

export { HomePage };
