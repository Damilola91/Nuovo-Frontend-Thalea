/*import TermsConditions from "../../../components/TermsConditions/TermsConditions";

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
*/

import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LegalSection } from "@/components/LegalSection/LegalSection"
import { LegalList } from "@/components/LegalList/LegalList";

export const metadata: Metadata = {
  title: "Termini e Condizioni | Thălēa Palermo Apartment",
  description:
    "Leggi i Termini e Condizioni di Thălēa Palermo Apartment per informazioni su prenotazioni, pagamenti e regolamenti durante il soggiorno.",
};

export default async function TermsPage() {
  const t = await getTranslations("terms");

  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      {/* Header */}
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