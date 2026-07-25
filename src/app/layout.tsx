import "./globals.css";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Toaster } from "react-hot-toast";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CookiesPreferences } from "@/components/CookiesPreferences/CookiesPreferences";

const SITE_URL = "https://www.thaleapalermoapartment.it";
const OG_IMAGE = "https://res.cloudinary.com/dbxysr1a6/image/upload/f_auto,q_auto/v1754742986/THALEA-PALERMO-APARTMENT/IMG_6907.heic";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Thălēa Apartment Palermo | Casa Vacanze nel Centro Storico",
    template: "%s | Thălēa Apartment Palermo",
  },
  description:
    "Il tuo rifugio nel cuore di Palermo. Appartamento moderno con terrazza panoramica, cucina attrezzata e check-in autonomo. Prenota ora.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "48x48" },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Thălēa Apartment Palermo | Casa Vacanze nel Centro Storico",
    description:
      "Il tuo rifugio nel cuore di Palermo. Appartamento moderno con terrazza panoramica, cucina attrezzata e check-in autonomo.",
    url: SITE_URL,
    siteName: "Thălēa Apartment Palermo",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Thălēa Apartment Palermo",
      },
    ],
    locale: "it_IT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thălēa Apartment Palermo",
    description: "Il tuo rifugio nel cuore di Palermo con terrazza panoramica.",
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value ?? "it";
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <SiteHeader />
          <main className="min-h-screen pt-16">{children}</main>
          <SiteFooter />
          <CookiesPreferences />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#2e3d2f",
                color: "#f7f4ee",
                fontSize: "13px",
                borderRadius: "8px",
              },
            }}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}