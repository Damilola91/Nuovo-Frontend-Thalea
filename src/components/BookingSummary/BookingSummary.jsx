"use client";

const BookingSummary = ({ bookingItem }) => (
  <section className="mb-12 max-w-lg mx-auto bg-[#f3f1e7] p-6 rounded-lg shadow-md">
    <h2 className="text-2xl font-semibold mb-4 text-[#46331d]">
      Riepilogo prenotazione
    </h2>
    <p>
      Appartamento:{" "}
      <span className="font-bold">{bookingItem.apartment.name}</span>
    </p>
    <p>
      Date selezionate:{" "}
      <span className="font-bold">
        {new Date(bookingItem.checkIn).toLocaleDateString()} -{" "}
        {new Date(bookingItem.checkOut).toLocaleDateString()}
      </span>
    </p>
    <p>
      Numero di notti: <span className="font-bold">{bookingItem.nights}</span>
    </p>
    <p>
      Prezzo per notte:{" "}
      <span className="font-bold">€{bookingItem.apartment.pricePerNight}</span>
    </p>
    <p className="mt-3 text-lg font-bold text-[#46331d]">
      Totale: €{bookingItem.totalPrice}
    </p>
  </section>
);

export default BookingSummary;
