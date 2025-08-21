// api/chat.js — catalog path diagnostic (ESM)
const CANDIDATES = [
  process.env.ITEMDATA_PATH,                  // if you set it in Vercel
  "../src/data/itemdata.js",
  "../src/itemdata.js",
  "../itemdata.js",
  "../src/utils/itemdata.js",
  "../src/data/items.js"
].filter(Boolean);

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  const results = [];
  for (const rel of CANDIDATES) {
    try {
      // Resolve the relative path robustly for ESM on Vercel
      const url = new URL(rel, import.meta.url);
      const mod = await import(url.href);
      const data = Array.isArray(mod) ? mod : (mod.default || mod.items || mod.ITEMS || mod.data || []);
      results.push({
        path: rel,
        resolved: url.href,
        ok: Array.isArray(data),
        count: Array.isArray(data) ? data.length : 0,
        keys: Object.keys(mod)
      });
      if (Array.isArray(data)) {
        return res.status(200).json({ ok: true, picked: rel, count: data.length, results });
      }
    } catch (e) {
      results.push({ path: rel, ok: false, error: String(e?.message || e) });
    }
  }

  return res.status(500).json({
    error: "itemdata_import_failed",
    hint: "Set ITEMDATA_PATH in Vercel to the correct relative path from /api/chat.js",
    results
  });
}
