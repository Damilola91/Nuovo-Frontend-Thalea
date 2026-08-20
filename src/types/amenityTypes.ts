export const SUPPORTED_LOCALES = ["it", "en", "de", "fr", "es", "zh"] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export const LOCALE_LABELS: Record<SupportedLocale, string> = {
  it: "Italiano",
  en: "English",
  de: "Deutsch",
  fr: "Français",
  es: "Español",
  zh: "中文",
};

export const LOCALE_FLAGS: Record<SupportedLocale, string> = {
  it: "🇮🇹",
  en: "🇬🇧",
  de: "🇩🇪",
  fr: "🇫🇷",
  es: "🇪🇸",
  zh: "🇨🇳",
};

/** Voce multilingua: `it` obbligatorio, resto opzionale con fallback. */
export interface LocalizedText {
  it: string;
  en?: string;
  de?: string;
  fr?: string;
  es?: string;
  zh?: string;
}

export type AmenityCategory =
  | "general"
  | "kitchen"
  | "bathroom"
  | "outdoor"
  | "laundry";

export const AMENITY_CATEGORIES: AmenityCategory[] = [
  "general",
  "kitchen",
  "bathroom",
  "outdoor",
  "laundry",
];

export type Amenities = Record<AmenityCategory, LocalizedText[]>;

export const EMPTY_AMENITIES: Amenities = {
  general: [],
  kitchen: [],
  bathroom: [],
  outdoor: [],
  laundry: [],
};

/**
 * Risolve una voce multilingua nella lingua richiesta.
 * Se la traduzione manca o è vuota, torna all'italiano.
 */
export function resolveLocalized(item: LocalizedText, locale: string): string {
  const key = locale as SupportedLocale;
  const value = item[key];
  return value && value.trim().length > 0 ? value : item.it;
}
