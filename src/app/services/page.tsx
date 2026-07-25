import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ServicesHeader } from "@/components/Services/ServicesHeader";
import { ServicesClient } from "@/components/Services/ServicesClient";
import { AmenitiesGrid } from "@/components/Services/AmenitiesGrid";
import { ServicesCta } from "@/components/Services/ServicesCta";

const SITE_URL = "https://www.thaleapalermoapartment.it";
const OG_IMAGE = "https://res.cloudinary.com/dbxysr1a6/image/upload/f_auto,q_auto/v1755877082/THALEA-PALERMO-APARTMENT/giorgio-trovato-5TXz228u4eo-unsplash.jpg";
const API = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

export const metadata: Metadata = {
  title: "Servizi e Dotazioni | Thălēa Apartment Palermo",
  description:
    "Thălēa Apartment Palermo offre pulizie professionali, Wi-Fi fibra 460 Mbps, cucina completamente attrezzata, lavatrice, terrazza privata e check-in autonomo 24/7.",
  keywords: [
    "servizi appartamento Palermo",
    "wifi fibra Palermo",
    "check-in autonomo Palermo",
    "cucina attrezzata casa vacanze Palermo",
    "pulizie professionali appartamento Palermo",
    "dotazioni appartamento Palermo",
  ],
  
  alternates: {
    canonical: "/services",
    languages: {
      "it": "/it/services",
      "en": "/en/services",
      "de": "/de/services",
      "fr": "/fr/services",
      "es": "/es/services",
      "zh": "/zh/services",
    },
  },
  openGraph: {
    title: "Servizi e Dotazioni | Thălēa Apartment Palermo",
    description:
      "Pulizie professionali, Wi-Fi fibra, cucina attrezzata, terrazza privata e check-in autonomo 24/7. Tutto ciò che ti serve per un soggiorno perfetto a Palermo.",
    url: `${SITE_URL}/services`,
    siteName: "Thălēa Apartment Palermo",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Thălēa Apartment Palermo - Servizi e dotazioni",
      },
    ],
    locale: "it_IT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Servizi | Thălēa Apartment Palermo",
    description: "Wi-Fi fibra, cucina attrezzata, terrazza privata e check-in autonomo 24/7.",
    images: [OG_IMAGE],
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

async function getApartment() {
  try {
    const res = await fetch(`${API}/api/apartments/`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.apartments?.[0] ?? null;
  } catch {
    return null;
  }
}

export default async function ServicesPage() {
  const t = await getTranslations("servicesPage");
  const apartment = await getApartment();

  const services = [
    {
      title: t("professionalCleaning.title"),
      description: t("professionalCleaning.description"),
      image: "https://res.cloudinary.com/dbxysr1a6/image/upload/v1755877082/THALEA-PALERMO-APARTMENT/giorgio-trovato-5TXz228u4eo-unsplash.jpg",
      reverse: false,
    },
    {
      title: t("fastWifi.title"),
      description: t("fastWifi.description"),
      image: "https://res.cloudinary.com/dbxysr1a6/image/upload/v1755877192/THALEA-PALERMO-APARTMENT/dreamlike-street-sOdVYQQo4UU-unsplash.jpg",
      reverse: true,
    },
    {
      title: t("completeKitchen.title"),
      description: t("completeKitchen.description"),
      image: "https://res.cloudinary.com/dbxysr1a6/image/upload/v1756229266/THALEA-PALERMO-APARTMENT/pexels-goumbik-349609.jpg",
      reverse: false,
    },
    {
      title: t("flexibleCheckin.title"),
      description: t("flexibleCheckin.description"),
      image: "https://res.cloudinary.com/dbxysr1a6/image/upload/v1755877452/THALEA-PALERMO-APARTMENT/celpax-tVRlTCgJDsI-unsplash.jpg",
      reverse: true,
    },
  ];

  return (
    <>
      <ServicesHeader />
      <ServicesClient services={services} />
      {apartment?.amenities && (
        <AmenitiesGrid amenities={apartment.amenities} />
      )}
      <ServicesCta />
    </>
  );
}