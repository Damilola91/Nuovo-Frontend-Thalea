"use client";

import { useTranslations } from "next-intl";

const MAX_GUESTS = 2;

interface StepGuestsProps {
  value: number;
  onChange: (n: number) => void;
}

export function StepGuests({ value, onChange }: StepGuestsProps) {
  const t = useTranslations("booking");

  return (
    <div className="space-y-6">
      <div>
        <h2
          className="text-2xl text-[#2e3d2f]"
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          {t("stepGuests.title")}
        </h2>
        <p className="mt-1 text-sm text-[#5a6b5b]">
          {t("stepGuests.subtitle", { max: MAX_GUESTS })}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => onChange(Math.max(1, value - 1))}
          disabled={value <= 1}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e8e3d8] text-[#2e3d2f] transition-colors hover:bg-[#eee9de] disabled:opacity-30"
        >
          −
        </button>
        <span className="w-8 text-center text-2xl font-medium text-[#2e3d2f]">
          {value}
        </span>
        <button
          onClick={() => onChange(Math.min(MAX_GUESTS, value + 1))}
          disabled={value >= MAX_GUESTS}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e8e3d8] text-[#2e3d2f] transition-colors hover:bg-[#eee9de] disabled:opacity-30"
        >
          +
        </button>
        <span className="text-sm text-[#5a6b5b]">
          {value === 1 ? t("stepGuests.singular") : t("stepGuests.plural")}
        </span>
      </div>
    </div>
  );
}