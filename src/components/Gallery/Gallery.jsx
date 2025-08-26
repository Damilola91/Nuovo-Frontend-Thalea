"use client";

import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Camera, X } from "lucide-react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useTranslation } from "react-i18next";

const Gallery = () => {
  const { t } = useTranslation();
  const [openSwiper, setOpenSwiper] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fadeNumber, setFadeNumber] = useState(false);
  const sectionRefs = useRef([]);
  const [visibleMap, setVisibleMap] = useState({});
  const [headerVisible, setHeaderVisible] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);

  const galleryData = [
    {
      title: t("gallery.terrace.title"),
      description: t("gallery.terrace.description"),
      images: t("gallery.terrace.images", { returnObjects: true }),
      reverse: false,
    },
    {
      title: t("gallery.kitchen.title"),
      description: t("gallery.kitchen.description"),
      images: t("gallery.kitchen.images", { returnObjects: true }),
      reverse: true,
    },
    {
      title: t("gallery.bedroom.title"),
      description: t("gallery.bedroom.description"),
      images: t("gallery.bedroom.images", { returnObjects: true }),
      reverse: false,
    },
    {
      title: t("gallery.bathroom.title"),
      description: t("gallery.bathroom.description"),
      images: t("gallery.bathroom.images", { returnObjects: true }),
      reverse: true,
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setHeaderVisible(true), 200);

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
  }, [galleryData.length]);

  const handleSlideChange = (swiper) => {
    setFadeNumber(true);
    setTimeout(() => setFadeNumber(false), 300);
    setCurrentSlide(swiper.activeIndex);
  };

  return (
    <div className="min-h-screen bg-white/90">
      <Navbar />

      {/* Heading */}
      <section className="text-center py-16 px-4 mt-12">
        <h1
          className={`text-4xl md:text-6xl font-bold mb-4 text-[#46331d] drop-shadow-lg transition-all duration-700 ease-out ${
            headerVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          {t("gallery.heading")}
        </h1>
        <p
          className={`text-lg text-gray-700 max-w-2xl mx-auto transition-all duration-700 ease-out delay-200 ${
            headerVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          {t("gallery.subheading")}
        </p>
      </section>

      {/* Gallery Sections */}
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
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {section.images.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative cursor-pointer rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
                    onClick={() => {
                      setOpenSwiper(index);
                      setCurrentSlide(idx);
                    }}
                    onMouseEnter={() => setHoverIndex(idx)}
                    onMouseLeave={() => setHoverIndex(null)}
                  >
                    <img
                      src={img}
                      alt={`${section.title} ${idx + 1}`}
                      loading="lazy"
                      className="w-full h-48 md:h-40 object-cover"
                    />
                    {/* Hover Overlay */}
                    <div
                      className={`absolute top-2 left-2 flex items-center gap-1 bg-black/50 px-2 py-1 rounded-md transition-opacity duration-300 ${
                        hoverIndex === idx ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <Camera size={16} className="text-white" />
                      <span className="text-white text-sm font-semibold">
                        {idx + 1} / {section.images.length}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Section Text */}
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
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center">
          <div className="absolute top-4 right-4 z-50">
            <button
              onClick={() => setOpenSwiper(null)}
              className="text-white hover:text-gray-300 transition"
            >
              <X size={32} />
            </button>
          </div>

          <div className="w-full max-w-4xl h-[80vh] px-4 relative">
            <Swiper
              navigation
              modules={[Navigation]}
              initialSlide={currentSlide}
              onSlideChange={handleSlideChange}
              className="h-full rounded-lg overflow-hidden"
            >
              {galleryData[openSwiper].images.map((img, idx) => (
                <SwiperSlide key={idx}>
                  <div className="relative w-full h-full">
                    <img
                      src={img}
                      alt={`Slide ${idx + 1}`}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    {/* Animated Overlay Slide Number */}
                    <div
                      className={`absolute top-2 left-2 flex items-center gap-1 bg-black/50 px-2 py-1 rounded-md transition-all duration-300 ${
                        fadeNumber
                          ? "opacity-0 scale-75"
                          : "opacity-100 scale-100"
                      }`}
                    >
                      <Camera size={16} className="text-white" />
                      <span className="text-white text-sm font-semibold">
                        {currentSlide + 1} /{" "}
                        {galleryData[openSwiper].images.length}
                      </span>
                    </div>
                  </div>
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

export default Gallery;
