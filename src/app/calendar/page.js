import CalendarPage from "../../components/Pages/CalendarPage/CalendarPage";

export const metadata = {
  title: "Calendario Prenotazioni | Thălēa Palermo Apartment",
  description:
    "Consulta il calendario delle disponibilità di Thălēa Palermo Apartment e prenota facilmente il tuo soggiorno a Palermo in pochi click.",
  keywords: [
    "Calendario prenotazioni Palermo",
    "Disponibilità Thălēa Palermo",
    "Casa vacanze Palermo",
    "Booking Palermo",
    "Prenota appartamento Palermo",
  ],
  icons: {
    icon: "https://res.cloudinary.com/dbxysr1a6/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,b_rgb:262c35/v1737132781/PORTFOLIO-SERVER/PHOTO-2025-01-17-17-50-54.jpg",
    shortcut:
      "https://res.cloudinary.com/dbxysr1a6/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,b_rgb:262c35/v1737132781/PORTFOLIO-SERVER/PHOTO-2025-01-17-17-50-54.jpg",
    apple:
      "https://res.cloudinary.com/dbxysr1a6/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,b_rgb:262c35/v1737132781/PORTFOLIO-SERVER/PHOTO-2025-01-17-17-50-54.jpg",
  },
  openGraph: {
    title: "Calendario Prenotazioni | Thălēa Palermo Apartment",
    description:
      "Visualizza le date disponibili per Thălēa Palermo Apartment e prenota il tuo soggiorno a Palermo.",
    url: "https://www.tuodominio.com/calendar",
    siteName: "Thălēa Palermo Apartment",
    images: [
      {
        url: "https://www.tuodominio.com/images/calendar-og.jpg",
        width: 1200,
        height: 630,
        alt: "Thălēa Palermo Apartment - Calendario Prenotazioni",
      },
    ],
    locale: "it_IT",
    type: "website",
  },
  alternates: {
    canonical: "https://www.tuodominio.com/calendar",
  },
};

const CalendarBookingPage = () => {
  return <CalendarPage />;
};

export default CalendarBookingPage;
