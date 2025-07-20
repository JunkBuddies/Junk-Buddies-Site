// File: /api/smart-selector.js
import OpenAI from "openai";
import { db } from "../lib/firebase"; 
import { collection, addDoc } from "firebase/firestore";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { text, itemData, lead } = req.body;

  try {
    // --- Auto-save lead info (name/phone) to Firestore ---
    if (lead) {
      await addDoc(collection(db, "leadCaptures"), {
        name: lead.name || "",
        phone: lead.phone || "",
        timestamp: Date.now(),
      });
    }

    // If no text to process (just saving lead), return success early
    if (!text) {
      return res.status(200).json({ message: "Lead captured" });
    }

    // --- AI Matching Logic for Items ---
    const prompt = `
Match the following items against this list (match closest names):
${JSON.stringify(itemData)}

User list: "${text}"

For any items NOT found, estimate Small (8 cu ft, $50), Medium (12 cu ft, $70), or Large (20 cu ft, $100).
Label those as "Miscellaneous".

Return ONLY a JSON array, no text, like:
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
    const parsed = JSON.parse(aiText);

    // Log unlisted items separately
    const unlisted = parsed.filter((i) => i.category === "unlisted");
    for (const item of unlisted) {
      await addDoc(collection(db, "unlistedItems"), item);
    }

    res.status(200).json(parsed);
  } catch (err) {
    console.error("Smart Selector API error:", err);
    res.status(500).json({ error: err.message });
  }
}

