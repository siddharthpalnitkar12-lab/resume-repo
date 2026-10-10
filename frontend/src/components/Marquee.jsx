const words = ["Finance", "Marketing", "Taxation", "Accounting", "Market Research", "Strategic Planning", "Problem Solving", "Legal Processes"];

export const Marquee = () => (
  <div className="overflow-hidden border-b rule py-8 md:py-10" aria-hidden="true" data-testid="editorial-marquee">
    <div className="marquee-track flex whitespace-nowrap">
      {[...words, ...words].map((w, i) => (
        <span key={i} className="f-serif italic text-4xl md:text-6xl px-6 md:px-10 flex items-center gap-12 md:gap-20 text-[#111113]/80">
          {w}<span className="w-2 h-2 rounded-full bg-accent inline-block" />
        </span>
      ))}
    </div>
  </div>
);
