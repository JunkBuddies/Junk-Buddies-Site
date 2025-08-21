// api/chat.js — Step 2: verify pricing + itemData imports (ESM)
export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  try {
    const pricing = await import(new URL("../src/utils/pricing.js", import.meta.url).href);
    const dataMod = await import(new URL("../src/data/itemData.js", import.meta.url).href);
    const items = Array.isArray(dataMod) ? dataMod : (dataMod.default || dataMod.items || dataMod.ITEMS || dataMod.data || []);
    res.status(200).json({
      ok: true,
      pricingExports: Object.keys(pricing),
      itemCount: Array.isArray(items) ? items.length : 0
    });
  } catch (e) {
    res.status(500).json({ error: "import_failed", detail: String(e?.message || e) });
  }
}
