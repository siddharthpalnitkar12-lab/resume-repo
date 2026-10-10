// Same-origin /api/chat: FastAPI in Emergent preview, Vercel function in production.
export async function streamChat(message, history, onPartial) {
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, history: history.slice(-6) }),
    });
    if (!res.ok || !res.body) return "";
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let text = "";
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      text += decoder.decode(value, { stream: true });
      if (text.trim()) onPartial(text);
    }
    return text.trim();
  } catch (e) {
    return "";
  }
}
