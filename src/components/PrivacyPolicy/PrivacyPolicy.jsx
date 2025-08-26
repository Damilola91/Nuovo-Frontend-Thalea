"use client";

import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useTranslation } from "react-i18next";

const PrivacyPolicy = () => {
  const { t } = useTranslation();

  const renderList = (items) => (
    <ul className="list-disc list-inside">
      {items.map((item, idx) => (
        <li key={idx}>{item}</li>
      ))}
    </ul>
  );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="container mx-auto mt-20 flex-grow px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-12 text-[#46331d] text-center drop-shadow-lg">
          {t("privacyPolicy.heading")}
        </h1>

        <section className="mb-8 space-y-6 text-[#46331d]">
          <h2 className="text-2xl font-semibold">
            {t("privacyPolicy.dataController.title")}
          </h2>
          <p>{t("privacyPolicy.dataController.description")}</p>
          {renderList(
            t("privacyPolicy.dataController.details", { returnObjects: true })
          )}
        </section>

        <section className="mb-8 space-y-6 text-[#46331d]">
          <h2 className="text-2xl font-semibold">
            {t("privacyPolicy.collectedData.title")}
          </h2>
          <p>{t("privacyPolicy.collectedData.description")}</p>
          {renderList(
            t("privacyPolicy.collectedData.items", { returnObjects: true })
          )}
        </section>

        <section className="mb-8 space-y-6 text-[#46331d]">
          <h2 className="text-2xl font-semibold">
            {t("privacyPolicy.processingPurpose.title")}
          </h2>
          {renderList(
            t("privacyPolicy.processingPurpose.items", { returnObjects: true })
          )}
        </section>

        <section className="mb-8 space-y-6 text-[#46331d]">
          <h2 className="text-2xl font-semibold">
            {t("privacyPolicy.legalBasis.title")}
          </h2>
          {renderList(
            t("privacyPolicy.legalBasis.items", { returnObjects: true })
          )}
        </section>

        <section className="mb-8 space-y-6 text-[#46331d]">
          <h2 className="text-2xl font-semibold">
            {t("privacyPolicy.dataRetention.title")}
          </h2>
          {renderList(
            t("privacyPolicy.dataRetention.items", { returnObjects: true })
          )}
        </section>

        <section className="mb-8 space-y-6 text-[#46331d]">
          <h2 className="text-2xl font-semibold">
            {t("privacyPolicy.thirdParty.title")}
          </h2>
          <p>{t("privacyPolicy.thirdParty.description")}</p>
          {renderList(
            t("privacyPolicy.thirdParty.items", { returnObjects: true })
          )}
          <p>{t("privacyPolicy.thirdParty.note")}</p>
        </section>

        <section className="mb-8 space-y-6 text-[#46331d]">
          <h2 className="text-2xl font-semibold">
            {t("privacyPolicy.rights.title")}
          </h2>
          <p>{t("privacyPolicy.rights.description")}</p>
          {renderList(t("privacyPolicy.rights.items", { returnObjects: true }))}
          <p>{t("privacyPolicy.rights.note")}</p>
        </section>

        <section className="mb-8 space-y-6 text-[#46331d]">
          <h2 className="text-2xl font-semibold">
            {t("privacyPolicy.security.title")}
          </h2>
          <p>{t("privacyPolicy.security.description")}</p>
        </section>

        <section className="mb-8 space-y-6 text-[#46331d]">
          <h2 className="text-2xl font-semibold">
            {t("privacyPolicy.policyUpdates.title")}
          </h2>
          <p>{t("privacyPolicy.policyUpdates.description")}</p>
        </section>

        <section className="mb-8 space-y-6 text-[#46331d]">
          <h2 className="text-2xl font-semibold">
            {t("privacyPolicy.contacts.title")}
          </h2>
          <p>{t("privacyPolicy.contacts.description")}</p>
          {renderList(
            t("privacyPolicy.contacts.items", { returnObjects: true })
          )}
        </section>
      </main>

      <p className="mb-6 text-[#46331d] text-center">
        {t("privacyPolicy.lastUpdate")}
      </p>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
