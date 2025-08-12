// /api/smart-selector.js
module.exports = async (req, res) => {
  // CORS (nice to have; same-origin calls won’t need it, but it’s harmless)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();

  // Quick GET test in browser: /api/smart-selector
  if (req.method === 'GET') {
    return res.status(200).json({ ok: true, where: 'vercel', time: new Date().toISOString() });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // For now: AI-only stub so we can verify the round trip
  // const { messages, leadInfo } = req.body || {};
  return res.status(200).json({ reply: 'AI is reachable on Vercel ✅' });
};
