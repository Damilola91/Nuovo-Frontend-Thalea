import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import GalleryClient from "@/components/Gallery/GalleryClient";
import GalleryHero from "@/components/Gallery/GalleryHero";
import { GalleryDetails } from "@/components/Gallery/GalleryDetails";
import GalleryHeader from "@/components/Gallery/GalleryHeader";

const SITE_URL = "https://www.thaleapalermoapartment.it";
const OG_IMAGE = "https://res.cloudinary.com/dbxysr1a6/image/upload/f_auto,q_auto/v1754742986/THALEA-PALERMO-APARTMENT/IMG_6907.heic";
const API = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

export const metadata: Metadata = {
  title: "Appartamento | Thălēa Apartment Palermo — Terrazza, Cucina, Camera",
  description:
    "Scopri Thălēa Apartment: 53m² nel centro storico di Palermo con terrazza panoramica privata, cucina attrezzata, camera matrimoniale e bagno moderno. Foto e dettagli.",
  keywords: [
    "appartamento Palermo centro storico",
    "terrazza panoramica Palermo",
    "casa vacanze Palermo foto",
    "Thălea apartment galleria",
    "affitto breve Palermo",
  ],
  
  alternates: {
    canonical: "/gallery",
    languages: {
      "it": "/it/gallery",
      "en": "/en/gallery",
      "de": "/de/gallery",
      "fr": "/fr/gallery",
      "es": "/es/gallery",
      "zh": "/zh/gallery",
    },
  },
  openGraph: {
    title: "Appartamento | Thălēa Apartment Palermo — Terrazza, Cucina, Camera",
    description:
      "53m² nel centro storico di Palermo con terrazza panoramica privata, cucina attrezzata e camera matrimoniale. Scopri tutti i dettagli.",
    url: `${SITE_URL}/gallery`,
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
    title: "Appartamento | Thălēa Apartment Palermo",
    description: "53m² con terrazza panoramica nel centro storico di Palermo.",
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