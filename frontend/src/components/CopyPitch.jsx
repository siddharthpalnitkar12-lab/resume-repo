import { useState } from "react";
import { Copy, Check, Mail, Target } from "lucide-react";
import { resume as r } from "@/data/resume";

const chip = "inline-flex items-center gap-1.5 text-xs border border-[#111113]/30 rounded-full px-3 py-1.5 hover:border-[#B83A24] hover:text-[#B83A24] transition-colors";

const mailHref = (text, role) => {
  const subject = `Candidate: ${r.name} — ${role || "Finance & Marketing"}`;
  const body = `${text}\n\nContact ${r.name}:\nEmail: ${r.email}\nLinkedIn: ${r.linkedin}\nResume: ${window.location.origin}`;
  return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

const RoleForm = ({ onTailor, id }) => {
  const [role, setRole] = useState("");
  const submit = (e) => {
    e.preventDefault();
    if (role.trim()) onTailor(role.trim());
  };
  return (
    <form onSubmit={submit} className="mt-2 flex items-center gap-2 border-t border-[#111113]/15 pt-2">
      <Target size={13} className="shrink-0 text-[#B83A24]" />
      <input value={role} onChange={(e) => setRole(e.target.value)} maxLength={80} placeholder="Tailor to a role, e.g. Financial Analyst Intern"
        data-testid={`chat-role-input-${id}`} className="flex-1 min-w-0 bg-transparent outline-none text-xs py-1" />
      <button type="submit" data-testid={`chat-role-submit-${id}`} className={chip}>Tailor</button>
    </form>
  );
};

export const CopyPitch = ({ text, role, id, onTailor }) => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(text); } catch (e) { return; }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <div className="mt-3">
      <div className="flex flex-wrap gap-2">
        <button onClick={copy} data-testid={`chat-copy-pitch-button-${id}`} className={chip}>
          {copied ? <Check size={13} /> : <Copy size={13} />}
          {copied ? "Copied" : "Copy pitch"}
        </button>
        <a href={mailHref(text, role)} data-testid={`chat-email-pitch-link-${id}`} className={chip}>
          <Mail size={13} /> Email this pitch
        </a>
      </div>
      <RoleForm onTailor={onTailor} id={id} />
    </div>
  );
};
