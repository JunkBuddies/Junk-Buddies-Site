// api/chat.js — STEP 1: import + flatten + echo counts (safe)
function flattenCatalog(nested = []) {
  const flat = [];
  for (const cat of nested) {
    const category = cat.category || "";
    for (const it of (cat.items || [])) {
      flat.push({
        id: `${category}::${it.name || "Item"}`,
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
  res.setHeader("Cache-Control", "no-store");
  try {
    const pricing = await import(new URL("../src/utils/pricing.js", import.meta.url).href);
    const mod = await import(new URL("../src/data/itemData.js", import.meta.url).href);
    const nested = mod.default || mod.items || mod.ITEMS || mod.data || [];
    if (!Array.isArray(nested)) throw new Error("itemData is not an array");

    const flat = flattenCatalog(nested);
    res.status(200).json({
      ok: true,
      categories: nested.length,
      flatCount: flat.length,
      pricingExports: Object.keys(pricing)
    });
  } catch (e) {
    res.status(500).json({ error: "import_or_flatten_failed", detail: String(e?.message || e) });
  }
}
