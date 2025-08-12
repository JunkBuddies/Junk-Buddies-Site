// /api/smart-selector.js
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method === 'GET') return res.status(200).json({ ok: true, where: 'vercel' });
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  return res.status(200).json({ reply: 'AI is reachable on Vercel ✅' });
}
