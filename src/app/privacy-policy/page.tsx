/*import PrivacyPolicy from "../../../components/PrivacyPolicy/PrivacyPolicy";

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
*/

import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LegalSection } from "@/components/LegalSection/LegalSection";
import { LegalList } from "@/components/LegalList/LegalList";


export const metadata: Metadata = {
  title: "Privacy Policy | Thălēa Palermo Apartment",
  description:
    "Consulta la Privacy Policy di Thălēa Palermo Apartment e scopri come proteggiamo i tuoi dati durante il soggiorno.",
};

export default async function PrivacyPolicyPage() {
  const t = await getTranslations("privacyPolicy");

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
        <LegalSection title={t("dataController.title")}>
          <p>{t("dataController.description")}</p>
          <LegalList items={t.raw("dataController.details") as string[]} />
        </LegalSection>

        <LegalSection title={t("collectedData.title")}>
          <p>{t("collectedData.description")}</p>
          <LegalList items={t.raw("collectedData.items") as string[]} />
        </LegalSection>

        <LegalSection title={t("processingPurpose.title")}>
          <LegalList items={t.raw("processingPurpose.items") as string[]} />
        </LegalSection>

        <LegalSection title={t("legalBasis.title")}>
          <LegalList items={t.raw("legalBasis.items") as string[]} />
        </LegalSection>

        <LegalSection title={t("dataRetention.title")}>
          <LegalList items={t.raw("dataRetention.items") as string[]} />
        </LegalSection>

        <LegalSection title={t("thirdParty.title")}>
          <p>{t("thirdParty.description")}</p>
          <LegalList items={t.raw("thirdParty.items") as string[]} />
          <p>{t("thirdParty.note")}</p>
        </LegalSection>

        <LegalSection title={t("rights.title")}>
          <p>{t("rights.description")}</p>
          <LegalList items={t.raw("rights.items") as string[]} />
          <p>{t("rights.note")}</p>
        </LegalSection>

        <LegalSection title={t("security.title")}>
          <p>{t("security.description")}</p>
        </LegalSection>

        <LegalSection title={t("policyUpdates.title")}>
          <p>{t("policyUpdates.description")}</p>
        </LegalSection>

        <LegalSection title={t("contacts.title")}>
          <p>{t("contacts.description")}</p>
          <LegalList items={t.raw("contacts.items") as string[]} />
        </LegalSection>
      </div>

      <p className="mt-12 text-xs text-[#5a6b5b]">{t("lastUpdate")}</p>
    </div>
  );
}