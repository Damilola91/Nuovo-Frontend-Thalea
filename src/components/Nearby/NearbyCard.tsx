"use client";

import Image from "next/image";
import { Camera } from "lucide-react";
import type { NearbyPlace } from "./nearbyTypes";

interface NearbyCardProps {
  place: NearbyPlace;
  onOpen: () => void;
  priority?: boolean;
}

export function NearbyCard({ place, onOpen, priority = false }: NearbyCardProps) {
  return (
    <div
      className={`mx-auto grid max-w-5xl items-center gap-12 px-6 md:grid-cols-2 ${
        place.reverse ? "md:[&>*:first-child]:order-2" : ""
      }`}
    >
      <div
        className="group relative cursor-pointer overflow-hidden rounded-xl bg-[#eee9de]"
        style={{ aspectRatio: "4 / 3" }}
        onClick={onOpen}
      >
        <Image
          src={place.images[0]}
          alt={place.title}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
        <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-md bg-black/50 px-2.5 py-1.5">
          <Camera size={14} className="text-white" />
          <span className="text-xs font-medium text-white">
            1 / {place.images.length}
          </span>
        </div>
      </div>

      <div>
        <h2
          className="text-3xl text-[#2e3d2f] md:text-4xl"
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          {place.title}
        </h2>
        <p className="mt-4 leading-relaxed text-[#5a6b5b]">
          {place.description}
        </p>
        <button
          onClick={onOpen}
          className="mt-6 text-sm text-[#4a6741] underline underline-offset-4 transition-colors hover:text-[#2e3d2f]"
        >
          Scopri di più →
        </button>
      </div>
    </div>
  );
}