import { useEffect } from "react";
import Lenis from "lenis";
import "@/App.css";
import { lenisRef } from "@/lib/lenis";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { BotBar } from "@/components/BotBar";
import { Marquee } from "@/components/Marquee";
import { About } from "@/components/About";
import { Academics } from "@/components/Academics";
import { Profile } from "@/components/Profile";
import { Contact } from "@/components/Contact";
import { ChatWidget } from "@/components/ChatWidget";

function App() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
    lenisRef.current = lenis;
    let id;
    const raf = (t) => { lenis.raf(t); id = requestAnimationFrame(raf); };
    id = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(id); lenis.destroy(); lenisRef.current = null; };
  }, []);

  return (
    <div className="grain min-h-screen">
      <Header />
      <main>
        <Hero />
        <BotBar />
        <Marquee />
        <About />
        <Academics />
        <Profile />
        <Contact />
      </main>
      <ChatWidget />
    </div>
  );
}

export default App;
