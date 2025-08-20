// /api/chat.js — Local parser using your itemdata.js (no SmartSelector)
// Runtime: Vercel Node (ESM). Adds diagnostics via response headers.

const PRICE_PER_CUFT = Number(process.env.PRICE_PER_CUFT || 2.25);  // tweak later
const TRUCK_CUFT = Number(process.env.TRUCK_CUFT || 420);           // e.g., ~15yd truck

function normalize(s = "") {
  return String(s).toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function loadItems() {
  // Adjust this path to where YOUR itemdata.js lives:
  // e.g., '../src/data/itemdata.js' or '../src/itemdata.js'
  const candidates = [
    "../src/data/itemdata.js",
    "../src/itemdata.js",
    "../itemdata.js",
  ];

  for (const p of candidates) {
    try {
      const mod = await import(p);
      const data = mod.default || mod.items || mod.ITEMS || mod.data || [];
      if (Array.isArray(data) && data.length) {
        return data;
      }
    } catch (e) {
      // keep trying next path
    }
  }

  // Fallback (so the function still replies even if import fails)
  console.warn("[chat] Could not import your itemdata.js. Using tiny fallback catalog.");
  return [
    { id: "sofa_3seat", name: "Sofa (3-seat)", cuft: 60, aliases: ["sofa", "couch"] },
    { id: "treadmill_std", name: "Treadmill", cuft: 40, aliases: ["treadmill"] },
    { id: "dresser_std", name: "Dresser", cuft: 35, aliases: ["dresser"] },
  ];
}

function buildAliasIndex(items) {
  const index = []; // array of { id, name, cuft, price?, alias }
  for (const it of items) {
    const baseAliases = Array.isArray(it.aliases) ? it.aliases : [];
    const extras = [it.name, it.id].filter(Boolean);
    const all = [...baseAliases, ...extras];
    for (const a of all) {
      const alias = normalize(a);
      if (!alias) continue;
      index.push({
        id: it.id,
        name: it.name || it.id,
        cuft: Number(it.cuft || it.volume || 0) || 0,
        price: it.price != null ? Number(it.price) : null,
        alias,
      });
    }
  }
  // Sort longer aliases first to reduce collisions (e.g., "queen mattress" before "mattress")
  index.sort((a, b) => b.alias.length - a.alias.length);
  return index;
}

function parseItemsFromText(text, aliasIndex) {
  const msg = normalize(text);
  if (!msg) return [];

  const counts = new Map(); // id -> { id, name, cuft, price, qty }
  for (const entry of aliasIndex) {
    const ali = escapeRegExp(entry.alias);

    // Pattern 1: "2 couches", "3 sofa", "1 treadmill"
    const withQty = new RegExp(String.raw`(?:^|\s)(\d{1,3})\s+${ali}s?(?=\s|$)`, "g");
    let m;
    let localQtyFromWithQty = 0;
    while ((m = withQty.exec(msg)) !== null) {
      localQtyFromWithQty += Number(m[1] || 0);
    }
    if (localQtyFromWithQty > 0) {
      const prev = counts.get(entry.id) || { ...entry, qty: 0 };
      prev.qty += localQtyFromWithQty;
      counts.set(entry.id, prev);
      continue; // avoid double-counting via the no-qty rule below
    }

    // Pattern 2: alias present with no explicit number → assume 1
    const noQty = new RegExp(String.raw`(?:^|\s)${ali}s?(?=\s|$)`, "g");
    if (noQty.test(msg)) {
      const prev = counts.get(entry.id) || { ...entry, qty: 0 };
      prev.qty += 1;
      counts.set(entry.id, prev);
    }
  }

  return [...counts.values()].filter(x => x.qty > 0);
}

function estimate(items) {
  // price = per-item price if provided, else cuft * PRICE_PER_CUFT
  let subtotal = 0;
  let totalCuft = 0;

  for (const it of items) {
    const qty = Number(it.qty || 1);
    const cuftEach = Number(it.cuft || 0);
    const priceEach = it.price != null ? Number(it.price) : cuftEach * PRICE_PER_CUFT;
    subtotal += priceEach * qty;
    totalCuft += cuftEach * qty;
  }

  // Round to 2 decimals for display
  const rounded = Math.round((subtotal + Number.EPSILON) * 100) / 100;
  const truckFillPct = TRUCK_CUFT > 0 ? Math.min(100, Math.round((totalCuft / TRUCK_CUFT) * 100)) : null;

  return { subtotal: rounded, truckFillPct, totalCuft };
}

export default async function handler(req, res) {
  // CORS + diagnostics
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("X-Chat-Version", "local-parser-v1");
  res.setHeader("Cache-Control", "no-store");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { messages = [], sessionId } = req.body || {};
    const last = messages[messages.length - 1]?.content?.trim() || "";

    const ITEMS = await loadItems();                // ← pulls your itemdata.js
    const aliasIndex = buildAliasIndex(ITEMS);      // ← builds alias lookup
    const parsed = parseItemsFromText(last, aliasIndex);

    if (!parsed.length) {
      return res.status(200).json({
        reply: `I didn’t detect specific items. Try something like: "2 couches and a treadmill", or "dresser + couch".`,
        parsed: { items: [], estCuft: 0, estPrice: 0, truckFillPct: 0 },
        sessionId
      });
    }

    const { subtotal, truckFillPct, totalCuft } = estimate(parsed);
    const list = parsed.map(it => `${it.qty}× ${it.name}`).join(", ");

    return res.status(200).json({
      reply: `Parsed: ${list}\nEstimated total: ~$${subtotal}${truckFillPct != null ? ` • Truck fill ~${truckFillPct}%` : ""}\nAdd/remove anything or say "schedule" to continue.`,
      parsed: {
        items: parsed.map(({ id, name, qty, cuft, price }) => ({ id, name, qty, cuft, price })),
        estCuFt: totalCuft,
        estPrice: subtotal,
        truckFillPct
      },
      sessionId
    });
  } catch (e) {
    console.error("[chat] error:", e);
    return res.status(500).json({ error: "chat_error", detail: String(e?.message || e) });
  }
}
