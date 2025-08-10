"use client";

import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { Navigation } from "swiper/modules";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { X } from "lucide-react";

const dintorniData = [
  {
    title: "Quattro Canti",
    description:
      "Cuore pulsante di Palermo, la piazza Quattro Canti è un magnifico esempio di barocco siciliano. Qui si incrociano le quattro vie principali della città, circondate da splendide facciate decorate.",
    images: [
      "https://res.cloudinary.com/dbxysr1a6/image/upload/v1738280150/THALEA-PALERMO-APARTMENT/4-Canti-resize2.jpg",
    ],
    reverse: false,
  },
  {
    title: "San Giovanni degli Eremiti",
    description:
      "Un gioiello dell'architettura normanna, famoso per le sue cupole rosse e l'atmosfera di pace che si respira nei suoi giardini. Un luogo ideale per immergersi nella storia millenaria di Palermo.",
    images: [
      "https://res.cloudinary.com/dbxysr1a6/image/upload/v1738341325/THALEA-PALERMO-APARTMENT/eremiti-resize.jpg",
    ],
    reverse: true,
  },
  {
    title: "Piazza Pretoria",
    description:
      "Celebre per la sua imponente fontana monumentale, Piazza Pretoria è un simbolo della città. Le statue di marmo e l'architettura circostante creano un'atmosfera suggestiva e romantica.",
    images: [
      "https://res.cloudinary.com/dbxysr1a6/image/upload/v1739470805/THALEA-PALERMO-APARTMENT/pretoria%20%281%29.jpg",
    ],
    reverse: false,
  },
  {
    title: "Cattedrale di Palermo",
    description:
      "Un imponente edificio che fonde stili arabo, normanno e gotico. La Cattedrale domina lo skyline di Palermo con le sue torri e la sua storia millenaria, testimone delle tante culture che hanno influenzato la città.",
    images: [
      "https://res.cloudinary.com/dbxysr1a6/image/upload/v1739470715/THALEA-PALERMO-APARTMENT/cat3%20%281%29.jpg",
    ],
    reverse: true,
  },
];

const Nearby = () => {
  const [openSwiper, setOpenSwiper] = useState(null);
  const sectionRefs = useRef([]);
  const [visibleMap, setVisibleMap] = useState({});
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    // animazione titolo/paragrafo
    const timer = setTimeout(() => setHeaderVisible(true), 200);

    // observer per sezioni
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
  }, []);

  return (
    <div className="min-h-screen bg-white/90">
      <Navbar />

      <section className="text-center py-16 px-4 mt-12">
        <h1
          className={`text-4xl md:text-6xl font-bold mb-4 text-[#46331d] drop-shadow-lg transition-all duration-700 ease-out ${
            headerVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          Dintorni di Thălēa
        </h1>
        <p
          className={`text-lg text-gray-700 max-w-2xl mx-auto transition-all duration-700 ease-out delay-200 ${
            headerVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          Scopri i luoghi più belli e storici che circondano il nostro
          appartamento
        </p>
      </section>

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

      {openSwiper !== null && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center">
          <div className="absolute top-4 right-4 z-50">
            <button
              onClick={() => setOpenSwiper(null)}
              className="text-white hover:text-gray-300 transition"
              aria-label="Chiudi galleria"
            >
              <X size={32} />
            </button>
          </div>
          <div className="w-full max-w-4xl h-[80vh] px-4">
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
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Nearby;
