import Navbar from "../../Navbar/Navbar";
import ImageSwiper from "../../ImageSwiper/ImageSwiper";
import HeroSection from "../../HeroSection/HeroSection";
import FeaturesSection from "../../FeaturesSection/FeaturesSection";
import ServicesSection from "../../ServicesSection/ServicesSection";
import LocationSection from "../../LocationSection/LocationSection";

const HomePage = () => {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.85)" }}
    >
      <Navbar />
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />
      {/* Image Gallery Swiper */}
      <ImageSwiper />

      {/* Services Section */}
      <ServicesSection />
      {/* Location Section */}
      <LocationSection />
      {/* Footer */}
      <footer
        className="py-8 px-4"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}
      >
        <div className="container mx-auto text-center">
          <p className="text-gray-600">
            © 2025 Thalea Palermo Apartment. Tutti i diritti riservati.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
