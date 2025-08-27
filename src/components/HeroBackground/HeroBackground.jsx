"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const heroImages = [
  {
    src: "https://res.cloudinary.com/dbxysr1a6/image/upload/v1738280150/THALEA-PALERMO-APARTMENT/4-Canti-resize2.jpg",
    alt: "4 Canti - Palermo",
    blur: "https://res.cloudinary.com/dbxysr1a6/image/upload/w_10,q_1,e_blur:200/v1738280150/THALEA-PALERMO-APARTMENT/4-Canti-resize2.jpg",
  },
  {
    src: "https://res.cloudinary.com/dbxysr1a6/image/upload/v1738341325/THALEA-PALERMO-APARTMENT/duomo-monreale-resize.jpg",
    alt: "Duomo di Monreale",
    blur: "https://res.cloudinary.com/dbxysr1a6/image/upload/w_10,q_1,e_blur:200/v1738341325/THALEA-PALERMO-APARTMENT/duomo-monreale-resize.jpg",
  },
  {
    src: "https://res.cloudinary.com/dbxysr1a6/image/upload/v1739469835/THALEA-PALERMO-APARTMENT/catedral-night%20%281%29.jpg",
    alt: "Cattedrale di notte",
    blur: "https://res.cloudinary.com/dbxysr1a6/image/upload/w_10,q_1,e_blur:200/v1739469835/THALEA-PALERMO-APARTMENT/catedral-night%20%281%29.jpg",
  },
  {
    src: "https://res.cloudinary.com/dbxysr1a6/image/upload/v1738342495/THALEA-PALERMO-APARTMENT/Politeama-2-resize.jpg",
    alt: "Teatro Politeama",
    blur: "https://res.cloudinary.com/dbxysr1a6/image/upload/w_10,q_1,e_blur:200/v1738342495/THALEA-PALERMO-APARTMENT/Politeama-2-resize.jpg",
  },
  {
    src: "https://res.cloudinary.com/dbxysr1a6/image/upload/v1739469625/THALEA-PALERMO-APARTMENT/vista%20%281%29.jpg",
    alt: "Vista panoramica Palermo",
    blur: "https://res.cloudinary.com/dbxysr1a6/image/upload/w_10,q_1,e_blur:200/v1739469625/THALEA-PALERMO-APARTMENT/vista%20%281%29.jpg",
  },
];

const HeroBackground = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
        );
        setIsVisible(true);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {heroImages.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentImageIndex && isVisible
              ? "opacity-100"
              : "opacity-0"
          }`}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            style={{ objectFit: "cover" }}
            placeholder="blur"
            blurDataURL={img.blur}
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      ))}
    </div>
  );
};

export default HeroBackground;
