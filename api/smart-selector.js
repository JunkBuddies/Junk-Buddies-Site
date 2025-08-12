// /api/smart-selector.js
// ESM handler for Vercel (because your repo uses `"type":"module"`)

const CATALOG = [
  // Minimal sample catalog — expand as you like (names should match your itemData names)
  { name: "Couch / Sofa",            price: 95,  volume: 50,  category: "Furniture", keywords: ["couch", "sofa", "sectional"] },
  { name: "Dresser",                 price: 60,  volume: 30,  category: "Furniture", keywords: ["dresser"] },
  { name: "Treadmill",               price: 110, volume: 40,  category: "Exercise",  keywords: ["treadmill"] },
  { name: "Mattress (Queen)",        price: 70,  volume: 35,  category: "Furniture", keywords: ["mattress", "queen mattress"] },
  { name: "Refrigerator",            price: 120, volume: 45,  category: "Appliances", keywords: ["fridge", "refrigerator"] },
  { name: "Moving Boxes (x5)",       price: 25,  volume: 15,  category: "Boxes",     keywords: ["box", "boxes", "moving boxes"] },
  { name: "TV Stand",                price: 45,  volume: 20,  category: "Furniture", keywords: ["tv stand", "entertainment stand"] },
  { name: "Office Chair",            price: 35,  volume: 15,  category: "Furniture", keywords: ["office chair", "desk chair"] }
];

// --- Utility: simple keyword extractor as a fallback ---
function extractItemsHeuristically(text) {
  const t = (text || "").toLowerCase();
  const found = [];
  const foundNames = new Set();

  for (const item of CATALOG) {
    if (item.keywords.some(k => t.includes(k))) {
      if (!foundNames.has(item.name)) {
        found.push({ name: item.name, price: item.price, volume: item.volume, category: item.category });
        foundNames.add(item.name);
      }
    }
  }

  // very rough quantity detection for boxes
  const boxMatch = t.match(/(\d+)\s*(box|boxes)/);
  if (boxMatch) {
    const qty = Math.max(1, Math.min(50, parseInt(boxMatch[1], 10)));
    const bundleSize = 5;
    const bundles = Math.ceil(qty / bundleSize);
    const base = CATALOG.find(i => i.name.startsWith("Moving Boxes"));
    if (base) {
      for (let i = 0; i < bundles; i++) {
        found.push({ name: base.name, price: base.price, volume: base.volume, category: base.category });
      }
    }
  }

  return found;
}

// --- Utility: build a strict system prompt for JSON output ---
function buildSystemPrompt() {
  return [
    "You are Junk Buddies Smart Selector.",
    "Goal: Turn the user's description of junk items into a list of items to add to a cart.",
    "Return STRICT JSON with this shape ONLY:",
    "{",
    '  "reply": string,',
    '  "cartItems": [ { "name": string, "price": number, "volume": number, "category": string }, ... ]',
    "}",
    "No backticks. No extra text. No markdown. If uncertain, reply courteously and leave cartItems empty.",
  ].join("\n");
}

// --- Utility: call OpenAI (if key present) and parse strict JSON ---
async function callOpenAI(messages, leadInfo) {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_API_KEY) return null; // no key -> tell caller to fallback

  // Build chat in OpenAI format
  const sys = { role: "system", content: buildSystemPrompt() };
  const chatMsgs = [sys, ...messages.map(m => ({
    role: m.role === "assistant" ? "assistant" : "user",
    content: m.content || ""
  }))];

  // Optional: nudge the model with lightweight catalog context
  const catalogSummary = "Catalog examples: " + CATALOG.map(c => `${c.name} ($${c.price}, ${c.volume} cu ft, ${c.category})`).join("; ");
  chatMsgs.push({ role: "system", content: catalogSummary });

  // Optional: include lead info lightly (doesn't change output type)
  if (leadInfo?.name || leadInfo?.phone) {
    chatMsgs.push({ role: "system", content: `Potential lead: name=${leadInfo.name || ""}, phone=${leadInfo.phone || ""}` });
  }

  const resp = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",           // fast & cheap; change if you prefer
      temperature: 0.2,
      response_format: { type: "json_object" }, // force JSON
      messages: chatMsgs
    })
  });

  if (!resp.ok) {
    const txt = await resp.text().catch(() => "");
    throw new Error(`OpenAI HTTP ${resp.status} ${resp.statusText}: ${txt}`);
  }

  const data = await resp.json();
  const content = data?.choices?.[0]?.message?.content?.trim();
  if (!content) throw new Error("OpenAI returned empty content");

  // Parse JSON safely
  let json;
  try {
    json = JSON.parse(content);
  } catch (e) {
    throw new Error("Failed to parse OpenAI JSON");
  }

  // Validate minimal shape
  const reply = typeof json.reply === "string" ? json.reply : "OK.";
  const cartItems = Array.isArray(json.cartItems) ? json.cartItems : [];
  // sanitize items a bit
  const cleaned = cartItems
    .filter(i => i && i.name)
    .map(i => ({
      name: String(i.name),
      price: Number.isFinite(i.price) ? i.price : 0,
      volume: Number.isFinite(i.volume) ? i.volume : 0,
      category: i.category ? String(i.category) : "Other"
    }));

  return { reply, cartItems: cleaned };
}

export default async function handler(req, res) {
  // CORS (safe even on same-origin)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS, GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method === "GET") return res.status(200).json({ ok: true, where: "vercel", ts: Date.now() });
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  try {
    // Parse JSON body
    let body = {};
    try {
      body = req.body && typeof req.body === "object" ? req.body : JSON.parse(req.body || "{}");
    } catch (_) {
      body = {};
    }

    const messages = Array.isArray(body.messages) ? body.messages : [];
    const leadInfo = body.leadInfo || { submitted: false };

    // 1) Try OpenAI if key is present
    let result = null;
    try {
      result = await callOpenAI(messages, leadInfo);
    } catch (err) {
      console.error("OpenAI error:", err?.message || err);
      result = null; // fall back below
    }

    // 2) Fallback: keyword extractor on the user's latest message
    if (!result) {
      const lastUser = [...messages].reverse().find(m => m.role === "user");
      const text = lastUser?.content || "";
      const items = extractItemsHeuristically(text);
      const reply = items.length
        ? "I found some items from your description. You can add more or say 'done' when ready."
        : "Tell me what you need removed (e.g., 'one couch and 6 boxes').";
      return res.status(200).json({ reply, cartItems: items });
    }

    // 3) Return OpenAI result
    return res.status(200).json(result);
  } catch (err) {
    console.error("smart-selector fatal:", err?.stack || err);
    return res.status(500).json({ error: "Server error", detail: String(err?.message || err) });
  }
}
