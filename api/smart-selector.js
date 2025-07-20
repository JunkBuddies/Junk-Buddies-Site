// File: api/smart-selector.js

import OpenAI from "openai";
import { db } from "../src/lib/firebase.js"; // adjust path if different
import { collection, addDoc } from "firebase/firestore";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Set in Vercel Environment Variables
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { text, itemData, leadInfo } = req.body;

    // --- 1) Save lead info (even partial) into Firestore ---
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

    // --- 2) Generate Smart Selector matches via OpenAI ---
    const prompt = `
Match the following items against this master list (match closest names):
${JSON.stringify(itemData)}

User list: "${text}"

For any items NOT found, estimate size:
- Small (8 cu ft, $50)
- Medium (12 cu ft, $70)
- Large (20 cu ft, $100)

Label unknowns as "unlisted".

Return ONLY JSON:
[
  { "name": "Item", "price": 100, "estimatedVolume": 20, "category": "known/unlisted" }
]
`;

    const completion = await client.responses.create({
      model: "gpt-4.1",
      input: prompt,
      max_tokens: 800,
    });

    const aiText = completion.output[0].content[0].text.trim();
    const parsed = JSON.parse(aiText);

    // --- 3) Save unlisted items into Firestore for review ---
    const unlistedItems = parsed.filter((i) => i.category === "unlisted");
    for (const item of unlistedItems) {
      try {
        await addDoc(collection(db, "unlistedItems"), {
          ...item,
          userList: text,
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
