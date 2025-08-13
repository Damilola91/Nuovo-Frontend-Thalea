"use client";

import { useState } from "react";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";
import CalendarSelector from "../../CalendarSelector/CalendarSelector";

const CalendarPage = () => {
  const [selectedRange, setSelectedRange] = useState(null);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="container mx-auto mt-20 flex-grow px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-[#46331d] text-center drop-shadow-lg">
          Seleziona il tuo soggiorno
        </h1>

        <CalendarSelector onChange={setSelectedRange} />

        {selectedRange && (
          <div className="text-center mt-8">
            <p className="text-[#46331d]">
              Dal{" "}
              <strong>{selectedRange.startDate.toLocaleDateString()}</strong> al{" "}
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
