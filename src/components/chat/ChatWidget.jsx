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

  const [gate, setGate] = useState(null); // only for offer_first, offer_post, lead_capture
  const [leadDraft, setLeadDraft] = useState({ name: "", phone: "" });

  // conversational (non-blocking) state
  const [awaitingPriceChoice, setAwaitingPriceChoice] = useState(false);   // "see total or keep adding?"
  const [awaitingScheduleChoice, setAwaitingScheduleChoice] = useState(false); // "ready to schedule or add more?"

  const [offeredThisParse, setOfferedThisParse] = useState(false); // prevents re-opening gates in same parse

  const lastDiscountSig = useRef2("");
  const [showTip, setShowTip] = useState(false);

  const prevCartCountRef = useRef(0); // to detect when items got added
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

  // ✅ Greeting + First Offer Gate (Yes/No)
  useEffect(() => {
    if (!open) return;

    if (!leadCaptured || TEST_MODE) {
      setIntroTyping(true);
      const t = setTimeout(() => {
        setMessages([
          {
            role: "assistant",
            content:
              "Hey there! I’m your Junk Buddy 👋\n" +
              "I can select all your junk in seconds.\n" +
              "You list it, I’ll add it.\n" +
              "(Ex: fridge, couch, sectional 3 piece, 2 ellipticals)",
          },
        ]);
        setIntroTyping(false);
        setIntroShown(true);

        // First attempt: Yes / No gate (no form yet)
        setTimeout(() => {
          setGate({
            id: "offer_first",
            text: "Want to claim your 10% OFF + 1 FREE item now?",
          });

          // 📊 Log gate shown
          sendGAEvent("lead_form_view", { type: "offer_first", sessionId });
          addDoc(collection(db, "leadViews"), {
            sessionId,
            type: "offer_first",
            shownAt: serverTimestamp(),
          }).catch((err) => console.error("❌ Firestore log error:", err));
        }, 800);
      }, 600);
      return () => clearTimeout(t);
    }
  }, [open, leadCaptured, sessionId]);

  function discountedPrice(base) {
    return Math.max(
      0,
      Math.round((base * (1 - DISCOUNT_RATE) + Number.EPSILON) * 100) / 100
    );
  }

  function validPhone(p) {
    const digits = (p || "").replace(/\D/g, "");
    return digits.length >= 10;
  }

  // Reset lead (used for "refresh lead" command)
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
        text: "Want to claim your 10% OFF + 1 FREE item now?",
      });
      sendGAEvent("lead_form_view", { type: "reset", sessionId });
    }
  }

  // Helper: classify simple intents for natural replies
  function saysShowTotalOrDone(text) {
    const t = (text || "").toLowerCase();
    return /(^|\b)(see|show|view)\s+(my|the|your)?\s*total\b|(^|\b)done\b|(^|\b)that'?s\s*it\b|(^|\b)i'?m\s*done\b/.test(t);
  }
  function saysKeepAdding(text) {
    const t = (text || "").toLowerCase();
    return /(^|\b)(keep|still)\s+adding\b|(^|\b)add\s+more\b|(^|\b)more\b|(^|\b)not\s+done\b/.test(t);
  }
  // Handle local commands
  function handleLocalCommands(raw) {
    const t = (raw || "").trim().toLowerCase();
    if (t === "refresh lead" || t === "reset lead") {
      resetLeadForSession({ openCapture: true });
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: "Lead info cleared. Enter your name & phone to re-attach 10% off.",
        },
      ]);
      return true;
    }
    return false;
  }

  // Natural “see total / keep adding” flow based on current parsed state
  function handleNaturalFlowOnUserText(userText) {
    // If we’re waiting for their choice and they said “see total/done”
    if (awaitingPriceChoice && saysShowTotalOrDone(userText)) {
      setAwaitingPriceChoice(false);

      if (lastParsed?.finalPrice != null) {
        const base = lastParsed.finalPrice;
        // Show REGULAR price only (since they haven't captured yet here)
        setMessages((m) => [
          ...m,
          {
            role: "assistant",
            content: `Your total so far is **$${base.toFixed(2)}**.`,
          },
        ]);

        // If discount not active, this is where we offer the second capture
        if (!discountActive) {
          setGate({
            id: "offer_post",
            text: "Want to see your price with **10% OFF + 1 FREE item**?",
          });
          sendGAEvent("lead_form_view", { type: "offer_post", sessionId });
          addDoc(collection(db, "leadViews"), {
            sessionId,
            type: "offer_post",
            shownAt: serverTimestamp(),
          }).catch((err) => console.error("❌ Firestore log error:", err));
        } else {
          // If discount is already active (shouldn’t happen in this branch), show discounted too.
          const disc = discountedPrice(base);
          setMessages((m) => [
            ...m,
            {
              role: "assistant",
              content: `With your 10% discount applied, your total comes to **$${disc.toFixed(2)}** (regularly $${base.toFixed(2)}).`,
            },
          ]);
          // Then move to “schedule or add more?”
          setMessages((m) => [
            ...m,
            { role: "assistant", content: "Ready to schedule your pickup, or would you like to add more items?" },
          ]);
          setAwaitingScheduleChoice(true);
        }
      } else {
        // No parsed yet; prompt them to list items
        setMessages((m) => [
          ...m,
          { role: "assistant", content: "Tell me your items and I’ll total them up." },
        ]);
      }
      return true;
    }

    // If they explicitly say “keep adding” while we were waiting
    if (awaitingPriceChoice && saysKeepAdding(userText)) {
      setAwaitingPriceChoice(false);
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Got it — keep listing items and I’ll keep adding them." },
      ]);
      return false; // still send to backend for more parsing
    }

    // Schedule choice
    if (awaitingScheduleChoice) {
      const t = (userText || "").toLowerCase();
      if (/\b(schedule|book|let'?s\s*go|yes|yeah|yep)\b/.test(t)) {
        setAwaitingScheduleChoice(false);
        navigate("/schedule");
        return true;
      }
      if (/\b(add|more|not\s*yet|nope|no)\b/.test(t)) {
        setAwaitingScheduleChoice(false);
        setMessages((m) => [
          ...m,
          { role: "assistant", content: "No problem — keep adding items and I’ll update your total." },
        ]);
        return false; // keep sending to backend
      }
      // If unclear, let it pass through to backend; we’ll try to parse more items
      return false;
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

    // Let natural flow intercept BEFORE blocking gates
    const wasHandled = handleNaturalFlowOnUserText(text);
    if (wasHandled) {
      setInput("");
      return;
    }

    // If a gate with buttons/form is open, we don't accept free text
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

      // Push AI reply
      setMessages((prev) => [...prev, { role: "assistant", content: json.reply }]);

      // Detect newly added items
      const newCount = json.parsed?.cart?.length || 0;
      const prevCount = prevCartCountRef.current || 0;
      const itemsAddedNow = newCount > prevCount;
      prevCartCountRef.current = newCount;

      // If items were added this turn, ask naturally: see total or keep adding?
      if (itemsAddedNow) {
        setMessages((m) => [
          ...m,
          { role: "assistant", content: "Would you like to see your total so far, or keep adding items?" },
        ]);
        setAwaitingPriceChoice(true);
      }

      // If discountActive and they gave us a finalPrice THIS turn, we add a gentle note AFTER they ask to see total (handled above).
      // We do NOT auto-show discounted totals here to avoid showing prices prematurely.

      // Clear re-offer flag after handling
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

  // Gating flow (only for offer_first, offer_post, lead_capture)
  async function onGateChoice(action) {
    if (!gate) return;

    if (gate.id === "offer_first") {
      if (action === "yes") {
        setGate({
          id: "lead_capture",
          text: "Enter your name & phone — I’ll attach 10% OFF + 1 FREE item to your account.",
        });
      } else {
        setGate(null);
        setMessages((m) => [
          ...m,
          { role: "assistant", content: "No worries — just list your items and I’ll price them." },
        ]);
      }
      return;
    }

    if (gate.id === "offer_post") {
      if (action === "yes") {
        setGate({
          id: "lead_capture",
          text: "Enter your name & phone — I’ll attach 10% OFF + 1 FREE item and then show your discounted total.",
        });
      } else {
        setGate(null);
        // After declining the post-offer, go to schedule-or-more prompt naturally
        setMessages((m) => [
          ...m,
          { role: "assistant", content: "Want to schedule your pickup now, or add more items?" },
        ]);
        setAwaitingScheduleChoice(true);
      }
      return;
    }

    if (gate.id === "lead_capture" && action === "submit") {
      if (!leadDraft.name.trim() || !validPhone(leadDraft.phone)) {
        setMessages((m) => [
          ...m,
          { role: "assistant", content: "Please add a name and a valid phone number (10+ digits)." },
        ]);
        return;
      }

      // 📊 Log attempt to GA4
      sendGAEvent("generate_lead", {
        name: leadDraft.name.trim(),
        phone: leadDraft.phone.trim(),
        sessionId,
      });
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

      // If we already had a total, show discounted total now
      if (lastParsed?.finalPrice != null) {
        const base = lastParsed.finalPrice;
        const disc = discountedPrice(base);
        setMessages((m) => [
          ...m,
          {
            role: "assistant",
            content: `Awesome, ${leadDraft.name}! Your 10% OFF + 1 FREE item is attached ✅\nWith your 10% discount applied, your total comes to **$${disc.toFixed(2)}** (regularly $${base.toFixed(2)}).`,
          },
        ]);
      } else {
        setMessages((m) => [
          ...m,
          { role: "assistant", content: `Awesome, ${leadDraft.name}! Your 10% OFF + 1 FREE item is attached ✅ Tell me your items and I’ll apply it.` },
        ]);
      }

      // Then move to “schedule or add more?”
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Ready to schedule your pickup, or would you like to add more items?" },
      ]);
      setAwaitingScheduleChoice(true);
      return;
    }

    if (gate.id === "lead_capture" && action === "decline") {
      setGate(null);
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "No worries — we’ll keep standard pricing visible." },
      ]);
      // After declining, go to schedule-or-more prompt naturally if we have a total
      if (lastParsed?.finalPrice != null) {
        setMessages((m) => [
          ...m,
          { role: "assistant", content: "Would you like to schedule your pickup now, or keep adding items?" },
        ]);
        setAwaitingScheduleChoice(true);
      }
      return;
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

        .jb-tip {
          background: ${BLACK};
          color: ${SILVER};
          border: 1px solid ${GOLD};
          border-radius: 12px;
          padding: 10px 12px;
          box-shadow: 0 10px 24px rgba(0,0,0,.4);
        }
        .jb-tip:after {
          content: "";
          position: absolute;
          bottom: -8px; right: 18px;
          border-width: 8px 8px 0 8px;
          border-style: solid;
          border-color: ${GOLD} transparent transparent transparent;
          transform: translateY(1px);
        }
      `}</style>

      {/* Floating launcher + tip bubble */}
      {!open && (
        <>
          {showTip && (
            <div
              className="jb-tip"
              style={{ position: "fixed", right: 16, bottom: 96, maxWidth: 260, zIndex: 9999 }}
              onClick={() => setShowTip(false)}
              role="dialog"
              aria-live="polite"
            >
              <div style={{ fontWeight: 700, color: GOLD, marginBottom: 4 }}>
                {ASSISTANT_NAME}
              </div>
              <div>I can add your junk items in seconds!</div>
            </div>
          )}

          {/* Promo button */}
          <button
            onClick={() => { setOpen(true); setShowTip(false); navigate("/itemized"); }}
            style={{
              position: "fixed",
              right: 90, bottom: 26,
              background: "transparent",
              border: "none", cursor: "pointer",
              zIndex: 9999, color: "#fff",
              fontWeight: "bold", fontSize: "14px",
              textShadow: "0 0 8px rgba(30,144,255,0.8), 0 0 12px rgba(255,0,255,0.7)",
              display: "flex", alignItems: "center", gap: "6px",
            }}
            className="jb-pulse"
          >
            🎁 Free Item + 10% Off <span style={{ fontSize: "18px" }}>→</span>
          </button>

          {/* Bubble itself */}
          <button
            onClick={() => { setOpen(true); setShowTip(false); navigate("/itemized"); }}
            style={{
              position: "fixed",
              right: 16, bottom: 16,
              width: 64, height: 64,
              borderRadius: "50%", background: GOLD,
              border: `2px solid ${BLACK}`,
              fontWeight: 700, cursor: "pointer",
              zIndex: 9999,
            }}
            className="jb-pulse"
            aria-label="Open chat"
            title="Chat with Your Junk Buddy"
          >
            💬
          </button>
        </>
      )}

      {/* Chat window */}
      {open && (
        <div
          className="jb-chat-glow"
          style={{
            position: "fixed",
            right: 16, bottom: 16,
            width: 360, maxWidth: "90vw",
            height: 560, maxHeight: "85vh",
            background: BLACK, color: "#fff",
            borderRadius: 16,
            boxShadow: "0 18px 40px rgba(0,0,0,0.5)",
            display: "flex", flexDirection: "column",
            zIndex: 10000, border: `1px solid ${GOLD}`,
          }}
        >
          {/* Header */}
          <div style={{
            padding: "10px",
            borderBottom: `1px solid ${GOLD}`,
            display: "flex", alignItems: "center", gap: 8,
          }}>
            <span style={{ fontWeight: "bold", flex: 1 }}>{ASSISTANT_NAME}</span>
            <span
              title={aiStatus === "on" ? "AI parser active" :
                     aiStatus === "off" ? "AI disabled — fallback parser" :
                     "Status unknown"}
              style={{
                fontSize: 12, padding: "2px 8px",
                borderRadius: 999, border: `1px solid ${GOLD}`,
                color: aiStatus === "on" ? "#22c55e" :
                       aiStatus === "off" ? "#9ca3af" : "#f59e0b",
                background: "#111",
              }}
            >
              AI: {aiStatus.toUpperCase()}
            </span>
            <button
              onClick={() => setOpen(false)}
              style={{
                marginLeft: 8,
                background: "transparent", border: "none",
                color: "#fff", cursor: "pointer",
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
                <span style={{
                  display: "inline-block",
                  padding: "6px 10px",
                  borderRadius: 10,
                  background: m.role === "user" ? GOLD : "#222",
                  color: m.role === "user" ? BLACK : "#fff",
                  whiteSpace: "pre-wrap",
                }}>
                  {m.content}
                </span>
              </div>
            ))}

            {gate && (
              <div style={{
                marginTop: 8, padding: 10,
                borderRadius: 10, border: `1px solid ${GOLD}`,
                background: "#151515",
              }}>
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
                          width: "100%", marginTop: 4,
                          padding: "6px 8px", borderRadius: 8,
                          background: "#111", color: "#fff",
                          border: `1px solid ${GOLD}`, outline: "none",
                        }}
                      />
                    </label>
                    <label style={{ fontSize: 12, opacity: 0.9 }}>
                      Phone
                      <input
                        value={leadDraft.phone}
                        onChange={(e) => setLeadDraft((d) => ({ ...d, phone: e.target.value }))}
                        placeholder="(###) ###-####"
                        style={{
                          width: "100%", marginTop: 4,
                          padding: "6px 8px", borderRadius: 8,
                          background: "#111", color: "#fff",
                          border: `1px solid ${GOLD}`, outline: "none",
                        }}
                      />
                    </label>
                    <div style={{ display: "flex", gap: 8, marginTop: 6, flexWrap: "wrap" }}>
                      <button
                        onClick={() => onGateChoice("submit")}
                        style={{
                          borderRadius: 8, padding: "6px 10px",
                          cursor: "pointer", fontWeight: 700,
                          background: GOLD, color: BLACK, border: "none",
                        }}
                      >
                        Apply 10% off
                      </button>
                      <button
                        onClick={() => onGateChoice("decline")}
                        style={{
                          borderRadius: 8, padding: "6px 10px",
                          cursor: "pointer", fontWeight: 700,
                          background: "#222", color: "#fff",
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
                        borderRadius: 8, padding: "6px 10px",
                        cursor: "pointer", fontWeight: 700,
                        background: GOLD, color: BLACK, border: "none",
                      }}
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => onGateChoice("no")}
                      style={{
                        borderRadius: 8, padding: "6px 10px",
                        cursor: "pointer", fontWeight: 700,
                        background: "#222", color: "#fff",
                        border: `1px solid ${GOLD}`,
                      }}
                    >
                      No
                    </button>
                  </div>
                )}
              </div>
            )}

            {introTyping && <div style={{ fontStyle: "italic", marginTop: 8 }}>Assistant is typing…</div>}
            {loading && <div style={{ fontStyle: "italic", marginTop: 8 }}>Assistant is typing…</div>}
            {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
            <div ref={endRef} />
          </div>

          {/* Parsed result preview (never shows discount text unless captured) */}
          <div style={{ borderTop: `1px solid ${GOLD}`, padding: 10, background: "#111" }}>
            <div style={{ fontSize: 12, marginBottom: 6 }}>
              <strong>Parsed:</strong>{" "}
              {lastParsed?.cart?.length
                ? `${lastParsed.cart.length} lines • ${Math.round(lastParsed.totalVolume || 0)} pts • $${(
                    (lastParsed.finalPrice ?? 0) * (discountActive ? 1 - DISCOUNT_RATE : 1)
                  ).toFixed(2)}${discountActive ? " (10% off applied)" : ""}`
                : "nothing yet"}
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button
                onClick={addParsedToCart}
                disabled={!lastParsed?.cart?.length}
                style={{
                  borderRadius: 8,
                  background: GOLD, color: BLACK,
                  fontWeight: 700, padding: "6px 10px",
                  cursor: "pointer",
                }}
              >
                Add selected to cart
              </button>
              <button
                onClick={() => navigate("/itemized")}
                style={{
                  borderRadius: 8, background: "#222",
                  color: "#fff", padding: "6px 10px",
                  border: `1px solid ${GOLD}`, cursor: "pointer",
                }}
              >
                View cart / edit
              </button>
            </div>
          </div>

          {/* Input */}
          <div style={{ borderTop: `1px solid ${GOLD}`, padding: 10, opacity: gate ? 0.6 : 1 }}>
            <textarea
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder={gate ? "Please choose an option above…" : "Type your message..."}
              disabled={!!gate}
              style={{
                width: "80%", borderRadius: 8,
                padding: "6px 10px", background: "#111",
                color: "#fff", border: `1px solid ${GOLD}`,
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
