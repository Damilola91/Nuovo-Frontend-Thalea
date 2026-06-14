"use client";

import { useState } from "react";

interface AdminCalendarProps {
  occupiedDates: string[];
}

const MONTHS = ["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"];
const DAYS = ["Lu","Ma","Me","Gi","Ve","Sa","Do"];

export function AdminCalendar({ occupiedDates }: AdminCalendarProps) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const occupied = new Set(occupiedDates);

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDow = (firstDay.getDay() + 6) % 7; // lunedì = 0

  const cells: (number | null)[] = [
    ...Array(startDow).fill(null),
    ...Array.from({ length: lastDay.getDate() }, (_, i) => i + 1),
  ];

  const toKey = (day: number) => {
    const m = String(month + 1).padStart(2, "0");
    const d = String(day).padStart(2, "0");
    return `${year}-${m}-${d}`;
  };

  const prev = () => {
    if (month === 0) { setMonth(11); setYear((y) => y - 1); }
    else setMonth((m) => m - 1);
  };

  const next = () => {
    if (month === 11) { setMonth(0); setYear((y) => y + 1); }
    else setMonth((m) => m + 1);
  };

  return (
    <div className="rounded-xl border border-[#e8e3d8] bg-white p-6">
      {/* Header navigazione */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg text-[#2e3d2f]" style={{ fontFamily: "Outfit, sans-serif" }}>
          {MONTHS[month]} {year}
        </h2>
        <div className="flex gap-2">
          <button onClick={prev} className="rounded-full border border-[#e8e3d8] px-3 py-1.5 text-sm text-[#5a6b5b] hover:bg-[#f7f4ee]">‹</button>
          <button
            onClick={() => { setMonth(today.getMonth()); setYear(today.getFullYear()); }}
            className="rounded-full border border-[#e8e3d8] px-3 py-1.5 text-xs text-[#5a6b5b] hover:bg-[#f7f4ee]"
          >
            Oggi
          </button>
          <button onClick={next} className="rounded-full border border-[#e8e3d8] px-3 py-1.5 text-sm text-[#5a6b5b] hover:bg-[#f7f4ee]">›</button>
        </div>
      </div>

      {/* Giorni della settimana */}
      <div className="mb-2 grid grid-cols-7 gap-1">
        {DAYS.map((d) => (
          <div key={d} className="text-center text-xs font-medium text-[#5a6b5b]">{d}</div>
        ))}
      </div>

      {/* Celle calendario */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (!day) return <div key={i} />;
          const key = toKey(day);
          const isOccupied = occupied.has(key);
          const isToday =
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear();

          return (
            <div
              key={i}
              className={`relative flex min-h-[48px] flex-col items-center justify-start rounded-lg border p-1 text-xs ${
                isOccupied
                  ? "border-[#4a6741] bg-[#4a6741]/10"
                  : isToday
                  ? "border-[#4a6741]"
                  : "border-[#e8e3d8]"
              }`}
            >
              <span className={`text-xs font-medium ${isToday ? "text-[#4a6741]" : "text-[#2e3d2f]"}`}>
                {day}
              </span>
              {isOccupied && (
                <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-[#4a6741]" />
              )}
            </div>
          );
        })}
      </div>

      {/* Legenda */}
      <div className="mt-4 flex gap-4 text-xs text-[#5a6b5b]">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-[#4a6741]/20 border border-[#4a6741]" />
          Occupato
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm border border-[#e8e3d8]" />
          Disponibile
        </span>
      </div>

      <p className="mt-2 text-xs text-[#5a6b5b]">
        {occupiedDates.length} date occupate totali
      </p>
    </div>
  );
}