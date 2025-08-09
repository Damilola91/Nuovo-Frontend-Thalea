"use client";

import HeroBackground from "../HeroBackground/HeroBackground";

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center">
      <HeroBackground />

      <div className="relative z-10 text-center text-white px-4 mt-12">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in drop-shadow-lg">
          Thălēa Apartment
        </h1>
        <h2 className="text-3xl md:text-4xl mb-8 font-bold animate-fade-in drop-shadow-lg">
          Palermo
        </h2>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto animate-fade-in drop-shadow-lg">
          Il tuo rifugio nel cuore di Palermo
        </p>
        <button
          className="px-8 py-3 text-lg font-medium text-white rounded-md hover:opacity-90 transition-opacity animate-fade-in"
          style={{ backgroundColor: "#46331d" }}
        >
          Prenota Ora
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
