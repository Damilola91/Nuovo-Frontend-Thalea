"use client";

import { useState } from "react";
import GalleryCard from "./GalleryCard";
import SwiperModal from "./SwiperModal";
import useIntersectionReveal from "./useInterSectionReveal";

export interface GallerySection {
  title: string;
  description: string;
  images: string[];
  reverse: boolean;
}

const GalleryClient = ({ sections }: { sections: GallerySection[] }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { visible, setRef } = useIntersectionReveal(sections.length);

  return (
    <>
      {sections.map((section, index) => (
        <section
          key={index}
          ref={(el) => setRef(el, index)}
          data-index={index}
          className={`py-16 transition-all duration-700 ease-out ${
            visible[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: `${index * 100}ms` }}
        >
          <GalleryCard
            section={section}
            onOpen={() => setOpenIndex(index)}
            priority={index === 0}
          />
        </section>
      ))}

      {openIndex !== null && (
        <SwiperModal
          section={sections[openIndex]}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </>
  );
};

export default GalleryClient;