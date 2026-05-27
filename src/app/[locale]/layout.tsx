import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Toaster } from "react-hot-toast";
import { locales } from "@/i18n/config";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import "../globals.css";

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

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider messages={messages}>
          <SiteHeader />
          <main className="min-h-screen pt-16">{children}</main>
          <SiteFooter />
        </NextIntlClientProvider>

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
      </body>
    </html>
  );
}