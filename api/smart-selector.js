// ESM Vercel API proxy to Cloud Run
const UPSTREAM = "https://smartselector-nbclj4qvoq-uc.a.run.app";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS, GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();

  if (req.method === "GET") {
    try {
      const r = await fetch(UPSTREAM, { method: "GET" });
      const data = await r.json().catch(() => ({}));
      return res.status(200).json({ ok: true, via: "vercel-proxy", upstream: data });
    } catch {
      return res.status(200).json({ ok: true, via: "vercel-proxy", upstream: "unreachable" });
    }
  }

  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  try {
    const body = (req.body && typeof req.body === "object") ? JSON.stringify(req.body) : (req.body || "{}");
    const upstream = await fetch(UPSTREAM, { method: "POST", headers: { "Content-Type": "application/json" }, body });
    const text = await upstream.text();
    try {
      return res.status(upstream.status).json(JSON.parse(text));
    } catch {
      res.setHeader("Content-Type", "application/json");
      return res.status(upstream.status).send(text);
    }
  } catch (err) {
    return res.status(502).json({ error: "Proxy failed", detail: String(err?.message || err) });
  }
}
