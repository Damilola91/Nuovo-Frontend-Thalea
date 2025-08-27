import BookingDetails from "../../../components/BookingDetails/BookingDetails";

export const metadata = {
  title: "Dettagli Prenotazione | Thălēa Palermo Apartment",
  description:
    "Visualizza i dettagli della tua prenotazione a Thălēa Palermo Apartment, casa vacanze moderna con terrazza panoramica nel cuore di Palermo.",
  keywords: [
    "Dettagli prenotazione Thălēa Palermo",
    "Booking appartamento Palermo",
    "Casa vacanze Palermo",
    "Alloggi Sicilia",
    "Affitto breve Palermo",
  ],
  icons: {
    icon: "https://res.cloudinary.com/dbxysr1a6/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,b_rgb:262c35/v1737132781/PORTFOLIO-SERVER/PHOTO-2025-01-17-17-50-54.jpg",
    shortcut:
      "https://res.cloudinary.com/dbxysr1a6/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,b_rgb:262c35/v1737132781/PORTFOLIO-SERVER/PHOTO-2025-01-17-17-50-54.jpg",
    apple:
      "https://res.cloudinary.com/dbxysr1a6/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,b_rgb:262c35/v1737132781/PORTFOLIO-SERVER/PHOTO-2025-01-17-17-50-54.jpg",
  },
  openGraph: {
    title: "Dettagli Prenotazione | Thălēa Palermo Apartment",
    description:
      "Consulta tutte le informazioni relative alla tua prenotazione a Thălēa Palermo Apartment.",
    url: "https://www.tuodominio.com/booking-details",
    siteName: "Thălēa Palermo Apartment",
    images: [
      {
        url: "https://www.tuodominio.com/images/booking-details-og.jpg",
        width: 1200,
        height: 630,
        alt: "Thălēa Palermo Apartment - Dettagli Prenotazione",
      },
    ],
    locale: "it_IT",
    type: "website",
  },
  alternates: {
    canonical: "https://www.tuodominio.com/booking-details",
  },
};

const BookingDetailsPage = ({ params }) => {
  const { bookingId } = params;
  return <BookingDetails bookingId={bookingId} />;
};

export default BookingDetailsPage;
