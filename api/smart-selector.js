// File: api/smart-selector.js
import OpenAI from "openai";
import { db } from "../src/lib/firebase.js";
import { collection, addDoc } from "firebase/firestore";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Make sure it's set in Vercel env vars
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages, itemData, leadInfo } = req.body;

    // --- 1) Save lead info (partial OK) ---
    if (leadInfo && (leadInfo.name || leadInfo.phone)) {
      try {
        await addDoc(collection(db, "leadCaptures"), {
          name: leadInfo.name || "",
          phone: leadInfo.phone || "",
          enteredAt: new Date(),
        });
      } catch (err) {
        console.error("Failed to save lead:", err);
      }
    }

    // --- 2) Build conversational prompt ---
    const prompt = `
You are Junk Buddies' AI assistant. Help users build a junk removal list.
- Greet politely.
- Parse items mentioned.
- Match against this master list:
${JSON.stringify(itemData)}

Rules:
- If a user lists something NOT in the list, mark it as "unlisted" and give it a rough size (Small 8 cu ft $50, Medium 12 cu ft $70, Large 20 cu ft $100).
- Always summarize items added and give a running total.
- Speak conversationally, one short response at a time.
- Do NOT dump JSON to the user; only return conversational text.

Your job is to:
1. Continue the conversation.
2. Build the final cart (return separately in JSON for frontend).

Current conversation: ${JSON.stringify(messages)}
Return ONLY JSON object like:
{
  "reply": "text response to show user",
  "cartItems": [ { "name": "Item", "price": 100, "volume": 20, "category": "known/unlisted" } ]
}
`;

    // --- 3) Call GPT to generate response ---
    const completion = await client.responses.create({
      model: "gpt-4.1",
      input: prompt,
      max_tokens: 700,
    });

    const output = completion.output[0].content[0].text.trim();
    let parsed;
    try {
      parsed = JSON.parse(output);
    } catch (err) {
      console.error("Failed to parse AI output:", output);
      parsed = { reply: "Sorry, I couldn't process that. Try again?", cartItems: [] };
    }

    // --- 4) Save unlisted items for review ---
    const unlistedItems = parsed.cartItems.filter((i) => i.category === "unlisted");
    for (const item of unlistedItems) {
      try {
        await addDoc(collection(db, "unlistedItems"), {
          ...item,
          loggedAt: new Date(),
        });
      } catch (err) {
        console.error("Failed to save unlisted item:", err);
      }
    }

    return res.status(200).json(parsed);
  } catch (err) {
    console.error("Smart Selector API error:", err);
    return res.status(500).json({ error: err.message });
  }
}

