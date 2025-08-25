"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllBookings,
  deleteBooking,
  selectAllBookingsData,
  selectAllBookingsLoading,
  selectAllBookingsError,
} from "../../reducer/bookingSlice";

const BookingList = () => {
  const dispatch = useDispatch();
  const bookings = useSelector(selectAllBookingsData) || [];
  const loading = useSelector(selectAllBookingsLoading);
  const error = useSelector(selectAllBookingsError);

  useEffect(() => {
    dispatch(fetchAllBookings());
  }, [dispatch]);

  const handleDelete = (apartmentId, bookingId) => {
    if (confirm("Sei sicuro di voler cancellare questa prenotazione?")) {
      dispatch(deleteBooking({ apartmentId, bookingId }));
    }
  };

  if (loading) return <p>Caricamento prenotazioni...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full border border-gray-200 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Guest</th>
            <th className="px-4 py-2 text-left">Apartment</th>
            <th className="px-4 py-2">CheckIn</th>
            <th className="px-4 py-2">CheckOut</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b._id} className="border-b">
              <td className="px-4 py-2">{b.guestName}</td>
              <td className="px-4 py-2">{b.apartment?.name || "-"}</td>
              <td className="px-4 py-2">
                {new Date(b.checkIn).toLocaleDateString()}
              </td>
              <td className="px-4 py-2">
                {new Date(b.checkOut).toLocaleDateString()}
              </td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded-full text-white ${
                    b.status === "confirmed"
                      ? "bg-green-500"
                      : b.status === "cancelled"
                      ? "bg-red-500"
                      : "bg-yellow-500"
                  }`}
                >
                  {b.status}
                </span>
              </td>
              <td className="px-4 py-2">
                {b.status !== "cancelled" && (
                  <button
                    onClick={() => handleDelete(b.apartment._id, b._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Cancella
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingList;
