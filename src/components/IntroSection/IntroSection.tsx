import { useTranslations } from "next-intl";

const IntroSection = () => {
  const t = useTranslations("features");

  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <div className="grid gap-12 md:grid-cols-2 md:gap-20">
        <h2
          className="text-3xl text-[#2e3d2f] md:text-5xl"
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          {t("title")}
        </h2>
        <div className="space-y-4 text-[#5a6b5b]">
          {(t.raw("items") as { title: string; description: string }[]).map(
            (item, i) => (
              <p key={i}>
                <strong className="text-[#2e3d2f]">{item.title}.</strong>{" "}
                {item.description}
              </p>
            )
          )}
        </div>
      </div>
    </section>
  );
}

export default IntroSection