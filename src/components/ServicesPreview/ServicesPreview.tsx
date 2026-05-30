import { useTranslations } from "next-intl"

const ServicesPreview = () => {
    const t = useTranslations()

    return (
          <section className="mx-auto max-w-5xl px-6 py-24">
                <span className="text-xs uppercase tracking-[0.3em] text-[#5a6b5b]">
                  {t("services.title")}
                </span>
                <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                  {(t.raw("services.items") as string[]).map((item, i) => (
                    <div key={i} className="rounded-xl border border-[#e8e3d8] bg-[#f7f4ee] px-5 py-4 text-sm text-[#2e3d2f]">
                      {item}
                    </div>
                  ))}
                </div>
              </section>
    )
}

export default ServicesPreview