import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function ServicesCta() {
  const t = useTranslations("servicesPage");

  return (
    <section className="mx-auto max-w-4xl px-6 py-24 text-center">
      <h2
        className="text-4xl text-[#2e3d2f] md:text-5xl"
        style={{ fontFamily: "Outfit, sans-serif" }}
      >
        {t("ctaTitle")}
      </h2>
      <p className="mx-auto mt-4 max-w-lg text-[#5a6b5b]">
        {t("ctaText")}
      </p>
      <Link
        href="/calendar"
        className="mt-8 inline-block rounded-full bg-[#4a6741] px-8 py-3 text-sm font-medium text-[#f7f4ee] transition-transform hover:scale-[1.03]"
      >
        {t("ctaButton")}
      </Link>
    </section>
  );
}