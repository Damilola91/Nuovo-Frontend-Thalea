"use client";

import { useState, useTransition } from "react";
import { useLocale } from "next-intl";
import { useRouter } from "@/i18n/navigation";
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
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleChange = (newLocale: Locale) => {
    startTransition(() => {
      router.replace("/", { locale: newLocale });
    });
    setIsOpen(false);
    closeMenu?.();
  };

  const current = languageLabels[locale];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className="flex items-center gap-1.5 px-3 py-2 rounded-md text-sm text-[#5a6b5b] hover:text-[#2e3d2f] hover:bg-[#eee9de] transition-colors disabled:opacity-50"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>{current.flag}</span>
        {!isMobile && (
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
        {isMobile && <span className="text-sm">Lingua</span>}
      </button>

      {isOpen && (
        <div
          className={`absolute right-0 mt-2 w-44 bg-[#f7f4ee] border border-[#e8e3d8] rounded-lg shadow-lg z-50 overflow-hidden ${
            isMobile ? "relative w-full shadow-none border-0 mt-1" : ""
          }`}
          role="listbox"
        >
          {locales.map((lang) => (
            <button
              key={lang}
              role="option"
              aria-selected={lang === locale}
              className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 hover:bg-[#eee9de] transition-colors ${
                lang === locale ? "text-[#4a6741] font-medium" : "text-[#2e3d2f]"
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