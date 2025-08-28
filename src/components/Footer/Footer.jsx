"use client";

import {
  IoLogoInstagram,
  IoLogoFacebook,
  IoMailOutline,
  IoLogoWhatsapp,
} from "react-icons/io5";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import NewsletterForm from "../NewsletterForm/NewsletterForm";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#414d43] text-[#f8f9fa] py-10 relative">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Thălēa Apartment
          </h2>
          <p className="text-sm">{t("footer.brandDescription")}</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">
            {t("footer.quickLinks")}
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/gallery" className="hover:underline">
                Gallery
              </a>
            </li>
            <li>
              <a href="/dintorni" className="hover:underline">
                Dintorni
              </a>
            </li>
            <li>
              <a href="/contatti" className="hover:underline">
                Contatti
              </a>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold mb-4">{t("footer.social")}</h3>
          <div className="flex space-x-4">
            <a
              href="https://www.instagram.com/thaleapalermo?igsh=MTZlMjJiaG5pM3FxOQ%3D%3D&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              <IoLogoInstagram size={28} style={{ color: "#E1306C" }} />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              <IoLogoFacebook size={28} style={{ color: "#4267B2" }} />
            </a>
            <a
              href="mailto:thaleapalermoapartment@gmail.com"
              className="hover:text-gray-300"
            >
              <IoMailOutline size={28} style={{ color: "#128C7E" }} />
            </a>
            <a
              href="https://wa.me/message/ISKAFLHLXUDQI1"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              <IoLogoWhatsapp size={28} style={{ color: "#25D366" }} />
            </a>
            <a
              href="https://www.booking.com/hotel/it/thalea-apartment.it.html"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80"
            >
              <img
                src="/booking-icon.svg"
                alt="Booking.com"
                className="h-7 w-7"
              />
            </a>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-4">
            {t("footer.newsletter")}
          </h3>
          <NewsletterForm />
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-500 mt-8 pt-4 text-center text-sm relative">
        <p>{t("footer.copyright")}</p>
        <p className="font-semibold mt-1">{t("footer.cin")}</p>

        {/* Links in basso a destra */}
        <div className="absolute right-6 bottom-0 flex space-x-4 text-xs md:text-sm pb-1">
          <a href="/privacy-policy" className="hover:underline">
            {t("footer.privacyPolicy")}
          </a>
          <a href="/terms" className="hover:underline">
            {t("footer.termsAndConditions")}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
