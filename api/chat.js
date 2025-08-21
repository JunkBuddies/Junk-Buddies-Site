// /api/chat.js — RAW AI + your pricing.js
//  - Parses messy text (typos ok) to items
//  - Maps to your catalog (itemdata.js) with fuzzy matching
//  - For unlisted items: uses dimensions or AI cu-ft estimate
//  - Builds cart lines { volume, price } and calls your calculatePrice(cart)

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";
const ITEMDATA_PATH = process.env.ITEMDATA_PATH || null;

// ---------- tiny utils ----------
function norm(s = "") {
  return String(s).toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}
function escRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }

// Levenshtein for fuzzy alias matching
function levenshtein(a = "", b = "") {
  const m = a.length, n = b.length;
  if (!m) return n; if (!n) return m;
  const dp = Array.from({ length: m + 1 }, (_, i) => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i-1][j] + 1, dp[i][j-1] + 1, dp[i-1][j-1] + cost);
    }
  }
  return dp[m][n];
}
function fuzzyOne(name, list, threshold = 0.34) {
  const n = norm(name);
  let best = null;
  for (const cand of list) {
    const d = levenshtein(n, cand);
    const score = d / Math.max(n.length, cand.length);
    if (!best || score < best.score) best = { cand, score };
  }
  return best && best.score <= threshold ? best.cand : null;
}

// Find dimensions like "60x80x10in" or "5ft x 3ft x 2ft"
function parseDims(t) {
  const s = t.toLowerCase().replace(/,/g, " ");
  let m = s.match(/(\d+(?:\.\d+)?)\s*(?:ft|feet)['"]?\s*[x×]\s*(\d+(?:\.\d+)?)\s*(?:ft|feet)['"]?\s*[x×]\s*(\d+(?:\.\d+)?)\s*(?:ft|feet)/);
  if (m) return { L:+m[1], W:+m[2], H:+m[3], unit:"ft" };
  m = s.match(/(\d+(?:\.\d+)?)\s*(?:in|inch|inches)['"]?\s*[x×]\s*(\d+(?:\.\d+)?)\s*(?:in|inch|inches)['"]?\s*[x×]\s*(\d+(?:\.\d+)?)\s*(?:in|inch|inches)/);
  if (m) return { L:+m[1], W:+m[2], H:+m[3], unit:"in" };
  m = s.match(/(\d+(?:\.\d+)?)\s*[x×]\s*(\d+(?:\.\d+)?)\s*[x×]\s*(\d+(?:\.\d+)?)/);
  if (m) return { L:+m[1], W:+m[2], H:+m[3], unit:"in" };
  return null;
}
function dimsToCuFt(d) {
  if (!d) return null;
  const { L, W, H, unit } = d;
  if (!(L && W && H)) return null;
  return unit === "ft" ? L*W*H : (L/12)*(W/12)*(H/12);
}

// ---------- load your pricing + catalog ----------
async function loadPricing() {
  // import your pricing helpers/constants
  const mod = await import("../src/utils/pricing.js");
  return {
    calculatePrice: mod.calculatePrice,
    fullLoadPoints: mod.fullLoadPoints,
    getLoadLabel: mod.getLoadLabel,
  };
}

async function loadCatalog() {
  const tryPaths = ITEMDATA_PATH
    ? [ITEMDATA_PATH]
    : ["../src/data/itemdata.js", "../src/itemdata.js", "../itemdata.js"];

  for (const p of tryPaths) {
    try {
      const mod = await import(p);
      const data = mod.default || mod.items || mod.ITEMS || mod.data || [];
      if (Array.isArray(data) && data.length) return data;
    } catch {}
  }
  // minimal fallback so we always reply
  return [
    { id:"sofa_3seat", name:"Sofa (3-seat)", volume:60, aliases:["sofa","couch"] },
    { id:"treadmill_std", name:"Treadmill", volume:40, aliases:["treadmill"] },
    { id:"queen_mattress", name:"Queen Mattress", volume:30, aliases:["queen mattress","mattress queen"] },
  ];
}

function buildAliasIndex(catalog) {
  const entries = []; // {id,name,volume,price|null,alias}
  for (const it of catalog) {
    const aliases = Array.isArray(it.aliases) ? it.aliases : [];
    const extras = [it.name, it.id].filter(Boolean);
    for (const a of [...aliases, ...extras]) {
      const alias = norm(a);
      if (alias) entries.push({
        id: it.id,
        name: it.name || it.id,
        volume: Number(it.volume || it.cuft || 0) || 0,   // your file uses "volume"
        price: it.price != null ? Number(it.price) : null // per-unit flat price if you have it
      , alias });
    }
  }
  const aliasStrings = entries.map(e => e.alias);
  return { entries, aliasStrings };
}

function resolveToCatalog(rawName, aliasEntries, aliasStrings) {
  const n = norm(rawName);
  const exact = aliasEntries.find(e => e.alias === n);
  if (exact) return exact;
  const best = fuzzyOne(n, aliasStrings, 0.34);
  return best ? aliasEntries.find(e => e.alias === best) : null;
}

// ---------- AI helpers ----------
async function aiParseItems(userText, catalogExamples) {
  if (!OPENAI_API_KEY) throw new Error("OPENAI_API_KEY missing");
  const sys = "You extract item lines for a junk removal cart. Return JSON only.";
  const prompt = [
    `Examples in catalog: ${catalogExamples.slice(0,120).join(", ")}`,
    "Return ONLY JSON like: {\"items\":[{\"raw_name\":\"couch\",\"qty\":2},{\"raw_name\":\"treadmill\",\"qty\":1},{\"raw_name\":\"queen mattress\",\"qty\":1,\"L\":60,\"W\":80,\"H\":10,\"unit\":\"in\"}]}",
    "Correct typos; if user included dimensions, include L/W/H & unit (in/ft). If not, omit L/W/H."
  ].join("\n");

  const r = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type":"application/json", "Authorization":`Bearer ${OPENAI_API_KEY}` },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      temperature: 0,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: sys },
        { role: "user", content: userText },
        { role: "system", content: prompt }
      ]
    })
  });
  if (!r.ok) throw new Error(`LLM parse ${r.status}`);
  const j = await r.json();
  const text = j.choices?.[0]?.message?.content || "{}";
  let out;
  try { out = JSON.parse(text); } catch { out = { items: [] }; }
  if (!Array.isArray(out.items)) out.items = [];
  return out.items.map(it => ({ 
    raw_name: String(it.raw_name || "").trim(),
    qty: Math.max(1, parseInt(it.qty || 1, 10)),
    L: it.L ?? null, W: it.W ?? null, H: it.H ?? null, unit: it.unit ?? null
  }));
}

