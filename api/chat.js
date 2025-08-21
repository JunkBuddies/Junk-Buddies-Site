// api/chat.js — RAW AI + pricing + resilient itemData loader (ESM)

// Optional envs
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";
const ITEMDATA_PATH = process.env.ITEMDATA_PATH || ""; // optional explicit override
const POINTS_PER_CUFT = Number(process.env.POINTS_PER_CUFT || 1); // default 1 point == 1 cuft

// ---------- tiny utils ----------
const norm = (s = "") =>
  String(s).toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();

function levenshtein(a = "", b = "") {
  const m = a.length, n = b.length;
  if (!m) return n; if (!n) return m;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
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

// "60x80x10in", "5ft x 3ft x 2ft", etc.
function parseDims(t = "") {
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
  if (!d || !d.L || !d.W || !d.H) return null;
  return d.unit === "ft" ? d.L * d.W * d.H : (d.L/12) * (d.W/12) * (d.H/12);
}

// ---------- imports: pricing + catalog ----------
async function loadPricing() {
  const m = await import(new URL("../src/utils/pricing.js", import.meta.url).href);
  return {
    calculatePrice: m.calculatePrice,
    fullLoadPoints: m.fullLoadPoints,
    getLoadLabel: m.getLoadLabel,
  };
}

async function loadCatalog() {
  const candidates = [
    ITEMDATA_PATH || null,
    "../src/data/itemData.js",
    "../src/data/itemdata.js",
    "../src/itemData.js",
    "../src/itemdata.js",
    "../itemData.js",
    "../itemdata.js",
  ].filter(Boolean);

  const tried = [];
  for (const rel of candidates) {
    try {
      const url = new URL(rel, import.meta.url);
      const mod = await import(url.href);
      const data = Array.isArray(mod) ? mod : (mod.default || mod.items || mod.ITEMS || mod.data || []);
      if (Array.isArray(data) && data.length) {
        return { items: data, path: rel };
      }
      tried.push({ path: rel, ok: false, detail: "loaded but not array/non-empty" });
    } catch (e) {
      tried.push({ path: rel, ok: false, detail: String(e?.message || e) });
    }
  }
  // Fallback so the chat never hard-fails
  return {
    items: [
      { id: "sofa_3seat", name: "Sofa (3-seat)", volume: 60, aliases: ["sofa","couch"] },
      { id: "treadmill_std", name: "Treadmill", volume: 40, aliases: ["treadmill"] },
      { id: "queen_mattress", name: "Queen Mattress", volume: 30, aliases: ["queen mattress","mattress queen"] },
    ],
    path: "(fallback)"
  };
}

function buildAliasIndex(catalog) {
  const entries = [];
  for (const it of catalog) {
    const aliases = Array.isArray(it.aliases) ? it.aliases : [];
    const extras = [it.name, it.id].filter(Boolean);
    for (const a of [...aliases, ...extras]) {
      const alias = norm(a);
      if (!alias) continue;
      entries.push({
        id: it.id,
        name: it.name || it.id,
        volume: Number(it.volume || it.cuft || 0) || 0,
        price: it.price != null ? Number(it.price) : 0,
        alias,
      });
    }
  }
  return { entries, aliasStrings: entries.map(e => e.alias) };
}
function resolveToCatalog(rawName, aliasEntries, aliasStrings) {
  const n = norm(rawName);
  const exact = aliasEntries.find(e => e.alias === n);
  if (exact) return exact;
  const best = fuzzyOne(n, aliasStrings, 0.34);
  return best ? aliasEntries.find(e => e.alias === best) : null;
}

// ---------- AI helpers (optional) ----------
async function aiParseItems(userText, catalogExamples) {
  if (!OPENAI_API_KEY) return []; // fallback parser will handle
  const sys = "You extract item lines for a junk removal cart. Return JSON only.";
  const prompt = [
    `Examples in catalog: ${catalogExamples.slice(0,120).join(", ")}`,
    "Return ONLY JSON like: {\"items\":[{\"raw_name\":\"couch\",\"qty\":2},{\"raw_name\":\"treadmill\",\"qty\":1},{\"raw_name\":\"queen mattress\",\"qty\":1,\"L\":60,\"W\":80,\"H\":10,\"unit\":\"in\"}]}",
    "Correct typos; include dimensions if present (L/W/H + unit in|ft).",
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
  if (!r.ok) return [];
  const j = await r.json();
  const text = j.choices?.[0]?.message?.content || "{}";
  try {
    const out = JSON.parse(text);
    const items = Array.isArray(out.items) ? out.items : [];
    return items.map(it => ({
      raw_name: String(it.raw_name || "").trim(),
      qty: Math.max(1, parseInt(it.qty || 1, 10)),
      L: it.L ?? null, W: it.W ?? null, H: it.H ?? null, unit: it.unit ?? null
    }));
  } catch {
    return [];
  }
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

// ---------- fallback local parser (no key / AI down) ----------
function localParse(userText, aliasEntries) {
  const msg = norm(userText);
  const out = [];
  // quantities like "2 couches", "3 mattress"
  for (const e of aliasEntries) {
    const reQty = new RegExp(`(?:^|\\s)(\\d{1,3})\\s+${e.alias}s?(?=\\s|$)`, "g");
    let m, total = 0;
    while ((m = reQty.exec(msg)) !== null) total += Number(m[1] || 0);
    if (total) { out.push({ raw_name: e.alias, qty: total }); continue; }
    const re1 = new RegExp(`(?:^|\\s)${e.alias}s?(?=\\s|$)`, "g");
    if (re1.test(msg)) out.push({ raw_name: e.alias, qty: 1 });
  }
  if (!out.length) {
    const dims = parseDims(msg);
    const tokens = msg.split(/\s+and\s+|,\s+|\+\s+|\s+/).filter(t => t.length > 2);
    for (const t of tokens.slice(0, 5)) out.push({ raw_name: t, qty: 1, ...(dims||{}) });
  }
  return out;
}

// ---------- main handler ----------
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-AI", OPENAI_API_KEY ? "on" : "off");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error:"Method not allowed" });

  try {
    // 0) Pricing import
    const { calculatePrice, fullLoadPoints, getLoadLabel } = await loadPricing();

    // 1) Catalog import
    const { items: CATALOG, path: catalogPath } = await loadCatalog();
    res.setHeader("X-Catalog", catalogPath);
    const { entries: aliasEntries, aliasStrings } = buildAliasIndex(CATALOG);
    const catalogNames = CATALOG.map(c => c.name || c.id);

    // 2) Read last message
    const { messages = [], sessionId } = req.body || {};
    const last = messages[messages.length - 1]?.content?.trim() || "";

    // 3) Parse to lines
    let lines = [];
    try { lines = await aiParseItems(last, catalogNames); } catch {}
    if (!lines.length) lines = localParse(last, aliasEntries);

    if (!lines.length) {
      return res.status(200).json({
        reply: `Tell me what you’ve got (typos OK): “2 couches + treadmill”, or add dimensions like “queen mattress 60x80x10in”.`,
        parsed: { cart: [], finalPrice: 0, totalVolume: 0, loadLabel: "Empty" },
      });
    }

    // 4) Resolve each line
    const cart = [];
    for (const it of lines) {
      const raw = it.raw_name || "";
      const qty = Math.max(1, parseInt(it.qty || 1, 10));

      const match = resolveToCatalog(raw, aliasEntries, aliasStrings);
      if (match) {
        const unitVol = Number(match.volume || 0);
        const uni
