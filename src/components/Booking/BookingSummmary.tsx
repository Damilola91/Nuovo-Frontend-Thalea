import { useTranslations } from "next-intl";

interface SummaryData {
  checkIn: Date | null;
  checkOut: Date | null;
  guestsCount: number;
  nights: number;
  pricePerNight: number;
  accommodationPrice: number;
  cleaningFee: number;
  totalPrice: number;
}

function fmt(d: Date | null): string {
  if (!d) return "—";
  return d.toLocaleDateString("it-IT", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function BookingSummary({ data }: { data: SummaryData }) {
  const t = useTranslations("booking");

  // Mostra i prezzi solo se abbiamo dati reali dal BE (pricePerNight > 0)
  const hasNights = data.nights > 0;
  const hasPrices = data.pricePerNight > 0 && data.accommodationPrice > 0;

  return (
    <aside className="sticky top-6 h-fit rounded-xl border border-[#e8e3d8] bg-[#f7f4ee] p-6 text-sm">
      {/* Appartamento */}
      <div className="mb-4 flex items-center gap-3 border-b border-[#e8e3d8] pb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#4a6741]/10 text-[#4a6741]">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </div>
        <div>
          <p className="font-medium text-[#2e3d2f]">Thălēa Apartment</p>
          <p className="text-xs text-[#5a6b5b]">Palermo, Sicilia</p>
        </div>
      </div>

      {/* Riepilogo */}
      <p className="mb-3 text-base text-[#2e3d2f]" style={{ fontFamily: "Outfit, sans-serif" }}>
        {t("summary")}
      </p>
      <dl className="space-y-2 text-[#5a6b5b]">
        <div className="flex justify-between">
          <dt>{t("checkIn")}</dt>
          <dd className="text-[#2e3d2f]">{fmt(data.checkIn)}</dd>
        </div>
        <div className="flex justify-between">
          <dt>{t("checkOut")}</dt>
          <dd className="text-[#2e3d2f]">{fmt(data.checkOut)}</dd>
        </div>
        <div className="flex justify-between">
          <dt>{t("guests")}</dt>
          <dd className="text-[#2e3d2f]">{data.guestsCount || "—"}</dd>
        </div>
      </dl>

      {/* Prezzi — solo dopo verifica disponibilità (step 1+) */}
      {hasNights && hasPrices && (
        <div className="mt-4 space-y-2 border-t border-[#e8e3d8] pt-4 text-[#5a6b5b]">
          <div className="flex justify-between">
            <dt>€ {data.pricePerNight} × {data.nights} {data.nights === 1 ? "notte" : "notti"}</dt>
            <dd>€ {data.accommodationPrice}</dd>
          </div>
          <div className="flex justify-between">
            <dt>{t("cleaningFee")}</dt>
            <dd>€ {data.cleaningFee}</dd>
          </div>
          <div className="mt-3 flex justify-between border-t border-[#e8e3d8] pt-3 text-base font-medium text-[#2e3d2f]">
            <dt>{t("total")}</dt>
            <dd>€ {data.totalPrice}</dd>
          </div>
        </div>
      )}

      {/* Placeholder prezzi prima della verifica disponibilità */}
      {hasNights && !hasPrices && (
        <div className="mt-4 border-t border-[#e8e3d8] pt-4">
          <p className="text-xs text-[#5a6b5b]">{t("stepDates.nights")}: {data.nights}</p>
          <p className="mt-1 text-xs text-[#5a6b5b] italic">I prezzi saranno mostrati dopo la verifica disponibilità</p>
        </div>
      )}

      {hasNights && hasPrices && (
        <p className="mt-4 text-xs leading-relaxed text-[#5a6b5b]">
          {t("touristTaxNote")}
        </p>
      )}
    </aside>
  );
}