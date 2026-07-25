import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection/HeroSection";
import IntroSection from "@/components/IntroSection/IntroSection";
import GalleryPreview from "@/components/GalleryPreview/GalleryPreview";
import FeaturesStrip from "@/components/FeaturesStrip/FeatureStrip";
import ServicesPreview from "@/components/ServicesPreview/ServicesPreview";
import CtaSection from "@/components/CtaSection/CtaSection";

const OG_IMAGE = "https://res.cloudinary.com/dbxysr1a6/image/upload/f_auto,q_auto/v1754742986/THALEA-PALERMO-APARTMENT/IMG_6907.heic";
const SITE_URL = "https://www.thaleapalermoapartment.it";

export const metadata: Metadata = {
  title: "Thălēa Apartment Palermo | Casa Vacanze nel Centro Storico",
  description:
    "Appartamento di design a Palermo con terrazza panoramica, cucina attrezzata e check-in autonomo. A pochi passi dai Quattro Canti. Prenota ora.",
  keywords: [
    "casa vacanze Palermo",
    "appartamento centro storico Palermo",
    "affitto breve Palermo",
    "Thălea apartment",
    "B&B Palermo centro",
    "vacanze Sicilia",
    "terrazza panoramica Palermo",
    "Via Maqueda Palermo",
  ],
  authors: [{ name: "Thălēa Apartment" }],
  creator: "Thălēa Apartment",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
    languages: {
      "it": "/it",
      "en": "/en",
      "de": "/de",
      "fr": "/fr",
      "es": "/es",
      "zh": "/zh",
    },
  },
  openGraph: {
    title: "Thălēa Apartment Palermo | Casa Vacanze nel Centro Storico",
    description:
      "Appartamento di design a Palermo con terrazza panoramica, cucina attrezzata e check-in autonomo. A pochi passi dai Quattro Canti.",
    url: SITE_URL,
    siteName: "Thălēa Apartment Palermo",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Thălēa Apartment Palermo - Terrazza panoramica",
      },
    ],
    locale: "it_IT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thălēa Apartment Palermo",
    description: "Appartamento di design con terrazza panoramica nel centro storico di Palermo.",
    images: [OG_IMAGE],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// JSON-LD per SEO locale e schema LodgingBusiness
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: "Thălēa Apartment Palermo",
  description:
    "Appartamento di design nel centro storico di Palermo con terrazza panoramica, cucina attrezzata e check-in autonomo.",
  url: SITE_URL,
  telephone: "+39 327 452 4321",
  email: "thaleapalermoapartment@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Via Maqueda 172",
    addressLocality: "Palermo",
    addressRegion: "PA",
    postalCode: "90133",
    addressCountry: "IT",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 38.1145845,
    longitude: 13.36488,
  },
  image: OG_IMAGE,
  priceRange: "€€",
  numberOfRooms: 1,
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Wi-Fi gratuito", value: true },
    { "@type": "LocationFeatureSpecification", name: "Aria condizionata", value: true },
    { "@type": "LocationFeatureSpecification", name: "Terrazza privata", value: true },
    { "@type": "LocationFeatureSpecification", name: "Cucina attrezzata", value: true },
    { "@type": "LocationFeatureSpecification", name: "Lavatrice", value: true },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "9.8",
    bestRating: "10",
    ratingCount: "10",
  },
  sameAs: [
    "https://www.instagram.com/thaleapalermo",
    "https://www.booking.com/hotel/it/thalea-apartment.it.html",
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <IntroSection />
      <GalleryPreview />
      <FeaturesStrip />
      <ServicesPreview />
      <CtaSection />
    </>
  );
}