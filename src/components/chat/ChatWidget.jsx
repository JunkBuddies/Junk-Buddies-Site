// File: src/components/chat/ChatWidget.jsx
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

// remember if user has answered the “save estimate?” offer
function getOfferAnswered(sessionId) {
  try { return localStorage.getItem(`jb_offer_answered_${sessionId}`) === "1"; }
  catch { return false; }
}
function setOfferAnswered(sessionId, v = true) {
  try { localStorage.setItem(`jb_offer_answered_${sessionId}`, v ? "1" : "0"); }
  catch {}
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

  // new: blocking offer + lead capture
  const sessionId = useMemo(getSessionId, []);
  const [hasAnsweredOffer, setHasAnsweredOffer] = useState(getOfferAnswered(sessionId));
  const [offerOpen, setOfferOpen] = useState(false); // blocks input until Yes/No
  const [leadOpen, setLeadOpen] = useState(false);   // blocks input until submit/cancel
  const [leadSending, setLeadSending] = useState(false);
  const [leadMsg, setLeadMsg] = useState("");
  const [lead, setLead] = useState({ name: "", phone: "", email: "" });

  const blocked = offerOpen || leadOpen;

  const endRef = useRef(null);
  const { cart, setCart } = useCart() || { cart: [], setCart: () => {} };
  const navigate = useNavigate();

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open, loading, offerOpen, leadOpen]);

  // keep: local recompute if you need it
  const cartSummary = lastParsed?.cart?.length ? calculatePrice(lastParsed.cart) : null;

  // When an estimate appears for the first time this session, show the blocking offer
  useEffect(() => {
    if (!hasAnsweredOffer && lastParsed?.cart?.length) {
      setOfferOpen(true);
    }
  }, [hasAnsweredOffer, lastParsed]);

  async function send() {
    const text = input.trim();
    if (!text || loading || blocked) return; // block sending when modal is open
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

  // Offer actions
  function offerYes() {
    setHasAnsweredOffer(true);
    setOfferAnswered(sessionId, true);
    setOfferOpen(false);
    setLeadOpen(true); // go to lead form (still blocking)
  }
  function offerNo() {
    setHasAnsweredOffer(true);
    setOfferAnswered(sessionId, true);
    setOfferOpen(false); // unblock chat
  }

  // Lead submit
  async function submitLead(e) {
    e?.preventDefault?.();
    setLeadMsg("");
    setLeadSending(true);
    try {
      const payload = {
        sessionId,
        contact: { name: lead.name, phone: lead.phone, email: lead.email },
        parsed: lastParsed || { cart: [], finalPrice: 0, totalVolume: 0, loadLabel: "Empty" },
        messages,
        meta: { ai: aiStatus }
      };
      const r = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const j = await r.json();
      if (!r.ok || !j.ok) throw new Error(j?.error || "Lead submit failed");

      setLeadMsg("✅ Got it! We’ll text/call you shortly.");
      setLeadOpen(false); // unblock chat after success
      setMessages(m => [...m, { role: "assistant", content: "Thanks! We saved your estimate and will reach out shortly." }]);
    } catch (err) {
      console.error("[ChatWidget] lead submit error:", err);
      setLeadMsg("Couldn’t save lead. Please check your info and try again.");
    } finally {
      setLeadSending(false);
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
            overflow: "hidden"
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
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          {/* Messages + blocking overlays */}
          <div style={{ position: "relative", flex: 1, overflowY: "auto", padding: 10 }}>
            {messages.map((m, i) => (
              <div key={i} style={{ margin: "6px 0", textAlign: m.role === "user" ? "right" : "left" }}>
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
            {loading && <div style={{ fontStyle: "italic" }}>Assistant is typing…</div>}
            {error && <div style={{ color: "red" }}>{error}</div>}

            {/* BLOCKING OVERLAY: Offer */}
            {offerOpen && (
              <div
                style={{
                  position: "absolute", inset: 0, background: "rgba(0,0,0,0.7)",
                  display: "flex", alignItems: "center", justifyContent: "center", padding: 12
                }}
              >
                <div
                  role="dialog" aria-modal="true"
                  style={{
                    width: "100%", maxWidth: 300, background: "#1b1b1b",
                    border: `1px solid ${GOLD}`, borderRadius: 12, padding: 12
                  }}
                >
                  <div style={{ fontWeight: 700, marginBottom: 6 }}>
                    Save this estimate & get a callback?
                  </div>
                  <div style={{ fontSize: 13, opacity: 0.9, marginBottom: 12 }}>
                    We’ll keep your items and pricing so a teammate can confirm details with you.
                  </div>
                  <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                    <button
                      onClick={offerNo}
                      style={{
                        background: "transparent", color: "#fff", border: `1px solid ${GOLD}`,
                        padding: "6px 10px", borderRadius: 8, cursor: "pointer"
                      }}
                    >
                      No
                    </button>
                    <button
                      onClick={offerYes}
                      style={{
                        background: GOLD, color: BLACK, border: "none",
                        padding: "6px 10px", borderRadius: 8, cursor: "pointer", fontWeight: 700
                      }}
                    >
                      Yes
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* BLOCKING OVERLAY: Lead Form */}
            {leadOpen && (
              <div
                style={{
                  position: "absolute", inset: 0, background: "rgba(0,0,0,0.7)",
                  display: "flex", alignItems: "center", justifyContent: "center", padding: 12
                }}
              >
                <form
                  onSubmit={submitLead}
                  role="dialog" aria-modal="true"
                  style={{
                    width: "100%", maxWidth: 320, background: "#1b1b1b",
                    border: `1px solid ${GOLD}`, borderRadius: 12, padding: 12
                  }}
                >
                  <div style={{ fontWeight: 700, marginBottom: 8 }}>Your contact info</div>
                  <div style={{ display: "grid", gap: 6 }}>
                    <input
                      placeholder="Name"
                      value={lead.name}
                      onChange={e => setLead(s => ({ ...s, name: e.target.value }))}
                      style={{ padding: 6, borderRadius: 6, border: "1px solid #444", background: "#111", color: "#fff" }}
                    />
                    <input
                      placeholder="Phone"
                      value={lead.phone}
                      onChange={e => setLead(s => ({ ...s, phone: e.target.value }))}
                      style={{ padding: 6, borderRadius: 6, border: "1px solid #444", background: "#111", color: "#fff" }}
                    />
                    <input
                      placeholder="Email"
                      value={lead.email}
                      onChange={e => setLead(s => ({ ...s, email: e.target.value }))}
                      style={{ padding: 6, borderRadius: 6, border: "1px solid #444", background: "#111", color: "#fff" }}
                    />
                  </div>
                  <div style={{ display: "flex", gap: 8, marginTop: 10, justifyContent: "flex-end" }}>
                    <button
                      type="button"
                      onClick={() => setLeadOpen(false)} // allow backing out (unblocks chat)
                      style={{
                        background: "transparent", color: "#fff", border: `1px solid ${GOLD}`,
                        padding: "6px 10px", borderRadius: 8, cursor: "pointer"
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={leadSending || (!lead.phone && !lead.email)}
                      style={{
                        background: GOLD, color: BLACK, border: "none",
                        padding: "6px 10px", borderRadius: 8, cursor: "pointer",
                        fontWeight: 700, opacity: leadSending ? 0.7 : 1
                      }}
                    >
                      {leadSending ? "Saving…" : "Save"}
                    </button>
                  </div>
                  {leadMsg && <div style={{ marginTop: 8 }}>{leadMsg}</div>}
                </form>
              </div>
            )}

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

          {/* Input (disabled when blocked) */}
          <div style={{ borderTop: `1px solid ${GOLD}`, padding: 10, opacity: blocked ? 0.6 : 1 }}>
            {blocked && (
              <div style={{ fontSize: 12, marginBottom: 6, color: "#ddd" }}>
                Please respond to the prompt above to continue.
              </div>
            )}
            <textarea
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Type your message..."
              disabled={blocked || loading}
              style={{ width: "80%", borderRadius: 8, padding: 6 }}
            />
            <button onClick={send} disabled={blocked || loading} style={{ marginLeft: 8 }}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
