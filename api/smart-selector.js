// /api/smart-selector.js
// ESM Vercel API route (Node runtime) — proxies to Cloud Run to avoid CORS
const UPSTREAM = "https://smartselector-nbclj4qvoq-uc.a.run.app";

export default async function handler(req, res) {
  // CORS headers (harmless here; useful if you ever hit cross-origin)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS, GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Preflight
  if (req.method === "OPTIONS") return res.status(204).end();

  // Health check passthrough
  if (req.method === "GET") {
    try {
      const upstreamRes = await fetch(UPSTREAM, { method: "GET" });
      const data = await upstreamRes.json().catch(() => ({}));
      return res.status(200).json({ ok: true, via: "vercel-proxy", upstream: data });
    } catch {
      return res.status(200).json({ ok: true, via: "vercel-proxy", upstream: "unreachable" });
    }
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const body = (req.body && typeof req.body === "object") ? JSON.stringify(req.body) : (req.body || "{}");

    const upstreamRes = await fetch(UPSTREAM, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body
    });

    const text = await upstreamRes.text();
    try {
      const json = JSON.parse(text);
      return res.status(upstreamRes.status).json(json);
    } catch {
      res.setHeader("Content-Type", "application/json");
      return res.status(upstreamRes.status).send(text);
    }
  } catch (err) {
    return res.status(502).json({ error: "Proxy failed", detail: String(err?.message || err) });
  }
}
