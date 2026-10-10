import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal, SectionHead } from "@/components/Reveal";
import { resume as r } from "@/data/resume";

export const About = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  return (
    <section id="about" ref={ref} className="wrap py-24 md:py-36" data-testid="about-section">
      <SectionHead num="01" label="About" title={<>A finance mind with a <em className="accent">marketer's</em> curiosity.</>} />
      <div className="grid md:grid-cols-12 gap-10 md:gap-12">
        <Reveal className="md:col-span-5">
          <div className="relative aspect-[4/3] md:aspect-[3/4] overflow-hidden bg-card [clip-path:polygon(0_0,100%_0,100%_88%,88%_100%,0_100%)]">
            <motion.img style={{ y, scale: 1.25 }} src="/ledger.jpg" alt="Printed financial market data tables"
              className="absolute inset-0 w-full h-full object-cover grayscale" />
          </div>
        </Reveal>
        <div className="md:col-span-7 md:pl-8 flex flex-col justify-between gap-12">
          <Reveal delay={0.1}>
            <p className="meta mb-4">Objective</p>
            <p className="f-serif text-2xl md:text-3xl leading-snug" data-testid="about-objective">{r.objective}</p>
          </Reveal>
          <Reveal delay={0.2} className="grid grid-cols-3 border-t rule pt-6 gap-4">
            {[["PGDM", "Pursuing at IMDR"], ["8.67", "Graduation CGPA"], ["3", "Languages"]].map(([n, l]) => (
              <div key={l}>
                <p className="f-serif text-4xl md:text-5xl">{n}</p>
                <p className="text-xs md:text-sm ink-2 mt-1">{l}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
};
