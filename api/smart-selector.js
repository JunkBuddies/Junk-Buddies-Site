import OpenAI from "openai";
import { db } from "../lib/firebase"; // adjust if your firebase.js is elsewhere
import { collection, addDoc } from "firebase/firestore";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // this comes from Vercel env vars
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { text, itemData } = req.body;

  try {
    const prompt = `
Match the following items against this list (match closest names):
${JSON.stringify(itemData)}

User list: "${text}"

For any items NOT found, estimate Small (8 cu ft, $50), Medium (12 cu ft, $70), or Large (20 cu ft, $100). 
Label those as "Miscellaneous".

Return ONLY a JSON array, no text, with:
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

    // Log unlisted items to Firestore for your review
    const unlisted = parsed.filter((i) => i.category === "unlisted");
    for (const item of unlisted) {
      await addDoc(collection(db, "unlistedItems"), item);
    }

    res.status(200).json(parsed);
  } catch (err) {
    console.error("Smart Selector error:", err);
    res.status(500).json({ error: err.message });
  }
}
