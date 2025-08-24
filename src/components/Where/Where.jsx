"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

// Import dinamico per Leaflet (evita problemi SSR)
const LeafletMap = dynamic(() => import("./LeafletMap"), { ssr: false });

const Where = () => {
  const [visibleSections, setVisibleSections] = useState({});
  const sectionRefs = useRef([]);
  const router = useRouter();
  const { t } = useTranslation();

  const handleBookingClick = () => {
    router.push("/calendar");
  };

  const sectionsData = [
    {
      id: "hero",
      title: t("where.hero.title"),
      description: t("where.hero.description"),
      isHero: true,
    },
    {
      id: "auto",
      title: t("where.auto.title"),
      image:
        "https://res.cloudinary.com/dbxysr1a6/image/upload/v1754760289/THALEA-PALERMO-APARTMENT/pexels-yunustug-33319375.jpg",
      alt: t("where.auto.title"),
      content: (
        <ul className="text-gray-700 space-y-3">
          {t("where.auto.items", { returnObjects: true }).map((item, i) => (
            <li key={i}>♦ {item}</li>
          ))}
        </ul>
      ),
      reverse: false,
    },
    {
      id: "treno",
      title: t("where.treno.title"),
      image:
        "https://res.cloudinary.com/dbxysr1a6/image/upload/v1754760444/THALEA-PALERMO-APARTMENT/pexels-brendanruehli-33354891.jpg",
      alt: t("where.treno.title"),
      content: (
        <ul className="text-gray-700 space-y-3">
          {t("where.treno.items", { returnObjects: true }).map((item, i) => (
            <li key={i}>♦ {item}</li>
          ))}
        </ul>
      ),
      reverse: true,
    },
    {
      id: "bus",
      title: t("where.bus.title"),
      image:
        "https://res.cloudinary.com/dbxysr1a6/image/upload/v1754760834/THALEA-PALERMO-APARTMENT/pexels-hikaique-68427.jpg",
      alt: t("where.bus.title"),
      content: (
        <ul className="text-gray-700 space-y-2">
          {t("where.bus.items", { returnObjects: true }).map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      ),
      reverse: false,
    },
    {
      id: "info-utili",
      title: t("where.info.title"),
      content: (
        <>
          {t("where.info.paragraphs", { returnObjects: true }).map((p, i) => (
            <p key={i} className="text-gray-700 mb-4">
              {p}
            </p>
          ))}
        </>
      ),
      reverse: false,
    },
    {
      id: "prenota",
      title: t("where.book.title"),
      content: (
        <>
          <p className="text-gray-700 mb-6">{t("where.book.text")}</p>
          <button
            onClick={handleBookingClick}
            className="px-8 py-3 text-white font-medium rounded-md hover:opacity-90 transition"
            style={{ backgroundColor: "#46331d" }}
          >
            {t("where.book.cta")}
          </button>
        </>
      ),
      reverse: false,
    },
    {
      id: "mappa",
      title: t("where.map.title"),
      content: (
        <div className="rounded-lg overflow-hidden shadow-lg h-[400px]">
          <LeafletMap />
        </div>
      ),
      reverse: false,
    },
    {
      id: "orari",
      title: t("where.hours.title"),
      content: (
        <p className="text-gray-700">
          {t("where.hours.checkin")} <br />
          {t("where.hours.checkout")}
        </p>
      ),
      reverse: false,
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);

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

        // Sezione Hero
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
                className={`text-4xl md:text-6xl font-bold mb-4 mt-12 text-[#46331d] drop-shadow-lg transition-all duration-700 ease-out ${
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

        // Sezioni centrali
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

      <Footer />
    </div>
  );
};

export default Where;
