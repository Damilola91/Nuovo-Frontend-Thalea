"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

const BookingCTA = ({ className = "" }) => {
  const { t } = useTranslation();

  return (
    <section className={`text-center py-20 px-6 mt-10 ${className}`}>
      <h2 className="text-2xl md:text-3xl font-bold text-[#46331d] mb-4">
        {t("bookingCTA.bookingInvite")}
      </h2>
      <p className="text-lg text-gray-700 mb-6">
        {t("bookingCTA.bookingText")}
      </p>
      <Link
        href="/calendar"
        className="inline-block bg-[#46331d] text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-[#5a4621] transition"
      >
        {t("bookingCTA.bookingButton")}
      </Link>
    </section>
  );
};

export default BookingCTA;
