// File: src/pages/ItemizedPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { calculatePrice, getLoadLabel, fullLoadPoints } from "../utils/pricing";
import itemData from "../data/itemData";

function ItemizedPage() {
  const { cart, setCart } = useCart();
  const [search, setSearch] = useState("");
  const [cartVisible, setCartVisible] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
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
  const removeFromCart = (idx) =>
    setCart((prev) => prev.filter((_, i) => i !== idx));

  useEffect(() => {
    const timer = setTimeout(() => setShowSmartSelectorNotice(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Save lead once after form is submitted
  const submitLead = () => {
    setLeadSubmitted(true);
   fetch("https://smartselector-nbclj4qvoq-uc.a.run.app", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        leadInfo: { name: leadName, phone: leadPhone, submitted: true },
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

  // Handle Smart Selector chat input
  async function handleSmartSelectorInput(userText) {
    if (!userText.trim()) return;

    setChatMessages((prev) => [...prev, { sender: "user", text: userText }]);

    try {
      const res = await fetch("https://smartselector-nbclj4qvoq-uc.a.run.app", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...chatMessages, { sender: "user", text: userText }],
          // Removed itemData to prevent overload — handled server-side
          leadInfo: { name: leadName, phone: leadPhone, submitted: false },
        }),
      });

      const data = await res.json();
      setChatMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);

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

    {/* Popup Notice */}
    {showSmartSelectorNotice && !showChat && (
      <div
        className="fixed bottom-6 right-6 bg-black text-white border-2 rounded-xl p-4 shadow-xl animate-pulse-glow cursor-pointer z-50 max-w-xs"
        style={{ borderColor: "#FFD700" }}
        onClick={() => {
          setShowChat(true);
          setChatMessages([
            {
              sender: "bot",
              text: "Hi! I can help build your junk list fast and save you 10%. What’s the first item?",
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

        {discountApplied && (
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

    {/* Search Bar */}
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

    {/* Item Grid (unchanged) */}
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
  </div>
);
  }

export default ItemizedPage;


