// api/chat.js — Minimal parser + your pricing (ESM). No AI, no extras.
function norm(s = "") {
  return String(s).toLowerCase();
}

function buildMatchers(items) {
  // For each item, combine name/id/aliases into one alternation regex
  return items.map(it => {
    const labels = [
      ...(Array.isArray(it.aliases) ? it.aliases : []),
      it.name || "",
      it.id || ""
    ]
      .map(s => s && norm(s).trim())
      .filter(Boolean)
      // de-dupe
      .filter((v, i, a) => a.indexOf(v) === i)
      // escape regex
      .map(s => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));

    const pattern = labels.length ? `(?:${labels.join("|")})(?:es|s)?` : null;
    return {
      id: it.id,
      name: it.name || it.id,
      volume: Number(it.volume || it.cuft || 0) || 0,
      price: it.price != null ? Number(it.price) : 0,
      re: pattern ? new RegExp(`(?:^|\\b)(\\d{1,3})?\\s*(${pattern})\\b`, "g") : null
    };
  }).filter(m => m.re);
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Cache-Control", "no-store");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    // 1) imports
    const pricing = await import(new URL("../src/utils/pricing.js", import.meta.url).href);
    const dataMod = await import(new URL("../src/data/itemData.js", import.meta.url).href);
    const ITEMS = Array.isArray(dataMod) ? dataMod : (dataMod.default || dataMod.items || dataMod.ITEMS || dataMod.data || []);
    if (!Array.isArray(ITEMS) || !ITEMS.length) {
      return res.status(500).json({ error: "itemdata_empty", detail: "src/data/itemData.js must export a non-empty array" });
    }

    const { calculatePrice, fullLoadPoints, getLoadLabel } = pricing;

    // 2) read input
    const { messages = [] } = req.body || {};
    const text = norm(messages[messages.length - 1]?.content || "");

    // 3) parse text -> quantities per item (very simple: quantities like "2 couch", plurals "..couches")
    const matchers = buildMatchers(ITEMS);
    const qtyById = new Map();

    for (const m of matchers) {
      m.re.lastIndex = 0; // reset global regex
      let hit;
      while ((hit = m.re.exec(text)) !== null) {
        const qty = Math.max(1, parseInt(hit[1] || "1", 10));
        qtyById.set(m.id, (qtyById.get(m.id) || 0) + qty);
      }
    }

    // 4) build cart
    const cart = [];
    for (const it of ITEMS) {
      const qty = qtyById.get(it.id) || 0;
      if (!qty) continue;
      const vol = (Number(it.volume || it.cuft || 0) || 0) * qty;
      const price = (it.price != null ? Number(it.price) : 0) * qty;
      cart.push({
        id: it.id,
        name: it.name || it.id,
        qty,
        volume: vol,   // your pricing.js expects per-line volume total
        price          // per-line flat price (0 → volume-based)
      });
    }

    if (!cart.length) {
      return res.status(200).json({
        reply: `Tell me items like “2 couches + treadmill”. I’ll total the volume and price using your catalog.`,
        parsed: { cart: [], finalPrice: 0, totalVolume: 0, loadLabel: "Empty" }
      });
    }

    // 5) price via your pricing.js
    const { finalPrice, totalVolume } = calculatePrice(cart);
    const loadLabel = getLoadLabel(totalVolume);

    // 6) format reply
    const itemsList = cart.map(li => `• ${li.qty}× ${li.name} — ${li.volume.toFixed(1)} pts`).join("\n");
    const loads = Math.floor(totalVolume / fullLoadPoints);
    const remainderPct = Math.round(((totalVolume % fullLoadPoints) / fullLoadPoints) * 100);
    const header = `Estimated total: ~$${finalPrice.toFixed(2)} • ${loadLabel}${loads ? ` • +${loads} full load(s)` : ""}${remainderPct ? ` • ${remainderPct}% of next` : ""}`;

    return res.status(200).json({
      reply: `${header}\n${itemsList}`,
      parsed: { cart, finalPrice: Math.round(finalPrice*100)/100, totalVolume, loadLabel }
    });

  } catch (e) {
    console.error("[/api/chat] error:", e);
    return res.status(500).json({ error: "chat_error", detail: String(e?.message || e) });
  }
}
