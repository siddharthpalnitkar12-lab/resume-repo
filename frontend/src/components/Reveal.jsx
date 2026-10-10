import { motion } from "framer-motion";

export const Reveal = ({ children, delay = 0, className = "" }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0.001, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.1 }}
    transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

export const SectionHead = ({ num, label, title }) => (
  <Reveal className="mb-12 md:mb-16 grid md:grid-cols-12 gap-4 border-t rule pt-6">
    <p className="meta md:col-span-3"><span className="accent">{num}</span> — {label}</p>
    <h2 className="f-serif md:col-span-9 text-3xl sm:text-5xl tracking-tight leading-[1.05]">{title}</h2>
  </Reveal>
);
