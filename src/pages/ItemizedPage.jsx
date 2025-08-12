// File: src/pages/ItemizedPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { calculatePrice, getLoadLabel, fullLoadPoints } from "../utils/pricing";
import itemData from "../data/itemData";

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
  const loadLabel = getLoadLabel(totalVolume);

  const addToCart = (item) => setCart((prev) => [...prev, item]);
  const removeFromCart = (idx) =>
    setCart((prev) => prev.filter((_, i) => i !== idx));

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
        messages: chatMessages,
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

      if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
      const data = await res.json();

      setChatMessages((prev) => [
        ...prev,
        { sender: "bot", text: data.reply || "Got it!" },
      ]);

      if (Array.isArray(data.cartItems) && data.cartItems.length) {
        const newItems = data.cartItems.filter(
          (i) => !cart.some((c) => c.name === i.name)
        );
        if (newItems.length) {
          setCart((prev) => [...prev, ...newItems]);
          setChatMessages((prev) => [
            ...prev,
            {
              sender: "bot",
              text: `Added ${newItems.map((i) => i.name).join(", ")}. You now have ${cart.length + newItems.length} items worth $${calculatePrice([...cart, ...newItems]).finalPrice.toFixed(2)}.`,
            },
          ]);
          if (!discountApplied) {
            setChatMessages((prev) => [
              ...prev,
              { sender: "bot", text: "Want me to apply your 10% discount now so you can see it in real time?" },
            ]);
          }
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

      <h1 className="text-4xl mb-6 text-center font-bold">
        <span className="text-white">Manually Select Junk</span>{" "}
        <span
          className="px-2 py-1 border-2 rounded-lg animate-pulse-glow"
          style={{ borderColor: "#FFD700", color: "#FFD700" }}
        >
          or Add with Smart Select! (Save 10%)
        </span>
      </h1>

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
                  "Hey there! I can build your junk list fast. Want me to apply a 10% discount now so you can see it live, or should we just start listing items?",
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
                onClick={() => {
                  submitLead();
                  setChatMessages((prev) => [
                    ...prev,
                    { sender: "bot", text: "Thanks! You can finish here: /schedule" },
                  ]);
                }}
                className="mt-2 w-full px-3 py-1 bg-gold text-black font-semibold rounded"
              >
                Save Discount
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

      <div className="mb-6 max-w-2xl mx-auto">
        <input
          type="text"
          placeholder="Search items..."
          className="w-full p-3 rounded-xl text-black"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredData.map((section, idx) =>
        section.items.length > 0 ? (
          <div key={idx} className="mb-10">
            <h2 className="text-2xl text-gold mb-4">{section.category}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {section.items.map((item, i) => (
                <button
                  key={i}
                  className="bg-gray-800 p-4 rounded-lg border border-gold hover:bg-gold hover:text-black"
                  onClick={() => addToCart(item)}
                >
                  <p className="font-semibold">{item.name}</p>
                </button>
              ))}
            </div>
          </div>
        ) : null
      )}

      {/* Professional Cart UI */}
      <div
        className={`fixed ${cartVisible ? "bottom-0" : "-bottom-64"} left-0 w-full sm:w-80 sm:top-0 sm:right-0 sm:left-auto sm:h-full bg-gray-900 border-t sm:border-l border-gold transition-all duration-300`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gold">
          <h3 className="text-gold font-bold">Your Cart</h3>
          <button onClick={() => setCartVisible(!cartVisible)} className="text-white">
            {cartVisible ? "▼" : "▲"}
          </button>
        </div>
        <div className="p-4 space-y-2 overflow-y-auto h-full">
          {cart.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center bg-gray-800 p-2 rounded">
              <span>{item.name}</span>
              <button onClick={() => removeFromCart(idx)} className="text-red-400">✕</button>
            </div>
          ))}
          <div className="mt-4 text-gold">
            Load Size: {loadLabel}
            <br />
            Price: ${finalPrice.toFixed(2)}
            {discountApplied && (
              <>
                <br />
                With Discount: ${totalWithDiscount.toFixed(2)}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemizedPage;
