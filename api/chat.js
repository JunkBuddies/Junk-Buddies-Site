// api/chat.js — health check (CommonJS)
module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Content-Type", "application/json");
  return res.status(200).end(JSON.stringify({
    ok: true,
    method: req.method,
    node: process.version,
    ts: Date.now()
  }));
};
