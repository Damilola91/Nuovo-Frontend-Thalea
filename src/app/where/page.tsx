import type { Metadata } from "next";
import { WhereHeader } from "@/components/Where/WhereHeader";
import { WhereTransport } from "@/components/Where/WhereTransport";
import { WhereInfo } from "@/components/Where/WhereInfo";
import { WhereMapSection } from "@/components/Where/WhereMapSection";
import { WhereCta } from "@/components/Where/WhereCta";

const SITE_URL = "https://www.thaleapalermoapartment.it";
const OG_IMAGE = "https://res.cloudinary.com/dbxysr1a6/image/upload/f_auto,q_auto/v1738280150/THALEA-PALERMO-APARTMENT/4-Canti-resize2.jpg";

export const metadata: Metadata = {
  title: "Come Raggiungerci | Thălēa Apartment — Via Maqueda 172, Palermo",
  description:
    "Thălēa Apartment si trova in Via Maqueda 172, Palermo, nel cuore del centro storico. Raggiungibile in auto, treno e autobus. Street View e mappa interattiva.",
  keywords: [
    "dove si trova Thălea Palermo",
    "Via Maqueda 172 Palermo",
    "come arrivare appartamento Palermo centro",
    "parcheggio Palermo centro storico",
    "stazione centrale Palermo distanza",
    "aeroporto Palermo appartamento",
  ],
  
  alternates: {
    canonical: "/where",
    languages: {
      "it": "/it/where",
      "en": "/en/where",
      "de": "/de/where",
      "fr": "/fr/where",
      "es": "/es/where",
      "zh": "/zh/where",
    },
  },
  openGraph: {
    title: "Come Raggiungerci | Thălēa Apartment — Via Maqueda 172, Palermo",
    description:
      "Thălēa Apartment in Via Maqueda 172, nel cuore del centro storico di Palermo. Raggiungibile in auto, treno e autobus. Mappa interattiva.",
    url: `${SITE_URL}/where`,
    siteName: "Thălēa Apartment Palermo",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Centro storico di Palermo — Thălēa Apartment",
      },
    ],
    locale: "it_IT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Come Raggiungerci | Thălēa Apartment Palermo",
    description: "Via Maqueda 172, nel cuore del centro storico di Palermo. Mappa e indicazioni.",
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

export default function WherePage() {
  return (
    <>
      <WhereHeader />
      <WhereTransport />
      <WhereInfo />
      <WhereMapSection />
      <WhereCta />
    </>
  );
}