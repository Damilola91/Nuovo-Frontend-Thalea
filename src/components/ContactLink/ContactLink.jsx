"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import ContactModal from "../ContactModal/ContactModal";

const ContactLink = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="font-bold hover:opacity-70 transition-opacity duration-200"
        style={{ color: "#46331d" }}
      >
        {t("contact.link")}
      </button>

      <ContactModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default ContactLink;
