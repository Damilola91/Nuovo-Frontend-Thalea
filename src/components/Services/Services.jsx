"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useTranslation } from "react-i18next";
import BookingCTA from "../BookingCTA/BookingCTA";

const Services = () => {
  const { t } = useTranslation();
  const [visibleSections, setVisibleSections] = useState({});
  const sectionRefs = useRef([]);

  // Dati dei servizi tradotti
  const servicesData = [
    {
      title: t("servicesPage.professionalCleaning.title"),
      description: t("servicesPage.professionalCleaning.description"),
      image:
        "https://res.cloudinary.com/dbxysr1a6/image/upload/v1755877082/THALEA-PALERMO-APARTMENT/giorgio-trovato-5TXz228u4eo-unsplash.jpg",
      reverse: false,
    },
    {
      title: t("servicesPage.fastWifi.title"),
      description: t("servicesPage.fastWifi.description"),
      image:
        "https://res.cloudinary.com/dbxysr1a6/image/upload/v1755877192/THALEA-PALERMO-APARTMENT/dreamlike-street-sOdVYQQo4UU-unsplash.jpg",
      reverse: true,
    },
    {
      title: t("servicesPage.completeKitchen.title"),
      description: t("servicesPage.completeKitchen.description"),
      image:
        "https://res.cloudinary.com/dbxysr1a6/image/upload/v1756229266/THALEA-PALERMO-APARTMENT/pexels-goumbik-349609.jpg",
      reverse: false,
    },
    {
      title: t("servicesPage.flexibleCheckin.title"),
      description: t("servicesPage.flexibleCheckin.description"),
      image:
        "https://res.cloudinary.com/dbxysr1a6/image/upload/v1755877452/THALEA-PALERMO-APARTMENT/celpax-tVRlTCgJDsI-unsplash.jpg",
      reverse: true,
    },
  ];

  useEffect(() => {
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
    <div className="min-h-screen bg-white/90 flex flex-col">
      <Navbar />

      {/* Header */}
      <section className="text-center py-16 px-4 mt-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-[#46331d] drop-shadow-lg">
          {t("servicesPage.heading")}
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          {t("servicesPage.subheading")}
        </p>
      </section>

      {/* Services */}
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

      {/* Call to Action - Prenota */}
      <BookingCTA />

      <Footer />
    </div>
  );
};

export default Services;
