"use client";

import { useTranslation } from "react-i18next";

const TouristTaxInfo = () => {
  const { t } = useTranslation();

  return (
    <div className="mb-12 max-w-lg mx-auto bg-[#f3f1e7] p-6 rounded-lg shadow-md">
      <h4 className="text-xl font-semibold mb-2 text-[#46331d]">
        {t("booking.touristTaxTitle")}
      </h4>

      <p className="mb-4 text-gray-700">{t("booking.touristTaxDescription")}</p>

      <p className="mb-4 text-gray-700">
        {t("booking.touristTaxRegulation")}{" "}
        <a
          href="https://www.paypal.com/moke"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#46331d] underline"
        >
          {t("booking.payOnline")}
        </a>
      </p>

      <p className="mb-4 text-gray-700">{t("booking.touristTaxExtraInfo")}</p>

      <p className="text-sm text-gray-500">{t("booking.touristTaxNote")}</p>
    </div>
  );
};

export default TouristTaxInfo;
