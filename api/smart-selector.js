// /api/smart-selector.js
module.exports = async (req, res) => {
  try {
    // Basic CORS (harmless on same-origin)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(204).end();
    if (req.method === 'GET') {
      return res.status(200).json({ ok: true, where: 'vercel', ts: Date.now() });
    }
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }

    // Our minimal stub
    return res.status(200).json({ reply: 'AI is reachable on Vercel ✅' });
  } catch (err) {
    console.error('smart-selector error:', err);
    return res.status(500).json({ error: 'Server error', detail: String(err && err.stack || err) });
  }
};
