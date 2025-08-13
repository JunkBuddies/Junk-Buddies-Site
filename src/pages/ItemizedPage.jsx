// File: src/pages/ItemizedPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { calculatePrice, getLoadLabel, fullLoadPoints } from "../utils/pricing";
import itemData from "../data/itemData";

// Use your Firebase/Cloud Run Smart Selector endpoint
const SMART_SELECTOR_URL = "/api/smart-selector";

function ItemizedPage() {
  const { cart, setCart } = useCart();
  const [search, setSearch] = useState("");
  const [cartVisible, setCartVisible] = useState(false);
  const [showSmartSelectorNotice, setShowSmartSelectorNotice] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [leadName, setLeadName] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const navigate = useNavigate();

  const { finalPrice, totalVolume } = calculatePrice(cart);
  const discountAmount = discountApplied ? finalPrice * 0.1 : 0;
  const totalWithDiscount = finalPrice - discountAmount;
  const truckFillPercent = ((totalVolume % fullLoadPoints) / fullLoadPoints) * 100;
  const loadLabel = getLoadLabel(totalVolume);

  const addToCart = (item) => setCart((prev) => [...prev, item]);
  const removeFromCart = (idx) => setCart((prev) => prev.filter((_, i) => i !== idx));

  useEffect(() => {
    const timer = setTimeout(() => setShowSmartSelectorNotice(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const submitLead = () => {
    setLeadSubmitted(true);
    fetch(SMART_SELECTOR_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        leadInfo: { name: leadName, phone: leadPhone, submitted: true },
        messages: [],
      }),
    }).catch(() => console.error("Failed to save lead"));
  };

  const pulseGlowStyle = `
    @keyframes glowPulse {
      0% { border-color: #FFD700; box-shadow: 0 0 10px #FFD700; }
      50% { border-color: white; box-shadow: 0 0 20px white; }
      100% { border-color: #FFD700; box-shadow: 0 0 10px #FFD700; }
    }
    .animate-pulse-glow {
      animation: glowPulse 1.5s infinite ease-in-out;
    }
  `;

  async function handleSmartSelectorInput(userText) {
    if (!userText.trim()) return;

    const newMessage = { sender: "user", text: userText };
    const updatedMessages = [...chatMessages, newMessage];
    setChatMessages(updatedMessages);

    const history = updatedMessages.map((m) => ({
      role: m.sender === "user" ? "user" : "assistant",
      content: m.text,
    }));

    try {
      const res = await fetch(SMART_SELECTOR_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history,
          leadInfo: { name: leadName, phone: leadPhone, submitted: false },
        }),
      });

      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        throw new Error(`HTTP ${res.status} ${res.statusText} — ${txt || "No body"}`);
      }

      const data = await res.json();

      setChatMessages((prev) => [
        ...prev,
        { sender: "bot", text: (data && data.reply) || "Got it!" },
      ]);

      if (Array.isArray(data.cartItems) && data.cartItems.length) {
        const newItems = data.cartItems.filter(
          (i) => !cart.some((c) => c.name === i.name)
        );
        if (newItems.length) {
          setCart((prev) => [...prev, ...newItems]);
          setDiscountApplied(true);
        }
      }
    } catch (err) {
      console.error("AI Chat error:", err);
      setChatMessages((prev) => [
        ...prev,
        { sender: "bot", text: "AI is unavailable. Try again shortly." },
      ]);
    }
  }

  const filteredData = itemData.map((section) => ({
    ...section,
    items: section.items.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    ),
  }));

  return (
    <div className="bg-black text-white min-h-screen p-6 pb-32">
      <style>{pulseGlowStyle}</style>

      {/* Title */}
      <h1 className="text-4xl mb-6 text-center font-bold">
        <span className="text-white">Manually Select Junk</span>{" "}
        <span
          className="px-2 py-1 border-2 rounded-lg animate-pulse-glow"
          style={{ borderColor: "#FFD700", color: "#FFD700" }}
        >
          or Add with Smart Select! (Save 10%)
        </span>
      </h1>

      {/* Smart Selector popup */}
      {showSmartSelectorNotice && !showChat && (
        <div
          className="fixed bottom-6 right-6 bg-black text-white border-2 rounded-xl p-4 shadow-xl animate-pulse-glow cursor-pointer z-50 max-w-xs"
          style={{ borderColor: "#FFD700" }}
          onClick={() => {
            setShowChat(true);
            setChatMessages([
              {
                sender: "bot",
                text:
                  "Hey there! I can help you build your junk list and save 10%. Want me to apply the discount now so you can see prices as we go, or keep adding items for now?",
              },
            ]);
          }}
        >
          <h3 className="font-bold text-gold text-lg mb-1">
            Quick Add with Smart Select — Save 10%
          </h3>
          <p className="text-sm">Tap to get started.</p>
        </div>
      )}

      {/* Chat Drawer */}
      {showChat && (
        <div className="fixed bottom-0 right-0 w-full sm:w-96 h-2/3 bg-gray-900 border-l border-gold z-50 flex flex-col">
          <div className="flex justify-between items-center p-4 border-b border-gold">
            <h2 className="text-gold font-bold">Junk Buddies Smart Selector</h2>
            <button
              onClick={() => setShowChat(false)}
              className="text-white hover:text-gold"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-sm">
            {chatMessages.map((msg, idx) => (
              <p
                key={idx}
                className={msg.sender === "user" ? "text-blue-300" : "text-gray-300"}
              >
                {msg.text}
              </p>
            ))}
          </div>

          {discountApplied && !leadSubmitted && (
            <div className="p-4 border-t border-gold bg-gray-800">
              <p className="text-sm text-gold font-bold mb-2">
                Lock in your 10% discount:
              </p>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-2 mb-2 bg-gray-900 text-white border border-gold rounded"
                value={leadName}
                onChange={(e) => setLeadName(e.target.value)}
              />
              <input
                type="tel"
                placeholder="Your Phone"
                className="w-full p-2 mb-2 bg-gray-900 text-white border border-gold rounded"
                value={leadPhone}
                onChange={(e) => setLeadPhone(e.target.value)}
              />
              <button
                onClick={submitLead}
                className="mt-2 w-full px-3 py-1 bg-gold text-black font-semibold rounded"
              >
                Save Discount & Continue
              </button>
            </div>
          )}

          {leadSubmitted && (
            <div className="p-4 border-t border-gold bg-gray-800 text-center">
              <p className="text-gold font-bold mb-2">Great! Let’s finish up.</p>
              <button
                onClick={() => navigate("/schedule")}
                className="mt-2 w-full px-3 py-1 bg-gold text-black font-semibold rounded"
              >
                Go to Schedule Page
              </button>
            </div>
          )}

          <textarea
            className="w-full p-2 bg-gray-800 text-white border-t border-gold"
            placeholder="Type your items..."
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSmartSelectorInput(e.target.value);
                e.target.value = "";
              }
            }}
          />
        </div>
      )}

      {/* Search & badges */}
      <div className="mb-6 max-w-2xl mx-auto">
        <div className="mt-4 mb-6 flex flex-wrap justify-center gap-3">
          <div className="compare-badge-silver">
            You Don’t Pay Until the Job Is Done
          </div>
          <div className="compare-badge-silver">
            Compare Prices Instantly in Cart
          </div>
        </div>
        <input
          type="text"
          placeholder="Search items..."
          className="w-full p-3 rounded-xl text-black"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Item Grid */}
      {filteredData.map((section, idx) =>
        section.items.length > 0 ? (
          <div key={idx} className="mb-10">
            <h2 className="text-2xl text-gold mb-4">{section.category}</h2>
            <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {section.items.map((item, i) => (
                <button
                  key={i}
                  className="item-card-button"
                  onClick={() => addToCart(item)}
                >
                  <div className="item-card-button-text">
                    <p className="font-semibold">{item.name}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : null
      )}

      {/* Cart Drawer */}
      {cartVisible && (
        <div className="fixed bottom-0 left-0 w-full sm:w-96 h-2/3 bg-gray-900 border-r border-gold z-50 flex flex-col">
          <div className="flex justify-between items-center p-4 border-b border-gold">
            <h2 className="text-gold font-bold">Your Cart</h2>
            <button
              onClick={() => setCartVisible(false)}
              className="text-white hover:text-gold"
            >
              ✕
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-sm">
            {cart.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <p>{item.name}</p>
                <button
                  onClick={() => removeFromCart(idx)}
                  className="text-red-400 hover:text-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-gold bg-gray-800">
            <p className="text-sm text-gray-300 mb-1">Truck Fill: {loadLabel}</p>
            <div className="w-full bg-gray-700 h-2 rounded">
              <div
                style={{
                  width: `${truckFillPercent}%`,
                  backgroundColor: "#FFD700",
                }}
                className="h-2 rounded"
              ></div>
            </div>
            <p className="mt-3 text-lg font-bold">
              Total:{" "}
              {discountApplied
                ? `$${totalWithDiscount.toFixed(2)} (after 10% off)`
                : `$${finalPrice.toFixed(2)}`}
            </p>
          </div>
        </div>
      )}

      {/* Floating Cart Button */}
      <button
        onClick={() => setCartVisible(true)}
        className="fixed bottom-6 left-6 px-4 py-2 bg-gold text-black font-semibold rounded shadow-lg hover:bg-yellow-500"
      >
        View Cart ({cart.length})
      </button>
    </div>
  );
}

export default ItemizedPage;
