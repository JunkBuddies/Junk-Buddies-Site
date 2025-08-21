// /api/chat.js — RAW AI + static imports of your pricing & catalog
// - Pricing imported from ../src/utils/pricing.js (unchanged)
// - Catalog imported from ../src/data/itemdata.js (adjust path if needed)

import { calculatePrice, fullLoadPoints, getLoadLabel } from "../src/utils/pricing.js";
import itemDataModule from "../src/data/itemdata.js"; // <-- adjust if your file lives elsewhere

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";
const POINTS_PER_CUFT = Number(process.env.POINTS_PER_CUFT || 1);

// ---------- catalog normalization ----------
const CATALOG = Array.isArray(itemDataModule)
  ? itemDataModule
  : (itemDataModule?.default || itemDataModule?.items || itemDataModule?.ITEMS || itemDataModule?.data || []);

const FALLBACK_CATALOG = [
  { id: "sofa_3seat", name: "Sofa (3-seat)", volume: 60, aliases: ["sofa","couch"] },
  { id: "treadmill_std", name: "Treadmill", volume: 40, aliases: ["treadmill"] },
  { id: "queen_mattress", name: "Queen Mattress", volume: 30, aliases: ["queen mattress","mattress queen"] },
];

const ACTIVE_CATALOG = (Array.isArray(CATALOG) && CATALOG.length) ? CATALOG : FALLBACK_CATALOG;

// ---------- tiny utils ----------
function norm(s = "") {
  return String(s).toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}
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

function parseDims(text) {
  const s = text.toLowerCase().replace(/,/g, " ");
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
  return d.unit === "ft" ? d.L*d.W*dH : (d.L/12)*(d.W/12)*(d.H/12);
}

// ---------- alias index ----------
function buildAliasIndex(catalog) {
  const entries = []; // {id,name,volume,price|null,alias}
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
        alias
      });
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
  if (!OPENAI_API_KEY) return []; // we'll fallback to local parser
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
  let out; try { out = JSON.parse(text); } catch { out = { items: [] }; }
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

// ---------- fallback local parser (no key or AI failure) ----------
function localParse(userText, aliasEntries) {
  const msg = norm(userText);
  const o
