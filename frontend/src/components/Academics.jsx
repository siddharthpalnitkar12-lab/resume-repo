import { Reveal, SectionHead } from "@/components/Reveal";
import { resume as r } from "@/data/resume";

export const Academics = () => (
  <section id="academics" className="wrap py-24 md:py-36" data-testid="academics-section">
    <SectionHead num="02" label="Academics" title="Twelve years of learning, one direction." />
    <ol className="border-t border-[#111113]">
      {r.academics.map((a, i) => (
        <li key={a.course}>
          <Reveal delay={i * 0.06}>
            <article data-testid={`academic-item-${a.course.toLowerCase()}`}
              className="group grid grid-cols-12 gap-3 py-7 md:py-9 border-b rule items-baseline hover:bg-card transition-colors md:px-4">
              <span className="col-span-3 md:col-span-2 f-mono text-sm accent">{a.year}</span>
              <h3 className="col-span-9 md:col-span-3 f-serif text-2xl md:text-4xl transition-transform duration-500 group-hover:translate-x-2">{a.course}</h3>
              <p className="col-span-9 col-start-4 md:col-start-auto md:col-span-5 ink-2 text-sm md:text-base">{a.institute}</p>
              <p className="col-span-9 col-start-4 md:col-start-auto md:col-span-2 md:text-right f-mono text-sm">{a.score}</p>
            </article>
          </Reveal>
        </li>
      ))}
    </ol>
  </section>
);
