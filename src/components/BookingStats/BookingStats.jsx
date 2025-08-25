"use client";

import { useSelector } from "react-redux";
import { selectAllBookingsData } from "../../reducer/bookingSlice";

const BookingStats = () => {
  const bookings = useSelector(selectAllBookingsData) || [];
  const total = bookings.length;
  const confirmed = bookings.filter((b) => b.status === "confirmed").length;
  const cancelled = bookings.filter((b) => b.status === "cancelled").length;
  const pending = bookings.filter((b) => b.status === "pending").length;

  return (
    <div className="flex gap-4 my-4">
      <div className="bg-blue-500 text-white p-4 rounded shadow flex-1 text-center">
        <h3 className="text-xl font-bold">{total}</h3>
        <p>Totale Prenotazioni</p>
      </div>
      <div className="bg-green-500 text-white p-4 rounded shadow flex-1 text-center">
        <h3 className="text-xl font-bold">{confirmed}</h3>
        <p>Confermate</p>
      </div>
      <div className="bg-yellow-500 text-white p-4 rounded shadow flex-1 text-center">
        <h3 className="text-xl font-bold">{pending}</h3>
        <p>In attesa</p>
      </div>
      <div className="bg-red-500 text-white p-4 rounded shadow flex-1 text-center">
        <h3 className="text-xl font-bold">{cancelled}</h3>
        <p>Cancellate</p>
      </div>
    </div>
  );
};

export default BookingStats;
