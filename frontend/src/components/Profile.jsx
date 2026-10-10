import { motion } from "framer-motion";
import { Reveal, SectionHead } from "@/components/Reveal";
import { resume as r } from "@/data/resume";

const Tile = ({ title, items, className = "", dark, testid, big }) => (
  <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.3 }} data-testid={testid}
    className={`h-full p-7 md:p-9 flex flex-col justify-between gap-10 ${dark ? "bg-ink text-[#FBF9F5]" : "bg-card"} ${className}`}>
    <p className={`meta ${dark ? "!text-[#D6D2CA]" : ""}`}>{title}</p>
    <ul className={big ? "space-y-1" : "flex flex-wrap gap-2"}>
      {items.map((s) => big ? (
        <li key={s} className="f-serif text-3xl md:text-5xl leading-tight">{s}</li>
      ) : (
        <li key={s} className={`text-sm px-3 py-1.5 rounded-full border ${dark ? "border-[#5C5955]" : "border-[#111113]/30"}`}>{s}</li>
      ))}
    </ul>
  </motion.div>
);

export const Profile = () => (
  <section id="profile" className="wrap py-24 md:py-36" data-testid="profile-section">
    <SectionHead num="03" label="Skills & Profile" title="What he brings to the desk." />
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:auto-rows-[minmax(220px,auto)]">
      <Reveal className="md:col-span-4 md:row-span-2"><Tile big dark title="Core competencies" items={r.competencies} testid="skill-category-competencies" /></Reveal>
      <Reveal className="md:col-span-2" delay={0.1}><Tile title="Technical skills" items={r.technical} testid="skill-category-technical" /></Reveal>
      <Reveal className="md:col-span-2" delay={0.15}><Tile title="Knowledge areas" items={r.knowledge} testid="skill-category-knowledge" /></Reveal>
      <Reveal className="md:col-span-2" delay={0.1}><Tile title="Languages" items={r.languages} testid="skill-category-languages" /></Reveal>
      <Reveal className="md:col-span-4" delay={0.15}><Tile title="Personal interests" items={r.interests} testid="skill-category-interests" className="!bg-[#EFE6D6]" /></Reveal>
    </div>
  </section>
);
