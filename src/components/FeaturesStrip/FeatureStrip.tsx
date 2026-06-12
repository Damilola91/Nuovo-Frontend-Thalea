import { useTranslations } from "next-intl";

const BOOKING_REVIEWS_URL = "https://www.booking.com/hotel/it/thalea-apartment.it.html#tab-reviews";

const FeaturesStrip = () => {
  const t = useTranslations("features");

  const features = [
    {
      key: t("guests.key"),
      label: t("guests.label"),
      desc: t("guests.desc"),
      href: null,
    },
    {
      key: t("space.key"),
      label: t("space.label"),
      desc: t("space.desc"),
      href: null,
    },
    {
      key: t("checkin.key"),
      label: t("checkin.label"),
      desc: t("checkin.desc"),
      href: null,
    },
    {
      key: t("reviews.key"),
      label: t("reviews.label"),
      desc: t("reviews.desc"),
      href: BOOKING_REVIEWS_URL,
    },
  ];

  return (
    <section className="border-t border-[#e8e3d8] bg-[#f7f4ee]/60">
      <div className="mx-auto grid max-w-5xl gap-10 px-6 py-20 md:grid-cols-4">
        {features.map(({ key, label, desc, href }) => (
          <div key={key}>
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <p
                  className="text-3xl text-[#4a6741] underline-offset-4 group-hover:underline"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  {key}
                </p>
                <p className="mt-2 text-sm font-medium text-[#2e3d2f]">{label}</p>
                <p className="text-sm text-[#5a6b5b]">{desc}</p>
              </a>
            ) : (
              <>
                <p
                  className="text-3xl text-[#4a6741]"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  {key}
                </p>
                <p className="mt-2 text-sm font-medium text-[#2e3d2f]">{label}</p>
                <p className="text-sm text-[#5a6b5b]">{desc}</p>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeaturesStrip