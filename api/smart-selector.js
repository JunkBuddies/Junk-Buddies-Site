import OpenAI from "openai";
import itemData from "../src/data/itemData.js"; // adjust if needed

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS, GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // ✅ Handle preflight
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  // Simple health check
  if (req.method === "GET") {
    return res.status(200).json({ ok: true, where: "firebase" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { messages, leadInfo, discountApplied, cartItems } = req.body;

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY // stored in Firebase config
    });

    const flatItems = itemData.flatMap(section =>
      section.items.map(item => item.name)
    );

    const prompt = `
You are "Junk Buddies Smart Selector", a friendly assistant for a junk removal site.
- Greet customers casually.
- Ask if they want discount applied now or keep adding.
- If discount: confirm + show prices as cart builds.
- If keep adding: keep asking "Add more or see price?" in different ways until price is requested.
- Show price, offer discount again if not applied.
- After discount + name/phone: send /schedule link.
- Always confirm added items and show current cart in a friendly way.

Items: ${flatItems.join(", ")}
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: prompt },
        ...messages.map(m => ({
          role: m.sender === "user" ? "user" : "assistant",
          content: m.text
        }))
      ],
      temperature: 0.7
    });

    const aiReply = completion.choices[0]?.message?.content || "Got it!";

    const matchedItems = flatItems
      .filter(item => aiReply.toLowerCase().includes(item.toLowerCase()))
      .map(name => ({ name }));

    res.status(200).json({
      reply: aiReply,
      cartItems: matchedItems,
      discountApplied: discountApplied || false,
      leadInfo: leadInfo || {}
    });
  } catch (err) {
    console.error("Smart Selector error:", err);
    res
      .status(500)
      .json({ error: "Smart Selector failed", details: err.message });
  }
}
