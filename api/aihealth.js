// api/aihealth.js
export default async function handler(req, res) {
  const key = process.env.OPENAI_API_KEY || "";
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Access-Control-Expose-Headers", "X-AI, X-OpenAI-Status, X-Region");
  res.setHeader("X-AI", key ? "on" : "off");
  res.setHeader("X-Region", process.env.VERCEL_REGION || "unknown");

  const started = Date.now();

  try {
    if (!key) throw new Error("OPENAI_API_KEY missing on this deployment");

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000); // 8s timeout

    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${key}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: "Return JSON only." },
          { role: "user", content: "Return {\"ping\":true} exactly." }
        ]
      })
    });

    clearTimeout(timeout);
    const text = await r.text();
    res.setHeader("X-OpenAI-Status", String(r.status));
    return res.status(200).json({
      ok: r.ok,
      status: r.status,
      ms: Date.now() - started,
      sample: text.slice(0, 300) // show first 300 chars from OpenAI
    });
  } catch (e) {
    res.setHeader("X-OpenAI-Status", "error");
    return res.status(200).json({
      ok: false,
      ms: Date.now() - started,
      error: String(e?.message || e)
    });
  }
}
