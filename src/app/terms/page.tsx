import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LegalSection } from "@/components/LegalSection/LegalSection";
import { LegalList } from "@/components/LegalList/LegalList";

const SITE_URL = "https://www.thaleapalermoapartment.it";

export const metadata: Metadata = {
  title: "Termini e Condizioni | Thălēa Apartment Palermo",
  description:
    "Leggi i Termini e Condizioni di Thălēa Apartment Palermo: prenotazioni, pagamenti, cancellazioni, check-in e regolamento della struttura.",
  
  alternates: {
    canonical: "/terms",
    languages: {
      "it": "/it/terms",
      "en": "/en/terms",
      "de": "/de/terms",
      "fr": "/fr/terms",
      "es": "/es/terms",
      "zh": "/zh/terms",
    },
  },
  openGraph: {
    title: "Termini e Condizioni | Thălēa Apartment Palermo",
    description:
      "Termini e Condizioni di Thălēa Apartment Palermo: prenotazioni, pagamenti, cancellazioni e regolamento.",
    url: `${SITE_URL}/terms`,
    siteName: "Thălēa Apartment Palermo",
    locale: "it_IT",
    type: "website",
  },
  robots: {
    index: true,
    follow: false,
  },
};

export default async function TermsPage() {
  const t = await getTranslations("terms");

  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <div className="mb-12">
        <span className="text-xs uppercase tracking-[0.3em] text-[#5a6b5b]">
          Informativa legale
        </span>
        <h1
          className="mt-4 text-4xl text-[#2e3d2f] md:text-5xl"
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          {t("heading")}
        </h1>
      </div>

      <div className="space-y-8">
        <LegalSection title={t("object.title")}>
          <p>{t("object.description")}</p>
        </LegalSection>

        <LegalSection title={t("booking.title")}>
          <LegalList items={t.raw("booking.items") as string[]} />
        </LegalSection>

        <LegalSection title={t("payment.title")}>
          <p>{t("payment.description1")}</p>
          <p>{t("payment.description2")}</p>
        </LegalSection>

        <LegalSection title={t("cancellation.title")}>
          <p>{t("cancellation.description")}</p>
        </LegalSection>

        <LegalSection title={t("checkin.title")}>
          <LegalList items={t.raw("checkin.items") as string[]} />
        </LegalSection>

        <LegalSection title={t("guest.title")}>
          <LegalList items={t.raw("guest.items") as string[]} />
        </LegalSection>

        <LegalSection title={t("liability.title")}>
          <p>{t("liability.description")}</p>
        </LegalSection>

        <LegalSection title={t("forceMajeure.title")}>
          <p>{t("forceMajeure.description")}</p>
        </LegalSection>

        <LegalSection title={t("law.title")}>
          <p>{t("law.description")}</p>
        </LegalSection>
      </div>

      <p className="mt-12 text-xs text-[#5a6b5b]">{t("lastUpdate")}</p>
    </div>
  );
}