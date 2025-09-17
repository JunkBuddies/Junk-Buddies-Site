// File: src/components/chat/ChatWidget.jsx
import { useEffect, useMemo, useRef, useState, useRef as useRef2 } from "react";
import { useCart } from "../../context/CartContext";
import { calculatePrice } from "../../utils/pricing";
import { useNavigate } from "react-router-dom";

// 🔗 Firestore
import { db } from "../../lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

// ✉️ EmailJS
import emailjs from "emailjs-com";

const GOLD = "#d4af37";
const SILVER = "#C0C0C0";
const BLUE = "#1e90ff";
const BLACK = "#0b0b0b";
const DISCOUNT_RATE = 0.10;
const TIP_COOLDOWN_MS = 10 * 60 * 1000;

const TEST_MODE = true; // ⬅️ toggle for unlimited captures

const ASSISTANT_NAME = "Your Junk Buddy";

// EmailJS config
const EMAILJS_SERVICE_ID = "JunkBuddies.info";
const EMAILJS_TEMPLATE_ID = "Junk-Buddies-Leads";
const EMAILJS_PUBLIC_KEY = "QCl4Akw_LZ3T8IvUd";

// ✅ GA4 event helper
function sendGAEvent(name, params = {}) {
  if (window.gtag) {
    window.gtag("event", name, params);
    console.log("📊 GA event sent:", name, params);
  } else {
    console.warn("⚠️ gtag not ready, event skipped:", name, params);
  }
}

