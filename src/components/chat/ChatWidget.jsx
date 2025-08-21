import { useEffect, useMemo, useRef, useState } from "react";
import { useCart } from "../../context/CartContext";
import { calculatePrice } from "../../utils/pricing";
import { useNavigate } from "react-router-dom";

const GOLD = "#d4af37";
const BLACK = "#0b0b0b";

function getSessionId() {
  const key = "jb_chat_session";
  let s = localStorage.getItem(key);
  if (!s) {
    s = "sess_" + Math.random().toString(36).slice(2);
    localStorage.setItem(key, s);
  }
  return s;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! Tell me what you need removed (typos OK). I’ll total volume & price from our catalog." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [aiStatus, setAiStatus] = useState("unknown"); // "on" | "off" | "unknown"
  const [lastParsed, setLastParsed] = useState(null);   // { cart, finalPrice, totalVolume, loadLabel }

  const endRef = useRef(null);
  const sessionId = useMemo(getSessionId, []);
  const { cart, setCart } = useCart() || { cart: [], setCart: () => {} };
  const navigate = useNavigate();

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open, loading]);

  const cartSummary = lastParsed?.cart?.length ? calculatePrice(lastParsed.cart) : null;

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    setError("");
    setInput("");
    setMessages((m) => [...m, { role: "user", content: text }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, messages: [...messages, { role: "user", content: text }] })
      });

      // read AI status header (API exposes it)
      const aiHeader = (res.headers.get("x-ai") || "").toLowerCase();
      setAiStatus(aiHeader === "on" ? "on" : aiHeader === "off" ? "off" : "unknown");

      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Request failed");

      setLastParsed(json.parsed || null);
      setMessages((m) => [...m, { role: "assistant", content: json.reply }]);
    } catch (e) {
      setError("I had trouble responding. Please try again.");
      setAiStatus((s) => (s === "unknown" ? "off" : s));
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  function addParsedToCart() {
    if (!lastParsed?.cart?.length) return;
    setCart((prev) => [...prev, ...lastParsed.cart]);
  }

  return (
    <>
      {/* Floating launcher */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          style={{
            position: "fixed",
            right: 16,
            bottom: 16,
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: GOLD,
            border: `2px solid ${BLACK}`,
            fontWeight: 700,
            cursor: "pointer",
            zIndex: 9999
          }}
        >
          💬
        </button>
      )}

      {/* Chat window */}
      {open && (
        <div
          style={{
            position: "fixed",
            right: 16,
            bottom: 16,
            width: 360,
            maxWidth: "90vw",
            height: 560,
            maxHeight: "85vh",
            background: BLACK,
            color: "#fff",
            borderRadius: 16,
            boxShadow: "0 18px 40px rgba(0,0,0,0.5)",
            display: "flex",
            flexDirection: "column",
            zIndex: 10000,
            border: `1px solid ${GOLD}`
          }}
        >
          {/* Header */}
          <div style={{ padding: "10px", borderBottom: `1px solid ${GOLD}`, display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontWeight: "bold", flex: 1 }}>Junk Buddies Chat</span>
            <span
              title={aiStatus === "on" ? "AI parser active" : aiStatus === "off" ? "AI disabled — using fallback parser" : "Status unknown"}
              style={{
                fontSize: 12,
                padding: "2px 8px",
                borderRadius: 999,
                border: `1px solid ${GOLD}`,
                color: aiStatus === "on" ? "#22c55e" : aiStatus === "off" ? "#9ca3af" : "#f59e0b",
                background: "#111"
              }}
            >
              AI: {aiStatus.toUpperCase()}
            </span>
            <button
              onClick={() => setOpen(false)}
              style={{ marginLeft: 8, background: "transparent", border: "none", color: "#fff", cursor: "pointer" }}
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: 10 }}>
            {messages.map((m, i) => (
              <div key={i} style={{ margin: "6px 0", textAlign: m.role === "user" ? "right" : "left" }}>
                <span
                  style={{
                    display: "inline-block",
                    padding: "6px 10px",
                    borderRadius: 10,
                    background: m.role === "user" ? GOLD : "#222",
                    color: m.role === "user" ? BLACK : "#fff"
                  }}
                >
                  {m.content}
                </span>
              </div>
            ))}
            {loading && <div style={{ fontStyle: "italic" }}>Assistant is typing…</div>}
            {error && <div style={{ color: "red" }}>{error}</div>}
            <div ref={endRef} />
          </div>

          {/* Parsed result preview & actions */}
          <div style={{ borderTop: `1px solid ${GOLD}`, padding: 10, background: "#111" }}>
            <div style={{ fontSize: 12, marginBottom: 6 }}>
              <strong>Parsed:</strong>{" "}
              {lastParsed?.cart?.length
                ? `${lastParsed.cart.length} lines • ${Math.round(lastParsed.totalVolume || 0)} pts • $${(lastParsed.finalPrice ?? 0).toFixed(2)}`
                : "nothing yet"}
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button
                onClick={addParsedToCart}
                disabled={!lastParsed?.cart?.length}
                style={{ borderRadius: 8, background: GOLD, color: BLACK, fontWeight: 700, padding: "6px 10px", cursor: "pointer" }}
              >
                Add selected to cart
              </button>
              <button
                onClick={() => navigate("/itemized")}
                style={{ borderRadius: 8, background: "#222", color: "#fff", padding: "6px 10px", border: `1px solid ${GOLD}`, cursor: "pointer" }}
              >
                View cart / edit
              </button>
            </div>
          </div>

          {/* Input */}
          <div style={{ borderTop: `1px solid ${GOLD}`, padding: 10 }}>
            <textarea
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Type your message..."
              style={{ width: "80%", borderRadius: 8, padding: 6 }}
            />
            <button onClick={send} disabled={loading} style={{ marginLeft: 8 }}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
