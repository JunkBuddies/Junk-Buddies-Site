// /api/smart-selector.js
// ESM API route for Vercel – AI-powered Smart Selector using your itemData

import itemData from '../src/data/itemData.js'; // adjust if path differs

// Flatten your itemData into one list
function flattenCatalog(data) {
  const out = [];
  for (const section of data || []) {
    const category = section?.category || 'Other';
    for (const item of section?.items || []) {
      if (!item?.name) continue;
      out.push({
        name: String(item.name),
        price: Number(item.price ?? 0),
        volume: Number(item.volume ?? 0),
        category
      });
    }
  }
  return out;
}
const CATALOG = flattenCatalog(itemData);

// Build a keyword index for fallback
function buildKeywordIndex(catalog) {
  const idx = [];
  for (const it of catalog) {
    const tokens = it.name.toLowerCase().split(/\s+/);
    idx.push({ item: it, tokens: new Set(tokens) });
  }
  return idx;
}
const KEYWORDS = buildKeywordIndex(CATALOG);

// Fallback: match keywords in user text
function extractHeuristic(text) {
  const t = (text || '').toLowerCase();
  const found = [];
  const seen = new Set();

  for (const { item, tokens } of KEYWORDS) {
    if ([...tokens].some(tok => t.includes(tok)) && !seen.has(item.name)) {
      found.push(item);
      seen.add(item.name);
    }
  }
  return found;
}

// System prompt for OpenAI
function buildSystemPrompt() {
  return [
    'You are Junk Buddies Smart Selector.',
    'From the user description, match items from the catalog and return JSON:',
    '{ "reply": string, "cartItems": [ { "name": string, "price": number, "volume": number, "category": string }, ... ] }',
    'Only use exact names from the catalog if possible. No markdown or extra text.'
  ].join('\n');
}

// Call OpenAI
async function callOpenAI(messages, leadInfo) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return null; // no key – fallback

  const sys = { role: 'system', content: buildSystemPrompt() };
  const chat = [sys, ...messages.map(m => ({
    role: m.role === 'assistant' ? 'assistant' : 'user',
    content: m.content || ''
  }))];

  // Add catalog summary
  const names = CATALOG.map(i => `${i.name} ($${i.price}, ${i.volume} cu ft, ${i.category})`).join('; ');
  chat.push({ role: 'system', content: `Catalog: ${names}` });

  if (leadInfo?.name || leadInfo?.phone) {
    chat.push({ role: 'system', content: `Lead: ${leadInfo.name || ''}, ${leadInfo.phone || ''}` });
  }

  const resp = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      temperature: 0.2,
      response_format: { type: 'json_object' },
      messages: chat
    })
  });

  if (!resp.ok) {
    const txt = await resp.text().catch(() => '');
    throw new Error(`OpenAI HTTP ${resp.status} ${resp.statusText}: ${txt}`);
  }

  const data = await resp.json();
  const content = data?.choices?.[0]?.message?.content?.trim();
  if (!content) throw new Error('Empty content from OpenAI');

  let json;
  try {
    json = JSON.parse(content);
  } catch {
    throw new Error('Invalid JSON from OpenAI');
  }

  // Validate & sanitize
  const reply = typeof json.reply === 'string' ? json.reply : 'OK.';
  const cartItems = Array.isArray(json.cartItems) ? json.cartItems : [];
  const cleaned = cartItems
    .filter(i => i && i.name)
    .map(i => {
      const match = CATALOG.find(ci => ci.name.toLowerCase() === String(i.name).toLowerCase());
      return match || {
        name: String(i.name),
        price: Number.isFinite(i.price) ? i.price : 0,
        volume: Number.isFinite(i.volume) ? i.volume : 0,
        category: i.category ? String(i.category) : 'Other'
      };
    });

  return { reply, cartItems: cleaned };
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method === 'GET') return res.status(200).json({ ok: true, where: 'vercel', ts: Date.now() });
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  try {
    let body = {};
    try {
      body = req.body && typeof req.body === 'object' ? req.body : JSON.parse(req.body || '{}');
    } catch {
      body = {};
    }

    const messages = Array.isArray(body.messages) ? body.messages : [];
    const leadInfo = body.leadInfo || { submitted: false };

    // Try OpenAI
    let result = null;
    try {
      result = await callOpenAI(messages, leadInfo);
    } catch (err) {
      console.error('OpenAI error:', err?.message || err);
    }

    if (!result) {
      // Fallback keyword match
      const lastUser = [...messages].reverse().find(m => m.role === 'user');
      const text = lastUser?.content || '';
      const items = extractHeuristic(text);
      const reply = items.length
        ? 'I found items matching your description.'
        : 'Tell me what you need removed (e.g., “couch and 6 boxes”).';
      return res.status(200).json({ reply, cartItems: items });
    }

    return res.status(200).json(result);
  } catch (err) {
    console.error('smart-selector fatal:', err?.stack || err);
    return res.status(500).json({ error: 'Server error', detail: String(err?.message || err) });
  }
}
