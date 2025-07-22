// File: /api/chat-test.js
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Pulls from Vercel env vars (secure)
});

export default async function handler(req, res) {
  try {
    const completion = await client.responses.create({
      model: "gpt-4o-mini",
      input: "Say hello! This is a test from Junk Buddies site.",
    });

    const reply = completion.output_text || "No response from AI.";
    res.status(200).json({ success: true, reply });
  } catch (err) {
    console.error("Chat Test API error:", err);
    res.status(500).json({ success: false, error: "Failed to contact OpenAI" });
  }
}
