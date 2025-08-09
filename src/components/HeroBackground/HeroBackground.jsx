"use client";

import { useState, useEffect } from "react";

const heroImages = [
  "https://res.cloudinary.com/dbxysr1a6/image/upload/v1738280150/THALEA-PALERMO-APARTMENT/4-Canti-resize2.jpg",
  "https://res.cloudinary.com/dbxysr1a6/image/upload/v1738341325/THALEA-PALERMO-APARTMENT/duomo-monreale-resize.jpg",
  "https://res.cloudinary.com/dbxysr1a6/image/upload/v1739469835/THALEA-PALERMO-APARTMENT/catedral-night%20%281%29.jpg",
  "https://res.cloudinary.com/dbxysr1a6/image/upload/v1738342495/THALEA-PALERMO-APARTMENT/Politeama-2-resize.jpg",
  "https://res.cloudinary.com/dbxysr1a6/image/upload/v1739469625/THALEA-PALERMO-APARTMENT/vista%20%281%29.jpg",
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
    <div
      className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{
        backgroundImage: `url('${heroImages[currentImageIndex]}')`,
      }}
    >
      <div className="absolute inset-0 bg-black/40" />
    </div>
  );
};

export default HeroBackground;
