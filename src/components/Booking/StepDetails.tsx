"use client";

import { useTranslations } from "next-intl";

export interface GuestData {
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  notes: string;
}

interface StepDetailsProps {
  data: GuestData;
  onChange: (data: GuestData) => void;
}

export function StepDetails({ data, onChange }: StepDetailsProps) {
  const t = useTranslations("booking");

  const handle = (field: keyof GuestData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => onChange({ ...data, [field]: e.target.value });

  return (
    <div className="space-y-6">
      <div>
        <h2
          className="text-2xl text-[#2e3d2f]"
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          {t("stepDetails.title")}
        </h2>
        <p className="mt-1 text-sm text-[#5a6b5b]">{t("stepDetails.subtitle")}</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#2e3d2f]">
            {t("stepDetails.name")} *
          </label>
          <input
            type="text"
            value={data.guestName}
            onChange={handle("guestName")}
            placeholder="Mario Rossi"
            className="w-full rounded-lg border border-[#e8e3d8] bg-white px-3 py-2.5 text-sm text-[#2e3d2f] placeholder:text-[#5a6b5b]/50 focus:border-[#4a6741] focus:outline-none focus:ring-1 focus:ring-[#4a6741]"
            required
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#2e3d2f]">
            {t("stepDetails.email")} *
          </label>
          <input
            type="email"
            value={data.guestEmail}
            onChange={handle("guestEmail")}
            placeholder="mario@esempio.it"
            className="w-full rounded-lg border border-[#e8e3d8] bg-white px-3 py-2.5 text-sm text-[#2e3d2f] placeholder:text-[#5a6b5b]/50 focus:border-[#4a6741] focus:outline-none focus:ring-1 focus:ring-[#4a6741]"
            required
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#2e3d2f]">
            {t("stepDetails.phone")} *
          </label>
          <input
            type="tel"
            value={data.guestPhone}
            onChange={handle("guestPhone")}
            placeholder="+39 333 000 0000"
            className="w-full rounded-lg border border-[#e8e3d8] bg-white px-3 py-2.5 text-sm text-[#2e3d2f] placeholder:text-[#5a6b5b]/50 focus:border-[#4a6741] focus:outline-none focus:ring-1 focus:ring-[#4a6741]"
            required
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#2e3d2f]">
            {t("stepDetails.notes")}
          </label>
          <textarea
            value={data.notes}
            onChange={handle("notes")}
            rows={3}
            placeholder={t("stepDetails.notesPlaceholder")}
            className="w-full rounded-lg border border-[#e8e3d8] bg-white px-3 py-2.5 text-sm text-[#2e3d2f] placeholder:text-[#5a6b5b]/50 focus:border-[#4a6741] focus:outline-none focus:ring-1 focus:ring-[#4a6741] resize-none"
          />
        </div>
      </div>
    </div>
  );
}