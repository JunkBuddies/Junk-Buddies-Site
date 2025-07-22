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

    // --- 1) Save lead info only once, not on every keystroke ---
    if (leadInfo?.submitted && (leadInfo.name || leadInfo.phone)) {
      try {
        await addDoc(collection(db, "leadCaptures"), {
          name: leadInfo.name || "",
          phone: leadInfo.phone || "",
          enteredAt: new Date(),
        });
      } catch (err) {
        console.error("Lead save failed:", err);
      }
    }

    // --- 2) Build conversational prompt ---
    const prompt = `
You are Junk Buddies' AI assistant. Help users quickly build a junk removal list.
- Always start with a polite greeting if the conversation is empty.
- Parse any items they mention.
- Match against this master list:
${JSON.stringify(itemData)}

Rules:
- For any item not in the list, categorize it as "unlisted" and assign a rough size:
  • Small (8 cu ft, $50)
  • Medium (12 cu ft, $70)
  • Large (20 cu ft, $100)
- Always summarize the added items and give a running total.
- Speak in short, conversational sentences (do NOT show JSON).
- Return cart items in a separate JSON array so the frontend can update.

Conversation so far: ${JSON.stringify(messages)}

Return ONLY this JSON (no extra text outside):
{
  "reply": "short conversational text for the user",
  "cartItems": [
    { "name": "Item Name", "price": 100, "volume": 20, "category": "known/unlisted" }
  ]
}
`;

    const completion = await client.responses.create({
      model: "gpt-4.1",
      input: prompt,
      max_tokens: 600,
    });

    const output = completion.output[0].content[0].text.trim();

    let parsed;
    try {
      parsed = JSON.parse(output);
    } catch {
      console.error("Bad AI response:", output);
      parsed = {
        reply: "Sorry, I had trouble understanding. Could you rephrase?",
        cartItems: [],
      };
    }

    // --- 3) Save any unlisted items for admin review ---
    const unlisted = parsed.cartItems.filter((i) => i.category === "unlisted");
    for (const item of unlisted) {
      try {
        await addDoc(collection(db, "unlistedItems"), {
          ...item,
          loggedAt: new Date(),
        });
      } catch (err) {
        console.error("Failed to log unlisted item:", err);
      }
    }

    return res.status(200).json(parsed);
  } catch (err) {
    console.error("Smart Selector API error:", err);
    return res.status(500).json({ error: "AI service failed." });
  }
}
