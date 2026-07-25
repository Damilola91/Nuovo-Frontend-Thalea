"use client";

import { useState } from "react";
import { NearbyCard } from "./NearbyCard";
import { NearbyModal } from "./Nearbymodal";
import { useIntersectionReveal } from "./useIntersectionReveal";
import type { NearbyPlace } from "./nearbyTypes";

export function NearbyClient({ places }: { places: NearbyPlace[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { visible, setRef } = useIntersectionReveal(places.length);

  return (
    <>
      {places.map((place, index) => (
        <section
          key={index}
          ref={(el) => setRef(el, index)}
          data-index={index}
          className={`py-16 transition-all duration-700 ease-out ${
            visible[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: `${index * 100}ms` }}
        >
          <NearbyCard
            place={place}
            onOpen={() => setOpenIndex(index)}
            priority={index === 0}
          />
        </section>
      ))}

      {openIndex !== null && (
        <NearbyModal
          place={places[openIndex]}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </>
  );
}