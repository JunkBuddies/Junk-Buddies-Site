// File: api/chat-test.js
import OpenAI from "openai";

export default async function handler(req, res) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      console.error("ERROR: Missing OPENAI_API_KEY. Check your Vercel Environment Variables.");
      return res.status(500).json({ error: "OPENAI_API_KEY is missing or not set." });
    }

    const client = new OpenAI({ apiKey });

    const completion = await client.responses.create({
      model: "gpt-4o-mini",
      input: "Say: Hello, Junk Buddies AI is connected!",
      max_tokens: 50,
    });

    const reply =
      completion?.output?.[0]?.content?.[0]?.text?.trim() ||
      "No AI response received.";

    res.status(200).json({ success: true, reply });
  } catch (error) {
    console.error("Chat Test Error:", error);
    res.status(500).json({
      error: "Chat Test failed to execute",
      details: error.message || "Unknown error",
    });
  }
}
