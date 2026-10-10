import { useState } from "react";
import { ArrowUpRight, Copy, Check } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Logo } from "@/components/Logo";
import { resume as r } from "@/data/resume";

export const Contact = () => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(r.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };
  return (
    <section id="contact" className="bg-ink text-[#FBF9F5]" data-testid="contact-section">
      <div className="wrap pt-24 md:pt-36 pb-10">
        <Reveal><p className="meta !text-[#D6D2CA] mb-8"><span className="text-[#E54D32]">04</span> — Contact</p></Reveal>
        <Reveal delay={0.1}>
          <h2 className="f-serif text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[0.95]">
            Let's talk <em className="text-[#E54D32]">internships.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.2} className="mt-14 grid md:grid-cols-2 gap-px bg-[#2A2E37]">
          <div className="bg-[#111113] p-6 md:p-8 flex items-center justify-between gap-4">
            <a href={`mailto:${r.email}`} data-testid="contact-email-link" className="link-u text-base md:text-xl break-all">{r.email}</a>
            <button onClick={copy} data-testid="contact-copy-email-button" aria-label="Copy email"
              className="shrink-0 w-10 h-10 rounded-full border border-[#5C5955] grid place-items-center hover:bg-[#FBF9F5] hover:text-[#111113] transition-colors">
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>
          <a href={r.linkedin} target="_blank" rel="noreferrer" data-testid="contact-linkedin-link"
            className="group bg-[#111113] p-6 md:p-8 flex items-center justify-between hover:bg-[#1E2127] transition-colors">
            <span className="text-base md:text-xl">LinkedIn</span>
            <ArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </Reveal>
        <footer className="mt-24 pt-6 border-t border-[#2A2E37] flex flex-wrap gap-4 items-center justify-between text-xs text-[#A0A5B1]">
          <span className="flex items-center gap-3"><span className="bg-[#FBF9F5] p-1"><Logo size={22} /></span> © {new Date().getFullYear()} Siddharth Palnitkar</span>
          <span className="f-mono">Machine-readable: /llms.txt · /resume.json · /resume.txt</span>
        </footer>
      </div>
    </section>
  );
};
