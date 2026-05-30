import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const HERO_IMAGE =
  "https://res.cloudinary.com/dbxysr1a6/image/upload/v1779876843/SICILIAN-TASTE-SERVER-UPLOADS/A1404B4E-05E9-4B0B-91D6-8E69A0BF5BB9.png";

const HeroSection = () => {
  const t = useTranslations("hero");
  const tNav = useTranslations("navbar");

  return (
    <section className="relative overflow-hidden">
      {/* Immagine */}
      <div className="absolute inset-0">
        <Image
          src={HERO_IMAGE}
          alt="Thălēa Apartment Palermo"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-[#f7f4ee]" />
      </div>

      {/* Contenuto */}
      <div className="relative mx-auto flex min-h-[88vh] max-w-5xl flex-col items-start justify-end px-6 pb-20 pt-32">
        <span className="mb-4 text-xs uppercase tracking-[0.3em] text-white/80 animate-fade-in">
          {t("subtitle")} · Italia
        </span>
        <h1
          className="max-w-3xl text-5xl leading-[1.05] text-white md:text-7xl animate-fade-up"
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          {t("title")}
        </h1>
        <p className="mt-6 max-w-xl text-base text-white/80 md:text-lg animate-fade-up">
          {t("description")}
        </p>
        <div className="mt-8 flex flex-wrap gap-3 animate-fade-up">
          <Link
            href="/calendar"
            className="rounded-full bg-[#4a6741] px-6 py-3 text-sm font-medium text-[#f7f4ee] transition-transform hover:scale-[1.03]"
          >
            {t("cta")}
          </Link>
          <Link
            href="/gallery"
            className="rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            {tNav("apartment")}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HeroSection