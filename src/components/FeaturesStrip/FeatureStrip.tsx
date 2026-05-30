const FEATURES = [
  { key: "2", label: "Ospiti", desc: "Per coppie o piccoli viaggi" },
  { key: "53m²", label: "Spazio", desc: "Soggiorno, camera, terrazza" },
  { key: "24/7", label: "Check-in", desc: "Accesso autonomo" },
  { key: "★ 4.9", label: "Recensioni", desc: "Da 120+ ospiti" },
];

const FeaturesStrip = () => {
    return (
           <section className="border-t border-[#e8e3d8] bg-[#f7f4ee]/60">
        <div className="mx-auto grid max-w-5xl gap-10 px-6 py-20 md:grid-cols-4">
          {FEATURES.map(({ key, label, desc }) => (
            <div key={key}>
              <p className="text-3xl text-[#4a6741]" style={{ fontFamily: "Outfit, sans-serif" }}>{key}</p>
              <p className="mt-2 text-sm font-medium text-[#2e3d2f]">{label}</p>
              <p className="text-sm text-[#5a6b5b]">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    )
}

export default FeaturesStrip
