"use client";

import { Camera } from "lucide-react";
import type { GallerySection } from "./GalleryClient";

interface GalleryCardProps {
  section: GallerySection;
  onOpen: () => void;
}

const GalleryCard = ({ section, onOpen }: GalleryCardProps) => {
  return (
    <div
      className={`mx-auto grid max-w-5xl items-center gap-12 px-6 md:grid-cols-2 ${
        section.reverse ? "md:[&>*:first-child]:order-2" : ""
      }`}
    >
      {/* Immagine preview */}
      <div
        className="group relative cursor-pointer overflow-hidden rounded-xl bg-[#eee9de]"
        style={{ aspectRatio: "4 / 3" }}
        onClick={onOpen}
      >
        <img
          src={section.images[0]}
          alt={section.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
        <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-md bg-black/50 px-2.5 py-1.5">
          <Camera size={14} className="text-white" />
          <span className="text-xs font-medium text-white">
            1 / {section.images.length}
          </span>
        </div>
      </div>

      {/* Testo */}
      <div>
        <h2
          className="text-3xl text-[#2e3d2f] md:text-4xl"
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          {section.title}
        </h2>
        <p className="mt-4 leading-relaxed text-[#5a6b5b]">
          {section.description}
        </p>
        <button
          onClick={onOpen}
          className="mt-6 text-sm text-[#4a6741] underline underline-offset-4 transition-colors hover:text-[#2e3d2f]"
        >
          Vedi tutte le foto →
        </button>
      </div>
    </div>
  );
}

export default GalleryCard