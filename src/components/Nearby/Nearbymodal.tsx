"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Camera, X, MapPin } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import type { NearbyPlace } from "./nearbyTypes";

interface NearbyModalProps {
  place: NearbyPlace;
  onClose: () => void;
}

export function NearbyModal({ place, onClose }: NearbyModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4">
      <button
        onClick={onClose}
        className="absolute right-5 top-5 z-50 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
        aria-label="Chiudi"
      >
        <X size={24} />
      </button>

      <div className="flex w-full max-w-6xl flex-col gap-6 md:flex-row" style={{ maxHeight: "85vh" }}>
        {/* Swiper */}
        <div className="w-full overflow-hidden rounded-xl md:w-3/5" style={{ minHeight: "300px" }}>
          <Swiper
            navigation
            modules={[Navigation]}
            className="h-full w-full rounded-xl"
            style={{ height: "100%" }}
          >
            {place.images.map((img, idx) => (
              <SwiperSlide key={idx}>
                <div className="relative h-full w-full" style={{ minHeight: "300px" }}>
                  <img
                    src={img}
                    alt={`${place.title} ${idx + 1}`}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-md bg-black/50 px-2.5 py-1.5">
                    <Camera size={14} className="text-white" />
                    <span className="text-xs font-medium text-white">
                      {idx + 1} / {place.images.length}
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Descrizione */}
        <div className="flex w-full flex-col gap-4 overflow-y-auto text-white md:w-2/5">
          <h2
            className="text-3xl text-white"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            {place.title}
          </h2>
          <p className="text-sm leading-relaxed text-white/80">
            {place.fullDescription}
          </p>
          {place.lat && place.lng && (
            <a
              href={`https://www.google.com/maps?q=${place.lat},${place.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center gap-2 rounded-full bg-[#4a6741] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#3d5635]"
            >
              <MapPin size={16} />
              Apri su Google Maps
            </a>
          )}
        </div>
      </div>
    </div>
  );
}