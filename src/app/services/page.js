import Services from "../../components/Services/Services";

export const metadata = {
  title: "Servizi | Thălēa Palermo Apartment",
  description:
    "Scopri tutti i servizi offerti da Thălēa Palermo Apartment, casa vacanze a Palermo con terrazza panoramica e comfort esclusivi.",
  keywords: [
    "Servizi Thălēa Palermo",
    "Casa vacanze Palermo",
    "Appartamento Thălēa",
    "B&B Palermo",
    "Alloggi Sicilia",
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
    title: "Servizi | Thălēa Palermo Apartment",
    description:
      "Una panoramica dei servizi disponibili presso Thălēa Palermo Apartment per rendere il tuo soggiorno confortevole.",
    url: "https://www.tuodominio.com/services",
    siteName: "Thălēa Palermo Apartment",
    images: [
      {
        url: "https://www.tuodominio.com/images/services-og.jpg",
        width: 1200,
        height: 630,
        alt: "Thălēa Palermo Apartment - Servizi",
      },
    ],
    locale: "it_IT",
    type: "website",
  },
  alternates: {
    canonical: "https://www.tuodominio.com/services",
  },
};

const ServicesPage = () => {
  return <Services />;
};

export default ServicesPage;
