"use client"

import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";

const WhereMap = dynamic(
  () => import("./WhereMap").then((m) => ({ default: m.WhereMap })),
  { ssr: false },
);

export function WhereMapSection() {
  const t = useTranslations("where");

  return (
    <section className="mx-auto max-w-5xl px-6 pb-16">
      <h2
        className="mb-8 text-3xl text-[#2e3d2f]"
        style={{ fontFamily: "Outfit, sans-serif" }}
      >
        {t("map.title")}
      </h2>
      <WhereMap />
    </section>
  );
}