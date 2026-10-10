// Vercel serverless function: POST /api/chat, streams plain text from OpenAI.
const fs = require("fs");
const path = require("path");

const resume = fs.readFileSync(path.join(process.cwd(), "public", "llms.txt"), "utf8");
const SYSTEM_PROMPT =
  "You are the resume assistant on Siddharth Palnitkar's personal website. Answer visitors' questions about him " +
  "in a friendly, concise way (2-4 sentences), in the third person, using ONLY the resume below. If something is " +
  "not in the resume, say so and suggest emailing him. Never invent facts. Never share a phone number or home address. " +
  "Politely decline unrelated requests.\n\nRESUME:\n" + resume;

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const key = process.env.OPENAI_API_KEY;
  if (!key) return res.status(503).json({ error: "AI chat not configured" });

  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
  const message = String(body.message || "").trim().slice(0, 500);
  if (!message) return res.status(400).json({ error: "Empty message" });
  const history = (Array.isArray(body.history) ? body.history : []).slice(-6).map((t) => ({
    role: t.role === "user" ? "user" : "assistant",
    content: String(t.text || "").slice(0, 1000),
  }));

  const upstream = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-5.6-terra",
      stream: true,
      max_completion_tokens: 600,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...history, { role: "user", content: message }],
    }),
  });
  if (!upstream.ok || !upstream.body) return res.status(502).json({ error: "AI service error" });

  res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-cache" });
  const reader = upstream.body.getReader();
  const decoder = new TextDecoder();
  let buf = "";
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += decoder.decode(value, { stream: true });
    const lines = buf.split("\n");
    buf = lines.pop();
    for (const line of lines) {
      const data = line.replace(/^data: /, "").trim();
      if (!data || data === "[DONE]") continue;
      try {
        const delta = JSON.parse(data).choices?.[0]?.delta?.content;
        if (delta) res.write(delta);
      } catch (e) { /* ignore partial lines */ }
    }
  }
  res.end();
};
