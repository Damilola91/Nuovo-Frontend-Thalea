import { useTranslations } from "next-intl";
import Image from "next/image";

const TRANSPORT_SECTIONS = [
  {
    key: "auto",
    image: "https://res.cloudinary.com/dbxysr1a6/image/upload/v1754760289/THALEA-PALERMO-APARTMENT/pexels-yunustug-33319375.jpg",
    reverse: false,
  },
  {
    key: "treno",
    image: "https://res.cloudinary.com/dbxysr1a6/image/upload/v1754760444/THALEA-PALERMO-APARTMENT/pexels-brendanruehli-33354891.jpg",
    reverse: true,
  },
  {
    key: "bus",
    image: "https://res.cloudinary.com/dbxysr1a6/image/upload/v1754760834/THALEA-PALERMO-APARTMENT/pexels-hikaique-68427.jpg",
    reverse: false,
  },
] as const;

export function WhereTransport() {
  const t = useTranslations("where");

  return (
    <>
      {TRANSPORT_SECTIONS.map(({ key, image, reverse }) => (
        <section key={key} className="py-16">
          <div
            className={`mx-auto grid max-w-5xl items-center gap-12 px-6 md:grid-cols-2 ${
              reverse ? "md:[&>*:first-child]:order-2" : ""
            }`}
          >
            <div
              className="overflow-hidden rounded-xl bg-[#eee9de]"
              style={{ aspectRatio: "4 / 3" }}
            >
              <Image
                src={image}
                alt={t(`${key}.title`)}
                width={800}
                height={600}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h2
                className="text-3xl text-[#2e3d2f] md:text-4xl"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                {t(`${key}.title`)}
              </h2>
              <ul className="mt-4 space-y-2">
                {(t.raw(`${key}.items`) as string[]).map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#5a6b5b]">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#4a6741]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}