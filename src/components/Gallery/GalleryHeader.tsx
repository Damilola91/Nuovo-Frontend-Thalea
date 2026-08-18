import { useTranslations } from "next-intl";

const GalleryHeader = () => {
  const t = useTranslations("gallery");

  return (
    <section className="mx-auto w-full max-w-5xl overflow-hidden px-4 pb-10 pt-14 sm:px-6 sm:pb-12 sm:pt-20">
      {/* Label — tracking ridotto su mobile per evitare overflow */}
      <span className="block text-[10px] uppercase tracking-[0.2em] text-[#5a6b5b] sm:text-xs sm:tracking-[0.3em]">
        {t("label")}
      </span>

      {/* Titolo — scala progressiva, wrapping permesso, no overflow */}
      <h1
        className="animate-fade-up mt-3 text-3xl leading-tight text-[#2e3d2f] [overflow-wrap:anywhere] sm:mt-4 sm:text-4xl md:text-5xl lg:text-6xl"
        style={{ fontFamily: "Outfit, sans-serif" }}
      >
        {t("heading")}
      </h1>

      <p className="mt-4 max-w-2xl text-base text-[#5a6b5b] sm:mt-6 sm:text-lg">
        {t("subheading")}
      </p>
    </section>
  );
};

export default GalleryHeader;