import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LegalSection } from "@/components/LegalSection/LegalSection";
import { LegalList } from "@/components/LegalList/LegalList";

const SITE_URL = "https://www.thaleapalermoapartment.it";

export const metadata: Metadata = {
  title: "Privacy Policy | Thălēa Apartment Palermo",
  description:
    "Informativa sulla privacy di Thălēa Apartment Palermo. Scopri come raccogliamo, utilizziamo e proteggiamo i tuoi dati personali nel rispetto del GDPR.",
 
  alternates: {
    canonical: "/privacy-policy",
    languages: {
      "it": "/it/privacy-policy",
      "en": "/en/privacy-policy",
      "de": "/de/privacy-policy",
      "fr": "/fr/privacy-policy",
      "es": "/es/privacy-policy",
      "zh": "/zh/privacy-policy",
    },
  },
  openGraph: {
    title: "Privacy Policy | Thălēa Apartment Palermo",
    description:
      "Informativa sulla privacy di Thălēa Apartment Palermo nel rispetto del GDPR.",
    url: `${SITE_URL}/privacy-policy`,
    siteName: "Thălēa Apartment Palermo",
    locale: "it_IT",
    type: "website",
  },
  robots: {
    index: true,
    follow: false,
  },
};

export default async function PrivacyPolicyPage() {
  const t = await getTranslations("privacyPolicy");

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