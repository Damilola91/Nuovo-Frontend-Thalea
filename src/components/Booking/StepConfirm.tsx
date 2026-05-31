import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { CompletedBooking } from "@/types/index";

interface StepConfirmProps {
  booking: CompletedBooking["booking"];
}

function fmt(d: string): string {
  return new Date(d).toLocaleDateString("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function StepConfirm({ booking }: StepConfirmProps) {
  const t = useTranslations("booking");

  return (
    <div className="space-y-6 text-center">
      {/* Icona successo */}
      <div className="flex justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#4a6741]/10">
          <svg className="h-8 w-8 text-[#4a6741]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      <div>
        <h2
          className="text-3xl text-[#2e3d2f]"
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          {t("stepConfirm.title")}
        </h2>
        <p className="mt-2 text-[#5a6b5b]">{t("stepConfirm.subtitle")}</p>
      </div>

      {/* Riepilogo */}
      <div className="rounded-xl border border-[#e8e3d8] bg-[#f7f4ee] p-6 text-left text-sm">
        <dl className="space-y-3 text-[#5a6b5b]">
          <div className="flex justify-between">
            <dt>{t("stepConfirm.code")}</dt>
            <dd className="font-mono font-medium text-[#2e3d2f]">
              {booking.bookingCode}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt>{t("checkIn")}</dt>
            <dd className="text-[#2e3d2f]">{fmt(booking.checkIn)}</dd>
          </div>
          <div className="flex justify-between">
            <dt>{t("checkOut")}</dt>
            <dd className="text-[#2e3d2f]">{fmt(booking.checkOut)}</dd>
          </div>
          <div className="flex justify-between">
            <dt>{t("guests")}</dt>
            <dd className="text-[#2e3d2f]">{booking.guestsCount}</dd>
          </div>
          <div className="flex justify-between border-t border-[#e8e3d8] pt-3 font-medium text-[#2e3d2f]">
            <dt>{t("total")}</dt>
            <dd>€ {booking.totalPrice}</dd>
          </div>
        </dl>
      </div>

      <p className="text-sm text-[#5a6b5b]">
        {t("stepConfirm.emailSent")} <strong>{booking.guestEmail}</strong>
      </p>

      <Link
        href="/"
        className="inline-block rounded-full border border-[#e8e3d8] px-6 py-2.5 text-sm text-[#2e3d2f] transition-colors hover:bg-[#eee9de]"
      >
        {t("stepConfirm.backHome")}
      </Link>
    </div>
  );
}