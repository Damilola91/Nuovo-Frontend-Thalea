import Gallery from "../../components/Gallery/Gallery";

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
