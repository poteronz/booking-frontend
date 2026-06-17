import React from "react";
import { Card } from "../../../shared/ui/Card";
import { Button } from "../../../shared/ui/Button";

// карточка одной услуги
function ListingCard(props) {
  var listing = props.listing;

  return (
    <Card>
      <h3 className="text-lg font-bold text-blue-800 mb-1">{listing.name}</h3>
      <p className="text-gray-500 text-sm mb-1">{listing.description}</p>
      <p className="text-gray-400 text-xs mb-2">{listing.duration} мин.</p>
      <p className="text-green-600 text-xl font-bold mb-3">{listing.price} руб.</p>
      <Button onClick={function () { props.onBook(listing); }}>
        Записаться
      </Button>
    </Card>
  );
}

export { ListingCard };
