import { useEffect, useMemo, useRef, useState } from "react";

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
    { role: "assistant", content: "Hi! I’m your Junk Buddies assistant. Tell me what you need removed + your ZIP — I’ll estimate and help you schedule." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const endRef = useRef(null);
  const sessionId = useMemo(getSessionId, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open, loading]);

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
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Request failed");
      setMessages((m) => [...m, { role: "assistant", content: json.reply }]);
    } catch (e) {
      setError("I had trouble responding. Please try again.");
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
            height: 500,
            maxHeight: "80vh",
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
          <div style={{ padding: "10px", borderBottom: `1px solid ${GOLD}` }}>
            <span style={{ fontWeight: "bold" }}>Junk Buddies Chat</span>
            <button
              onClick={() => setOpen(false)}
              style={{
                float: "right",
                background: "transparent",
                border: "none",
                color: "#fff",
                cursor: "pointer"
              }}
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: 10 }}>
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  margin: "6px 0",
                  textAlign: m.role === "user" ? "right" : "left"
                }}
              >
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
