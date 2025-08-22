"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "it", label: "Italiano", flag: "🇮🇹" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
];

const LanguageSwitcher = ({ isMobile = false, closeMenu }) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const handleChangeLanguage = (code) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
    if (closeMenu) closeMenu();
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors ${
          isMobile ? "w-full justify-between" : ""
        }`}
      >
        <span>
          {languages.find((l) => l.code === i18n.language)?.flag || "🇮🇹"}
        </span>
        {!isMobile && (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        )}
        {isMobile && <span>Lingua</span>}
      </button>

      {isOpen && (
        <div
          className={`absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10 ${
            isMobile ? "bg-gray-50 border-l-2 border-gray-200" : ""
          }`}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
              onClick={() => handleChangeLanguage(lang.code)}
            >
              <span className="mr-2">{lang.flag}</span>
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
