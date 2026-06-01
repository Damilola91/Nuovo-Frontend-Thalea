import { useTranslations } from "next-intl";

export function NearbyHeader() {
  const t = useTranslations("nearby");

  return (
    <section className="mx-auto max-w-5xl px-6 pb-12 pt-20">
      <span className="text-xs uppercase tracking-[0.3em] text-[#5a6b5b]">
        {t("label")}
      </span>
      <h1
        className="mt-4 text-5xl text-[#2e3d2f] md:text-6xl animate-fade-up"
        style={{ fontFamily: "Outfit, sans-serif" }}
      >
        {t("title")}
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-[#5a6b5b]">
        {t("subtitle")}
      </p>
    </section>
  );
}