// api/chat.js — Step 2: verify pricing import
export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  try {
    const mod = await import("../src/utils/pricing.js"); // <- your file
    res.status(200).json({
      ok: true,
      exports: Object.keys(mod),
      hasCalculatePrice: typeof mod.calculatePrice === "function",
      hasFullLoadPoints: typeof mod.fullLoadPoints !== "undefined",
      hasGetLoadLabel: typeof mod.getLoadLabel === "function"
    });
  } catch (e) {
    res.status(500).json({
      error: "pricing_import_failed",
      detail: String(e?.message || e)
    });
  }
}
