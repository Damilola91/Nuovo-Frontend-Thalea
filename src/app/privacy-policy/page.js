import PrivacyPolicy from "../../components/PrivacyPolicy/PrivacyPolicy";

// Metadata SEO lato server
export const metadata = {
  title: "Privacy Policy | Thălēa Palermo Apartment",
  description:
    "Consulta la Privacy Policy di Thălēa Palermo Apartment e scopri come proteggiamo i tuoi dati durante il soggiorno.",
  keywords: [
    "Privacy Policy Thălēa Palermo",
    "Protezione dati Palermo",
    "Casa vacanze Palermo",
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
    title: "Privacy Policy | Thălēa Palermo Apartment",
    description:
      "Informazioni sulla gestione e protezione dei dati degli ospiti presso Thălēa Palermo Apartment.",
    url: "https://www.tuodominio.com/privacy-policy",
    siteName: "Thălēa Palermo Apartment",
    images: [
      {
        url: "https://www.tuodominio.com/images/privacy-og.jpg",
        width: 1200,
        height: 630,
        alt: "Thălēa Palermo Apartment - Privacy Policy",
      },
    ],
    locale: "it_IT",
    type: "website",
  },
  alternates: {
    canonical: "https://www.tuodominio.com/privacy-policy",
  },
};

// Pagina lato server che include il componente client
const PrivacyPolicyPage = () => {
  return <PrivacyPolicy />;
};

export default PrivacyPolicyPage;
