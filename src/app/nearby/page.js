import Nearby from "../../components/Nearby/Nearby";

export const metadata = {
  title: "Luoghi Vicini | Thălēa Palermo Apartment",
  description:
    "Scopri i luoghi di interesse vicino a Thălēa Palermo Apartment: ristoranti, monumenti, mercati e attrazioni per rendere il tuo soggiorno a Palermo indimenticabile.",
  keywords: [
    "Luoghi vicino Thălēa Palermo",
    "Attrazioni Palermo",
    "Ristoranti Palermo",
    "Monumenti Palermo",
    "Casa vacanze Palermo",
  ],
  icons: {
    icon: "https://res.cloudinary.com/dbxysr1a6/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,b_rgb:262c35/v1737132781/PORTFOLIO-SERVER/PHOTO-2025-01-17-17-50-54.jpg",
    shortcut:
      "https://res.cloudinary.com/dbxysr1a6/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,b_rgb:262c35/v1737132781/PORTFOLIO-SERVER/PHOTO-2025-01-17-17-50-54.jpg",
    apple:
      "https://res.cloudinary.com/dbxysr1a6/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,b_rgb:262c35/v1737132781/PORTFOLIO-SERVER/PHOTO-2025-01-17-17-50-54.jpg",
  },
  openGraph: {
    title: "Luoghi Vicini | Thălēa Palermo Apartment",
    description:
      "Esplora i luoghi e le attrazioni vicino a Thălēa Palermo Apartment per vivere Palermo al meglio.",
    url: "https://www.tuodominio.com/nearby",
    siteName: "Thălēa Palermo Apartment",
    images: [
      {
        url: "https://www.tuodominio.com/images/nearby-og.jpg",
        width: 1200,
        height: 630,
        alt: "Thălēa Palermo Apartment - Luoghi Vicini",
      },
    ],
    locale: "it_IT",
    type: "website",
  },
  alternates: {
    canonical: "https://www.tuodominio.com/nearby",
  },
};

const NearbyPage = () => {
  return <Nearby />;
};

export default NearbyPage;
