import Booking from "../../components/Booking/Booking";

export const metadata = {
  title: "Prenota il tuo soggiorno | Thălēa Palermo Apartment",
  description:
    "Prenota facilmente il tuo soggiorno a Thălēa Palermo Apartment, casa vacanze moderna con terrazza panoramica nel cuore di Palermo.",
  keywords: [
    "Prenotazione Thălēa Palermo",
    "Casa vacanze Palermo",
    "Booking appartamento Palermo",
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
    title: "Prenota il tuo soggiorno | Thălēa Palermo Apartment",
    description:
      "Prenota il tuo soggiorno a Thălēa Palermo Apartment e goditi un'esperienza unica a Palermo.",
    url: "https://www.tuodominio.com/booking",
    siteName: "Thălēa Palermo Apartment",
    images: [
      {
        url: "https://www.tuodominio.com/images/booking-og.jpg",
        width: 1200,
        height: 630,
        alt: "Thălēa Palermo Apartment - Prenotazioni",
      },
    ],
    locale: "it_IT",
    type: "website",
  },
  alternates: {
    canonical: "https://www.tuodominio.com/booking",
  },
};

const BookingPage = () => {
  return <Booking />;
};

export default BookingPage;
