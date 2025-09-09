"use client";

import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectCompletedData } from "../../reducer/bookingSlice";

const TouristTaxInfo = () => {
  const { t } = useTranslation();

  const confirmedData = useSelector(selectCompletedData);
  const booking = confirmedData?.booking || null;

  const checkIn = booking?.checkIn || "";
  const checkOut = booking?.checkOut || "";
  const nights = Number(booking?.nights) || 0;
  const guestsCount = Number(booking?.guestsCount ?? booking?.guests ?? 0);

  // Calcolo tassa: 4€ a persona/notte, max 16€ a persona se notti > 4
  const taxPerPerson = nights > 4 ? 16 : nights * 4;
  const totalAmount = taxPerPerson * guestsCount; // ✅ moltiplica per ospiti

  // Format date (solo giorno e mese in IT)
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleDateString("it-IT", { day: "numeric", month: "long" });
  };

  const formattedCheckIn = formatDate(checkIn);
  const formattedCheckOut = formatDate(checkOut);

  // Messaggio PayPal
  const message = `Tassa di soggiorno per il pernottamento presso Thalea Palermo Apartment dal ${formattedCheckIn} al ${formattedCheckOut}`;
  const encodedMessage = encodeURIComponent(message);

  // Importo per PayPal.me (intero in €). Se vuoi 2 decimali, usa toFixed(2).
  const amountForPaypal = Number.isFinite(totalAmount)
    ? String(totalAmount)
    : "0";

  // Link PayPal dinamico
  const paypalLink = `https://www.paypal.com/paypalme/Thalea7apartment/${amountForPaypal}?message=${encodedMessage}`;

  return (
    <div className="mb-12 max-w-lg mx-auto bg-[#f3f1e7] p-6 rounded-lg shadow-md">
      <h4 className="text-xl font-semibold mb-2 text-[#46331d]">
        {t("booking.touristTaxTitle")}
      </h4>

      <p className="mb-4 text-gray-700">{t("booking.touristTaxDescription")}</p>

      {nights > 0 && guestsCount > 0 ? (
        <>
          <p className="mb-2 text-gray-700">
            {t("booking.touristTaxRegulation")}{" "}
            <a
              href={paypalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#46331d] underline"
            >
              {t("booking.payOnline")}
            </a>{" "}
            ({amountForPaypal}€)
          </p>
          <p className="mb-4 text-gray-700">
            {t("booking.touristTaxBreakdown", {
              amount: amountForPaypal,
              guests: guestsCount,
              nights,
            }) || (
              <>
                Totale tassa di soggiorno: <strong>{amountForPaypal}€</strong> (
                {guestsCount} ospiti, {nights} notti)
              </>
            )}
          </p>
        </>
      ) : (
        <p className="mb-4 text-gray-700">{t("booking.touristTaxNoData")}</p>
      )}

      <p className="mb-4 text-gray-700">{t("booking.touristTaxExtraInfo")}</p>
      <p className="text-sm text-gray-500">{t("booking.touristTaxNote")}</p>
    </div>
  );
};

export default TouristTaxInfo;
