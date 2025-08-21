// api/chat.js — STEP 2: tight matcher for sofa/treadmill/mattress + exact-name for others (no AI)

function norm(s=""){ return String(s).toLowerCase().trim(); }
function slug(s=""){ return norm(s).replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,""); }
function escRe(s){ return s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"); }
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
        id: slug(`${category}-${it.name || "Item"}`),
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
  const get = (eq) => items.find(it => norm(it.name) === eq) || null;
  const inc = (frag) => items.find(it => norm(it.name).includes(frag)) || null;
  return {
    // sofas
    sofa:        get("sofa") || inc("sofa"),
    couchLove:   inc("couch / loveseat") || inc("loveseat"),
    reclSofa:    inc("reclining sofa"),
    sleeperSofa: inc("sleeper sofa"),
    sectional2:  inc("sectional sofa - 2 pieces"),
    sectional3:  inc("sectional sofa - 3 pieces"),
    // treadmill
    tread:       get("treadmill") || inc("treadmill"),
    treadComm:   inc("treadmill - commercial"),
    treadRes:    inc("treadmill - residential"),
    // mattresses
    matt:        get("mattress") || inc("mattress"),
    mattQueen:   inc("mattress - queen"),
    mattKing:    inc("mattress - king"),
    mattKingCal: inc("mattress - king/cal king") || inc("mattress - king/"),
    mattFull:    inc("mattress - full"),
    mattTwin:    inc("mattress - twin"),
  };
}
function buildExactNameMatchers(items) {
  return items.map(it => {
    const base = norm(it.name);
    const parts = base.split(/[\/–—-]/).map(s => s.trim()).filter(Boolean);
    const labels = [...new Set([base, ...parts])].map(escRe);
    const pattern = labels.length ? `(?:${labels.join("|")})(?:es|s)?` : null;
    return pattern ? {
      id: it.id, name: it.name,
      volume: Number(it.volume||0), price: Number(it.price||0),
      re: new RegExp(`(?:^|\\b)(\\d{1,3})?\\s*(?:x|×)?\\s*(${pattern})\\b`, "g")
    } : null;
  }).filter(Boolean);
}

export default async function handler(req, res){
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Cache-Control", "no-store");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error:"Method not allowed" });

  try {
    // imports
    const pricing = await import(new URL("../src/utils/pricing.js", import.meta.url).href);
    const mod = await import(new URL("../src/data/itemData.js", import.meta.url).href);
    const nested = mod.default || mod.items || mod.ITEMS || mod.data || [];
    if (!Array.isArray(nested)) throw new Error("itemData is not an array");
    const ITEMS = flattenCatalog(nested);

    // input
    const { messages = [] } = req.body || {};
    const text = norm(messages[messages.length - 1]?.content || "");

    // family matching
    const idx = indexByName(ITEMS);
    const qtyById = new Map();

    // sofas
    const hasSectional = /\bsectional\b/.test(text);
    const hasSleeper   = /\bsleeper\b/.test(text);
    const hasRecliner  = /\brecliner|reclining\b/.test(text);
    const couchQty     = countWithQty(text, "couch(?:es)?");
    const sofaQty      = countWithQty(text, "sofa(?:s)?");
    const loveQty      = countWithQty(text, "loveseat(?:s)?");

    if (hasSectional) {
      const secQty = countWithQty(text, "sectional(?:\\s+sofa)?s?");
      const pick = idx.sectional3 || idx.sectional2; // pick a single sectional size
      if (pick && secQty) qtyById.set(pick.id, secQty);
    } else if (hasSleeper && idx.sleeperSofa) {
      const q = Math.max(couchQty, sofaQty, countWithQty(text, "sleeper(?:\\s+sofa)?s?"));
      if (q) qtyById.set(idx.sleeperSofa.id, q);
    } else if (hasRecliner && idx.reclSofa) {
      const q = Math.max(couchQty, sofaQty, countWithQty(text, "recliner(?:s)?"));
      if (q) qtyById.set(idx.reclSofa.id, q);
    } else {
      // generic: map to one canonical sofa item
      if (couchQty) {
        const pick = idx.couchLove || idx.sofa;
        if (pick) qtyById.set(pick.id, (qtyById.get(pick.id)||0) + couchQty);
      } else if (sofaQty) {
        const pick = idx.sofa || idx.couchLove;
        if (pick) qtyById.set(pick.id, (qtyById.get(pick.id)||0) + sofaQty);
      }
      if (loveQty && idx.couchLove) {
        qtyById.set(idx.couchLove.id, (qtyById.get(idx.couchLove.id)||0) + loveQty);
      }
    }

    // treadmill
    const treadQty = countWithQty(text, "treadmill(?:s)?");
    if (treadQty) {
      const pick = /\bcommercial\b/.test(text) ? (idx.treadComm || idx.tread)
                : /\bresidential\b/.test(text) ? (idx.treadRes  || idx.tread)
                : idx.tread;
      if (pick) qtyById.set(pick.id, (qtyById.get(pick.id)||0) + treadQty);
    }

    // mattress
    const mattQty = countWithQty(text, "mattress(?:es)?");
    if (mattQty) {
      let pick = null;
      if (/\bqueen\b/.test(text) && idx.mattQueen) pick = idx.mattQueen;
      else if (/\b(cal(?:ifornia)?\s*)?king\b/.test(text) && (idx.mattKingCal || idx.mattKing)) pick = idx.mattKingCal || idx.mattKing;
      else if (/\bfull\b/.test(text) && idx.mattFull) pick = idx.mattFull;
      else if (/\btwin\b/.test(text) && idx.mattTwin) pick = idx.mattTwin;
      else pick = idx.matt || idx.mattQueen;
      if (pick) qtyById.set(pick.id, (qtyById.get(pick.id)||0) + mattQty);
    }

    // exact-name for everything else (not sofa/treadmill/mattress)
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

    // build cart
    const cart = [];
    for (const it of ITEMS) {
      const qty = qtyById.get(it.id) || 0;
      if (!qty) continue;
      cart.push({
        id: it.id,
        name: it.name,
        qty,
        volume: (Number(it.volume)||0) * qty,
        price:  (Number(it.price)||0) * qty
      });
    }

    if (!cart.length) {
      return res.status(200).json({
        reply: `Try: “2 couches + treadmill + queen mattress”. I’ll total volume & price from your catalog.`,
        parsed: { cart: [], finalPrice: 0, totalVolume: 0, loadLabel: "Empty" }
      });
    }

    // price using your rules (unchanged file)
    const { calculatePrice, fullLoadPoints, getLoadLabel } = pricing;
    const { finalPrice, totalVolume } = calculatePrice(cart);
    const loadLabel = getLoadLabel(totalVolume);

    const itemsList = cart.map(li => `• ${li.qty}× ${li.name} — ${li.volume.toFixed(1)} pts`).join("\n");
    const loads = Math.floor(totalVolume / fullLoadPoints);
    const remainderPct = Math.round(((totalVolume % fullLoadPoints) / fullLoadPoints) * 100);
    const header = `Estimated total: ~$${finalPrice.toFixed(2)} • ${loadLabel}${loads ? ` • +${loads} full load(s)` : ""}${remainderPct ? ` • ${remainderPct}% of next` : ""}`;

    res.status(200).json({
      reply: `${header}\n${itemsList}`,
      parsed: { cart, finalPrice: Math.round(finalPrice*100)/100, totalVolume, loadLabel }
    });

  } catch (e) {
    console.error("[/api/chat] error:", e);
    res.status(500).json({ error:"chat_error", detail:String(e?.message||e) });
  }
}
