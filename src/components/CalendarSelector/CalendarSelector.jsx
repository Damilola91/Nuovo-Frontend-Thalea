"use client";

import { useState, useRef, useEffect } from "react";
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

import "./CalendarSelector.css";

const CalendarSelector = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  // ✅ usa optional chaining per evitare errori se lo store è vuoto
  const availabilityData = useSelector(selectAvailabilityData) || {};
  const loading = useSelector(selectAvailabilityLoading);
  const error = useSelector(selectAvailabilityError);

  const results = availabilityData.data || []; // 🔹 qui ci sono le card
  const availabilityCheck = availabilityData.availabilityCheck || null;

  const [selectedRange, setSelectedRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [guestCount, setGuestCount] = useState(1);

  const firstCardRef = useRef(null);
  const [visibleResults, setVisibleResults] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const prevLenRef = useRef(0);

  const handleChange = (item) => {
    setSelectedRange(item.selection);
    dispatch(clearAvailability());
    setVisibleResults(false);
    setShowAnimation(false);
  };

  const handleGuestChange = (e) => {
    setGuestCount(parseInt(e.target.value, 10));
    dispatch(clearAvailability());
    setVisibleResults(false);
    setShowAnimation(false);
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
    setVisibleResults(false);
    setShowAnimation(false);
  };

  const scrollElementToCenter = (el) => {
    if (!el) return;
    try {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    } catch {
      const rect = el.getBoundingClientRect();
      const absoluteTop = rect.top + window.pageYOffset;
      const target = absoluteTop - (window.innerHeight - rect.height) / 2;
      window.scrollTo({ top: target, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const prevLen = prevLenRef.current;
    const nowLen = results.length;

    if (prevLen === 0 && nowLen > 0) {
      setVisibleResults(true);
      setShowAnimation(false);

      let rafId = 0;
      let timerId = 0;
      rafId = requestAnimationFrame(() => {
        timerId = setTimeout(() => {
          setShowAnimation(true);
          if (firstCardRef.current) scrollElementToCenter(firstCardRef.current);
        }, 30);
      });

      return () => {
        cancelAnimationFrame(rafId);
        clearTimeout(timerId);
      };
    }

    if (prevLen > 0 && nowLen === 0) {
      setVisibleResults(false);
      setShowAnimation(false);
    }

    prevLenRef.current = nowLen;
  }, [results]);

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

      {availabilityCheck && (
        <p className="mb-4 text-sm text-gray-600">
          {t("calendarSelector.lodgifyStatus")}:{" "}
          <strong>{availabilityCheck.status}</strong> (
          {availabilityCheck.source})
        </p>
      )}

      {visibleResults && results.length > 0 && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">
            {t("calendarSelector.availableApartment")}
          </h3>

          <div className="space-y-4">
            {results.map((item, index) => {
              const isFirst = index === 0;
              const delayMs = index * 80;
              const style = {
                opacity: showAnimation ? 1 : 0,
                transform: showAnimation
                  ? "translateY(0px)"
                  : "translateY(12px)",
                transition: `opacity 420ms ease-out ${delayMs}ms, transform 420ms ease-out ${delayMs}ms`,
              };

              return (
                <div
                  key={item.apartment._id ?? index}
                  ref={isFirst ? firstCardRef : null}
                  className="w-full"
                  style={style}
                >
                  <CardApartment apartmentData={item} />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};

export default CalendarSelector;
