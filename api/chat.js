// api/chat.js — ESM health check
export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Content-Type", "application/json");
  res.status(200).end(JSON.stringify({
    ok: true,
    route: "chat",
    method: req.method,
    node: process.version,
    ts: Date.now()
  }));
}
