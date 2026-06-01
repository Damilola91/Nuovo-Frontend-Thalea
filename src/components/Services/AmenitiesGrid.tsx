import { useTranslations } from "next-intl";

interface AmenitiesGridProps {
  amenities: {
    general: string[];
    kitchen: string[];
    bathroom: string[];
    outdoor: string[];
    laundry: string[];
  };
}

const CATEGORY_ICONS: Record<string, string> = {
  general: "🏠",
  kitchen: "🍳",
  bathroom: "🚿",
  outdoor: "🌿",
  laundry: "🧺",
};

export function AmenitiesGrid({ amenities }: AmenitiesGridProps) {
  const t = useTranslations("servicesPage");

  const categories = [
    { key: "general", items: amenities.general },
    { key: "kitchen", items: amenities.kitchen },
    { key: "bathroom", items: amenities.bathroom },
    { key: "outdoor", items: amenities.outdoor },
    { key: "laundry", items: amenities.laundry },
  ].filter((c) => c.items.length > 0);

  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <h2
        className="text-3xl text-[#2e3d2f] mb-10"
        style={{ fontFamily: "Outfit, sans-serif" }}
      >
        {t("amenitiesTitle")}
      </h2>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map(({ key, items }) => (
          <div
            key={key}
            className="rounded-xl border border-[#e8e3d8] bg-[#f7f4ee] p-6"
          >
            <div className="mb-4 flex items-center gap-2">
              <span className="text-xl">{CATEGORY_ICONS[key]}</span>
              <h3
                className="text-lg text-[#2e3d2f]"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                {t(`categories.${key}`)}
              </h3>
            </div>
            <ul className="space-y-2">
              {items.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[#5a6b5b]">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#4a6741]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}