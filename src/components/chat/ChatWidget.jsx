import { useEffect, useMemo, useRef, useState } from "react";
// If your CartContext exports a different hook, adjust this import:
import { useCart } from "../../context/CartContext";

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
  // Cart integration (graceful if API differs)
  const cartCtx = (typeof useCart === "function" ? useCart() : null) || {};
  const addItemsFn = cartCtx.addItems || null;
  const addItemFn  = cartCtx.addItem  || null;
  const addToCartFn= cartCtx.addToCart|| null;

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I’m your Junk Buddies assistant. Tell me items like “2 couches + treadmill + queen mattress” and I’ll estimate and suggest a cart."
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState([]); // [{id,name,qty,volume,price,selected}]
  const endRef = useRef(null);
  const sessionId = useMemo(getSessionId, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open, loading, suggestions]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    setError("");
    setInput("");
    setMessages((m) => [...m, { role: "user", content: text }]);
    setLoading(true);
    setSuggestions([]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          messages: [...messages, { role: "user", content: text }]
        })
      });

      const raw = await res.text();
      let json;
      try {
        json = JSON.parse(raw);
      } catch {
        json = { error: "non_json", detail: raw };
      }

      if (!res.ok) {
        setError(json?.detail || json?.error || `Server ${res.status}`);
        setMessages((m) => [
          ...m,
          { role: "assistant", content: "Sorry, I had trouble responding." }
        ]);
      } else {
        const reply = json?.reply || "Okay.";
        const cart = Array.isArray(json?.parsed?.cart) ? json.parsed.cart : [];
        setMessages((m) => [...m, { role: "assistant", content: reply }]);
        // Prepare suggestions with checkboxes checked by default
        setSuggestions(
          cart.map((it) => ({
            id: it.id || it.name,
            name: it.name,
            qty: Number(it.qty || 1),
            volume: Number(it.volume || 0),
            price: Number(it.price || 0),
            selected: true
          }))
        );
      }
    } catch (e) {
      setError("I had trouble responding. Please try again.");
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Sorry, I had trouble responding." }
      ]);
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

  function toggleSuggestion(i) {
    setSuggestions((prev) =>
      prev.map((s, idx) => (idx === i ? { ...s, selected: !s.selected } : s))
    );
  }

  function addSelectedToCart() {
    const selected = suggestions.filter((s) => s.selected);
    if (!selected.length) return;

    // Try common cart APIs; fallback to a DOM event
    if (typeof addItemsFn === "function") {
      addItemsFn(selected);
    } else if (typeof addItemFn === "function") {
      for (const s of selected) {
        addItemFn({ id: s.id, name: s.name, qty: s.qty, volume: s.volume, price: s.price });
      }
    } else if (typeof addToCartFn === "function") {
      for (const s of selected) {
        addToCartFn({ id: s.id, name: s.name, qty: s.qty, volume: s.volume, price: s.price });
      }
    } else {
      // Fallback: emit a browser event your app can listen for
      window.dispatchEvent(new CustomEvent("chat:add-items", { detail: selected }));
      console.warn(
        "[ChatWidget] CartContext API not found. Emitted 'chat:add-items' with selected items."
      );
    }

    setSuggestions([]);
    setMessages((m) => [
      ...m,
      { role: "assistant", content: "Added to cart ✅  (You can keep adding or say 'schedule')." }
    ]);
  }

  const anyCartAPI =
    typeof addItemsFn === "function" ||
    typeof addItemFn === "function" ||
    typeof addToCartFn === "function";

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
          aria-label="Open chat"
          title="Chat • Get Estimate"
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
              aria-label="Close chat"
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
                    color: m.role === "user" ? BLACK : "#fff",
                    whiteSpace: "pre-wrap"
                  }}
                >
                  {m.content}
                </span>
              </div>
            ))}

            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div
                style={{
                  background: "#111",
                  border: `1px solid ${GOLD}`,
                  borderRadius: 10,
                  padding: 8,
                  marginTop: 8
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 6 }}>
                  Suggested items
                </div>
                <div style={{ display: "grid", gap: 6 }}>
                  {suggestions.map((s, i) => (
                    <label key={s.id + "_" + i} style={{ fontSize: 13, display: "flex", gap: 8 }}>
                      <input
                        type="checkbox"
                        checked={s.selected}
                        onChange={() => toggleSuggestion(i)}
                      />
                      <span style={{ lineHeight: 1.2 }}>
                        {s.qty}× {s.name}
                        <span style={{ color: "#bbb" }}>
                          {" "}
                          — {s.volume.toFixed(1)} pts
                          {s.price ? ` • $${s.price.toFixed(2)}` : ""}
                        </span>
                      </span>
                    </label>
                  ))}
                </div>
                <button
                  onClick={addSelectedToCart}
                  style={{
                    marginTop: 8,
                    width: "100%",
                    borderRadius: 8,
                    background: GOLD,
                    color: BLACK,
                    fontWeight: 700,
                    padding: "8px 10px",
                    cursor: "pointer"
                  }}
                  disabled={!anyCartAPI && typeof window === "undefined"}
                  title={
                    anyCartAPI
                      ? "Add selected items"
                      : "No CartContext API detected — will emit 'chat:add-items' event"
                  }
                >
                  Add selected to cart
                </button>
              </div>
            )}

            {loading && <div style={{ fontStyle: "italic", marginTop: 6 }}>Assistant is typing…</div>}
            {error && <div style={{ color: "red", marginTop: 6 }}>{error}</div>}
            <div ref={endRef} />
          </div>

          {/* Input */}
          <div style={{ borderTop: `1px solid ${GOLD}`, padding: 10 }}>
            <textarea
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder={loading ? "Working..." : "Type items and press Enter"}
              style={{ width: "80%", borderRadius: 8, padding: 6 }}
              disabled={loading}
            />
            <button onClick={send} disabled={loading || !input.trim()} style={{ marginLeft: 8 }}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
