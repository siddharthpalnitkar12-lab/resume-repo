import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquareText, X, ArrowUp } from "lucide-react";
import { answer, suggestions } from "@/lib/chatEngine";

const hello = { from: "bot", text: "Hi! I'm Siddharth's resume assistant. Ask me about his education, skills, goals or how to reach him." };

export const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([hello]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    const o = () => setOpen(true);
    window.addEventListener("open-chat", o);
    return () => window.removeEventListener("open-chat", o);
  }, []);

  useEffect(() => { endRef.current?.scrollIntoView({ block: "end" }); }, [msgs, typing]);

  const ask = (q) => {
    const text = q.trim();
    if (!text || typing) return;
    setMsgs((m) => [...m, { from: "user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => { setMsgs((m) => [...m, { from: "bot", text: answer(text) }]); setTyping(false); }, 650);
  };

  return (
    <>
      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setOpen((v) => !v)}
        data-testid="ask-resume-chat-toggle" aria-label="Ask my resume"
        className="fixed bottom-5 right-5 z-50 bg-accent text-[#FBF9F5] rounded-full h-14 pl-5 pr-6 flex items-center gap-2 shadow-[0_10px_30px_rgba(184,58,36,0.35)]">
        {open ? <X size={18} /> : <MessageSquareText size={18} />}
        <span className="text-sm">{open ? "Close" : "Ask my resume"}</span>
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div data-testid="ask-resume-chat-panel" data-lenis-prevent
            initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed z-50 bottom-24 right-3 left-3 sm:left-auto sm:right-5 sm:w-[400px] h-[min(560px,70vh)] bg-[#FBF9F5] border border-[#111113] flex flex-col shadow-[12px_12px_0_#111113]">
            <div className="px-5 py-4 border-b border-[#111113] flex items-center justify-between">
              <div>
                <p className="f-serif text-xl">Ask my resume</p>
                <p className="meta !text-[11px]">Answers from resume data · no AI key</p>
              </div>
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3" data-testid="chat-messages">
              {msgs.map((m, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className={`max-w-[85%] text-sm leading-relaxed px-4 py-3 ${m.from === "user" ? "ml-auto bg-ink text-[#FBF9F5]" : "bg-[#EFEAE0]"}`}
                  data-testid={`chat-message-${m.from}`}>
                  {m.text}
                </motion.div>
              ))}
              {typing && <div className="dot-blink bg-[#EFEAE0] w-16 px-4 py-3 flex gap-1" data-testid="chat-typing"><span>●</span><span>●</span><span>●</span></div>}
              <div ref={endRef} />
            </div>
            <div className="px-4 pb-2 flex gap-2 overflow-x-auto">
              {suggestions.map((s, i) => (
                <button key={s} onClick={() => ask(s)} data-testid={`chat-suggested-question-item-${i}`}
                  className="shrink-0 text-xs border border-[#111113]/30 rounded-full px-3 py-1.5 hover:border-[#B83A24] hover:text-[#B83A24] transition-colors">
                  {s}
                </button>
              ))}
            </div>
            <form onSubmit={(e) => { e.preventDefault(); ask(input); }} className="p-3 border-t border-[#111113] flex gap-2">
              <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about skills, education…"
                data-testid="ask-resume-chat-input" className="flex-1 bg-transparent outline-none text-sm px-2" />
              <button type="submit" data-testid="ask-resume-chat-submit" aria-label="Send"
                className="w-10 h-10 rounded-full bg-ink text-[#FBF9F5] grid place-items-center hover:bg-[#B83A24] transition-colors">
                <ArrowUp size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
