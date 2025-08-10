import Navbar from "../../Navbar/Navbar";
import ImageSwiper from "../../ImageSwiper/ImageSwiper";
import HeroSection from "../../HeroSection/HeroSection";
import FeaturesSection from "../../FeaturesSection/FeaturesSection";
import ServicesSection from "../../ServicesSection/ServicesSection";
import LocationSection from "../../LocationSection/LocationSection";
import Footer from "../../Footer/Footer";

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
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default HomePage;
