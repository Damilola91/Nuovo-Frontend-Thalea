"use client";

import { FaWhatsapp } from "react-icons/fa";
import { X } from "lucide-react";

const ContactModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 w-screen h-screen z-50 flex items-center justify-center bg-white/30 backdrop-blur-sm"
      aria-modal="true"
      role="dialog"
      aria-labelledby="contact-modal-title"
    >
      <div className="relative w-[90%] sm:w-96 md:w-[28rem] p-6 bg-white bg-opacity-90 rounded-2xl shadow-2xl">
        {/* Bottone chiusura */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-[#46331d] hover:text-red-600 transition"
          aria-label="Chiudi modal"
        >
          <X size={24} />
        </button>

        {/* Titolo */}
        <h2
          id="contact-modal-title"
          className="text-xl font-bold text-center text-[#46331d] mb-6"
        >
          Contattaci
        </h2>

        {/* Bottoni contatto */}
        <div className="flex flex-col gap-4">
          <a
            href="https://wa.me/393272541967"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-white font-medium shadow-md bg-green-600 hover:bg-green-700 transition"
          >
            <FaWhatsapp size={20} />
            Scrivici su WhatsApp
          </a>

          <a
            href="mailto:thaleapalermoapartment@gmail.com"
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-white font-medium shadow-md"
            style={{ backgroundColor: "#46331d" }}
          >
            Invia una Email
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
