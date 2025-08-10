"use client";

import { useState } from "react";
import ContactModal from "../ContactModal/ContactModal";

const ContactLink = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="font-bold hover:opacity-70 transition-opacity duration-200"
        style={{ color: "#46331d" }}
      >
        Contatti
      </button>

      <ContactModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default ContactLink;
