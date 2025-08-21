// api/chat.js — Step: load itemData.js (camelCase) and report count
export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  try {
    // IMPORTANT: exact case matters on the server (Linux is case-sensitive)
    const url = new URL("../src/data/itemData.js", import.meta.url);
    const mod = await import(url.href);

    // Accept common export shapes, but expect an ARRAY
    const data = Array.isArray(mod)
      ? mod
      : (mod.default || mod.items || mod.ITEMS || mod.data || []);

    if (!Array.isArray(data)) {
      return res.status(500).json({
        error: "itemdata_not_array",
        detail: "Expected an array export from src/data/itemData.js",
        keys: Object.keys(mod)
      });
    }

    return res.status(200).json({
      ok: true,
      path: url.href,
      count: data.length
    });
  } catch (e) {
    return res.status(500).json({
      error: "itemdata_import_failed",
      detail: String(e?.message || e)
    });
  }
}
