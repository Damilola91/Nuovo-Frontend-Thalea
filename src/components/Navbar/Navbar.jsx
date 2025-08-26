"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import ContactLink from "../ContactLink/ContactLink";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import {
  selectIsAuthenticated,
  selectUserRole,
  logoutUser,
} from "../../reducer/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userRole = useSelector(selectUserRole);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      router.push("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const navLinks = [
    { href: "/where", label: t("navbar.where") },
    { href: "/gallery", label: t("navbar.apartment") },
    { href: "/services", label: t("navbar.services") },
    { href: "/nearby", label: t("navbar.nearby") },
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
                Thălēa Apartment
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-bold hover:opacity-70 transition-opacity duration-200"
                style={{ color: "#46331d" }}
              >
                {link.label}
              </Link>
            ))}

            {/* Admin link solo se autenticato e admin */}

            {/* Contatti con modale */}
            <ContactLink />

            {/* Login / Logout */}
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="font-bold hover:opacity-70 transition-opacity duration-200"
                style={{ color: "#46331d" }}
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="font-bold hover:opacity-70 transition-opacity duration-200"
                style={{ color: "#46331d" }}
              >
                Login
              </Link>
            )}

            {isAuthenticated && userRole === "admin" && (
              <Link
                href="/admin/dashboard"
                className="font-bold hover:opacity-70 transition-opacity duration-200"
                style={{ color: "#46331d" }}
              >
                Admin
              </Link>
            )}

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Book Button */}
            <Link
              href="/calendar"
              className="px-6 py-2 rounded-md text-white font-medium hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#46331d" }}
            >
              {t("navbar.book")}
            </Link>
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
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-3 py-2 hover:opacity-70 transition-opacity"
                  style={{ color: "#46331d" }}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {/* Admin mobile */}
              {isAuthenticated && userRole === "admin" && (
                <Link
                  href="/admin/dashboard"
                  className="block px-3 py-2 font-bold hover:opacity-70 transition-opacity"
                  style={{ color: "#46331d" }}
                  onClick={() => setIsOpen(false)}
                >
                  Admin
                </Link>
              )}

              {/* Bottone Contatti mobile */}
              <div className="px-3 py-2">
                <ContactLink />
              </div>

              {/* Login / Logout mobile */}
              <div className="px-3 py-2">
                {isAuthenticated ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="block px-3 py-2 font-bold hover:opacity-70 transition-opacity"
                    style={{ color: "#46331d" }}
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    href="/login"
                    className="block px-3 py-2 font-bold hover:opacity-70 transition-opacity"
                    style={{ color: "#46331d" }}
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                )}
              </div>

              {/* Mobile Language Switcher */}
              <div className="px-3 py-2">
                <LanguageSwitcher isMobile closeMenu={() => setIsOpen(false)} />
              </div>

              {/* Mobile Prenota */}
              <div className="px-3 py-2">
                <Link
                  href="/calendar"
                  className="w-full block px-6 py-2 rounded-md text-white font-medium hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: "#46331d" }}
                  onClick={() => setIsOpen(false)}
                >
                  {t("navbar.book")}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
