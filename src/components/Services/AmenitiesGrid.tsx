import { useTranslations, useLocale } from "next-intl";
import {
  AMENITY_CATEGORIES,
  resolveLocalized,
  type Amenities,
  type AmenityCategory,
} from "@/types/amenityTypes";

interface AmenitiesGridProps {
  amenities: Amenities;
}

const CATEGORY_ICONS: Record<AmenityCategory, string> = {
  general: "🏠",
  kitchen: "🍳",
  bathroom: "🚿",
  outdoor: "🌿",
  laundry: "🧺",
};

export function AmenitiesGrid({ amenities }: AmenitiesGridProps) {
  const t = useTranslations("servicesPage");
  const locale = useLocale();

  const categories = AMENITY_CATEGORIES.map((key) => ({
    key,
    items: amenities?.[key] ?? [],
  })).filter((c) => c.items.length > 0);

  if (categories.length === 0) return null;

  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <h2
        className="mb-10 text-3xl text-[#2e3d2f]"
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
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-[#5a6b5b]"
                >
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#4a6741]" />
                  {resolveLocalized(item, locale)}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}