"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Camera, X } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import type { GallerySection } from "./GalleryClient";

interface SwiperModalProps {
  section: GallerySection;
  onClose: () => void;
}

const SwiperModal = ({ section, onClose }: SwiperModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm">
      <button
        onClick={onClose}
        className="absolute right-5 top-5 z-50 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
        aria-label="Chiudi"
      >
        <X size={24} />
      </button>

      <div className="w-full max-w-4xl px-4" style={{ height: "80vh" }}>
        <Swiper
          navigation
          modules={[Navigation]}
          className="h-full overflow-hidden rounded-xl"
        >
          {section.images.map((img, idx) => (
            <SwiperSlide key={idx}>
              <div className="relative h-full w-full">
                <img
                  src={img}
                  alt={`${section.title} ${idx + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-md bg-black/50 px-2.5 py-1.5">
                  <Camera size={14} className="text-white" />
                  <span className="text-xs font-medium text-white">
                    {idx + 1} / {section.images.length}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default SwiperModal