// ✅ Session ID
function getSessionId() {
  const key = "jb_chat_session";
  let s = localStorage.getItem(key);
  if (!s) {
    s = "sess_" + Date.now() + "_" + Math.random().toString(36).slice(2);
    localStorage.setItem(key, s);
  }
  return s;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [aiStatus, setAiStatus] = useState("unknown");
  const [lastParsed, setLastParsed] = useState(null);

  const [discountActive, setDiscountActive] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [introShown, setIntroShown] = useState(false);
  const [introTyping, setIntroTyping] = useState(false);
  const [gate, setGate] = useState(null);
  const [leadDraft, setLeadDraft] = useState({ name: "", phone: "" });
  const [offeredThisParse, setOfferedThisParse] = useState(false);

  const lastDiscountSig = useRef2("");
  const [showTip, setShowTip] = useState(false);

  const endRef = useRef(null);
  const sessionId = useMemo(getSessionId, []);
  const { setCart } = useCart() || { setCart: () => {} };
  const navigate = useNavigate();

  // Hydrate
  useEffect(() => {
    const d = localStorage.getItem(`jb_disc_on_${sessionId}`) === "1";
    const l = localStorage.getItem(`jb_lead_${sessionId}`) === "1";
    const n = localStorage.getItem(`jb_lead_name_${sessionId}`) || "";
    const p = localStorage.getItem(`jb_lead_phone_${sessionId}`) || "";
    setDiscountActive(d);
    setLeadCaptured(l);
    setLeadDraft({ name: n, phone: p });
  }, [sessionId]);

  // Persist
  useEffect(() => {
    localStorage.setItem(`jb_disc_on_${sessionId}`, discountActive ? "1" : "0");
  }, [discountActive, sessionId]);
  useEffect(() => {
    localStorage.setItem(`jb_lead_${sessionId}`, leadCaptured ? "1" : "0");
  }, [leadCaptured, sessionId]);

  // Autoscroll
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open, loading, gate]);

  // ✅ Force capture on chat open (every visit or TEST_MODE)
  useEffect(() => {
    if (!open) return;
    if (!leadCaptured || TEST_MODE) {
      setIntroTyping(true);
      const t = setTimeout(() => {
        setMessages([
          {
            role: "assistant",
            content:
              `Hey there! I’m your Junk Buddy 👋\n` +
              `I can select all your junk in seconds.\n` +
              `You list it, I’ll add it.\n` +
              `(Example: fridge, couch, sectional 3-piece, 2 ellipticals)`
          },
        ]);
        setIntroTyping(false);
        setIntroShown(true);

        // Show first gate
        setTimeout(() => {
          setGate({
            id: "offer_first",
            text: "Want to claim your 10% off + 1 free item now?",
          });
          sendGAEvent("lead_offer_view", { type: "first", sessionId });
        }, 800);
      }, 600);
      return () => clearTimeout(t);
    }
  }, [open, leadCaptured, sessionId]);

  function discountedPrice(base) {
    return Math.max(0, Math.round((base * (1 - DISCOUNT_RATE) + Number.EPSILON) * 100) / 100);
  }

  function validPhone(p) {
    const digits = (p || "").replace(/\D/g, "");
    return digits.length >= 10;
  }

  // Reset lead
  function resetLeadForSession({ openCapture = true } = {}) {
    localStorage.setItem(`jb_disc_on_${sessionId}`, "0");
    localStorage.setItem(`jb_lead_${sessionId}`, "0");
    localStorage.removeItem(`jb_lead_name_${sessionId}`);
    localStorage.removeItem(`jb_lead_phone_${sessionId}`);
    setDiscountActive(false);
    setLeadCaptured(false);
    setLeadDraft({ name: "", phone: "" });
    lastDiscountSig.current = "";
    if (openCapture) {
      setGate({
        id: "offer_first",
        text: "Want to claim your 10% off + 1 free item now?",
      });
      sendGAEvent("lead_offer_view", { type: "reset", sessionId });
    }
  }

  // Handle local commands
  function handleLocalCommands(raw) {
    const t = (raw || "").trim().toLowerCase();
    if (t === "refresh lead" || t === "reset lead") {
      resetLeadForSession({ openCapture: true });
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Lead info cleared. Enter your name & phone to re-attach 10% off." },
      ]);
      return true;
    }
    return false;
  }
  // Send message
  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    if (handleLocalCommands(text)) {
      setInput("");
      return;
    }
    if (gate) return;

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
      setLastParsed(json.parsed || null);

      setMessages((prev) => {
        const next = [...prev, { role: "assistant", content: json.reply }];
        const hasCart = (json.parsed?.cart?.length || 0) > 0;
        if (hasCart) {
          const base = json.parsed.finalPrice ?? 0;
          const sig = `${base}|${json.parsed?.totalVolume || 0}`;
          if (discountActive) {
            if (lastDiscountSig.current !== sig) {
              lastDiscountSig.current = sig;
              const disc = discountedPrice(base);
              next.push({
                role: "assistant",
                content: `With 10% off: $${disc.toFixed(2)} (was $${base.toFixed(2)})`,
              });
              next.push({
                role: "assistant",
                content: `Are you ready to check out?\nI’ll take you to scheduling now.`,
              });
            }
          } else if (!offeredThisParse) {
            setGate({
              id: "offer_post",
              text: "Want to see your price with 10% off + 1 free item?",
            });
            setOfferedThisParse(true);
            sendGAEvent("lead_offer_view", { type: "post-offer", sessionId });
          }
        }
        return next;
      });
      setOfferedThisParse(false);
    } catch (e) {
      setError("Trouble responding. Try again.");
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

  // Gating flow
  async function onGateChoice(action) {
    if (!gate) return;

    if (gate.id === "offer_first") {
      if (action === "yes") {
        setGate({
          id: "lead_capture",
          text: "Enter your name & phone — I’ll attach 10% off and 1 free item.",
        });
      } else {
        setGate(null);
        setMessages((m) => [...m, { role: "assistant", content: "No problem — we’ll keep standard pricing." }]);
      }
      return;
    }

    if (gate.id === "offer_post") {
      if (action === "yes") {
        setGate({
          id: "lead_capture",
          text: "Enter your name & phone — I’ll attach 10% off and 1 free item.",
        });
      } else {
        setGate(null);
        setMessages((m) => [...m, { role: "assistant", content: "All good — showing regular pricing." }]);
      }
      return;
    }

    if (gate.id === "lead_capture" && action === "submit") {
      if (!leadDraft.name.trim() || !validPhone(leadDraft.phone)) {
        setMessages((m) => [...m, { role: "assistant", content: "Please add a name and valid phone (10+ digits)." }]);
        return;
      }

      // 📊 Log attempt
      sendGAEvent("lead_capture_attempt", {
        name: leadDraft.name.trim(),
        phone: leadDraft.phone.trim(),
        sessionId,
      });

      try {
        await addDoc(collection(db, "leadCaptures"), {
          name: leadDraft.name.trim(),
          phone: leadDraft.phone.trim(),
          enteredAt: serverTimestamp(),
          sessionId,
        });
      } catch (err) {
        console.error("❌ Firestore lead error:", err);
      }

      try {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            name: leadDraft.name.trim(),
            phone: leadDraft.phone.trim(),
            sessionId,
            enteredAt: new Date().toLocaleString(),
          },
          EMAILJS_PUBLIC_KEY
        );
      } catch (err) {
        console.error("❌ EmailJS send error:", err);
      }

      localStorage.setItem(`jb_lead_name_${sessionId}`, leadDraft.name.trim());
      localStorage.setItem(`jb_lead_phone_${sessionId}`, leadDraft.phone);
      setLeadCaptured(true);
      setDiscountActive(true);
      setGate(null);

      setMessages((m) => [
        ...m,
        { role: "assistant", content: `Awesome, ${leadDraft.name}! ✅ Your 10% discount and free item are attached. Now just list your items and I’ll price them.` },
      ]);
    }

    if (gate.id === "lead_capture" && action === "decline") {
      setGate(null);
      setMessages((m) => [...m, { role: "assistant", content: "No worries — we’ll keep standard pricing." }]);
    }
  }

  return (
    <>
      {/* Local styles */}
      <style>{`
        @keyframes jbPulse {
          0% {
            box-shadow:
              0 0 0 0 rgba(30,144,255,0.6),
              0 0 12px 4px rgba(212,175,55,.55);
          }
          40% {
            box-shadow:
              0 0 0 14px rgba(255,0,255,0.3),
              0 0 16px 6px rgba(30,144,255,0.6);
          }
          80% {
            box-shadow:
              0 0 0 0 rgba(30,144,255,0),
              0 0 10px 4px rgba(255,0,255,0.4);
          }
          100% {
            box-shadow:
              0 0 0 0 rgba(30,144,255,0),
              0 0 12px 4px rgba(212,175,55,.55);
          }
        }
        .jb-pulse { animation: jbPulse 2.2s ease-in-out infinite; }

        @keyframes jbChatGlow {
          0% { box-shadow: 0 0 10px rgba(30,144,255,0.5), 0 0 20px rgba(255,0,255,0.4); }
          50% { box-shadow: 0 0 18px rgba(30,144,255,0.7), 0 0 28px rgba(255,0,255,0.6); }
          100% { box-shadow: 0 0 10px rgba(30,144,255,0.5), 0 0 20px rgba(255,0,255,0.4); }
        }
        .jb-chat-glow { animation: jbChatGlow 2.5s ease-in-out infinite; }
      `}</style>

      {/* Floating launcher */}
      {!open && (
        <button
          onClick={() => { setOpen(true); setShowTip(false); navigate("/itemized"); }}
          style={{
            position: "fixed", right: 16, bottom: 16,
            width: 64, height: 64, borderRadius: "50%",
            background: GOLD, border: `2px solid ${BLACK}`,
            fontWeight: 700, cursor: "pointer", zIndex: 9999,
          }}
          className="jb-pulse"
          aria-label="Open chat"
          title="Chat with Your Junk Buddy"
        >
          💬
        </button>
      )}

      {/* Chat window */}
      {open && (
        <div
          className="jb-chat-glow"
          style={{
            position: "fixed", right: 16, bottom: 16,
            width: 360, maxWidth: "90vw", height: 560, maxHeight: "85vh",
            background: BLACK, color: "#fff", borderRadius: 16,
            boxShadow: "0 18px 40px rgba(0,0,0,0.5)",
            display: "flex", flexDirection: "column",
            zIndex: 10000, border: `1px solid ${GOLD}`,
          }}
        >
          {/* Header */}
          <div style={{ padding: "10px", borderBottom: `1px solid ${GOLD}`, display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontWeight: "bold", flex: 1 }}>{ASSISTANT_NAME}</span>
            <button onClick={() => setOpen(false)} style={{ background: "transparent", border: "none", color: "#fff", cursor: "pointer" }} aria-label="Close chat">✕</button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: 10 }}>
            {messages.map((m, i) => (
              <div key={i} style={{ margin: "6px 0", textAlign: m.role === "user" ? "right" : "left" }}>
                <span style={{
                  display: "inline-block", padding: "6px 10px", borderRadius: 10,
                  background: m.role === "user" ? GOLD : "#222",
                  color: m.role === "user" ? BLACK : "#fff", whiteSpace: "pre-wrap",
                }}>
                  {m.content}
                </span>
              </div>
            ))}

            {gate && (
              <div style={{ marginTop: 8, padding: 10, borderRadius: 10, border: `1px solid ${GOLD}`, background: "#151515" }}>
                <div style={{ marginBottom: 8, fontWeight: 600 }}>{gate.text}</div>
                {gate.id === "lead_capture" ? (
                  <div style={{ display: "grid", gap: 6 }}>
                    <input
                      value={leadDraft.name}
                      onChange={(e) => setLeadDraft((d) => ({ ...d, name: e.target.value }))}
                      placeholder="Name"
                      style={{ width: "100%", padding: "6px 8px", borderRadius: 8, background: "#111", color: "#fff", border: `1px solid ${GOLD}` }}
                    />
                    <input
                      value={leadDraft.phone}
                      onChange={(e) => setLeadDraft((d) => ({ ...d, phone: e.target.value }))}
                      placeholder="Phone"
                      style={{ width: "100%", padding: "6px 8px", borderRadius: 8, background: "#111", color: "#fff", border: `1px solid ${GOLD}` }}
                    />
                    <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                      <button onClick={() => onGateChoice("submit")} style={{ borderRadius: 8, padding: "6px 10px", fontWeight: 700, background: GOLD, color: BLACK }}>Apply 10% Off</button>
                      <button onClick={() => onGateChoice("decline")} style={{ borderRadius: 8, padding: "6px 10px", fontWeight: 700, background: "#222", color: "#fff", border: `1px solid ${GOLD}` }}>No Thanks</button>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => onGateChoice("yes")} style={{ borderRadius: 8, padding: "6px 10px", fontWeight: 700, background: GOLD, color: BLACK }}>Yes</button>
                    <button onClick={() => onGateChoice("no")} style={{ borderRadius: 8, padding: "6px 10px", fontWeight: 700, background: "#222", color: "#fff", border: `1px solid ${GOLD}` }}>No</button>
                  </div>
                )}
              </div>
            )}

            {introTyping && <div style={{ fontStyle: "italic", marginTop: 8 }}>Assistant is typing…</div>}
            {loading && <div style={{ fontStyle: "italic", marginTop: 8 }}>Assistant is typing…</div>}
            {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
            <div ref={endRef} />
          </div>

          {/* Input */}
          <div style={{ borderTop: `1px solid ${GOLD}`, padding: 10, opacity: gate ? 0.6 : 1 }}>
            <textarea
              rows={1} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKey}
              placeholder={gate ? "Please choose an option above…" : "Type your message..."} disabled={!!gate}
              style={{ width: "80%", borderRadius: 8, padding: "6px 10px", background: "#111", color: "#fff", border: `1px solid ${GOLD}` }}
            />
            <button onClick={send} disabled={loading || !!gate} style={{ marginLeft: 8 }}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}
