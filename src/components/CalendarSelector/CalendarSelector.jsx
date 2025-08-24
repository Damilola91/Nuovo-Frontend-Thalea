"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import CardApartment from "../CardApartment/CardApartment";
import { useTranslation } from "react-i18next";
import {
  checkAvailability,
  selectAvailabilityData,
  selectAvailabilityLoading,
  selectAvailabilityError,
  clearAvailability,
} from "../../reducer/bookingSlice";

// ⬇️ AGGIUNTA: importa il CSS
import "./CalendarSelector.css";

const CalendarSelector = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const availabilityData = useSelector(selectAvailabilityData);
  const loading = useSelector(selectAvailabilityLoading);
  const error = useSelector(selectAvailabilityError);

  const [selectedRange, setSelectedRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const [guestCount, setGuestCount] = useState(1);

  const handleChange = (item) => {
    setSelectedRange(item.selection);
  };

  const handleGuestChange = (e) => {
    setGuestCount(parseInt(e.target.value));
  };

  const handleCheckAvailability = () => {
    if (selectedRange.startDate && selectedRange.endDate && guestCount) {
      dispatch(
        checkAvailability({
          checkIn: selectedRange.startDate.toISOString(),
          checkOut: selectedRange.endDate.toISOString(),
          guestsCount: guestCount,
        })
      );
    }
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
      <h4 className="text-3xl font-bold mb-6 text-[#46331d] drop-shadow-sm">
        {t("calendarSelector.title")}
      </h4>

      <div className="mb-4">
        <label className="mr-2 font-semibold">
          {t("calendarSelector.guests")}:
        </label>
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

      {/* ⬇️ AGGIUNTA: classe calendar-fix al SOLO wrapper del calendario */}
      <div className="bg-[#f3f1e7] p-4 rounded-xl shadow-md border border-gray-200 mb-4 calendar-fix">
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

      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={handleCheckAvailability}
          className="bg-[#46331d] text-white px-6 py-2 rounded hover:opacity-90 transition"
        >
          {t("calendarSelector.checkAvailability")}
        </button>
        <button
          onClick={handleClear}
          className="bg-gray-200 px-6 py-2 rounded hover:bg-gray-300 transition"
        >
          {t("calendarSelector.clearSelections")}
        </button>
      </div>

      {loading && <p>{t("calendarSelector.loading")}</p>}
      {error && (
        <p className="text-red-500">{t("calendarSelector.error", { error })}</p>
      )}
      {availabilityData.length > 0 && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">
            {t("calendarSelector.availableApartment")}
          </h3>
          {availabilityData.map((item, index) => (
            <CardApartment key={index} apartmentData={item} />
          ))}
        </div>
      )}
    </section>
  );
};

export default CalendarSelector;
