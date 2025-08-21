// api/chat.js — DEBUG: list matchable labels (no extras)
function norm(s=""){ return String(s).toLowerCase().trim(); }
function escRe(s){ return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  try {
    const dataMod = await import(new URL("../src/data/itemData.js", import.meta.url).href);
    const ITEMS = Array.isArray(dataMod) ? dataMod : (dataMod.default || dataMod.items || dataMod.ITEMS || dataMod.data || []);
    if (!Array.isArray(ITEMS) || !ITEMS.length) {
      return res.status(500).json({ error:"itemdata_empty" });
    }
    const labels = ITEMS.map(it => {
      const names = [
        ...(Array.isArray(it.aliases) ? it.aliases : []),
        it.name || "",
        it.id || ""
      ].map(norm).filter(Boolean);
      const uniq = [...new Set(names)];
      const pattern = uniq.map(escRe).join("|");
      return { id: it.id, name: it.name, aliases: uniq, pattern };
    });
    return res.status(200).json({ ok:true, count: ITEMS.length, labels });
  } catch (e) {
    return res.status(500).json({ error:"debug_failed", detail:String(e?.message||e) });
  }
}
