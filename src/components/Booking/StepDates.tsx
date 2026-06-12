"use client";

import { useState, useEffect } from "react";
import { DayPicker, type DateRange } from "react-day-picker";
import { it } from "date-fns/locale";
import { useTranslations } from "next-intl";
import "react-day-picker/dist/style.css";

interface StepDatesProps {
  checkIn: Date | null;
  checkOut: Date | null;
  occupiedDates: string[];
  onChange: (checkIn: Date | null, checkOut: Date | null) => void;
}

function toKey(d: Date): string {
  return new Intl.DateTimeFormat("sv-SE").format(d);
}

function formatDate(d: Date | null): string {
  if (!d) return "—";
  return d.toLocaleDateString("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function StepDates({ checkIn, checkOut, occupiedDates, onChange }: StepDatesProps) {
  const t = useTranslations("booking");
  const occupied = new Set(occupiedDates);
  const [months, setMonths] = useState(1);
  const [minStayError, setMinStayError] = useState(false);

  useEffect(() => {
    const update = () => setMonths(window.innerWidth >= 1280 ? 2 : 1);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const selected: DateRange = {
    from: checkIn ?? undefined,
    to: checkOut ?? undefined,
  };

  const isDisabled = (date: Date): boolean => {
    if (date < today) return true;
    return occupied.has(toKey(date));
  };

  const handleSelect = (range: DateRange | undefined) => {
    if (!range) { onChange(null, null); setMinStayError(false); return; }
    const from = range.from ?? null;
    const to = range.to ?? null;

    if (from && to) {
      const cursor = new Date(from);
      cursor.setDate(cursor.getDate() + 1);
      while (cursor < to) {
        if (occupied.has(toKey(cursor))) {
          onChange(from, null);
          setMinStayError(false);
          return;
        }
        cursor.setDate(cursor.getDate() + 1);
      }
      if (Math.round((+to - +from) / 86_400_000) < 3) {
        onChange(from, null);
        setMinStayError(true);
        return;
      }
    }
    setMinStayError(false);
    onChange(from, to);
  };

  const nights = checkIn && checkOut
    ? Math.round((+checkOut - +checkIn) / 86_400_000)
    : 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl text-[#2e3d2f]" style={{ fontFamily: "Outfit, sans-serif" }}>
          {t("stepDates.title")}
        </h2>
        <p className="mt-1 text-sm text-[#5a6b5b]">{t("stepDates.subtitle")}</p>
      </div>

      <div className="rounded-xl border border-[#e8e3d8] bg-white p-4">
        <style>{`
          .rdp {
            --rdp-accent-color: #4a6741;
            --rdp-accent-background-color: rgba(74,103,65,0.12);
            font-family: Figtree, sans-serif;
            margin: 0;
          }
          .rdp-months {
            display: flex !important;
            flex-direction: row !important;
            gap: 1.5rem !important;
            flex-wrap: nowrap !important;
          }
          .rdp-selected .rdp-day_button,
          .rdp-range_start .rdp-day_button,
          .rdp-range_end .rdp-day_button {
            background-color: #4a6741 !important;
            color: #f7f4ee !important;
            border-color: #4a6741 !important;
            border-radius: 9999px !important;
          }
          .rdp-range_middle .rdp-day_button {
            background-color: rgba(74,103,65,0.12) !important;
            color: #2e3d2f !important;
            border-radius: 0 !important;
            border-color: transparent !important;
          }
          .rdp-day_button:hover:not([disabled]) {
            background-color: #eee9de !important;
            border-radius: 9999px !important;
          }
          [data-disabled] .rdp-day_button {
            opacity: 0.25 !important;
            cursor: not-allowed !important;
            text-decoration: line-through !important;
          }
          .rdp-day_button:focus-visible {
            outline-color: #4a6741 !important;
          }
        `}</style>
        <DayPicker
          mode="range"
          selected={selected}
          onSelect={handleSelect}
          disabled={isDisabled}
          locale={it}
          numberOfMonths={months}
          startMonth={today}
        />
      </div>

      {/* Legenda */}
      <div className="flex flex-wrap gap-4 text-xs text-[#5a6b5b]">
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#4a6741]" />
          {t("stepDates.selected")}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#4a6741]/15" />
          {t("stepDates.range")}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#e8e3d8]" />
          {t("stepDates.occupied")}
        </span>
      </div>

      {/* Errore minimo soggiorno */}
      {minStayError && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-600">
          {t("stepDates.minStay")}
        </p>
      )}

      {/* Riepilogo */}
      {checkIn && (
        <div className="rounded-lg border border-[#e8e3d8] bg-[#f7f4ee] p-4 text-sm">
          <div className="flex justify-between text-[#5a6b5b]">
            <span>{t("checkIn")}</span>
            <span className="font-medium text-[#2e3d2f]">{formatDate(checkIn)}</span>
          </div>
          {checkOut ? (
            <>
              <div className="mt-2 flex justify-between text-[#5a6b5b]">
                <span>{t("checkOut")}</span>
                <span className="font-medium text-[#2e3d2f]">{formatDate(checkOut)}</span>
              </div>
              <div className="mt-3 flex justify-between border-t border-[#e8e3d8] pt-3 font-medium text-[#2e3d2f]">
                <span>{t("stepDates.nights")}</span>
                <span>{nights} {nights === 1 ? "notte" : "notti"}</span>
              </div>
            </>
          ) : (
            <p className="mt-2 text-xs text-[#5a6b5b]">{t("stepDates.selectCheckOut")}</p>
          )}
        </div>
      )}

      <p className="text-xs text-[#5a6b5b]">{t("stepDates.minStay")}</p>
    </div>
  );
}