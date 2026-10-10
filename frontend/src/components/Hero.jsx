import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { MessageSquareText, ArrowDownToLine } from "lucide-react";
import { resume as r } from "@/data/resume";

const ease = [0.22, 1, 0.36, 1];

const MaskLine = ({ children, delay, className = "" }) => (
  <span className="block overflow-hidden pb-[0.08em]">
    <motion.span className={`block ${className}`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ duration: 1.1, delay, ease }}>
      {children}
    </motion.span>
  </span>
);

const TiltFrame = () => {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 120, damping: 18 });
  const { scrollY } = useScroll();
  const imgY = useTransform(scrollY, [0, 800], [0, 90]);
  const onMove = (e) => {
    const b = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - b.left) / b.width - 0.5);
    my.set((e.clientY - b.top) / b.height - 0.5);
  };
  return (
    <div style={{ perspective: 1000 }} onMouseMove={onMove} onMouseLeave={() => { mx.set(0); my.set(0); }}>
      <motion.figure style={{ rotateX: rx, rotateY: ry }} initial={{ clipPath: "inset(100% 0 0 0)" }}
        animate={{ clipPath: "inset(0% 0 0 0)" }} transition={{ duration: 1.4, delay: 0.5, ease }}
        className="relative aspect-[4/5] overflow-hidden bg-card" data-testid="hero-image-frame">
        <motion.img style={{ y: imgY, scale: 1.2 }} src="/paper.jpg" alt="Financial newspaper with market charts"
          className="absolute inset-0 w-full h-full object-cover grayscale contrast-125" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,transparent_30%,rgba(17,17,19,0.55))]" />
        <figcaption className="absolute bottom-4 left-4 right-4 flex justify-between f-mono text-[12px] text-[#FBF9F5] tracking-widest uppercase">
          <span>Finance</span><span>×</span><span>Marketing</span>
        </figcaption>
      </motion.figure>
    </div>
  );
};

export const Hero = () => (
  <section id="top" data-testid="hero-section" className="wrap pt-14 md:pt-24 pb-20 md:pb-28">
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
      className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-10 md:mb-14">
      <span className="meta flex items-center gap-2" data-testid="hero-status">
        <span className="w-2 h-2 rounded-full bg-accent animate-pulse" /> Seeking internship — Finance & Marketing
      </span>
      <span className="meta">IMDR · Pune</span>
    </motion.div>
    <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-end">
      <div className="lg:col-span-8">
        <h1 data-testid="hero-name-title" className="f-serif tracking-tight leading-[0.92] text-[17vw] sm:text-8xl lg:text-[9.5rem]">
          <MaskLine delay={0.1}>{r.first}</MaskLine>
          <MaskLine delay={0.25} className="italic pl-[8vw] lg:pl-24">{r.last}<span className="accent">.</span></MaskLine>
        </h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.8, ease }}
          className="mt-10 max-w-xl text-base md:text-lg ink-2 leading-relaxed">
          {r.about}
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 1, ease }}
          className="mt-10 flex flex-wrap gap-3">
          <button data-testid="hero-ask-button" onClick={() => window.dispatchEvent(new Event("open-chat"))}
            className="group inline-flex items-center gap-2 bg-ink text-[#FBF9F5] rounded-full px-6 py-3.5 text-sm hover:bg-[#B83A24] transition-colors">
            <MessageSquareText size={16} className="transition-transform group-hover:-rotate-12" /> Ask my resume
          </button>
          <a data-testid="download-txt-resume-button" href="/resume.txt" download="Siddharth-Palnitkar-Resume.txt"
            className="inline-flex items-center gap-2 border border-[#111113] rounded-full px-6 py-3.5 text-sm hover:bg-[#111113] hover:text-[#FBF9F5] transition-colors">
            <ArrowDownToLine size={16} /> Plain-text resume
          </a>
        </motion.div>
      </div>
      <div className="lg:col-span-4 max-w-sm w-full justify-self-end"><TiltFrame /></div>
    </div>
  </section>
);
