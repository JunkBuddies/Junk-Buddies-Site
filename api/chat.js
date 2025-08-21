// api/chat.js — Tight matching for sofa/treadmill/mattress + your pricing (no AI)

function norm(s=""){ return String(s).toLowerCase().trim(); }
function escRe(s){ return s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"); }
function slug(s=""){ return norm(s).replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,""); }
function countWithQty(text, base){
  const re = new RegExp(`(?:^|\\b)(\\d{1,3})?\\s*${base}\\b`, "g");
  let m, total = 0;
  while ((m = re.exec(text)) !== null) total += Math.max(1, parseInt(m[1] || "1", 10));
  return total;
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

function indexByName(items){
  const get = (pred) => items.find(pred) || null;
  const byInc = (frag) => get(it => norm(it.name).includes(frag));
  return {
    sofa:         get(it => norm(it.name) === "sofa") || byInc("sofa"),
    couchLove:    byInc("couch / loveseat"),
    reclSofa:     byInc("reclining sofa"),
    reclLove:     byInc("loveseat - reclining"),
    sleeperSofa:  byInc("sleeper sofa"),
    sectionalAny: items.filter(it => /sectional sofa/i.test(it.name)),

    treadBase:    get(it => norm(it.name) === "treadmill") || byInc("treadmill"),
    treadComm:    byInc("treadmill - commercial"),
    treadRes:     byInc("treadmill - residential"),

    mattBase:     get(it => norm(it.name) === "mattress") || byInc("mattress"),
    mattQueen:    byInc("mattress - queen"),
    mattKing:     byInc("mattress - king"),
    mattKingCal:  byInc("mattress - king/cal king") || byInc("mattress - king/"),
    mattFull:     byInc("mattress - full"),
    mattTwin:     byInc("mattress - twin"),
  };
}

function buildExactNameMatchers(items) {
  // For non-family items: match the literal name (and pieces like "Table - Coffee" → "table", "coffee")
  return items.map(it => {
    const base = norm(it.name);
    const parts = base.split(/[\/–—-]/).map(s => s.trim()).filter(Boolean);
    const labels = [...new Set([base, ...parts])].map(escRe);
    const pattern = labels.length ? `(?:${labels.join("|")})(?:es|s)?` : null;
    return {
      id: it.id, name: it.name,
      volume: Number(it.volume || 0) || 0,
      price: it.price != null ? Number(it.price) : 0,
      re: pattern ? new RegExp(`(?:^|\\b)(\\d{1,3})?\\s*(?:x|×)?\\s*(${pattern})\\b`, "g") : null
    };
  }).filter(m => m.re);
}

export default async function handler(req, res){
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Cache-Control", "no-store");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error:"Method not allowed" });

  try {
    const pricing = await import(new URL("../src/utils/pricing.js", import.meta.url).href);
    const dataMod = await import(new URL("../src/data/itemData.js", import.meta.url).href);

    const NESTED = dataMod.default || dataMod.items || dataMod.ITEMS || dataMod.data || [];
    if (!Array.isArray(NESTED) || !NESTED.length) {
      return res.status(500).json({ error:"itemdata_empty", detail:"src/data/itemData.js must export the nested array" });
    }
    const ITEMS = flattenCatalog(NESTED);
    const { calculatePrice, fullLoadPoints, getLoadLabel } = pricing;

    const { messages = [] } = req.body || {};
    const text = norm(messages[messages.length - 1]?.content || "");

    // ---- Family heuristics (prevents over-matching) ----
    const idx = indexByName(ITEMS);
    const qtyById = new Map();

    // SOFA FAMILY
    const hasSectional  = /\bsectional\b/.test(text);
    const hasRecliner   = /\brecliner|reclining\b/.test(text);
    const hasSleeper    = /\bsleeper\b/.test(text);
    const hasLoveseatW  = /\bloveseat(s)?\b/.test(text);
    const couchQty      = countWithQty(text, "(?:couch|couches)");
    const sofaQty       = countWithQty(text, "sofa(?:s)?");

    if (hasSectional) {
      // if user says "sectional", choose a mid-size default if pieces not specified
      const secQty = countWithQty(text, "sectional(?:\\s+sofa)?s?");
      const defaultSectional = idx.sectionalAny?.[1] || idx.sectionalAny?.[0] || null; // pick 3-pieces if present
      if (defaultSectional && secQty) qtyById.set(defaultSectional.id, secQty);
    } else if (hasRecliner) {
      const q = Math.max(couchQty, sofaQty, countWithQty(text, "recliner(?:s)?"));
      if (q) {
        const pick = idx.reclSofa || idx.reclLove || idx.sofa || idx.couchLove;
        if (pick) qtyById.set(pick.id, q);
      }
    } else if (hasSleeper) {
      const q = Math.max(couchQty, sofaQty, countWithQty(text, "sleeper(?:\\s+sofa)?s?"));
      if (q && idx.sleeperSofa) qtyById.set(idx.sleeperSofa.id, q);
    } else {
      // generic "couch/sofa": map couches → Couch / Loveseat if present, else Sofa
      if (couchQty) {
        const pick = idx.couchLove || idx.sofa;
        if (pick) qtyById.set(pick.id, (qtyById.get(pick.id)||0) + couchQty);
      }
      if (sofaQty && !couchQty) { // don't double-count if both words used
        const pick = idx.sofa || idx.couchLove;
        if (pick) qtyById.set(pick.id, (qtyById.get(pick.id)||0) + sofaQty);
      }
      // explicit "loveseat"
      const loveQty = countWithQty(text, "loveseat(?:s)?");
      if (loveQty && idx.couchLove) qtyById.set(idx.couchLove.id, (qtyById.get(idx.couchLove.id)||0) + loveQty);
    }

    // TREADMILL FAMILY
    const treadQty = countWithQty(text, "treadmill(?:s)?");
    const hasComm  = /\bcommercial\b/.test(text);
    const hasRes   = /\bresidential\b/.test(text);
    if (treadQty) {
      const pick = (hasComm && idx.treadComm) ? idx.treadComm
                 : (hasRes  && idx.treadRes ) ? idx.treadRes
                 : idx.treadBase;
      if (pick) qtyById.set(pick.id, (qtyById.get(pick.id)||0) + treadQty);
    }

    // MATTRESS FAMILY
    const mattQty = countWithQty(text, "mattress(?:es)?");
    if (mattQty) {
      const sizeQueen = /\bqueen\b/.test(text);
      const sizeKing  = /\b(cal(?:ifornia)?\\s*)?king\b/.test(text) || /\bking\b/.test(text);
      const sizeFull  = /\bfull\b/.test(text);
      const sizeTwin  = /\btwin\b/.test(text);

      let pick = null;
      if (sizeQueen && idx.mattQueen) pick = idx.mattQueen;
      else if (sizeKing && (idx.mattKingCal || idx.mattKing)) pick = idx.mattKingCal || idx.mattKing;
      else if (sizeFull && idx.mattFull) pick = idx.mattFull;
      else if (sizeTwin && idx.mattTwin) pick = idx.mattTwin;
      else pick = idx.mattBase || idx.mattQueen;

      if (pick) qtyById.set(pick.id, (qtyById.get(pick.id)||0) + mattQty);
    }

    // ---- Generic exact-name matching for everything else (NOT sofa/treadmill/mattress) ----
    const familyWord = /(sofa|couch|loveseat|sectional|treadmill|mattress)/;
    const others = ITEMS.filter(it => !familyWord.test(norm(it.name)));
    const matchers = buildExactNameMatchers(others);

    for (const m of matchers) {
      m.re.lastIndex = 0;
      let hit;
      while ((hit = m.re.exec(text)) !== null) {
        const qty = Math.max(1, parseInt(hit[1] || "1", 10));
        qtyById.set(m.id, (qtyById.get(m.id) || 0) + qty);
      }
    }

    // ---- Build cart & price
    const cart = [];
    for (const it of ITEMS) {
      const qty = qtyById.get(it.id) || 0;
      if (!qty) continue;
      cart.push({
        id: it.id,
        name: it.name,
        qty,
        volume: (Number(it.volume)||0) * qty,
        price: (Number(it.price)||0) * qty
      });
    }

    if (!cart.length) {
      return res.status(200).json({
        reply: `Try: “2 couches + treadmill + queen mattress”. I’ll total volume & price from your catalog.`,
        parsed: { cart: [], finalPrice: 0, totalVolume: 0, loadLabel: "Empty" }
      });
    }

    const { calculatePrice, fullLoadPoints, getLoadLabel } = pricing;
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
    return res.status(500).json({ error:"chat_error", detail:String(e?.message||e) });
  }
}
