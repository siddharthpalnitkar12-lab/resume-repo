import { useState } from "react";
import { Copy, Check, Mail } from "lucide-react";
import { resume as r } from "@/data/resume";

const chip = "inline-flex items-center gap-1.5 text-xs border border-[#111113]/30 rounded-full px-3 py-1.5 hover:border-[#B83A24] hover:text-[#B83A24] transition-colors";

const mailHref = (text) => {
  const subject = `Candidate: ${r.name} — Finance & Marketing`;
  const body = `${text}\n\nContact ${r.name}:\nEmail: ${r.email}\nLinkedIn: ${r.linkedin}\nResume: ${window.location.origin}`;
  return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

export const CopyPitch = ({ text }) => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(text); } catch (e) { return; }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      <button onClick={copy} data-testid="chat-copy-pitch-button" className={chip}>
        {copied ? <Check size={13} /> : <Copy size={13} />}
        {copied ? "Copied" : "Copy pitch"}
      </button>
      <a href={mailHref(text)} data-testid="chat-email-pitch-link" className={chip}>
        <Mail size={13} /> Email this pitch
      </a>
    </div>
  );
};
