import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const ROOM_IMAGES = [
  {
    src: "https://res.cloudinary.com/dbxysr1a6/image/upload/f_auto,q_auto/v1754746486/THALEA-PALERMO-APARTMENT/IMG_6923.heic",
    alt: "Camera da letto",
  },
  {
    src: "https://res.cloudinary.com/dbxysr1a6/image/upload/f_auto,q_auto/v1754744874/THALEA-PALERMO-APARTMENT/IMG_7135.heic",
    alt: "Cucina",
  },
  {
    src: "https://res.cloudinary.com/dbxysr1a6/image/upload/f_auto,q_auto/v1754742986/THALEA-PALERMO-APARTMENT/IMG_6907.heic",
    alt: "Terrazza",
  },
];

const GalleryPreview = () => {
  const t = useTranslations("gallery");

  return (
    <section className="mx-auto max-w-6xl px-6 pb-24">
      <div className="grid gap-4 md:grid-cols-3">
        {ROOM_IMAGES.map((img, i) => (
          <div
            key={i}
            className="group overflow-hidden rounded-xl bg-[#eee9de]"
            style={{ aspectRatio: "4 / 5" }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={800}
              height={1000}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        ))}
      </div>
      <div className="mt-6 text-center">
        <Link
          href="/gallery"
          className="text-sm text-[#5a6b5b] underline underline-offset-4 hover:text-[#2e3d2f] transition-colors"
        >
          {t("heading")} →
        </Link>
      </div>
    </section>
  );
}

export default GalleryPreview