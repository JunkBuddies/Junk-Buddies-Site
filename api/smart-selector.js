// File: functions/smart-selector.js
import OpenAI from "openai";
import itemData from "../src/data/itemData.js"; // Ensure this path is correct in your setup

export default async function handler(req, res) {
  // Allow cross-origin
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS, GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method === "GET") return res.status(200).json({ ok: true, where: "cloud-function" });
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  try {
    const { messages, leadInfo, discountApplied, cartItems } = req.body;

    // Create OpenAI instance — key comes from your function environment
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    // Flatten all items from itemData for AI reference
    const flatItems = itemData.flatMap(section =>
      section.items.map(item => item.name)
    );

    // Core prompt for AI behavior
    const prompt = `
You are "Junk Buddies Smart Selector", a friendly live-agent style assistant for a junk removal site.
Follow this exact conversational flow:

1. Greet warmly and casually on first message.
2. Briefly explain they can list items OR apply a 10% discount now to see prices as their cart builds.
3. If discount is chosen: confirm it's applied and show running total as items are added.
4. If they keep listing items: after each, confirm added items by name and show their current list in a friendly tone.
5. After each confirmation, ask "Add more or see price?" in different wording to keep it natural.
6. When showing the price: if discount is not applied yet, offer "See price with discount?" in a persuasive but not pushy way.
7. After discount + name/phone provided → give this link exactly: "/schedule".
8. Keep responses short, casual, and human — no corporate script.
9. Always match item names to known inventory list when possible.

Reference inventory:
${flatItems.join(", ")}
`;

    // Send conversation to AI
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

    // Match items from AI reply to inventory
    const matchedItems = flatItems
      .filter(item => aiReply.toLowerCase().includes(item.toLowerCase()))
      .map(name => {
        const found = itemData
          .flatMap(s => s.items)
          .find(i => i.name.toLowerCase() === name.toLowerCase());
        return found ? found : { name };
      });

    // Send AI reply + matched cart items back to frontend
    res.status(200).json({
      reply: aiReply,
      cartItems: matchedItems,
      discountApplied: discountApplied || false,
      leadInfo: leadInfo || {}
    });

  } catch (err) {
    console.error("Smart Selector error:", err);
    res.status(500).json({
      error: "Smart Selector failed",
      details: err.message
    });
  }
}
