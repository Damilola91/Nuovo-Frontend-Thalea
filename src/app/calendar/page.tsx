import type { Metadata } from "next";
import { BookingStepper } from "@/components/Booking/BookingStepper";
import { fetchOccupiedDatesAction } from "@/actions/bookingActions";

const SITE_URL = "https://www.thaleapalermoapartment.it";
const OG_IMAGE = "https://res.cloudinary.com/dbxysr1a6/image/upload/f_auto,q_auto/v1754742986/THALEA-PALERMO-APARTMENT/IMG_6907.heic";

export const metadata: Metadata = {
  title: "Prenota il tuo soggiorno | Thălēa Apartment Palermo",
  description:
    "Verifica la disponibilità e prenota il tuo soggiorno a Thălēa Apartment Palermo in pochi semplici passi. Check-in flessibile, pagamento sicuro.",
  keywords: [
    "prenota appartamento Palermo",
    "disponibilità Thălea Palermo",
    "booking casa vacanze Palermo",
    "affitto breve centro storico Palermo",
  ],
  alternates: {
    canonical: "/calendar",
    languages: {
      "it": "/it/calendar",
      "en": "/en/calendar",
      "de": "/de/calendar",
      "fr": "/fr/calendar",
      "es": "/es/calendar",
      "zh": "/zh/calendar",
    },
  },
  openGraph: {
    title: "Prenota il tuo soggiorno | Thălēa Apartment Palermo",
    description:
      "Verifica la disponibilità e prenota il tuo soggiorno a Thălēa Apartment Palermo in pochi semplici passi.",
    url: `${SITE_URL}/calendar`,
    siteName: "Thălēa Apartment Palermo",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Thălēa Apartment Palermo - Prenota il tuo soggiorno",
      },
    ],
    locale: "it_IT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prenota | Thălēa Apartment Palermo",
    description: "Verifica disponibilità e prenota il tuo soggiorno a Palermo.",
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function CalendarPage() {
  const { occupiedDates } = await fetchOccupiedDatesAction().catch(() => ({
    occupiedDates: [],
  }));

  return <BookingStepper occupiedDates={occupiedDates} />;
}