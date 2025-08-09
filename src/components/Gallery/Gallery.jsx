"use client";

import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { Navigation } from "swiper/modules";
import Navbar from "../Navbar/Navbar";
import { X } from "lucide-react";

const galleryData = [
  {
    title: "Terrazza",
    description:
      "Goditi un momento di relax sulla nostra ampia terrazza con vista sui tetti di Palermo, perfetta per una colazione all'aperto o un aperitivo al tramonto.",
    images: [
      "https://res.cloudinary.com/dbxysr1a6/image/upload/f_auto,q_auto/v1754742986/THALEA-PALERMO-APARTMENT/IMG_6907.heic",
      "https://res.cloudinary.com/dbxysr1a6/image/upload/f_auto,q_auto/v1754744028/THALEA-PALERMO-APARTMENT/IMG_6903.heic",
      "https://res.cloudinary.com/dbxysr1a6/image/upload/f_auto,q_auto/v1754744129/THALEA-PALERMO-APARTMENT/IMG_6911.heic",
      "https://res.cloudinary.com/dbxysr1a6/image/upload/f_auto,q_auto/v1754744290/THALEA-PALERMO-APARTMENT/IMG_6937.heic",
      "https://res.cloudinary.com/dbxysr1a6/image/upload/f_auto,q_auto/v1754744436/THALEA-PALERMO-APARTMENT/IMG_6947.heic",
      "https://res.cloudinary.com/dbxysr1a6/image/upload/f_auto,q_auto/v1754744482/THALEA-PALERMO-APARTMENT/IMG_6949.heic",
      "https://res.cloudinary.com/dbxysr1a6/image/upload/f_auto,q_auto/v1754744525/THALEA-PALERMO-APARTMENT/IMG_6964.heic",
      "https://res.cloudinary.com/dbxysr1a6/image/upload/f_auto,q_auto/v1754744565/THALEA-PALERMO-APARTMENT/IMG_6969.heic",
      "https://res.cloudinary.com/dbxysr1a6/image/upload/f_auto,q_auto/v1754744642/THALEA-PALERMO-APARTMENT/IMG_6972.heic",
      "https://res.cloudinary.com/dbxysr1a6/image/upload/f_auto,q_auto/v1754744728/THALEA-PALERMO-APARTMENT/IMG_6966.heic",
    ],
    reverse: false,
  },
  {
    title: "Cucina",
    description:
      "Una cucina moderna e completamente attrezzata, pensata per farti sentire come a casa.",
    images: [
      "https://res.cloudinary.com/dbxysr1a6/image/upload/f_auto,q_auto/v1754744874/THALEA-PALERMO-APARTMENT/IMG_7135.heic",
      "https://res.cloudinary.com/dbxysr1a6/image/upload/f_auto,q_auto/v1754745269/THALEA-PALERMO-APARTMENT/IMG_7143.heic",
      "https://res.cloudinary.com/dbxysr1a6/image/upload/f_auto,q_auto/v1754745353/THALEA-PALERMO-APARTMENT/IMG_7144.heic",
      "https://res.cloudinary.com/dbxysr1a6/image/upload/f_auto,q_auto/v1754745426/THALEA-PALERMO-APARTMENT/IMG_7146.heic",
      "https://res.cloudinary.com/dbxysr1a6/image/upload/f_auto,q_auto/v1754745476/THALEA-PALERMO-APARTMENT/IMG_7148.heic",
      "https://res.cloudinary.com/dbxysr1a6/image/upload/f_auto,q_auto/v1754745518/THALEA-PALERMO-APARTMENT/IMG_7169.heic",
      "https://res.cloudinary.com/dbxysr1a6/image/upload/f_auto,q_auto/v1754745542/THALEA-PALERMO-APARTMENT/IMG_7168.heic",
      "https://res.cloudinary.com/dbxysr1a6/image/upload/f_auto,q_auto/v1754745565/THALEA-PALERMO-APARTMENT/IMG_7165.heic",
      "https://res.cloudinary.com/dbxysr1a6/image/upload/f_auto,q_auto/v1754745591/THALEA-PALERMO-APARTMENT/IMG_7166.heic",
    ],
    reverse: true,
  },
  {
    title: "Camera da Letto",
    description:
      "Camera confortevole con letto matrimoniale, luci soffuse e arredi eleganti per un perfetto riposo.",
    images: [
      "https://res.cloudinary.com/dbxysr1a6/image/upload/f_auto,q_auto/v1754746486/THALEA-PALERMO-APARTMENT/IMG_6923.heic",
      "https://res.cloudinary.com/dbxysr1a6/image/upload/f_auto,q_auto/v1754745893/THALEA-PALERMO-APARTMENT/IMG_6872.heic",
      "https://res.cloudinary.com/dbxysr1a6/image/upload/f_auto,q_auto/v1754746012/THALEA-PALERMO-APARTMENT/IMG_6875.heic",
      "https://res.cloudinary.com/dbxysr1a6/image/upload/f_auto,q_auto/v1754746049/THALEA-PALERMO-APARTMENT/IMG_6879.heic",
      "https://res.cloudinary.com/dbxysr1a6/image/upload/f_auto,q_auto/v1754746104/THALEA-PALERMO-APARTMENT/IMG_6878.heic",
      "https://res.cloudinary.com/dbxysr1a6/image/upload/f_auto,q_auto/v1754746193/THALEA-PALERMO-APARTMENT/IMG_6886.heic",
      "https://res.cloudinary.com/dbxysr1a6/image/upload/f_auto,q_auto/v1754746257/THALEA-PALERMO-APARTMENT/IMG_6890.heic",
      "https://res.cloudinary.com/dbxysr1a6/image/upload/f_auto,q_auto/v1754746294/THALEA-PALERMO-APARTMENT/IMG_6893.heic",
      "https://res.cloudinary.com/dbxysr1a6/image/upload/f_auto,q_auto/v1754746426/THALEA-PALERMO-APARTMENT/IMG_6928.heic",
      "https://res.cloudinary.com/dbxysr1a6/image/upload/f_auto,q_auto/v1754748362/THALEA-PALERMO-APARTMENT/IMG_6990.heic",
      "https://res.cloudinary.com/dbxysr1a6/image/upload/f_auto,q_auto/v1754746546/THALEA-PALERMO-APARTMENT/IMG_6933.heic",
      "https://res.cloudinary.com/dbxysr1a6/image/upload/f_auto,q_auto/v1754746632/THALEA-PALERMO-APARTMENT/IMG_7081.heic",
    ],
    reverse: false,
  },
  {
    title: "Bagno",
    description:
      "Bagno spazioso e luminoso con doccia moderna e finiture eleganti.",
    images: [
      "https://res.cloudinary.com/dbxysr1a6/image/upload/f_auto,q_auto/v1754748517/THALEA-PALERMO-APARTMENT/IMG_7093.heic",
      "https://res.cloudinary.com/dbxysr1a6/image/upload/f_auto,q_auto/v1754748622/THALEA-PALERMO-APARTMENT/IMG_7094.heic",
      "https://res.cloudinary.com/dbxysr1a6/image/upload/f_auto,q_auto/v1754748663/THALEA-PALERMO-APARTMENT/IMG_7101.heic",
      "https://res.cloudinary.com/dbxysr1a6/image/upload/f_auto,q_auto/v1754748708/THALEA-PALERMO-APARTMENT/IMG_7102.heic",
      "https://res.cloudinary.com/dbxysr1a6/image/upload/f_auto,q_auto/v1754748736/THALEA-PALERMO-APARTMENT/IMG_7097.heic",
      "https://res.cloudinary.com/dbxysr1a6/image/upload/f_auto,q_auto/v1754748876/THALEA-PALERMO-APARTMENT/IMG_7107.heic",
      "https://res.cloudinary.com/dbxysr1a6/image/upload/f_auto,q_auto/v1754748773/THALEA-PALERMO-APARTMENT/IMG_7110.heic",
    ],
    reverse: true,
  },
];

const Gallery = () => {
  const [openSwiper, setOpenSwiper] = useState(null);
  const sectionRefs = useRef([]);
  const [visibleMap, setVisibleMap] = useState({});
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    // animazione titolo/paragrafo
    const timer = setTimeout(() => setHeaderVisible(true), 200);

    // observer per sezioni
    sectionRefs.current = sectionRefs.current.slice(0, galleryData.length);
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
          Tour dell’Appartamento
        </h1>
        <p
          className={`text-lg text-gray-700 max-w-2xl mx-auto transition-all duration-700 ease-out delay-200 ${
            headerVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          Scopri ogni angolo del nostro appartamento attraverso le immagini.
        </p>
      </section>

      {galleryData.map((section, index) => {
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
              {galleryData[openSwiper].images.map((img, idx) => (
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

      <footer className="py-8 px-4 mt-16 bg-white/70">
        <div className="container mx-auto text-center">
          <p className="text-gray-600">
            © 2025 Thalea Palermo Apartment. Tutti i diritti riservati.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Gallery;
