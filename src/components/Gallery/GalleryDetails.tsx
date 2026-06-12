import { useTranslations } from "next-intl";

interface GalleryDetailsProps {
  pricePerNight: number;
  maxGuests: number;
}

export function GalleryDetails({ pricePerNight, maxGuests }: GalleryDetailsProps) {
  const t = useTranslations("gallery");

  const details = [
    [t("details.guests"), `${t("details.upTo")} ${maxGuests}`],
    [t("details.bedrooms"), "1"],
    [t("details.bathrooms"), "1"],
    [t("details.surface"), "53 m²"],
    [t("details.minStay"), t("details.minStayValue")],
    [t("details.rate"), `${t("details.from")} € ${pricePerNight} / ${t("details.night")}`],
  ];

  const amenities: string[] = t.raw("amenities.items") as string[];

  return (
    <section className="mx-auto grid max-w-5xl gap-12 px-6 py-20 md:grid-cols-2">
      <div>
        <h2
          className="text-3xl text-[#2e3d2f]"
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          {t("details.title")}
        </h2>
        <dl className="mt-6 space-y-3 text-sm">
          {details.map(([k, v]) => (
            <div
              key={k}
              className="flex justify-between border-b border-[#e8e3d8] pb-3"
            >
              <dt className="text-[#5a6b5b]">{k}</dt>
              <dd className="font-medium text-[#2e3d2f]">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div>
        <h2
          className="text-3xl text-[#2e3d2f]"
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          {t("amenities.title")}
        </h2>
        <ul className="mt-6 grid grid-cols-2 gap-2 text-sm">
          {amenities.map((a) => (
            <li key={a} className="flex items-center gap-2 text-[#5a6b5b]">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#4a6741]" />
              {a}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}