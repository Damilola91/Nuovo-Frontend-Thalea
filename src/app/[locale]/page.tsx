/*import HomePage from "../components/Pages/HomePage/HomePage";

export const metadata = {
  title: "Thălēa Palermo Apartment | Casa Vacanze a Palermo",
  description:
    "Scopri Thălēa Palermo Apartment, una casa vacanze moderna con terrazza panoramica, comfort esclusivi e posizione ideale per vivere Palermo.",
  keywords: [
    "Casa vacanze Palermo",
    "Appartamento Thălēa",
    "B&B Palermo",
    "Alloggi Sicilia",
    "Affitto breve Palermo",
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
    title: "Thălēa Palermo Apartment",
    description:
      "Una casa vacanze a Palermo con terrazza e tutti i comfort per il tuo soggiorno.",
    url: "https://www.thaleapalermoapartment.it",
    siteName: "Thălēa Palermo Apartment",
    images: [
      {
        url: "https://res.cloudinary.com/dbxysr1a6/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,b_rgb:262c35/v1737132781/PORTFOLIO-SERVER/PHOTO-2025-01-17-17-50-54.jpg",
        width: 1200,
        height: 630,
        alt: "Thălēa Palermo Apartment - Casa Vacanze",
      },
    ],
    locale: "it_IT",
    type: "website",
  },
  alternates: {
    canonical: "https://www.thaleapalermoapartment.it/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thălēa Palermo Apartment",
    description: "Una casa vacanze a Palermo con terrazza e tutti i comfort.",
    images: [
      "https://res.cloudinary.com/dbxysr1a6/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,b_rgb:262c35/v1737132781/PORTFOLIO-SERVER/PHOTO-2025-01-17-17-50-54.jpg",
    ],
  },
};

const Home = () => {
  return <HomePage />;
};

export default Home; */

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

// Immagini reali Cloudinary
const HERO_IMAGE = "https://res.cloudinary.com/dbxysr1a6/image/upload/v1779876843/SICILIAN-TASTE-SERVER-UPLOADS/A1404B4E-05E9-4B0B-91D6-8E69A0BF5BB9.png";
const ROOM_IMAGES = [
  { src: "https://res.cloudinary.com/dbxysr1a6/image/upload/f_auto,q_auto/v1754746486/THALEA-PALERMO-APARTMENT/IMG_6923.heic", alt: "Camera da letto" },
  { src: "https://res.cloudinary.com/dbxysr1a6/image/upload/f_auto,q_auto/v1754744874/THALEA-PALERMO-APARTMENT/IMG_7135.heic", alt: "Cucina" },
  { src: "https://res.cloudinary.com/dbxysr1a6/image/upload/f_auto,q_auto/v1754742986/THALEA-PALERMO-APARTMENT/IMG_6907.heic", alt: "Terrazza" },
];

const FEATURES = [
  { key: "2", label: "Ospiti", desc: "Per coppie o piccoli viaggi" },
  { key: "65m²", label: "Spazio", desc: "Soggiorno, camera, terrazza" },
  { key: "24/7", label: "Check-in", desc: "Accesso autonomo" },
  { key: "★ 4.9", label: "Recensioni", desc: "Da 120+ ospiti" },
];

export default function HomePage() {
  const t = useTranslations();

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={HERO_IMAGE}
            alt="Interno luminoso di Thălēa Apartment"
            fill
            priority
            className="object-cover animate-slow-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#f7f4ee]/30 via-[#f7f4ee]/10 to-[#f7f4ee]" />
        </div>

        <div className="relative mx-auto flex min-h-[88vh] max-w-5xl flex-col items-start justify-end px-6 pb-20 pt-32">
          <span className="mb-4 text-xs uppercase tracking-[0.3em] text-[#2e3d2f]/80 animate-fade-in">
            {t("hero.subtitle")} · Italia
          </span>
          <h1 className="max-w-3xl text-5xl leading-[1.05] text-[#2e3d2f] md:text-7xl animate-fade-up" style={{ fontFamily: "Outfit, sans-serif" }}>
            {t("hero.title")}
          </h1>
          <p className="mt-6 max-w-xl text-base text-[#2e3d2f]/75 md:text-lg animate-fade-up">
            {t("hero.description")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3 animate-fade-up">
            <Link
              href="/calendar"
              className="rounded-full bg-[#4a6741] px-6 py-3 text-sm font-medium text-[#f7f4ee] transition-transform hover:scale-[1.03]"
            >
              {t("hero.cta")}
            </Link>
            <Link
              href="/gallery"
              className="rounded-full border border-[#2e3d2f]/20 px-6 py-3 text-sm font-medium text-[#2e3d2f] transition-colors hover:bg-[#2e3d2f]/5"
            >
              {t("navbar.apartment")}
            </Link>
          </div>
        </div>
      </section>

      {/* ── Intro ── */}
      <section className="mx-auto max-w-5xl px-6 py-24">
        <div className="grid gap-12 md:grid-cols-2 md:gap-20">
          <h2 className="text-3xl text-[#2e3d2f] md:text-5xl" style={{ fontFamily: "Outfit, sans-serif" }}>
            {t("features.title")}
          </h2>
          <div className="space-y-4 text-[#5a6b5b]">
            {(t.raw("features.items") as { title: string; description: string }[]).map((item, i) => (
              <p key={i}><strong className="text-[#2e3d2f]">{item.title}.</strong> {item.description}</p>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery preview ── */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-4 md:grid-cols-3">
          {ROOM_IMAGES.map((img, i) => (
            <div
              key={i}
              className="group overflow-hidden rounded-xl bg-[#eee9de]"
              style={{ aspectRatio: "4 / 5" }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={800}
                height={1000}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link
            href="/gallery"
            className="text-sm text-[#5a6b5b] underline underline-offset-4 hover:text-[#2e3d2f] transition-colors"
          >
            {t("gallery.heading")} →
          </Link>
        </div>
      </section>

      {/* ── Features strip ── */}
      <section className="border-t border-[#e8e3d8] bg-[#f7f4ee]/60">
        <div className="mx-auto grid max-w-5xl gap-10 px-6 py-20 md:grid-cols-4">
          {FEATURES.map(({ key, label, desc }) => (
            <div key={key}>
              <p className="text-3xl text-[#4a6741]" style={{ fontFamily: "Outfit, sans-serif" }}>{key}</p>
              <p className="mt-2 text-sm font-medium text-[#2e3d2f]">{label}</p>
              <p className="text-sm text-[#5a6b5b]">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Services preview ── */}
      <section className="mx-auto max-w-5xl px-6 py-24">
        <span className="text-xs uppercase tracking-[0.3em] text-[#5a6b5b]">
          {t("services.title")}
        </span>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {(t.raw("services.items") as string[]).map((item, i) => (
            <div key={i} className="rounded-xl border border-[#e8e3d8] bg-[#f7f4ee] px-5 py-4 text-sm text-[#2e3d2f]">
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA finale ── */}
      <section className="mx-auto max-w-4xl px-6 py-24 text-center">
        <h2 className="text-4xl text-[#2e3d2f] md:text-5xl" style={{ fontFamily: "Outfit, sans-serif" }}>
          {t("bookingCTA.bookingInvite")}
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-[#5a6b5b]">
          {t("bookingCTA.bookingText")}
        </p>
        <Link
          href="/calendar"
          className="mt-8 inline-block rounded-full bg-[#4a6741] px-8 py-3 text-sm font-medium text-[#f7f4ee] transition-transform hover:scale-[1.03]"
        >
          {t("bookingCTA.bookingButton")}
        </Link>
      </section>
    </>
  );
}