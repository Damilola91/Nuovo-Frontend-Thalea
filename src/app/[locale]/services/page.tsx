/*import Services from "../../../components/Services/Services";

export const metadata = {
  title: "Servizi | Thălēa Palermo Apartment",
  description:
    "Scopri tutti i servizi offerti da Thălēa Palermo Apartment, casa vacanze a Palermo con terrazza panoramica e comfort esclusivi.",
  keywords: [
    "Servizi Thălēa Palermo",
    "Casa vacanze Palermo",
    "Appartamento Thălēa",
    "B&B Palermo",
    "Alloggi Sicilia",
    "Vacanze Palermo centro",
  ],
  icons: {
    icon: "https://res.cloudinary.com/dbxysr1a6/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,b_rgb:262c35/v1737132781/PORTFOLIO-SERVER/PHOTO-2025-01-17-17-50-54.jpg",
    shortcut:
      "https://res.cloudinary.com/dbxysr1a6/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,b_rgb:262c35/v1737132781/PORTFOLIO-SERVER/PHOTO-2025-01-17-17-50-54.jpg",
    apple:
      "https://res.cloudinary.com/dbxysr1a6/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,b_rgb:262c35/v1737132781/PORTFOLIO-SERVER/PHOTO-2025-01-17-17-50-54.jpg",
  },
  openGraph: {
    title: "Servizi | Thălēa Palermo Apartment",
    description:
      "Una panoramica dei servizi disponibili presso Thălēa Palermo Apartment per rendere il tuo soggiorno confortevole.",
    url: "https://www.tuodominio.com/services",
    siteName: "Thălēa Palermo Apartment",
    images: [
      {
        url: "https://www.tuodominio.com/images/services-og.jpg",
        width: 1200,
        height: 630,
        alt: "Thălēa Palermo Apartment - Servizi",
      },
    ],
    locale: "it_IT",
    type: "website",
  },
  alternates: {
    canonical: "https://www.tuodominio.com/services",
  },
};

const ServicesPage = () => {
  return <Services />;
};

export default ServicesPage;
*/
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ServicesHeader } from "@/components/Services/ServicesHeader";
import { ServicesClient } from "@/components/Services/ServicesClient";
import { AmenitiesGrid } from "@/components/Services/AmenitiesGrid";
import { ServicesCta } from "@/components/Services/ServicesCta";

export const metadata: Metadata = {
  title: "Servizi | Thălēa Palermo Apartment",
  description:
    "Scopri tutti i servizi offerti da Thălēa Palermo Apartment: pulizie professionali, Wi-Fi veloce, cucina completa e check-in flessibile.",
};

const API = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

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