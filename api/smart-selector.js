// File: api/smart-selector.js
import OpenAI from "openai";
import { db } from "../src/lib/firebase.js";
import { collection, addDoc } from "firebase/firestore";
import itemData from "../src/data/itemData.js"; // ✅ Import your full structured item list

// --- Ensure API key is loaded correctly ---
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error("❌ ERROR: Missing OPENAI_API_KEY. Check your environment variables.");
}

const client = new OpenAI({ apiKey });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages, leadInfo } = req.body;

    // --- 1) Save lead info only once ---
    if (leadInfo?.submitted && (leadInfo.name || leadInfo.phone)) {
      try {
        await addDoc(collection(db, "leadCaptures"), {
          name: leadInfo.name || "",
          phone: leadInfo.phone || "",
          enteredAt: new Date(),
        });
      } catch (err) {
        console.error("❌ Lead save failed:", err);
      }
    }

    // --- 2) Build AI prompt ---
    const prompt = `
You are Junk Buddies' AI assistant. Help users quickly build a junk removal list.

- Always greet politely if chat is empty.
- Match items to this master list:
${JSON.stringify(itemData)}

Rules:
- If an item isn't in the list, classify as "unlisted" and assign:
  • Small (8 cu ft, $50)
  • Medium (12 cu ft, $70)
  • Large (20 cu ft, $100)
- Always summarize items and show a running total.
- Respond in short, natural sentences (no JSON formatting in the user-facing reply).
- Return only the following JSON:

{
  "reply": "short friendly response",
  "cartItems": [
    { "name": "Item Name", "price": 100, "volume": 20, "category": "known/unlisted" }
  ]
}

Conversation so far: ${JSON.stringify(messages)}
`;

    // --- 3) Call OpenAI ---
    const completion = await client.responses.create({
      model: "gpt-4.1",
      input: prompt,
    });

    const output = completion.output_text?.trim() || ""; // ✅ Safer text extraction

    let parsed;
    try {
      parsed = JSON.parse(output);
    } catch {
      console.error("❌ Bad AI response:", output);
      parsed = {
        reply: "Sorry, I didn’t get that. Could you rephrase?",
        cartItems: [],
      };
    }

    // --- 4) Save unlisted items ---
    const unlisted = parsed.cartItems.filter((i) => i.category === "unlisted");
    for (const item of unlisted) {
      try {
        await addDoc(collection(db, "unlistedItems"), {
          ...item,
          loggedAt: new Date(),
        });
      } catch (err) {
        console.error("❌ Failed to log unlisted item:", err);
      }
    }

    return res.status(200).json(parsed);
  } catch (err) {
    console.error("❌ Smart Selector API error:", err);
    return res.status(500).json({ error: "AI service failed." });
  }
}
