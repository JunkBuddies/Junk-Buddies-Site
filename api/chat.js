// api/chat.js — Minimal parser for nested itemData + your pricing (no AI)

function norm(s = "") { return String(s).toLowerCase().trim(); }
function escRe(s){ return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
function slug(s=""){ return norm(s).replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g,""); }

// Generate helpful aliases from a human label like "Couch / Loveseat" or "Mattress - Queen"
function nameAliases(name = "") {
  const n = norm(name);
  const parts = n.split(/[\/–—-]/).map(x => x.trim()).filter(Boolean); // split on / or - types
  const out = new Set([n]);
  for (const p of parts) out.add(p);

  // special “A - B” → add “B A” and “A B”
  const dashMatch = n.match(/^(.*?)-\s*(.*)$/);
  if (dashMatch) {
    const a = dashMatch[1].trim(), b = dashMatch[2].trim();
    if (a && b) { out.add(`${b} ${a}`); out.add(`${a} ${b}`); out.add(b); }
  }

  // Common synonyms
  const syn = {
    "couch": ["sofa","loveseat","sectional"],
    "sofa": ["couch","loveseat","sectional"],
    "loveseat": ["couch","sofa"],
    "recliner": ["reclining chair"],
    "tv": ["television"],
    "television": ["tv"],
    "fridge": ["refrigerator"],
    "refrigerator": ["fridge"],
    "ac": ["air conditioner","window unit"],
    "air conditioner": ["ac","window unit"],
    "lawn mower": ["lawnmower"],
    "lawnmower": ["lawn mower"],
    "leaf blower": ["leafblower"],
    "leafblower": ["leaf blower"],
    "weed eater": ["trimmer","weed wacker","weedwhacker"],
    "trimmer": ["weed eater","weed wacker","weedwhacker"],
    "grill": ["bbq","barbecue","propane grill"],
    "range": ["stove","oven"],
    "stove": ["range","oven"],
    "mattress queen": ["queen mattress"],
    "mattress king": ["king mattress"],
    "mattress full": ["full mattress"],
    "mattress twin": ["twin mattress"],
    "queen mattress": ["mattress queen"],
    "king mattress": ["mattress king"],
    "full mattress": ["mattress full"],
    "twin mattress": ["mattress twin"]
  };

  // If name contains tokens we can expand
  const tokens = n.split(/\s+/);
  const joined = tokens.join(" ");
  for (const [k, vals] of Object.entries(syn)) {
    if (joined.includes(k)) vals.forEach(v => out.add(v));
  }

  // Specific heuristics
  if (joined.includes("couch") || joined.includes("sofa") || joined.includes("loveseat")) {
    out.add("couch"); out.add("sofa"); out.add("loveseat"); out.add("sectional");
  }
  if (joined.includes("television")) out.add("tv");
  if (joined.includes("tv")) out.add("television");
  if (joined.includes("refrigerator")) out.add("fridge");
  if (joined.includes("fridge")) out.add("refrigerator");
  if (joined.includes("air conditioner")) { out.add("ac"); out.add("window unit"); }

  // Normalize whitespace
  return [...out].map(x => x.replace(/\s+/g," ").trim()).filter(Boolean);
}

function buildMatchers(flatItems) {
  return flatItems.map(it => {
    const labels = new Set([
      ...nameAliases(it.name || ""),
      it.name ? norm(it.name) : ""
    ]);
    // e.g. "Mattress - Queen" → add "queen mattress"
    if (/^mattress/.test(norm(it.name||"")) || /mattress/.test(norm(it.name||""))) {
      const m = norm(it.name).match(/mattress.*\b(king|queen|full|twin)\b/);
      if (m) { labels.add(`${m[1]} mattress`); labels.add(`mattress ${m[1]}`); }
    }

    const uniq = [...labels].filter(Boolean).map(escRe);
    const pattern = uniq.length ? `(?:${uniq.join("|")})(?:es|s)?` : null;

    return {
      id: it.id,
      name: it.name,
      volume: Number(it.volume || it.cuft || 0) || 0,
      price: it.price != null ? Number(it.price) : 0,
      re: pattern ? new RegExp(`(?:^|\\b)(\\d{1,3})?\\s*(?:x|×)?\\s*(${pattern})\\b`, "g") : null
    };
  }).filter(m => m.re);
}

function flattenCatalog(nested = []) {
  const flat = [];
  for (const cat of nested) {
    const category = cat.category || "";
    for (const it of (cat.items || [])) {
      flat.push({
        id: slug(`${category}-${it.name || "item"}`),
        name: it.name || "Item",
        price: it.price ?? 0,
        volume: it.volume ?? 0,
        category
      });
    }
  }
  return flat;
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Cache-Control", "no-store");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    // imports
    const pricing = await import(new URL("../src/utils/pricing.js", import.meta.url).href);
    const dataMod = await import(new URL("../src/data/itemData.js", import.meta.url).href);
    const NESTED = dataMod.default || dataMod.items || dataMod.ITEMS || dataMod.data || [];
    if (!Array.isArray(NESTED) || !NESTED.length) {
      return res.status(500).json({ error: "itemdata_empty", detail: "src/data/itemData.js must export the nested array you posted" });
    }

    const ITEMS = flattenCatalog(NESTED);
    const { calculatePrice, fullLoadPoints, getLoadLabel } = pricing;

    const { messages = [] } = req.body || {};
    const text = norm(messages[messages.length - 1]?.content || "");

    // build matchers and scan
    const matchers = buildMatchers(ITEMS);
    const qtyById = new Map();
    for (const m of matchers) {
      m.re.lastIndex = 0;
      let hit;
      while ((hit = m.re.exec(text)) !== null) {
        const qty = Math.max(1, parseInt(hit[1] || "1", 10));
        qtyById.set(m.id, (qtyById.get(m.id) || 0) + qty);
      }
    }

    // assemble cart
    const cart = [];
    for (const it of ITEMS) {
      const qty = qtyById.get(it.id) || 0;
      if (!qty) continue;
      cart.push({
        id: it.id,
        name: it.name,
        qty,
        volume: (Number(it.volume) || 0) * qty,  // your pricing expects line volume total
        price: (Number(it.price) || 0) * qty     // flat per-unit price if provided; 0 → volume-based
      });
    }

    if (!cart.length) {
      return res.status(200).json({
        reply: `Tell me items like “2 couches + treadmill” or “queen mattress + fridge”. I’ll total the volume and price using your catalog.`,
        parsed: { cart: [], finalPrice: 0, totalVolume: 0, loadLabel: "Empty" }
      });
    }

    // price via your rules
    const { finalPrice, totalVolume } = calculatePrice(cart);
    const loadLabel = getLoadLabel(totalVolume);

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
