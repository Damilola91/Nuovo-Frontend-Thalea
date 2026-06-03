/*import "./globals.css";

import { Toaster } from "react-hot-toast";
import CookiesPreferences from "../components/CookiesPreferences/CookiesPreferences";
import GlobalLoader from "../components/GlobalLoader/GlobalLoader";

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <GlobalLoader />
        {children}
        <CookiesPreferences />

        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#333",
              color: "#fff",
              fontSize: "14px",
              borderRadius: "8px",
              padding: "12px 16px",
            },
          }}
        />
      </body>
    </html>
  );
};

export default RootLayout; */

import "./globals.css";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Toaster } from "react-hot-toast";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CookiesPreferences } from "@/components/CookiesPreferences/CookiesPreferences";

export const metadata: Metadata = {
  title: "Thălēa Apartment Palermo",
  description: "Il tuo rifugio nel cuore di Palermo. Appartamento moderno con terrazza e vista panoramica.",
  openGraph: {
    title: "Thălēa Apartment Palermo",
    description: "Il tuo rifugio nel cuore di Palermo.",
    url: "https://www.thaleapalermoapartment.it",
    siteName: "Thălēa Apartment",
    type: "website",
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