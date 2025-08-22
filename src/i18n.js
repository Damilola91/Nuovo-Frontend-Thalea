"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import resourcesToBackend from "i18next-resources-to-backend";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(resourcesToBackend((lng, ns) => import(`./locales/${lng}/${ns}.json`)))
  .init({
    fallbackLng: "it",
    supportedLngs: ["it", "en", "fr", "es", "de", "zh"],
    detection: {
      order: ["localStorage", "navigator"], // prima controlla localStorage, poi browser
      caches: ["localStorage"], // salva la lingua in localStorage
    },
    interpolation: {
      escapeValue: false, // React già fa l'escape
    },
  });

export default i18n;
