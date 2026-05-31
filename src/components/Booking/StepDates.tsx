"use client";

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
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
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
    if (!range) { onChange(null, null); return; }
    const from = range.from ?? null;
    const to = range.to ?? null;

    if (from && to) {
      const cursor = new Date(from);
      cursor.setDate(cursor.getDate() + 1);
      while (cursor < to) {
        if (occupied.has(toKey(cursor))) {
          onChange(from, null);
          return;
        }
        cursor.setDate(cursor.getDate() + 1);
      }
      if (Math.round((+to - +from) / 86_400_000) < 2) {
        onChange(from, null);
        return;
      }
    }
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

      <div className="rounded-xl border border-[#e8e3d8] bg-white p-4 overflow-x-auto">
        <style>{`
          .rdp { --rdp-accent-color: #4a6741; font-family: Figtree, sans-serif; margin: 0; }
          .rdp-months { display: flex; flex-direction: row; gap: 1.5rem; flex-wrap: nowrap; }
          .rdp-day_selected, .rdp-day_range_start, .rdp-day_range_end { background-color: #4a6741 !important; color: #f7f4ee !important; border-radius: 9999px !important; }
          .rdp-day_range_middle { background-color: rgba(74,103,65,0.12) !important; color: #2e3d2f !important; border-radius: 0 !important; }
          .rdp-day:hover:not([disabled]):not(.rdp-day_selected) { background-color: #eee9de !important; border-radius: 9999px; }
          .rdp-day[disabled] { opacity: 0.25 !important; cursor: not-allowed !important; text-decoration: line-through; }
        `}</style>
        <div style={{ minWidth: "560px" }}>
          <DayPicker
            mode="range"
            selected={selected}
            onSelect={handleSelect}
            disabled={isDisabled}
            locale={it}
            numberOfMonths={2}
            startMonth={today}
          />
        </div>
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