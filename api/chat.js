// /api/chat.js — Chat endpoint (calls SmartSelector via env var)

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { messages = [], sessionId } = req.body || {};
    const last = messages[messages.length - 1]?.content?.trim() || "";

    if (!process.env.SMARTSELECTOR_URL) {
      throw new Error("SMARTSELECTOR_URL is not defined in environment variables");
    }

    // Call SmartSelector with last user message
    const ssResp = await fetch(process.env.SMARTSELECTOR_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input: last })
    });

    if (!ssResp.ok) {
      const text = await ssResp.text();
      throw new Error(`SmartSelector error: ${ssResp.status} ${text}`);
    }

    const data = await ssResp.json(); // should return { items: [...] }

    // Very rough estimate for now (real pricing logic will replace this)
    const items = Array.isArray(data.items) ? data.items : [];
    const estCuft = items.reduce((sum, it) => sum + (it.cuft || 10) * (it.qty || 1), 0);
    const estPrice = Math.round((estCuft * 2.22 + Number.EPSILON) * 100) / 100;

    const list = items.length
      ? items.map(it => `${it.qty || 1}× ${it.name || it.id}`).join(", ")
      : "no items detected";

    const reply = items.length
      ? `I found: ${list}.\nEstimated price: ~$${estPrice}. Want to add/remove anything or pick a time?`
      : `Tell me the items and ZIP (e.g., “2 sofas + treadmill, 77002”) and I’ll estimate + help you schedule.`;

    return res.status(200).json({
      reply,
      parsed: { items, estCuft, estPrice },
      sessionId
    });
  } catch (e) {
    console.error("Chat API error:", e);
    return res.status(500).json({ error: "chat_error", detail: String(e.message) });
  }
}
