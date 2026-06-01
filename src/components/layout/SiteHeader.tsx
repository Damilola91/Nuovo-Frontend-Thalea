"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ContactModal } from "./ContactModal";
import { useAuthStore } from "@/store/authStore";
import toast from "react-hot-toast";

export function SiteHeader() {
  const t = useTranslations("navbar");
  const pathname = usePathname();
  console.log("pathname", pathname)

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const { isAuthenticated, role, logout } = useAuthStore();

  // Verifica sessione una volta al mount
  useEffect(() => {
    useAuthStore.getState().fetchMe();
  }, []);

  // Chiude menu mobile al cambio pagina
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Rileva scroll per ombra header
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = "/";
      toast.success(t("logout"));
    } catch {
      toast.error("Errore durante il logout");
    }
  };

  const navLinks = [
    { href: "/where", label: t("where") },
    { href: "/gallery", label: t("apartment") },
    { href: "/services", label: t("services") },
    { href: "/nearby", label: t("nearby") },
  ];

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b border-[#e8e3d8] transition-all duration-300 ${
          scrolled
            ? "bg-[#f7f4ee]/95 shadow-sm backdrop-blur-md"
            : "bg-[#f7f4ee]/80 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex h-16 items-center justify-between">
            <Link
              href="/"
              className="text-xl text-[#2e3d2f] transition-colors hover:text-[#4a6741]"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              Thălēa Apartment
            </Link>

            <nav className="hidden items-center gap-6 lg:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href as any}
                  className="text-sm text-[#5a6b5b] transition-colors hover:text-[#2e3d2f]"
                >
                  {link.label}
                </Link>
              ))}

              <button
                onClick={() => setContactOpen(true)}
                className="text-sm text-[#5a6b5b] transition-colors hover:text-[#2e3d2f]"
              >
                {t("contact")}
              </button>

              {isAuthenticated && role === "admin" && (
                <Link
                  href="/admin/dashboard"
                  className="text-sm text-[#5a6b5b] transition-colors hover:text-[#2e3d2f]"
                >
                  {t("admin")}
                </Link>
              )}

              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="text-sm text-[#5a6b5b] transition-colors hover:text-[#2e3d2f]"
                >
                  {t("logout")}
                </button>
              ) : (
                <Link
                  href="/login"
                  className="text-sm text-[#5a6b5b] transition-colors hover:text-[#2e3d2f]"
                >
                  {t("login")}
                </Link>
              )}

              <LanguageSwitcher />

              <Link
                href="/calendar"
                className="rounded-full bg-[#4a6741] px-5 py-2 text-sm font-medium text-[#f7f4ee] transition-colors hover:bg-[#3d5635]"
              >
                {t("book")}
              </Link>
            </nav>

            <button
              className="p-2 text-[#2e3d2f] lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Menu"
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="border-t border-[#e8e3d8] bg-[#f7f4ee] lg:hidden">
            <div className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href as any}
                  className="rounded-md px-3 py-2.5 text-sm text-[#5a6b5b] transition-colors hover:bg-[#eee9de] hover:text-[#2e3d2f]"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              <button
                onClick={() => { setContactOpen(true); setIsOpen(false); }}
                className="rounded-md px-3 py-2.5 text-left text-sm text-[#5a6b5b] transition-colors hover:bg-[#eee9de] hover:text-[#2e3d2f]"
              >
                {t("contact")}
              </button>

              {isAuthenticated && role === "admin" && (
                <Link
                  href="/admin/dashboard"
                  className="rounded-md px-3 py-2.5 text-sm text-[#5a6b5b] transition-colors hover:bg-[#eee9de] hover:text-[#2e3d2f]"
                  onClick={() => setIsOpen(false)}
                >
                  {t("admin")}
                </Link>
              )}

              {isAuthenticated ? (
                <button
                  onClick={() => { handleLogout(); setIsOpen(false); }}
                  className="rounded-md px-3 py-2.5 text-left text-sm text-[#5a6b5b] transition-colors hover:bg-[#eee9de] hover:text-[#2e3d2f]"
                >
                  {t("logout")}
                </button>
              ) : (
                <Link
                  href="/login"
                  className="rounded-md px-3 py-2.5 text-sm text-[#5a6b5b] transition-colors hover:bg-[#eee9de] hover:text-[#2e3d2f]"
                  onClick={() => setIsOpen(false)}
                >
                  {t("login")}
                </Link>
              )}

              <div className="px-3 py-2">
                <LanguageSwitcher isMobile closeMenu={() => setIsOpen(false)} />
              </div>

              <Link
                href="/calendar"
                className="mt-2 rounded-full bg-[#4a6741] px-5 py-2.5 text-center text-sm font-medium text-[#f7f4ee]"
                onClick={() => setIsOpen(false)}
              >
                {t("book")}
              </Link>
            </div>
          </div>
        )}
      </header>

      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}