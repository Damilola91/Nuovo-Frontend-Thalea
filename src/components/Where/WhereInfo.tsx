import { useTranslations } from "next-intl";
import { Clock, Info } from "lucide-react";

export function WhereInfo() {
  const t = useTranslations("where");

  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Orari */}
        <div className="rounded-xl border border-[#e8e3d8] bg-[#f7f4ee] p-6">
          <div className="mb-4 flex items-center gap-2">
            <Clock size={18} className="text-[#4a6741]" />
            <h3
              className="text-lg text-[#2e3d2f]"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              {t("hours.title")}
            </h3>
          </div>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between border-b border-[#e8e3d8] pb-2">
              <dt className="text-[#5a6b5b]">Check-in</dt>
              <dd className="font-medium text-[#2e3d2f]">{t("hours.checkin")}</dd>
            </div>
            <div className="flex justify-between pt-1">
              <dt className="text-[#5a6b5b]">Check-out</dt>
              <dd className="font-medium text-[#2e3d2f]">{t("hours.checkout")}</dd>
            </div>
          </dl>
        </div>

        {/* Info utili */}
        <div className="rounded-xl border border-[#e8e3d8] bg-[#f7f4ee] p-6">
          <div className="mb-4 flex items-center gap-2">
            <Info size={18} className="text-[#4a6741]" />
            <h3
              className="text-lg text-[#2e3d2f]"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              {t("info.title")}
            </h3>
          </div>
          <div className="space-y-2 text-sm text-[#5a6b5b]">
            {(t.raw("info.paragraphs") as string[]).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}