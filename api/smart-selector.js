

// File: api/smart-selector.js

import OpenAI from "openai";
import { db } from "../src/lib/firebase.js"; // adjust if your firebase.js is in a different path
import { collection, addDoc } from "firebase/firestore";

// Initialize OpenAI with API key from Vercel env vars
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { customerName, customerPhone, text, itemData } = req.body;

  if (!customerPhone || !text) {
    return res.status(400).json({ error: "Missing phone number or item text." });
  }

  try {
    // AI prompt to match items and estimate unknowns
    const prompt = `
Match the following items against this list (match closest names):
${JSON.stringify(itemData)}

User provided list: "${text}"

For any items NOT found, estimate Small (8 cu ft, $50), Medium (12 cu ft, $70), or Large (20 cu ft, $100). 
Label those as "unlisted".

Return ONLY a JSON array, no other text:
[
  { "name": "...", "price": 100, "estimatedVolume": 20, "category": "known/unlisted" }
]
`;

    const completion = await client.responses.create({
      model: "gpt-4.1",
      input: prompt,
      max_tokens: 800,
    });

    const aiText = completion.output[0].content[0].text.trim();
    const parsedItems = JSON.parse(aiText);

    // Save customer lead to Firestore
    await addDoc(collection(db, "leads"), {
      name: customerName || "Unknown",
      phone: customerPhone,
      itemsRequested: text,
      timestamp: new Date(),
    });

    // Save unlisted items for review
    const unlisted = parsedItems.filter((i) => i.category === "unlisted");
    for (const item of unlisted) {
      await addDoc(collection(db, "unlistedItems"), item);
    }

    res.status(200).json(parsedItems);
  } catch (err) {
    console.error("Smart Selector API error:", err);
    res.status(500).json({ error: err.message });
  }
}
