import { Bot, ArrowUpRight } from "lucide-react";

const files = [
  ["/llms.txt", "llms.txt", "Markdown brief for LLMs", "view-llms-txt-button"],
  ["/resume.json", "resume.json", "JSON Resume schema", "view-resume-json-button"],
  ["/resume.txt", "resume.txt", "Plain text for ATS", "view-resume-txt-button"],
];

export const BotBar = () => (
  <aside aria-label="Machine-readable resume" className="bg-ink text-[#FBF9F5]" data-testid="bot-bar">
    <div className="wrap py-6 grid md:grid-cols-12 gap-4 md:items-center">
      <p className="md:col-span-4 flex items-center gap-3 f-mono text-xs tracking-[0.18em] uppercase text-[#D6D2CA]">
        <Bot size={18} className="text-[#E54D32]" /> Built to be read by AI
      </p>
      <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#2A2E37]">
        {files.map(([href, name, desc, tid]) => (
          <a key={href} href={href} target="_blank" rel="noreferrer" data-testid={tid}
            className="group bg-[#111113] px-4 py-3 flex items-center justify-between hover:bg-[#1E2127] transition-colors">
            <span>
              <span className="block f-mono text-sm">{name}</span>
              <span className="block text-xs text-[#A0A5B1]">{desc}</span>
            </span>
            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        ))}
      </div>
    </div>
  </aside>
);
