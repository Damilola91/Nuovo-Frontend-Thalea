"use client";

import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useTranslation } from "react-i18next";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { X, MapPin } from "lucide-react";

const Nearby = () => {
  const { t } = useTranslation();
  const [openSwiper, setOpenSwiper] = useState(null);
  const sectionRefs = useRef([]);
  const [visibleMap, setVisibleMap] = useState({});
  const [headerVisible, setHeaderVisible] = useState(false);

  const dintorniData = t("nearby.places", { returnObjects: true });

  useEffect(() => {
    const timer = setTimeout(() => setHeaderVisible(true), 200);

    sectionRefs.current = sectionRefs.current.slice(0, dintorniData.length);
    const obs = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.index);
            setVisibleMap((prev) =>
              prev[idx] ? prev : { ...prev, [idx]: true }
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    sectionRefs.current.forEach((el) => {
      if (el) obs.observe(el);
    });

    return () => {
      clearTimeout(timer);
      obs.disconnect();
    };
  }, [dintorniData.length]);

  return (
    <div className="min-h-screen bg-white/90">
      <Navbar />

      {/* Header */}
      <section className="text-center py-16 px-4 mt-12">
        <h1
          className={`text-4xl md:text-6xl font-bold mb-4 text-[#46331d] drop-shadow-lg transition-all duration-700 ease-out ${
            headerVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          {t("nearby.title")}
        </h1>
        <p
          className={`text-lg text-gray-700 max-w-2xl mx-auto transition-all duration-700 ease-out delay-200 ${
            headerVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          {t("nearby.subtitle")}
        </p>
      </section>

      {/* Sezioni dei luoghi */}
      {dintorniData.map((section, index) => {
        const isVisible = !!visibleMap[index];
        return (
          <section
            key={index}
            ref={(el) => (sectionRefs.current[index] = el)}
            data-index={index}
            className={`py-12 px-4 transition-all duration-700 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            <div
              className={`container mx-auto grid md:grid-cols-2 gap-8 items-center ${
                section.reverse ? "md:flex-row-reverse" : ""
              }`}
            >
              <div
                className="cursor-pointer rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
                onClick={() => setOpenSwiper(index)}
              >
                <img
                  src={section.images[0]}
                  alt={section.title}
                  loading="lazy"
                  className="w-full h-80 object-cover"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-4 text-[#46331d]">
                  {section.title}
                </h2>
                <p className="text-lg text-gray-700">{section.description}</p>
              </div>
            </div>
          </section>
        );
      })}

      {/* Swiper Modal */}
      {openSwiper !== null && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="absolute top-4 right-4 z-50">
            <button
              onClick={() => setOpenSwiper(null)}
              className="text-white hover:text-gray-300 transition"
              aria-label="Chiudi galleria"
            >
              <X size={32} />
            </button>
          </div>

          <div className="w-full max-w-6xl h-full md:h-[80vh] flex flex-col md:flex-row gap-4 bg-transparent">
            {/* Swiper */}
            <div className="flex-1 h-64 md:h-full">
              <Swiper
                navigation
                modules={[Navigation]}
                className="h-full rounded-lg overflow-hidden"
              >
                {dintorniData[openSwiper].images.map((img, idx) => (
                  <SwiperSlide key={idx}>
                    <img
                      src={img}
                      alt={`Slide ${idx}`}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Descrizione estesa */}
            <div className="flex-1 text-white flex flex-col justify-start space-y-4 p-4 overflow-y-auto max-h-full">
              <h2 className="text-3xl font-bold">
                {dintorniData[openSwiper].title}
              </h2>
              <p className="text-lg leading-relaxed">
                {dintorniData[openSwiper].fullDescription}
              </p>
              {dintorniData[openSwiper].lat && dintorniData[openSwiper].lng && (
                <a
                  href={`https://www.google.com/maps?q=${dintorniData[openSwiper].lat},${dintorniData[openSwiper].lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#46331d] text-white px-4 py-2 rounded-xl shadow-lg hover:bg-[#5a4327] transition"
                >
                  <MapPin size={20} /> Apri su Google Maps
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Nearby;
