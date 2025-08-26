"use client";

import { useTranslation } from "react-i18next";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const TermsConditions = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="container mx-auto mt-20 flex-grow px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-12 text-[#46331d] text-center drop-shadow-lg">
          {t("terms.heading")}
        </h1>

        <section className="mb-8 space-y-6 text-[#46331d]">
          <h2 className="text-2xl font-semibold">{t("terms.object.title")}</h2>
          <p>{t("terms.object.description")}</p>
        </section>

        <section className="mb-8 space-y-6 text-[#46331d]">
          <h2 className="text-2xl font-semibold">{t("terms.booking.title")}</h2>
          <ul className="list-disc list-inside">
            {t("terms.booking.items", { returnObjects: true }).map(
              (item, idx) => (
                <li key={idx}>{item}</li>
              )
            )}
          </ul>
        </section>

        <section className="mb-8 space-y-6 text-[#46331d]">
          <h2 className="text-2xl font-semibold">{t("terms.payment.title")}</h2>
          <p>{t("terms.payment.description1")}</p>
          <p>{t("terms.payment.description2")}</p>
        </section>

        <section className="mb-8 space-y-6 text-[#46331d]">
          <h2 className="text-2xl font-semibold">
            {t("terms.cancellation.title")}
          </h2>
          <p>{t("terms.cancellation.description")}</p>
        </section>

        <section className="mb-8 space-y-6 text-[#46331d]">
          <h2 className="text-2xl font-semibold">{t("terms.checkin.title")}</h2>
          <ul className="list-disc list-inside">
            {t("terms.checkin.items", { returnObjects: true }).map(
              (item, idx) => (
                <li key={idx}>{item}</li>
              )
            )}
          </ul>
        </section>

        <section className="mb-8 space-y-6 text-[#46331d]">
          <h2 className="text-2xl font-semibold">{t("terms.guest.title")}</h2>
          <ul className="list-disc list-inside">
            {t("terms.guest.items", { returnObjects: true }).map(
              (item, idx) => (
                <li key={idx}>{item}</li>
              )
            )}
          </ul>
        </section>

        <section className="mb-8 space-y-6 text-[#46331d]">
          <h2 className="text-2xl font-semibold">
            {t("terms.liability.title")}
          </h2>
          <p>{t("terms.liability.description")}</p>
        </section>

        <section className="mb-8 space-y-6 text-[#46331d]">
          <h2 className="text-2xl font-semibold">
            {t("terms.forceMajeure.title")}
          </h2>
          <p>{t("terms.forceMajeure.description")}</p>
        </section>

        <section className="mb-8 space-y-6 text-[#46331d]">
          <h2 className="text-2xl font-semibold">{t("terms.law.title")}</h2>
          <p>{t("terms.law.description")}</p>
        </section>
      </main>

      <p className="mb-6 text-[#46331d] text-center">{t("terms.lastUpdate")}</p>

      <Footer />
    </div>
  );
};

export default TermsConditions;
