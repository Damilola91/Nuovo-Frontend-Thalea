import TermsConditions from "../../components/TermsConditions/TermsConditions";

export const metadata = {
  title: "Termini e Condizioni | Thălēa Palermo Apartment",
  description:
    "Leggi i Termini e Condizioni di Thălēa Palermo Apartment per informazioni su prenotazioni, pagamenti e regolamenti durante il soggiorno.",
  keywords: [
    "Termini e condizioni Thălēa Palermo",
    "Regolamento prenotazioni Palermo",
    "Pagamenti casa vacanze",
    "Appartamento Thălēa",
    "B&B Palermo",
    "Alloggi Sicilia",
  ],
  icons: {
    icon: "https://res.cloudinary.com/dbxysr1a6/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,b_rgb:262c35/v1737132781/PORTFOLIO-SERVER/PHOTO-2025-01-17-17-50-54.jpg",
    shortcut:
      "https://res.cloudinary.com/dbxysr1a6/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,b_rgb:262c35/v1737132781/PORTFOLIO-SERVER/PHOTO-2025-01-17-17-50-54.jpg",
    apple:
      "https://res.cloudinary.com/dbxysr1a6/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,b_rgb:262c35/v1737132781/PORTFOLIO-SERVER/PHOTO-2025-01-17-17-50-54.jpg",
  },
  openGraph: {
    title: "Termini e Condizioni | Thălēa Palermo Apartment",
    description:
      "Informazioni sui termini e condizioni per soggiornare presso Thălēa Palermo Apartment.",
    url: "https://www.tuodominio.com/terms-conditions",
    siteName: "Thălēa Palermo Apartment",
    images: [
      {
        url: "https://www.tuodominio.com/images/terms-og.jpg",
        width: 1200,
        height: 630,
        alt: "Thălēa Palermo Apartment - Termini e Condizioni",
      },
    ],
    locale: "it_IT",
    type: "website",
  },
  alternates: {
    canonical: "https://www.tuodominio.com/terms-conditions",
  },
};

const TermsConditionsPage = () => {
  return <TermsConditions />;
};

export default TermsConditionsPage;
