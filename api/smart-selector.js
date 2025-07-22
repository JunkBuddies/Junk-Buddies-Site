// File: api/smart-selector.js
import OpenAI from "openai";
import { db } from "../src/lib/firebase.js";
import { collection, addDoc } from "firebase/firestore";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Set this in Vercel Environment Variables
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages = [], itemData = [], leadInfo = {} } = req.body;

    // --- 1) Save partial lead info to Firestore ---
    if (leadInfo.name || leadInfo.phone) {
      try {
        await addDoc(collection(db, "leadCaptures"), {
          name: leadInfo.name || "",
          phone: leadInfo.phone || "",
          enteredAt: new Date(),
        });
      } catch (err) {
        console.error("Failed to save lead info:", err);
      }
    }

    // --- 2) Build conversational AI prompt ---
    const prompt = `
You are Junk Buddies' AI assistant. You help users build a junk removal list.

Rules:
- Always start by greeting politely (if it's the first message).
- Understand and match items against this master list:
${JSON.stringify(itemData)}

- If a user lists something NOT in the list, mark it as "unlisted" and estimate:
  Small (8 cu ft, $50), Medium (12 cu ft, $70), Large (20 cu ft, $100).
- Be conversational: keep responses short and helpful.
- Always summarize what was added and the running total.
- NEVER output raw JSON directly as chat — only friendly text.

Return ONLY a JSON object for the frontend, like this:
{
  "reply": "Chat-friendly response to user",
  "cartItems": [
    { "name": "Item", "price": 100, "volume": 20, "category": "known/unlisted" }
  ]
}

Conversation so far:
${JSON.stringify(messages)}
`;

    // --- 3) Call GPT to get a conversational response ---
    const completion = await client.responses.create({
      model: "gpt-4.1",
      input: prompt,
      max_tokens: 700,
    });

    const output = completion.output[0]?.content?.[0]?.text?.trim() || "";
    let parsed;

    try {
      parsed = JSON.parse(output);
    } catch (err) {
      console.error("AI output parsing failed. Raw output:", output);
      parsed = { reply: "Sorry, I couldn’t process that. Can you rephrase?", cartItems: [] };
    }

    // --- 4) Log any unlisted items in Firestore ---
    const unlisted = parsed.cartItems?.filter((i) => i.category === "unlisted") || [];
    for (const item of unlisted) {
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
