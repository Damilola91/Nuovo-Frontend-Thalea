"use client";

import { useTranslation } from "react-i18next";

const BookingSummary = ({ bookingItem }) => {
  const { t } = useTranslation();

  return (
    <section className="mb-12 max-w-lg mx-auto bg-[#f3f1e7] p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-[#46331d]">
        {t("bookingSummary.title")}
      </h2>
      <p>
        {t("bookingSummary.apartment")}:{" "}
        <span className="font-bold">{bookingItem.apartment.name}</span>
      </p>
      <p>
        {t("bookingSummary.selectedDates")}:{" "}
        <span className="font-bold">
          {new Date(bookingItem.checkIn).toLocaleDateString()} -{" "}
          {new Date(bookingItem.checkOut).toLocaleDateString()}
        </span>
      </p>
      <p>
        {t("bookingSummary.nights")}:{" "}
        <span className="font-bold">{bookingItem.nights}</span>
      </p>
      <p>
        {t("bookingSummary.guests")}:{" "}
        <span className="font-bold">{bookingItem.guestsCount}</span>
      </p>
      <p>
        {t("bookingSummary.pricePerNight")}:{" "}
        <span className="font-bold">
          €{bookingItem.apartment.pricePerNight}
        </span>
      </p>
      <p className="mt-3 text-lg font-bold text-[#46331d]">
        {t("bookingSummary.total")}: €{bookingItem.totalPrice}
      </p>
    </section>
  );
};

export default BookingSummary;
