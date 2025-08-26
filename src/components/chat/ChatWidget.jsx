// File: src/components/chat/ChatWidget.jsx
import { useEffect, useMemo, useRef, useState, useRef as useRef2 } from "react";
import { useCart } from "../../context/CartContext";
import { calculatePrice } from "../../utils/pricing";
import { useNavigate } from "react-router-dom";

const GOLD = "#d4af37";
const BLACK = "#0b0b0b";
const DISCOUNT_RATE = 0.10; // 10%

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

  // discount / lead capture state
  const [discountActive, setDiscountActive] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [initialGateShown, setInitialGateShown] = useState(false);
  const [offeredThisParse, setOfferedThisParse] = useState(false);

  // blocking gate with optional mini-form
  // gate.id in: "offer_pre" | "offer_post" | "lead_capture"
  const [gate, setGate] = useState(null);
  const [leadDraft, setLeadDraft] = useState({ name: "", phone: "" });

  // guard to avoid duplicate discount follow-ups
  const lastDiscountSig = useRef2("");

  const endRef = useRef(null);
  const sessionId = useMemo(getSessionId, []);
  const { setCart } = useCart() || { setCart: () => {} };
  const navigate = useNavigate();

  // hydrate persisted flags + lead
  useEffect(() => {
    const d = localStorage.getItem(`jb_disc_on_${sessionId}`) === "1";
    const l = localStorage.getItem(`jb_lead_${sessionId}`) === "1";
    const n = localStorage.getItem(`jb_lead_name_${sessionId}`) || "";
    const p = localStorage.getItem(`jb_lead_phone_${sessionId}`) || "";
    setDiscountActive(d);
    setLeadCaptured(l);
    setLeadDraft({ name: n, phone: p });
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

  // initial (pre-items) discount offer once per session
  useEffect(() => {
    if (!open || initialGateShown || discountActive) return;
    const flag = localStorage.getItem(`jb_pre_offer_shown_${sessionId}`);
    if (flag === "1") return;
    setGate({
      id: "offer_pre",
      text: "Want **10% off** attached to your account before we add items?",
    });
    setInitialGateShown(true);
  }, [open, initialGateShown, discountActive, sessionId]);

  function discountedPrice(base) {
    return Math.max(0, Math.round((base * (1 - DISCOUNT_RATE) + Number.EPSILON) * 100) / 100);
  }

  async function send() {
    const text = input.trim();
    if (!text || loading || gate) return; // block while a gate is active
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

      // update parsed result
      setLastParsed(json.parsed || null);

      // Build message list atomically to avoid duplicate re-appends
      setMessages((prev) => {
        const next = [...prev, { role: "assistant", content: json.reply }];

        // if we got a priced parse, maybe show discount follow-up or offer gate
        const hasCart = (json.parsed?.cart?.length || 0) > 0;
        if (hasCart) {
          const base = json.parsed.finalPrice ?? 0;
          const loadLabel = json.parsed.loadLabel ? ` • ${json.parsed.loadLabel}` : "";
          const sig = `${base}|${json.parsed?.totalVolume || 0}`;

          if (discountActive) {
            // Avoid re-adding same discount line for the same estimate
            if (lastDiscountSig.current !== sig) {
              lastDiscountSig.current = sig;
              const disc = discountedPrice(base);
              next.push({
                role: "assistant",
                content: `With **10% off**: **$${disc.toFixed(2)}** (was $${base.toFixed(2)})${loadLabel}.`,
              });
            }
          } else if (!offeredThisParse) {
            setGate({
              id: "offer_post",
              text: "Want to see your price **with 10% off** attached to your account?",
            });
            setOfferedThisParse(true);
          }
        }
        return next;
      });

      // reset “offer once per parse” when new response arrives
      setOfferedThisParse(false);
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

  // Basic phone validation (US-ish): 10+ digits
  function validPhone(p) {
    const digits = (p || "").replace(/\D/g, "");
    return digits.length >= 10;
  }

  // Gating flow handler
  function onGateChoice(action) {
    if (!gate) return;

    // PRE-OFFER → move to lead capture if yes, else dismiss
    if (gate.id === "offer_pre") {
      localStorage.setItem(`jb_pre_offer_shown_${sessionId}`, "1");
      if (action === "yes") {
        setGate({
          id: "lead_capture",
          text:
            "Enter your name & phone — we’ll attach **10% off** to your account so it’s applied to your estimate.",
        });
      } else {
        setGate(null);
        setMessages((m) => [
          ...m,
          { role: "assistant", content: "No problem — we can add it later if you want." },
        ]);
      }
      return;
    }

    // POST-OFFER → move to lead capture if yes, else dismiss
    if (gate.id === "offer_post") {
      if (action === "yes") {
        setGate({
          id: "lead_capture",
          text:
            "Enter your name & phone — we’ll attach **10% off** to your account and show the discounted price next.",
        });
      } else {
        setGate(null);
        setMessages((m) => [
          ...m,
          { role: "assistant", content: "All good — I’ll keep showing regular pricing." },
        ]);
      }
      return;
    }

    // LEAD CAPTURE submit/decline
    if (gate.id === "lead_capture") {
      if (action === "submit") {
        if (!leadDraft.name.trim() || !validPhone(leadDraft.phone)) {
          // simple inline nudge; keep gate open
          setMessages((m) => [
            ...m,
            { role: "assistant", content: "Please add a name and a valid phone number (10+ digits)." },
          ]);
          return;
        }
        // persist + activate discount
        localStorage.setItem(`jb_lead_name_${sessionId}`, leadDraft.name.trim());
        localStorage.setItem(`jb_lead_phone_${sessionId}`, leadDraft.phone);
        setLeadCaptured(true);
        setDiscountActive(true);
        setGate(null);

        // If we already have a price, show discounted follow-up immediately
        if (lastParsed?.finalPrice != null) {
          const base = lastParsed.finalPrice;
          const disc = discountedPrice(base);
          const label = lastParsed?.loadLabel ? ` • ${lastParsed.loadLabel}` : "";
          setMessages((m) => [
            ...m,
            {
              role: "assistant",
              content: `Thanks, ${leadDraft.name}! Your **10% off** is attached to ${leadDraft.phone}. Discounted total: **$${disc.toFixed(
                2
              )}** (was $${base.toFixed(2)})${label}.`,
            },
          ]);
          lastDiscountSig.current = `${base}|${lastParsed?.totalVolume || 0}`;
        } else {
          setMessages((m) => [
            ...m,
            {
              role: "assistant",
              content: `Thanks, ${leadDraft.name}! Your **10% off** is attached to ${leadDraft.phone}. Tell me your items and I’ll apply it.`,
            },
          ]);
        }
      } else {
        // decline
        setGate(null);
        setMessages((m) => [
          ...m,
          { role: "assistant", content: "No worries — we’ll keep the standard pricing visible." },
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

            {/* Blocking gate (with optional Name/Phone form) */}
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

                {gate.id === "lead_capture" ? (
                  <div style={{ display: "grid", gap: 6 }}>
                    <label style={{ fontSize: 12, opacity: 0.9 }}>
                      Name
                      <input
                        value={leadDraft.name}
                        onChange={(e) => setLeadDraft((d) => ({ ...d, name: e.target.value }))}
                        placeholder="e.g., Jamie"
                        style={{
                          width: "100%",
                          marginTop: 4,
                          padding: "6px 8px",
                          borderRadius: 8,
                          background: "#111",
                          color: "#fff",
                          border: `1px solid ${GOLD}`,
                          outline: "none",
                        }}
                      />
                    </label>
                    <label style={{ fontSize: 12, opacity: 0.9 }}>
                      Phone (for updates & discount)
                      <input
                        value={leadDraft.phone}
                        onChange={(e) => setLeadDraft((d) => ({ ...d, phone: e.target.value }))}
                        placeholder="(###) ###-####"
                        style={{
                          width: "100%",
                          marginTop: 4,
                          padding: "6px 8px",
                          borderRadius: 8,
                          background: "#111",
                          color: "#fff",
                          border: `1px solid ${GOLD}`,
                          outline: "none",
                        }}
                      />
                    </label>
                    <div style={{ display: "flex", gap: 8, marginTop: 6, flexWrap: "wrap" }}>
                      <button
                        onClick={() => onGateChoice("submit")}
                        style={{
                          borderRadius: 8,
                          padding: "6px 10px",
                          cursor: "pointer",
                          fontWeight: 700,
                          background: GOLD,
                          color: BLACK,
                          border: "none",
                        }}
                      >
                        Apply 10% off
                      </button>
                      <button
                        onClick={() => onGateChoice("decline")}
                        style={{
                          borderRadius: 8,
                          padding: "6px 10px",
                          cursor: "pointer",
                          fontWeight: 700,
                          background: "#222",
                          color: "#fff",
                          border: `1px solid ${GOLD}`,
                        }}
                      >
                        No thanks
                      </button>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <button
                      onClick={() => onGateChoice("yes")}
                      style={{
                        borderRadius: 8,
                        padding: "6px 10px",
                        cursor: "pointer",
                        fontWeight: 700,
                        background: GOLD,
                        color: BLACK,
                        border: "none",
                      }}
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => onGateChoice("no")}
                      style={{
                        borderRadius: 8,
                        padding: "6px 10px",
                        cursor: "pointer",
                        fontWeight: 700,
                        background: "#222",
                        color: "#fff",
                        border: `1px solid ${GOLD}`,
                      }}
                    >
                      No
                    </button>
                  </div>
                )}
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

          {/* Input (visible + readable; disabled while a gate is active) */}
          <div style={{ borderTop: `1px solid ${GOLD}`, padding: 10, opacity: gate ? 0.6 : 1 }}>
            <textarea
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder={gate ? "Please choose an option above…" : "Type your message..."}
              disabled={!!gate}
              style={{
                width: "80%",
                borderRadius: 8,
                padding: "6px 10px",
                background: "#111",
                color: "#fff",
                border: `1px solid ${GOLD}`,
                outline: "none",
              }}
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
