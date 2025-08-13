"use client";

import { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const CalendarSelector = ({ onChange }) => {
  const [selectedRange, setSelectedRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const handleChange = (item) => {
    setSelectedRange(item.selection);
    if (onChange) {
      onChange(item.selection);
    }
  };

  return (
    <section className="mb-12 max-w-lg mx-auto text-center">
      <h2 className="text-3xl font-bold mb-6 text-[#46331d] drop-shadow-sm">
        Seleziona le date
      </h2>

      <div className="bg-[#f3f1e7] p-4 rounded-xl shadow-md border border-gray-200">
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
    </section>
  );
};

export default CalendarSelector;
