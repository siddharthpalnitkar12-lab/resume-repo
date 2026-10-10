// Same-origin /api/chat: FastAPI in Emergent preview, Vercel function in production.
const BLOCK_KEY = "ai-chat-blocked-until";

const blockedMinutes = () => {
  const until = Number(localStorage.getItem(BLOCK_KEY)) || 0;
  return until > Date.now() ? Math.ceil((until - Date.now()) / 60000) : 0;
};

export async function streamChat(message, history, onPartial) {
  const blocked = blockedMinutes();
  if (blocked) return { text: "", retryMin: blocked };
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, history: history.slice(-6) }),
    });
    if (res.status === 429) {
      const data = await res.json().catch(() => ({}));
      const mins = Number(data?.retry_after_minutes) || 60;
      localStorage.setItem(BLOCK_KEY, String(Date.now() + mins * 60000));
      return { text: "", retryMin: mins };
    }
    if (!res.ok || !res.body) return { text: "" };
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let text = "";
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      text += decoder.decode(value, { stream: true });
      if (text.trim()) onPartial(text);
    }
    return { text: text.trim() };
  } catch (e) {
    return { text: "" };
  }
}
