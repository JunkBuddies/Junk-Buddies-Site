// File: /api/smart-selector.js
import OpenAI from "openai";
import itemData from "../src/data/itemData.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS, GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method === "GET") return res.status(200).json({ ok: true, where: "vercel" });
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  try {
    const { messages, leadInfo, discountApplied, cartItems } = req.body;

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    // Flatten item list for AI reference
    const flatItems = itemData.flatMap(section => section.items.map(item => item.name));

    const prompt = `
You are "Junk Buddies Smart Selector", a friendly assistant for a junk removal site.
You:
- Greet customers casually when chat starts.
- Offer discount NOW or continue adding items.
- If discount chosen, confirm and show prices as cart builds.
- If keep adding, ask "add more or see price?" in different ways until price is requested.
- When showing price, offer discount again if not applied.
- After discount + name/phone → send scheduling link: "/schedule".
- ALWAYS confirm added items by name and show current list in a friendly tone.

Item list reference:
${flatItems.join(", ")}
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: prompt },
        ...messages.map(m => ({ role: m.sender === "user" ? "user" : "assistant", content: m.text }))
      ],
      temperature: 0.7,
    });

    const aiReply = completion.choices[0]?.message?.content || "Got it!";

    // Example: Extract items from AI reply if matching names in itemData
    const matchedItems = flatItems.filter(item =>
      aiReply.toLowerCase().includes(item.toLowerCase())
    ).map(name => ({ name }));

    res.status(200).json({
      reply: aiReply,
      cartItems: matchedItems,
      discountApplied: discountApplied || false,
      leadInfo: leadInfo || {}
    });

  } catch (err) {
    console.error("Smart Selector error:", err);
    res.status(500).json({ error: "Smart Selector failed", details: err.message });
  }
}
