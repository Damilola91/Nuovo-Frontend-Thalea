"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "../Navbar/Navbar";
import dynamic from "next/dynamic";

// Import dinamico per Leaflet (evita problemi SSR)
const LeafletMap = dynamic(() => import("./LeafletMap"), { ssr: false });

const sectionsData = [
  {
    id: "hero",
    title: "Benvenuti a Thalea Palermo Apartment",
    description:
      "Tutte le indicazioni per raggiungerci facilmente e vivere al meglio il tuo soggiorno.",
    isHero: true,
  },
  {
    id: "auto",
    title: "Arrivare in Auto",
    image: "https://via.placeholder.com/800x500?text=Auto",
    alt: "Arrivare in Auto",
    content: (
      <ul className="text-gray-700 space-y-3">
        <li>
          ♦ Distanza dall'Aeroporto di Palermo (Falcone-Borsellino): circa 30
          minuti (30 km).
        </li>
        <li>
          ♦ Percorso: Prendere l'autostrada A29 in direzione Palermo. Seguire le
          indicazioni per il centro storico.
        </li>
        <li>
          ♦ Parcheggio: disponibili parcheggi in zona, sia gratuiti che a
          pagamento.
          <br />
          Contattaci al check-in per maggiori dettagli!
        </li>
      </ul>
    ),
    reverse: false,
  },
  {
    id: "treno",
    title: "Arrivare in Treno",
    image: "https://via.placeholder.com/800x500?text=Treno",
    alt: "Arrivare in Treno",
    content: (
      <ul className="text-gray-700 space-y-3">
        <li>♦ Distanza dalla Stazione Centrale: 10 minuti a piedi.</li>
        <li>
          ♦ Segui le indicazioni per il centro storico.
          <br />
          Goditi una breve passeggiata tra le bellezze di Palermo!
        </li>
      </ul>
    ),
    reverse: true,
  },
  {
    id: "bus",
    title: "Arrivare in Bus",
    image: "https://via.placeholder.com/800x500?text=Bus",
    alt: "Arrivare in Bus",
    content: (
      <ul className="text-gray-700 space-y-2">
        <li>♦ Linea 101 — circa 5-7 fermate</li>
        <li>♦ Linea 102 — circa 5 fermate</li>
        <li>♦ Linea 107 — circa 5-7 fermate</li>
        <li>📌 Fermate a pochi minuti dall'appartamento.</li>
      </ul>
    ),
    reverse: false,
  },
  {
    id: "info-utili",
    title: "Informazioni Utili",
    content: (
      <>
        <p className="text-gray-700 mb-4">
          🎫 Costo biglietto bus: circa 1,40€
          <br />
          📍 Dove acquistare i biglietti? A bordo del bus o nei punti vendita
          autorizzati.
        </p>
        <p className="text-gray-700 mb-4">
          🚶 Puoi anche raggiungerci a piedi dalla Stazione Centrale (10-15
          minuti), godendoti le vie storiche.
        </p>
        <p className="text-gray-700">
          ❓ Hai bisogno di aiuto? Contattaci o consulta il sito ufficiale di
          AMAT Palermo per gli orari aggiornati.
        </p>
      </>
    ),
    reverse: false,
  },
  {
    id: "prenota",
    title: "📌 Prenota Ora",
    content: (
      <>
        <p className="text-gray-700 mb-6">
          Vivi il meglio di Palermo con Thalēa. Prenota il tuo soggiorno e
          scopri una città ricca di storia e fascino.
        </p>
        <button
          className="px-8 py-3 text-white font-medium rounded-md hover:opacity-90 transition"
          style={{ backgroundColor: "#46331d" }}
        >
          Prenota Adesso
        </button>
      </>
    ),
    reverse: false,
  },
  {
    id: "mappa",
    title: "Dove Siamo",
    content: (
      <div className="rounded-lg overflow-hidden shadow-lg h-[400px]">
        <LeafletMap />
      </div>
    ),
    reverse: false,
  },
  {
    id: "orari",
    title: "Orari Check-in / Check-out",
    content: (
      <p className="text-gray-700">
        🕓 <strong>Check-in:</strong> dalle 15:00 <br />
        🕙 <strong>Check-out:</strong> entro le 10:00
      </p>
    ),
    reverse: false,
  },
];

const Where = () => {
  const [visibleSections, setVisibleSections] = useState({});
  const sectionRefs = useRef([]);

  useEffect(() => {
    // scroll top on mount
    window.scrollTo(0, 0);

    // Observer per animare sezioni al loro ingresso in viewport
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = entry.target.dataset.idx;
            setVisibleSections((prev) => ({
              ...prev,
              [idx]: true,
            }));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white/90">
      <Navbar />

      {sectionsData.map((section, idx) => {
        const isVisible = visibleSections[idx];
        const baseClasses =
          "transition-all duration-700 ease-out opacity-0 translate-y-6";

        // Sezione Hero è diversa
        if (section.isHero) {
          return (
            <section
              key={section.id}
              ref={(el) => (sectionRefs.current[idx] = el)}
              data-idx={idx}
              className={`text-center py-16 px-4 bg-white ${
                isVisible ? "opacity-100 translate-y-0" : baseClasses
              }`}
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              <h1
                className={`text-4xl md:text-6xl font-bold mb-4 text-[#46331d] drop-shadow-lg transition-all duration-700 ease-out ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
              >
                {section.title}
              </h1>
              <p
                className={`text-lg text-gray-700 max-w-2xl mx-auto transition-all duration-700 ease-out delay-200 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
              >
                {section.description}
              </p>
            </section>
          );
        }

        // Sezioni da centrare (solo testo e max width)
        const centerSectionsIds = ["info-utili", "prenota", "mappa", "orari"];

        if (centerSectionsIds.includes(section.id)) {
          return (
            <section
              key={section.id}
              ref={(el) => (sectionRefs.current[idx] = el)}
              data-idx={idx}
              className={`py-16 px-4 bg-white transition-all duration-700 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : baseClasses
              }`}
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              <div className="container max-w-2xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-[#46331d] mb-4">
                  {section.title}
                </h2>
                {section.content}
              </div>
            </section>
          );
        }

        // Sezioni normali a griglia 2 colonne
        return (
          <section
            key={section.id}
            ref={(el) => (sectionRefs.current[idx] = el)}
            data-idx={idx}
            className={`py-16 px-4 bg-white transition-all duration-700 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : baseClasses
            }`}
            style={{ transitionDelay: `${idx * 150}ms` }}
          >
            <div
              className={`container mx-auto grid md:grid-cols-2 gap-8 items-center ${
                section.reverse ? "md:flex-row-reverse" : ""
              }`}
            >
              {section.image && (
                <img
                  src={section.image}
                  alt={section.alt || ""}
                  className="rounded-lg shadow-lg"
                />
              )}
              <div>
                <h2 className="text-3xl font-bold text-[#46331d] mb-4">
                  {section.title}
                </h2>
                {section.content}
              </div>
            </div>
          </section>
        );
      })}

      <footer className="py-8 px-4 mt-12 bg-white/70">
        <div className="container mx-auto text-center">
          <p className="text-gray-600">
            © 2025 Thalea Palermo Apartment. Tutti i diritti riservati.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Where;
