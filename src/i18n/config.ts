export const locales = ["it", "en", "de", "fr", "es", "zh"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "it";
