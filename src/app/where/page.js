import Where from "../../components/Where/Where";

export const metadata = {
  title: "Dove Siamo | Thălēa Palermo Apartment",
  description:
    "Scopri la posizione di Thălēa Palermo Apartment nel cuore di Palermo. Informazioni utili per raggiungere l'appartamento e vivere la città.",
  keywords: [
    "Dove siamo Thălēa Palermo",
    "Posizione casa vacanze Palermo",
    "Mappa appartamento Palermo",
    "Alloggi centro Palermo",
    "Appartamento Thălēa",
  ],
  icons: {
    icon: "https://res.cloudinary.com/dbxysr1a6/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,b_rgb:262c35/v1737132781/PORTFOLIO-SERVER/PHOTO-2025-01-17-17-50-54.jpg",
    shortcut:
      "https://res.cloudinary.com/dbxysr1a6/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,b_rgb:262c35/v1737132781/PORTFOLIO-SERVER/PHOTO-2025-01-17-17-50-54.jpg",
    apple:
      "https://res.cloudinary.com/dbxysr1a6/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,b_rgb:262c35/v1737132781/PORTFOLIO-SERVER/PHOTO-2025-01-17-17-50-54.jpg",
  },
  openGraph: {
    title: "Dove Siamo | Thălēa Palermo Apartment",
    description:
      "Informazioni su come raggiungere Thălēa Palermo Apartment e vivere Palermo al meglio.",
    url: "https://www.tuodominio.com/where",
    siteName: "Thălēa Palermo Apartment",
    images: [
      {
        url: "https://www.tuodominio.com/images/where-og.jpg",
        width: 1200,
        height: 630,
        alt: "Thălēa Palermo Apartment - Dove Siamo",
      },
    ],
    locale: "it_IT",
    type: "website",
  },
  alternates: {
    canonical: "https://www.tuodominio.com/where",
  },
};

const WherePage = () => {
  return <Where />;
};

export default WherePage;
