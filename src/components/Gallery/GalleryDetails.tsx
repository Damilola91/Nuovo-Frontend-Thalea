import { useTranslations } from "next-intl";

const DETAILS = [
  ["Ospiti", "Fino a 2"],
  ["Camere da letto", "1"],
  ["Bagni", "1"],
  ["Superficie", "53 m²"],
  ["Soggiorno minimo", "2 notti"],
  ["Tariffa", "Da € 130 / notte"],
] as const;

const AMENITIES = [
  "Wifi fibra",
  "Aria condizionata",
  "Cucina attrezzata",
  "Lavatrice",
  "Terrazza privata",
  "Lenzuola in lino",
  "Caffè di benvenuto",
  "Check-in autonomo",
  "Pulizie incluse",
];

const GalleryDetails = () => {
    const t = useTranslations("gallery")
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
            {DETAILS.map(([k, v]) => (
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
            {AMENITIES.map((a) => (
              <li key={a} className="flex items-center gap-2 text-[#5a6b5b]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#4a6741] shrink-0" />
                {a}
              </li>
            ))}
          </ul>
        </div>
      </section>
    )
}

export default GalleryDetails