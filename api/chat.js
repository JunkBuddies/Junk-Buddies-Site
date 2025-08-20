// /api/chat.js — Chat endpoint (SmartSelector via env var) • v2
export default async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  // Diagnostics (helps us confirm which build is running)
  res.setHeader("X-Chat-Version", "v2");
  res.setHeader("Cache-Control", "no-store");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { messages = [], sessionId } = req.body || {};
    const last = messages[messages.length - 1]?.content?.trim() || "";

    const ssUrl = process.env.SMARTSELECTOR_URL || "";
    res.setHeader("X-SS-Url", ssUrl ? "set" : "missing");

    // Graceful fallback if env var missing
    if (!ssUrl) {
      return res.status(200).json({
        reply:
          "My item detection service isn’t configured yet. Tell me your items + ZIP (e.g., “2 sofas + treadmill, 77002”) and I’ll guide you.",
        parsed: { items: [], estCuft: 0, estPrice: 0 },
        sessionId
      });
    }

    // Call SmartSelector
    const ssResp = await fetch(ssUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input: last })
    });

    const raw = await ssResp.text(); // capture raw for debugging
    if (!ssResp.ok) {
      throw new Error(`SmartSelector ${ssResp.status}: ${raw || "(no body)"}`);
    }

    // Expect { items: [...] }
    let data;
    try {
      data = raw ? JSON.parse(raw) : {};
    } catch (e) {
      throw new Error(`SmartSelector returned non-JSON: ${raw?.slice(0, 200)}`);
    }

    const items = Array.isArray(data.items) ? data.items : [];
    const estCuft = items.reduce((sum, it) => sum + (it.cuft || 10) * (it.qty || 1), 0);
    const estPrice = Math.round((estCuft * 2.22 + Number.EPSILON) * 100) / 100;

    const list = items.length
      ? items.map(it => `${it.qty || 1}× ${it.name || it.id}`).join(", ")
      : "";

    const reply = items.length
      ? `✅ Parsed: ${list}\nEstimated: ~$${estPrice}. Add/remove anything or pick a time?`
      : `🤔 I didn’t detect specific items. Tell me items + ZIP (e.g., “2 sofas + treadmill, 77002”).`;

    return res.status(200).json({
      reply,
      parsed: { items, estCuft, estPrice },
      sessionId
    });
  } catch (e) {
    console.error("Chat API error:", e);
    return res.status(500).json({ error: "chat_error", detail: String(e?.message || e) });
  }
}
