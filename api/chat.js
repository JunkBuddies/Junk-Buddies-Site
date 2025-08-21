// api/chat.js — Step 3: verify item catalog import
// If your catalog isn’t exactly at ../src/data/itemdata.js,
// set ITEMDATA_PATH in Vercel → Settings → Environment Variables → Production
// to the real relative path from /api/chat.js (e.g., ../src/itemdata.js)

const ITEMDATA_PATH = process.env.ITEMDATA_PATH || "../src/data/itemdata.js";

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  try {
    const mod = await import(ITEMDATA_PATH);
    const data = Array.isArray(mod)
      ? mod
      : (mod.default || mod.items || mod.ITEMS || mod.data || []);
    res.status(200).json({
      ok: true,
      pathTried: ITEMDATA_PATH,
      type: Array.isArray(data) ? "array" : typeof data,
      count: Array.isArray(data) ? data.length : 0
    });
  } catch (e) {
    res.status(500).json({
      error: "itemdata_import_failed",
      pathTried: ITEMDATA_PATH,
      detail: String(e?.message || e)
    });
  }
}
