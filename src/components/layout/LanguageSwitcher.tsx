"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { locales, type Locale } from "@/i18n/config";

const languageLabels: Record<Locale, { flag: string; label: string }> = {
  it: { flag: "🇮🇹", label: "Italiano" },
  en: { flag: "🇬🇧", label: "English" },
  de: { flag: "🇩🇪", label: "Deutsch" },
  fr: { flag: "🇫🇷", label: "Français" },
  es: { flag: "🇪🇸", label: "Español" },
  zh: { flag: "🇨🇳", label: "中文" },
};

interface LanguageSwitcherProps {
  isMobile?: boolean;
  closeMenu?: () => void;
}

export function LanguageSwitcher({ isMobile = false, closeMenu }: LanguageSwitcherProps) {
  const locale = useLocale() as Locale;
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (newLocale: Locale) => {
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
    setIsOpen(false);
    closeMenu?.();
    window.location.reload();
  };

  const current = languageLabels[locale];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 rounded-md px-3 py-2 text-sm text-[#5a6b5b] transition-colors hover:bg-[#eee9de] hover:text-[#2e3d2f]"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>{current.flag}</span>
        {!isMobile && (
          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
        {isMobile && <span className="text-sm">Lingua</span>}
      </button>

      {isOpen && (
        <div
          className={`absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-lg border border-[#e8e3d8] bg-[#f7f4ee] shadow-lg ${
            isMobile ? "relative mt-1 w-full border-0 shadow-none" : ""
          }`}
          role="listbox"
        >
          {locales.map((lang) => (
            <button
              key={lang}
              role="option"
              aria-selected={lang === locale}
              className={`flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm transition-colors hover:bg-[#eee9de] ${
                lang === locale ? "font-medium text-[#4a6741]" : "text-[#2e3d2f]"
              }`}
              onClick={() => handleChange(lang)}
            >
              <span>{languageLabels[lang].flag}</span>
              {languageLabels[lang].label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}