"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ContactModal } from "./ContactModal";
import { useAuthStore } from "@/store/authStore";
import toast from "react-hot-toast";

export function SiteHeader() {
  const t = useTranslations("navbar");
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const { isAuthenticated, role, logout, fetchMe } = useAuthStore();

  // Verifica sessione al mount
  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  // Chiude menu su navigazione
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Ombra dopo scroll
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
      toast.success("Logout effettuato");
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
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b border-[#e8e3d8] ${
          scrolled
            ? "bg-[#f7f4ee]/95 backdrop-blur-md shadow-sm"
            : "bg-[#f7f4ee]/80 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="text-xl text-[#2e3d2f] hover:text-[#4a6741] transition-colors"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              Thălēa Apartment
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href as any}
                  className="text-sm text-[#5a6b5b] hover:text-[#2e3d2f] transition-colors"
                >
                  {link.label}
                </Link>
              ))}

              <button
                onClick={() => setContactOpen(true)}
                className="text-sm text-[#5a6b5b] hover:text-[#2e3d2f] transition-colors"
              >
                Contatti
              </button>

              {isAuthenticated && role === "admin" && (
                <Link
                  href="/admin/dashboard"
                  className="text-sm text-[#5a6b5b] hover:text-[#2e3d2f] transition-colors"
                >
                  Admin
                </Link>
              )}

              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="text-sm text-[#5a6b5b] hover:text-[#2e3d2f] transition-colors"
                >
                  Logout
                </button>
              ) : (
                <Link
                  href="/login"
                  className="text-sm text-[#5a6b5b] hover:text-[#2e3d2f] transition-colors"
                >
                  Login
                </Link>
              )}

              <LanguageSwitcher />

              <Link
                href="/calendar"
                className="rounded-full bg-[#4a6741] px-5 py-2 text-sm font-medium text-[#f7f4ee] hover:bg-[#3d5635] transition-colors"
              >
                {t("book")}
              </Link>
            </nav>

            {/* Mobile toggle */}
            <button
              className="lg:hidden p-2 text-[#2e3d2f]"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Menu"
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden border-t border-[#e8e3d8] bg-[#f7f4ee]">
            <div className="mx-auto max-w-6xl px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href as any}
                  className="px-3 py-2.5 rounded-md text-sm text-[#5a6b5b] hover:text-[#2e3d2f] hover:bg-[#eee9de] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              <button
                onClick={() => { setContactOpen(true); setIsOpen(false); }}
                className="px-3 py-2.5 rounded-md text-sm text-left text-[#5a6b5b] hover:text-[#2e3d2f] hover:bg-[#eee9de] transition-colors"
              >
                Contatti
              </button>

              {isAuthenticated && role === "admin" && (
                <Link
                  href="/admin/dashboard"
                  className="px-3 py-2.5 rounded-md text-sm text-[#5a6b5b] hover:text-[#2e3d2f] hover:bg-[#eee9de] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Admin
                </Link>
              )}

              {isAuthenticated ? (
                <button
                  onClick={() => { handleLogout(); setIsOpen(false); }}
                  className="px-3 py-2.5 rounded-md text-sm text-left text-[#5a6b5b] hover:text-[#2e3d2f] hover:bg-[#eee9de] transition-colors"
                >
                  Logout
                </button>
              ) : (
                <Link
                  href="/login"
                  className="px-3 py-2.5 rounded-md text-sm text-[#5a6b5b] hover:text-[#2e3d2f] hover:bg-[#eee9de] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
              )}

              <div className="px-3 py-2">
                <LanguageSwitcher isMobile closeMenu={() => setIsOpen(false)} />
              </div>

              <Link
                href="/calendar"
                className="mt-2 rounded-full bg-[#4a6741] px-5 py-2.5 text-sm font-medium text-center text-[#f7f4ee]"
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