async function aiEstimateCuFt(label) {
  if (!OPENAI_API_KEY) return { cuft: 15 };
  const sys = "Return a conservative typical cubic-foot estimate for a household item. JSON only.";
  const user = `Item: ${label}\nReturn {"cuft": number, "low": number, "high": number} with cuft between 1 and 300.`;
  const r = await fetch("https://api.openai.com/v1/chat/completions", {
    method:"POST",
    headers:{ "Content-Type":"application/json", "Authorization":`Bearer ${OPENAI_API_KEY}` },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      temperature: 0,
      response_format: { type: "json_object" },
      messages: [{ role:"system", content: sys }, { role:"user", content: user }]
    })
  });
  if (!r.ok) return { cuft: 15 };
  const j = await r.json();
  try { return JSON.parse(j.choices?.[0]?.message?.content || "{}"); }
  catch { return { cuft: 15 }; }
}

// ---------- main handler ----------
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("X-Chat-Version", "raw-ai-pricing-v1");
  res.setHeader("Cache-Control", "no-store");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error:"Method not allowed" });

  try {
    const { messages = [], sessionId } = req.body || {};
    const last = messages[messages.length - 1]?.content?.trim() || "";

    // load pricing + catalog
    const { calculatePrice, fullLoadPoints, getLoadLabel } = await loadPricing();
    const CATALOG = await loadCatalog();
    const { entries: aliasEntries, aliasStrings } = buildAliasIndex(CATALOG);
    const catalogNames = CATALOG.map(c => c.name || c.id);

    // 1) AI parse messy text → item lines (qty, name, optional dims)
    let aiItems = [];
    try { aiItems = await aiParseItems(last, catalogNames); }
    catch (e) { console.error("[chat] aiParseItems:", e); aiItems = []; }

    if (!aiItems.length) {
      return res.status(200).json({
        reply: `Tell me what you’ve got (typos fine): “2 couches + treadmill”, or add dimensions like “queen mattress 60x80x10in”.`,
        parsed: { cart: [], finalPrice: 0, totalVolume: 0, loadLabel: "Empty" },
        sessionId
      });
    }

    // 2) Resolve each line to catalog item OR estimate cu-ft
    const cart = []; // each line: { id, name, qty, volume, price, source }
    for (const it of aiItems) {
      const raw = it.raw_name || "";
      const qty = Math.max(1, parseInt(it.qty || 1, 10));

      // Try to resolve to catalog
      const match = resolveToCatalog(raw, aliasEntries, aliasStrings);

      if (match) {
        const unitVol = Number(match.volume || 0);
        const unitPrice = match.price != null ? Number(match.price) : 0;
        cart.push({
          id: match.id,
          name: match.name,
          qty,
          volume: unitVol * qty,      // your pricing.js expects full line volume
          price: unitPrice * qty,     // and full line price (0 if volume-based)
          source: "catalog"
        });
        continue;
      }

      // Unlisted
