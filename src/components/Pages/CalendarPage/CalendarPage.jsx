"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";
import CalendarSelector from "../../CalendarSelector/CalendarSelector";

const CalendarPage = () => {
  const { t } = useTranslation();
  const [selectedRange, setSelectedRange] = useState(null);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="container mx-auto mt-20 flex-grow px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-[#46331d] text-center drop-shadow-lg">
          {t("calendarPage.selectYourStay")}
        </h1>

        <CalendarSelector onChange={setSelectedRange} />

        {selectedRange && (
          <div className="text-center mt-8">
            <p className="text-[#46331d]">
              {t("calendarPage.from")}{" "}
              <strong>{selectedRange.startDate.toLocaleDateString()}</strong>{" "}
              {t("calendarPage.to")}{" "}
              <strong>{selectedRange.endDate.toLocaleDateString()}</strong>
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CalendarPage;
