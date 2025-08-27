import HomePage from "../components/Pages/HomePage/HomePage";

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
    url: "https://www.tuodominio.com",
    siteName: "Thălēa Palermo Apartment",
    images: [
      {
        url: "https://www.tuodominio.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Thălēa Palermo Apartment - Casa Vacanze",
      },
    ],
    locale: "it_IT",
    type: "website",
  },
  alternates: {
    canonical: "https://www.tuodominio.com/",
  },
};

const Home = () => {
  return <HomePage />;
};

export default Home;
