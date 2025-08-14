"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import CardApartment from "../CardApartment/CardApartment";
import {
  checkAvailability,
  selectAvailabilityData,
  selectAvailabilityLoading,
  selectAvailabilityError,
  clearAvailability,
} from "../../reducer/bookingSlice";

const CalendarSelector = () => {
  const dispatch = useDispatch();

  const availabilityData = useSelector(selectAvailabilityData);
  const loading = useSelector(selectAvailabilityLoading);
  const error = useSelector(selectAvailabilityError);

  const [selectedRange, setSelectedRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const [guestCount, setGuestCount] = useState(1);

  // Debounce effect per chiamare il thunk
  useEffect(() => {
    const timer = setTimeout(() => {
      if (selectedRange.startDate && selectedRange.endDate && guestCount) {
        dispatch(
          checkAvailability({
            checkIn: selectedRange.startDate.toISOString(),
            checkOut: selectedRange.endDate.toISOString(),
            guestsCount: guestCount,
          })
        );
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [selectedRange, guestCount, dispatch]);

  const handleChange = (item) => {
    setSelectedRange(item.selection);
  };

  const handleGuestChange = (e) => {
    setGuestCount(parseInt(e.target.value));
  };

  const handleClear = () => {
    dispatch(clearAvailability());
    setGuestCount(1);
    setSelectedRange({
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    });
  };

  return (
    <section className="mb-12 max-w-lg mx-auto text-center">
      <h2 className="text-3xl font-bold mb-6 text-[#46331d] drop-shadow-sm">
        Seleziona le date e gli ospiti
      </h2>

      <div className="mb-4">
        <label className="mr-2 font-semibold">Ospiti:</label>
        <select
          value={guestCount}
          onChange={handleGuestChange}
          className="border rounded px-2 py-1"
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
        </select>
      </div>

      <div className="bg-[#f3f1e7] p-4 rounded-xl shadow-md border border-gray-200 mb-4">
        <DateRange
          editableDateInputs
          onChange={handleChange}
          moveRangeOnFirstSelection={false}
          ranges={[selectedRange]}
          minDate={new Date()}
          rangeColors={["#46331d"]}
          className="rounded-lg shadow-inner"
        />
      </div>

      {loading && <p>Caricamento appartamenti disponibili...</p>}
      {error && <p className="text-red-500">Errore: {error}</p>}
      {availabilityData.length > 0 && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">
            Appartamento disponibile:
          </h3>
          {availabilityData.map((item, index) => (
            <CardApartment key={index} apartmentData={item} />
          ))}
        </div>
      )}

      <button
        className="mt-4 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
        onClick={handleClear}
      >
        Pulisci selezioni
      </button>
    </section>
  );
};

export default CalendarSelector;
