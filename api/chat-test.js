// File: api/chat-test.js
import OpenAI from "openai";

export default async function handler(req, res) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "OPENAI_API_KEY is missing" });
    }

    const client = new OpenAI({ apiKey });

    const completion = await client.responses.create({
      model: "gpt-4o-mini",
      input: "Say: Hello, Junk Buddies AI is connected!",
    });

    const reply = completion?.output?.[0]?.content?.[0]?.text || "No response";

    res.status(200).json({ success: true, reply });
  } catch (error) {
    console.error("Chat Test Error:", error);
    res.status(500).json({
      error: "Function failed",
      details: error.message,
    });
  }
}
