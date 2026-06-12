/*import Gallery from "../../../components/Gallery/Gallery";

export const metadata = {
  title: "Galleria | Thălēa Palermo Apartment",
  description:
    "Scopri la galleria fotografica di Thălēa Palermo Apartment: terrazza panoramica, cucina, camere da letto e bagno con tutti i comfort per il tuo soggiorno a Palermo.",
  keywords: [
    "Galleria Thălēa Palermo",
    "Casa vacanze Palermo",
    "Appartamento Palermo centro",
    "Foto appartamento Palermo",
    "Vacanze Palermo",
  ],
  icons: {
    icon: "https://res.cloudinary.com/dbxysr1a6/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,b_rgb:262c35/v1737132781/PORTFOLIO-SERVER/PHOTO-2025-01-17-17-50-54.jpg",
    shortcut:
      "https://res.cloudinary.com/dbxysr1a6/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,b_rgb:262c35/v1737132781/PORTFOLIO-SERVER/PHOTO-2025-01-17-17-50-54.jpg",
    apple:
      "https://res.cloudinary.com/dbxysr1a6/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,b_rgb:262c35/v1737132781/PORTFOLIO-SERVER/PHOTO-2025-01-17-17-50-54.jpg",
  },
  openGraph: {
    title: "Galleria | Thălēa Palermo Apartment",
    description:
      "Esplora la galleria fotografica di Thălēa Palermo Apartment e scopri tutti i dettagli dell'appartamento a Palermo.",
    url: "https://www.tuodominio.com/gallery",
    siteName: "Thălēa Palermo Apartment",
    images: [
      {
        url: "https://www.tuodominio.com/images/gallery-og.jpg",
        width: 1200,
        height: 630,
        alt: "Thălēa Palermo Apartment - Galleria",
      },
    ],
    locale: "it_IT",
    type: "website",
  },
  alternates: {
    canonical: "https://www.tuodominio.com/gallery",
  },
};

const GalleryPage = () => {
  return <Gallery />;
};

export default GalleryPage;
*/

import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import GalleryClient from "@/components/Gallery/GalleryClient";
import GalleryHero from "@/components/Gallery/GalleryHero";
import { GalleryDetails } from "@/components/Gallery/GalleryDetails";
import GalleryHeader from "@/components/Gallery/GalleryHeader";

export const metadata: Metadata = {
  title: "Galleria | Thălēa Palermo Apartment",
  description:
    "Scopri la galleria fotografica di Thălēa Palermo Apartment: terrazza panoramica, cucina, camera da letto e bagno.",
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

export default async function GalleryPage() {
  const t = await getTranslations("gallery");
  const apartment = await getApartment();

  const sections = [
    {
      title: t("terrace.title"),
      description: t("terrace.description"),
      images: t.raw("terrace.images") as string[],
      reverse: false,
    },
    {
      title: t("kitchen.title"),
      description: t("kitchen.description"),
      images: t.raw("kitchen.images") as string[],
      reverse: true,
    },
    {
      title: t("bedroom.title"),
      description: t("bedroom.description"),
      images: t.raw("bedroom.images") as string[],
      reverse: false,
    },
    {
      title: t("bathroom.title"),
      description: t("bathroom.description"),
      images: t.raw("bathroom.images") as string[],
      reverse: true,
    },
  ];

  return (
    <>
      <GalleryHeader />
      <GalleryHero />
      <GalleryDetails
        pricePerNight={apartment?.pricePerNight ?? 140}
        maxGuests={apartment?.maxGuests ?? 2}
      />
      <GalleryClient sections={sections} />
      <section className="mx-auto max-w-4xl px-6 pb-24 text-center">
        <Link
          href="/calendar"
          className="inline-block rounded-full bg-[#4a6741] px-8 py-3 text-sm font-medium text-[#f7f4ee] transition-transform hover:scale-[1.03]"
        >
          {t("cta")}
        </Link>
      </section>
    </>
  );
}