import { useState } from "react";
import { Copy, Check } from "lucide-react";

export const CopyPitch = ({ text }) => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(text); } catch (e) { return; }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <button onClick={copy} data-testid="chat-copy-pitch-button"
      className="mt-3 inline-flex items-center gap-1.5 text-xs border border-[#111113]/30 rounded-full px-3 py-1.5 hover:border-[#B83A24] hover:text-[#B83A24] transition-colors">
      {copied ? <Check size={13} /> : <Copy size={13} />}
      {copied ? "Copied" : "Copy pitch"}
    </button>
  );
};
