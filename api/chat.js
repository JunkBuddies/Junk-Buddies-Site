// api/chat.js — health check
module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") return res.status(200).json({ ok: true, method: req.method, node: process.version });
  return res.status(200).json({ ok: true, node: process.version });
};
