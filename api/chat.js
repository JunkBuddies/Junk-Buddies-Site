// /api/chat.js — Vercel Serverless Function (Node.js)
export default async function handler(req, res) {
  // CORS (dev-friendly; tighten later)
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { messages = [], sessionId } = req.body || {};
    const last = messages[messages.length - 1]?.content?.trim() || "";
    const reply = last
      ? `Got it — "${last}". Tell me what items you need removed or your goal (e.g., "2 sofas + treadmill in 77002"), and I’ll estimate and help you schedule.`
      : `Hey! Tell me what you need removed and your ZIP — I’ll estimate and help you schedule.`;

    return res.status(200).json({ reply, sessionId });
  } catch (e) {
    return res.status(500).json({ error: "chat_error", detail: String(e) });
  }
}
