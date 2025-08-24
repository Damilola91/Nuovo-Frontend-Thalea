"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const servicesData = [
  {
    title: "Pulizie Professionali",
    description:
      "Servizio di pulizia accurato e professionale per garantire un ambiente sempre perfetto.",
    image:
      "https://res.cloudinary.com/dbxysr1a6/image/upload/v1755877082/THALEA-PALERMO-APARTMENT/giorgio-trovato-5TXz228u4eo-unsplash.jpg",
    reverse: false,
  },
  {
    title: "Wi-Fi Veloce",
    description:
      "Connessione internet ad alta velocità inclusa per tutti i tuoi dispositivi.",
    image:
      "https://res.cloudinary.com/dbxysr1a6/image/upload/v1755877192/THALEA-PALERMO-APARTMENT/dreamlike-street-sOdVYQQo4UU-unsplash.jpg",
    reverse: true,
  },
  {
    title: "Consulenza Personalizzata",
    description:
      "Ricevi suggerimenti su ristoranti, itinerari e attrazioni per vivere Palermo al meglio.",
    image:
      "https://res.cloudinary.com/dbxysr1a6/image/upload/v1756046344/THALEA-PALERMO-APARTMENT/pexels-alteredsnaps-11677077.jpg",
    reverse: false,
  },
  {
    title: "Check-in Flessibile",
    description:
      "Arrivo e partenza con orari flessibili per adattarsi alle tue esigenze di viaggio.",
    image:
      "https://res.cloudinary.com/dbxysr1a6/image/upload/v1755877452/THALEA-PALERMO-APARTMENT/celpax-tVRlTCgJDsI-unsplash.jpg",
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

      <Footer />
    </div>
  );
};

export default Services;
