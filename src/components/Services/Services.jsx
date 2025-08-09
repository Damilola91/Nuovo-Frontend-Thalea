"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "../Navbar/Navbar";

const servicesData = [
  {
    title: "Pulizie Professionali",
    description:
      "Servizio di pulizia accurato e professionale per garantire un ambiente sempre perfetto.",
    image: "https://via.placeholder.com/600x400?text=Pulizie+Professionali",
    reverse: false,
  },
  {
    title: "Wi-Fi Veloce",
    description:
      "Connessione internet ad alta velocità inclusa per tutti i tuoi dispositivi.",
    image: "https://via.placeholder.com/600x400?text=Wi-Fi+Veloce",
    reverse: true,
  },
  {
    title: "Assistenza 24/7",
    description:
      "Supporto clienti sempre disponibile per qualsiasi necessità o emergenza.",
    image: "https://via.placeholder.com/600x400?text=Assistenza+24/7",
    reverse: false,
  },
  {
    title: "Check-in Flessibile",
    description:
      "Arrivo e partenza con orari flessibili per adattarsi alle tue esigenze di viaggio.",
    image: "https://via.placeholder.com/600x400?text=Check-in+Flessibile",
    reverse: true,
  },
];

const Services = () => {
  const [visibleSections, setVisibleSections] = useState({});
  const sectionRefs = useRef([]);

  useEffect(() => {
    // Observer per animazioni fade-in + slide-up
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = entry.target.dataset.idx;
            setVisibleSections((prev) => ({ ...prev, [idx]: true }));
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

      <section className="text-center py-16 px-4 mt-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-[#46331d] drop-shadow-lg">
          I Nostri Servizi
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Scopri tutti i servizi che offriamo per rendere il tuo soggiorno
          indimenticabile.
        </p>
      </section>

      {servicesData.map((service, idx) => {
        const isVisible = visibleSections[idx];
        const baseClasses =
          "transition-all duration-700 ease-out opacity-0 translate-y-6";

        return (
          <section
            key={idx}
            ref={(el) => (sectionRefs.current[idx] = el)}
            data-idx={idx}
            className={`py-16 px-4 transition-all duration-700 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : baseClasses
            }`}
            style={{ transitionDelay: `${idx * 150}ms` }}
          >
            <div
              className={`container mx-auto grid md:grid-cols-2 gap-8 items-center ${
                service.reverse ? "md:flex-row-reverse" : ""
              }`}
            >
              <img
                src={service.image}
                alt={service.title}
                className="rounded-lg shadow-lg"
                loading="lazy"
              />
              <div>
                <h2 className="text-3xl font-bold text-[#46331d] mb-4">
                  {service.title}
                </h2>
                <p className="text-lg text-gray-700">{service.description}</p>
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

export default Services;
