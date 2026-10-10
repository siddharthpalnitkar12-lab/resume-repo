import { Logo } from "@/components/Logo";
import { scrollToId } from "@/lib/lenis";

const links = [["about", "About"], ["academics", "Academics"], ["profile", "Skills"], ["contact", "Contact"]];

export const Header = () => (
  <header data-testid="nav-header" className="sticky top-0 z-40 backdrop-blur-md bg-[#FBF9F5]/80 border-b rule">
    <div className="wrap flex items-center justify-between h-16">
      <a href="#top" onClick={(e) => scrollToId(e, "top")} className="flex items-center gap-3" data-testid="nav-logo">
        <Logo size={34} />
        <span className="hidden sm:inline meta !text-[#111113]">Siddharth Palnitkar</span>
      </a>
      <nav aria-label="Primary" className="flex items-center gap-4 md:gap-8">
        {links.map(([id, label]) => (
          <a key={id} href={`#${id}`} onClick={(e) => scrollToId(e, id)} data-testid={`nav-link-${id}`}
            className={`${id === "contact" ? "" : "hidden md:inline"} text-sm link-u`}>
            {label}
          </a>
        ))}
        <a href="/llms.txt" target="_blank" rel="noreferrer" data-testid="nav-llms-link"
          className="f-mono text-xs border border-[#111113] px-3 py-1.5 rounded-full hover:bg-[#111113] hover:text-[#FBF9F5] transition-colors">
          llms.txt
        </a>
      </nav>
    </div>
  </header>
);
