"use client";

import { useState } from "react";
import Link from "next/link";
import ContactLink from "../ContactLink/ContactLink";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const navLinks = [
    { href: "/where", label: "Dove" },
    { href: "/gallery", label: "Appartamento" },
    { href: "/services", label: "Servizi" },
    { href: "/nearby", label: "Dintorni" },
  ];

  const languages = [
    { code: "it", label: "Italiano", flag: "🇮🇹" },
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "de", label: "Deutsch", flag: "🇩🇪" },
    { code: "fr", label: "Français", flag: "🇫🇷" },
    { code: "es", label: "Español", flag: "🇪🇸" },
    { code: "zh", label: "中文", flag: "🇨🇳" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <h1
                className="text-2xl font-bold cursor-pointer hover:opacity-80 transition"
                style={{ color: "#46331d" }}
              >
                Thălēa Palermo
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-medium hover:opacity-70 transition-opacity duration-200"
                style={{ color: "#46331d" }}
              >
                {link.label}
              </a>
            ))}

            {/* Contatti con modale */}
            <ContactLink />

            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                <span>🇮🇹</span>
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
              </button>
              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                      onClick={() => setIsLangOpen(false)}
                    >
                      <span className="mr-2">{lang.flag}</span>
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Book Button */}
            <button
              className="px-6 py-2 rounded-md text-white font-medium hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#46331d" }}
            >
              Prenota
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2"
              style={{ color: "#46331d" }}
            >
              {isOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block px-3 py-2 hover:opacity-70 transition-opacity"
                  style={{ color: "#46331d" }}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}

              {/* Bottone Contatti mobile */}
              <div className="px-3 py-2">
                <ContactLink />
              </div>

              {/* Mobile Language Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="w-full text-left px-3 py-2 flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <span className="mr-2">🇮🇹</span>
                    Lingua
                  </div>
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
                </button>
                {isLangOpen && (
                  <div className="bg-gray-50 border-l-2 border-gray-200">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        className="w-full text-left px-6 py-2 hover:bg-gray-100 flex items-center"
                        onClick={() => setIsLangOpen(false)}
                      >
                        <span className="mr-2">{lang.flag}</span>
                        {lang.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Prenota */}
              <div className="px-3 py-2">
                <button
                  className="w-full px-6 py-2 rounded-md text-white font-medium hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: "#46331d" }}
                >
                  Prenota
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
