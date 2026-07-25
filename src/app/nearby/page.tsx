import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { NearbyHeader } from "@/components/Nearby/NearbyHeader";
import { NearbyClient } from "@/components/Nearby/NearbyClient";
import { NearbyCta } from "@/components/Nearby/NearbyCta";
import type { NearbyPlace } from "@/components/Nearby/nearbyTypes";

const SITE_URL = "https://www.thaleapalermoapartment.it";
const OG_IMAGE = "https://res.cloudinary.com/dbxysr1a6/image/upload/f_auto,q_auto/v1738280150/THALEA-PALERMO-APARTMENT/4-Canti-resize2.jpg";

export const metadata: Metadata = {
  title: "Dintorni | Thălēa Apartment Palermo — Monumenti, Mercati e Attrazioni",
  description:
    "A due passi da Thălēa Apartment: Quattro Canti, Teatro Massimo, Mercato di Ballarò, Cattedrale e molto altro. Scopri le attrazioni del centro storico di Palermo.",
  keywords: [
    "cosa vedere Palermo centro storico",
    "attrazioni Palermo",
    "Quattro Canti Palermo",
    "Teatro Massimo Palermo",
    "Mercato Ballarò Palermo",
    "monumenti Palermo",
    "cosa fare a Palermo",
  ],
  
  alternates: {
    canonical: "/nearby",
    languages: {
      "it": "/it/nearby",
      "en": "/en/nearby",
      "de": "/de/nearby",
      "fr": "/fr/nearby",
      "es": "/es/nearby",
      "zh": "/zh/nearby",
    },
  },
  openGraph: {
    title: "Dintorni | Thălēa Apartment Palermo — Monumenti e Attrazioni",
    description:
      "A due passi da Thălēa Apartment: Quattro Canti, Teatro Massimo, Mercato di Ballarò e i principali monumenti del centro storico di Palermo.",
    url: `${SITE_URL}/nearby`,
    siteName: "Thălēa Apartment Palermo",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Quattro Canti - Centro storico di Palermo",
      },
    ],
    locale: "it_IT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dintorni | Thălēa Apartment Palermo",
    description: "Scopri monumenti, mercati e attrazioni a pochi passi dall'appartamento.",
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

export default async function NearbyPage() {
  const t = await getTranslations("nearby");
  const places = t.raw("places") as NearbyPlace[];

  return (
    <>
      <NearbyHeader />
      <NearbyClient places={places} />
      <NearbyCta />
    </>
  );
}