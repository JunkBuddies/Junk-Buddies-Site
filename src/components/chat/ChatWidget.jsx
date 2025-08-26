// File: src/components/chat/ChatWidget.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useCart } from "../../context/CartContext";
import { calculatePrice } from "../../utils/pricing";
import { useNavigate } from "react-router-dom";

const GOLD = "#d4af37";
const BLACK = "#0b0b0b";
const DISCOUNT_RATE = 0.10; // 10% off

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
    {
      role: "assistant",
      content:
        "Hi! Tell me what you need removed (typos OK). I’ll total volume & price from our catalog.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [aiStatus, setAiStatus] = useState("unknown"); // "on" | "off" | "unknown"
  const [lastParsed, setLastParsed] = useState(null);   // { cart, finalPrice, totalVolume, loadLabel }

  // discount + lead flags (persisted per session)
  const [discountActive, setDiscountActive] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [initialGateShown, setInitialGateShown] = useState(false);
  const [offeredThisParse, setOfferedThisParse] = useState(false);

  // blocking gate (disables free typing while visible)
  const [gate, setGate] = useState(null);
  // gate = { id: "offer_pre" | "offer_post" | "lead_capture", text, buttons: [{label,value,variant}] }

  const endRef = useRef(null);
  const sessionId = useMemo(getSessionId, []);
  const { setCart } = useCart() || { setCart: () => {} };
  const navigate = useNavigate();

  // hydrate persisted flags
  useEffect(() => {
    const d = localStorage.getItem(`jb_disc_on_${sessionId}`) === "1";
    const l = localStorage.getItem(`jb_lead_${sessionId}`) === "1";
    setDiscountActive(d);
    setLeadCaptured(l);
  }, [sessionId]);

  // persist flags
  useEffect(() => {
    localStorage.setItem(`jb_disc_on_${sessionId}`, discountActive ? "1" : "0");
  }, [discountActive, sessionId]);
  useEffect(() => {
    localStorage.setItem(`jb_lead_${sessionId}`, leadCaptured ? "1" : "0");
  }, [leadCaptured, sessionId]);

  // autoscroll
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open, loading, gate]);

  const cartSummary = lastParsed?.cart?.length ? calculatePrice(lastParsed.cart) : null;

  // Show initial 10% offer ONCE when chat opens (doesn't require capture).
  useEffect(() => {
    if (!open || initialGateShown || discountActive) return;
    const flag = localStorage.getItem(`jb_pre_offer_shown_${sessionId}`);
    if (flag === "1") return;
    setGate({
      id: "offer_pre",
      text:
        "Want **10% off** applied to your estimate before we add items?",
      buttons: [
        { label: "Yes, apply 10% early", value: "yes", variant: "primary" },
        { label: "No thanks", value: "no", variant: "secondary" },
      ],
    });
    setInitialGateShown(true);
  }, [open, initialGateShown, discountActive, sessionId]);

  function discountedPrice(base) {
    const v = Math.max(0, Math.round((base * (1 - DISCOUNT_RATE) + Number.EPSILON) * 100) / 100);
    return v;
  }

  async function send() {
    const text = input.trim();
    if (!text || loading || gate) return; // block free text while a gate is active
    setError("");
    setInput("");
    setMessages((m) => [...m, { role: "user", content: text }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          messages: [...messages, { role: "user", content: text }],
        }),
      });

      const aiHeader = (res.headers.get("x-ai") || "").toLowerCase();
      setAiStatus(aiHeader === "on" ? "on" : aiHeader === "off" ? "off" : "unknown");

      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Request failed");

      // keep AI reply intact
      setLastParsed(json.parsed || null);
      setMessages((m) => [...m, { role: "assistant", content: json.reply }]);

      // reset post-parse offer sentinel
      setOfferedThisParse(false);

      // If we got a priced parse:
      if ((json.parsed?.cart?.length || 0) > 0) {
        if (discountActive) {
          // auto-show discounted total as a follow-up (no extra gate)
          const base = json.parsed.finalPrice ?? 0;
          const disc = discountedPrice(base);
          const label = json.parsed.loadLabel ? ` • ${json.parsed.loadLabel}` : "";
          setMessages((m) => [
            ...m,
            {
              role: "assistant",
              content: `With **10% off**: **$${disc.toFixed(2)}** (was $${base.toFixed(2)})${label}.`,
            },
          ]);
        } else if (!offeredThisParse) {
          // offer to see 10% off — this one REQUIRES capture before applying
          setGate({
            id: "offer_post",
            text: "Want to see your price **with 10% off**?",
            buttons: [
              { label: "Yes — show 10% off", value: "yes", variant: "primary" },
              { label: "No thanks", value: "no", variant: "secondary" },
            ],
          });
          setOfferedThisParse(true);
        }
      }
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

  // Handle blocking gate choices
  function onGateChoice(val) {
    if (!gate) return;

    if (gate.id === "offer_pre") {
      // only once per session
      localStorage.setItem(`jb_pre_offer_shown_${sessionId}`, "1");
      setGate(null);
      if (val === "yes") {
        setDiscountActive(true);
        setMessages((m) => [
          ...m,
          { role: "assistant", content: "Great — I’ll apply **10% off** to your estimate going forward." },
        ]);
      } else {
        setMessages((m) => [...m, { role: "assistant", content: "No problem — we can add it later if you want." }]);
      }
      return;
    }

    if (gate.id === "offer_post") {
      setGate(null);
      if (val === "yes") {
        // require capture first (blocking)
        setGate({
          id: "lead_capture",
          text: "To unlock **10% off**, may we send quick updates? (You’ll see the discounted price next.)",
          buttons: [
            { label: "Yes — apply 10% now", value: "claim", variant: "primary" },
            { label: "No thanks", value: "decline", variant: "secondary" },
          ],
        });
      }
      return;
    }

    if (gate.id === "lead_capture") {
      setGate(null);
      if (val === "claim") {
        setLeadCaptured(true);
        setDiscountActive(true);
        if (lastParsed?.finalPrice != null) {
          const base = lastParsed.finalPrice;
          const disc = discountedPrice(base);
          const label = lastParsed?.loadLabel ? ` • ${lastParsed.loadLabel}` : "";
          setMessages((m) => [
            ...m,
            {
              role: "assistant",
              content: `Your **10% off** is active — discounted total: **$${disc.toFixed(
                2
              )}** (was $${base.toFixed(2)})${label}.`,
            },
          ]);
        } else {
          setMessages((m) => [
            ...m,
            { role: "assistant", content: "Your **10% off** is active — tell me your items and I’ll apply it." },
          ]);
        }
      } else {
        setMessages((m) => [
          ...m,
          { role: "assistant", content: "All good — I’ll keep showing regular pricing." },
        ]);
      }
      return;
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
            zIndex: 9999,
          }}
          aria-label="Open chat"
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
            border: `1px solid ${GOLD}`,
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "10px",
              borderBottom: `1px solid ${GOLD}`,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span style={{ fontWeight: "bold", flex: 1 }}>Junk Buddies Chat</span>
            <span
              title={
                aiStatus === "on"
                  ? "AI parser active"
                  : aiStatus === "off"
                  ? "AI disabled — using fallback parser"
                  : "Status unknown"
              }
              style={{
                fontSize: 12,
                padding: "2px 8px",
                borderRadius: 999,
                border: `1px solid ${GOLD}`,
                color:
                  aiStatus === "on"
                    ? "#22c55e"
                    : aiStatus === "off"
                    ? "#9ca3af"
                    : "#f59e0b",
                background: "#111",
              }}
            >
              AI: {aiStatus.toUpperCase()}
            </span>
            <button
              onClick={() => setOpen(false)}
              style={{
                marginLeft: 8,
                background: "transparent",
                border: "none",
                color: "#fff",
                cursor: "pointer",
              }}
              aria-label="Close chat"
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
                    color: m.role === "user" ? BLACK : "#fff",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {m.content}
                </span>
              </div>
            ))}

            {/* Blocking gate */}
            {gate && (
              <div
                style={{
                  marginTop: 8,
                  padding: 10,
                  borderRadius: 10,
                  border: `1px solid ${GOLD}`,
                  background: "#151515",
                }}
              >
                <div style={{ marginBottom: 8, fontWeight: 600 }}>{gate.text}</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {gate.buttons.map((b, idx) => (
                    <button
                      key={idx}
                      onClick={() => onGateChoice(b.value)}
                      style={{
                        borderRadius: 8,
                        padding: "6px 10px",
                        cursor: "pointer",
                        fontWeight: 700,
                        background: b.variant === "primary" ? GOLD : "#222",
                        color: b.variant === "primary" ? BLACK : "#fff",
                        border: b.variant === "primary" ? "none" : `1px solid ${GOLD}`,
                      }}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {loading && <div style={{ fontStyle: "italic", marginTop: 8 }}>Assistant is typing…</div>}
            {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
            <div ref={endRef} />
          </div>

          {/* Parsed result preview & actions */}
          <div style={{ borderTop: `1px solid ${GOLD}`, padding: 10, background: "#111" }}>
            <div style={{ fontSize: 12, marginBottom: 6 }}>
              <strong>Parsed:</strong>{" "}
              {lastParsed?.cart?.length
                ? `${lastParsed.cart.length} lines • ${Math.round(
                    lastParsed.totalVolume || 0
                  )} pts • $${(
                    (lastParsed.finalPrice ?? 0) *
                    (discountActive ? 1 - DISCOUNT_RATE : 1)
                  ).toFixed(2)}${discountActive ? " (10% off applied)" : ""}`
                : "nothing yet"}
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button
                onClick={addParsedToCart}
                disabled={!lastParsed?.cart?.length}
                style={{
                  borderRadius: 8,
                  background: GOLD,
                  color: BLACK,
                  fontWeight: 700,
                  padding: "6px 10px",
                  cursor: "pointer",
                }}
              >
                Add selected to cart
              </button>
              <button
                onClick={() => navigate("/itemized")}
                style={{
                  borderRadius: 8,
                  background: "#222",
                  color: "#fff",
                  padding: "6px 10px",
                  border: `1px solid ${GOLD}`,
                  cursor: "pointer",
                }}
              >
                View cart / edit
              </button>
            </div>
          </div>

          {/* Input (disabled while a gate is active) */}
          <div style={{ borderTop: `1px solid ${GOLD}`, padding: 10, opacity: gate ? 0.6 : 1 }}>
            <textarea
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder={gate ? "Please choose an option above…" : "Type your message..."}
              disabled={!!gate}
              style={{ width: "80%", borderRadius: 8, padding: 6 }}
            />
            <button onClick={send} disabled={loading || !!gate} style={{ marginLeft: 8 }}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
