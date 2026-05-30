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
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import  GalleryClient  from "@/components/Gallery/GalleryClient";

export const metadata: Metadata = {
  title: "Galleria | Thălēa Palermo Apartment",
  description:
    "Scopri la galleria fotografica di Thălēa Palermo Apartment: terrazza panoramica, cucina, camera da letto e bagno.",
};

const HERO_IMAGE =
  "https://res.cloudinary.com/dbxysr1a6/image/upload/v1779876843/SICILIAN-TASTE-SERVER-UPLOADS/A1404B4E-05E9-4B0B-91D6-8E69A0BF5BB9.png";

const DETAILS = [
  ["Ospiti", "Fino a 2"],
  ["Camere da letto", "1"],
  ["Bagni", "1"],
  ["Superficie", "53 m²"],
  ["Soggiorno minimo", "2 notti"],
  ["Tariffa", "Da € 130 / notte"],
] as const;

const AMENITIES = [
  "Wifi fibra",
  "Aria condizionata",
  "Cucina attrezzata",
  "Lavatrice",
  "Terrazza privata",
  "Lenzuola in lino",
  "Caffè di benvenuto",
  "Check-in autonomo",
  "Pulizie incluse",
];

export default function GalleryPage() {
  const t = useTranslations("gallery");

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
      {/* ── Header ── */}
      <section className="mx-auto max-w-5xl px-6 pb-12 pt-20">
        <span className="text-xs uppercase tracking-[0.3em] text-[#5a6b5b]">
          {t("label")}
        </span>
        <h1
          className="mt-4 text-5xl text-[#2e3d2f] md:text-6xl animate-fade-up"
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          {t("heading")}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-[#5a6b5b]">
          {t("subheading")}
        </p>
      </section>

      {/* ── Hero fullwidth ── */}
      <section className="mx-auto max-w-6xl px-6">
        <div className="overflow-hidden rounded-xl" style={{ aspectRatio: "16 / 7" }}>
          <Image
            src={HERO_IMAGE}
            alt="Thălēa Apartment"
            width={1600}
            height={700}
            priority
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      {/* ── Dettagli + Amenities ── */}
      <section className="mx-auto grid max-w-5xl gap-12 px-6 py-20 md:grid-cols-2">
        <div>
          <h2
            className="text-3xl text-[#2e3d2f]"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            {t("details.title")}
          </h2>
          <dl className="mt-6 space-y-3 text-sm">
            {DETAILS.map(([k, v]) => (
              <div
                key={k}
                className="flex justify-between border-b border-[#e8e3d8] pb-3"
              >
                <dt className="text-[#5a6b5b]">{k}</dt>
                <dd className="font-medium text-[#2e3d2f]">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div>
          <h2
            className="text-3xl text-[#2e3d2f]"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            {t("amenities.title")}
          </h2>
          <ul className="mt-6 grid grid-cols-2 gap-2 text-sm">
            {AMENITIES.map((a) => (
              <li key={a} className="flex items-center gap-2 text-[#5a6b5b]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#4a6741] shrink-0" />
                {a}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Sezioni stanze con swiper ── */}
      <GalleryClient sections={sections} />

      {/* ── CTA ── */}
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