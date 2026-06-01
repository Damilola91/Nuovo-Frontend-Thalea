interface LegalSectionProps {
  title: string;
  children: React.ReactNode;
}
 
export function LegalSection({ title, children }: LegalSectionProps) {
  return (
    <section className="border-b border-[#e8e3d8] pb-8 last:border-0">
      <h2
        className="mb-4 text-xl text-[#2e3d2f]"
        style={{ fontFamily: "Outfit, sans-serif" }}
      >
        {title}
      </h2>
      <div className="space-y-3 text-sm leading-relaxed text-[#5a6b5b]">
        {children}
      </div>
    </section>
  );
}