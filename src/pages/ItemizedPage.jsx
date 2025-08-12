// File: src/pages/ItemizedPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { calculatePrice, getLoadLabel, fullLoadPoints } from "../utils/pricing";
import itemData from "../data/itemData";

const SMART_SELECTOR_URL = "https://smartselector-nbclj4qvoq-uc.a.run.app"; // Firebase Cloud Function

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
        messages: [],
      }),
    }).catch(() => console.error("Failed to save lead"));
  };

  async function handleSmartSelectorInput(userText) {
    if (!userText.trim()) return;

    const newMessage = { sender: "user", text: userText };
    const updatedMessages = [...chatMessages, newMessage];
    setChatMessages(updatedMessages);

    try {
      const res = await fetch(SMART_SELECTOR_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages,
          leadInfo: { name: leadName, phone: leadPhone, submitted: false },
          discountApplied,
          cartItems: cart,
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      setChatMessages((prev) => [...prev, { sender: "bot", text: data.reply || "Got it!" }]);

      if (Array.isArray(data.cartItems) && data.cartItems.length) {
        const newItems = data.cartItems.filter(
          (i) => !cart.some((c) => c.name === i.name)
        );
        if (newItems.length) {
          setCart((prev) => [...prev, ...newItems]);
        }
      }

      if (data.discountApplied) {
        setDiscountApplied(true);
      }
    } catch (err) {
      console.error("AI Chat error:", err);
      setChatMessages((prev) => [...prev, { sender: "bot", text: "AI is unavailable. Try again shortly." }]);
    }
  }

  const filteredData = itemData.map((section) => ({
    ...section,
    items: section.items.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    ),
  }));

  return (
    <div className="bg-black text-white min-h-screen p-6 pb-32 relative">
      {/* Title */}
      <h1 className="text-4xl mb-6 text-center font-bold">
        <span className="text-white">Manually Select Junk</span>{" "}
        <span className="px-2 py-1 border-2 rounded-lg border-gold text-gold">
          or Add with Smart Select! (Save 10%)
        </span>
      </h1>

      {/* Smart Selector Notice */}
      {showSmartSelectorNotice && !showChat && (
        <div
          className="fixed bottom-6 right-6 bg-black text-white border-2 rounded-xl p-4 shadow-xl cursor-pointer z-50 max-w-xs border-gold"
          onClick={() => {
            setShowChat(true);
            setChatMessages([
              {
                sender: "bot",
                text:
                  "Hey there! I can help you build your junk list fast and maybe save you 10%. Want the discount now so you can see prices as we go, or keep adding items first?",
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
            <button onClick={() => setShowChat(false)} className="text-white hover:text-gold">
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-sm">
            {chatMessages.map((msg, idx) => (
              <p key={idx} className={msg.sender === "user" ? "text-blue-300" : "text-gray-300"}>
                {msg.text}
              </p>
            ))}
          </div>

          {discountApplied && !leadSubmitted && (
            <div className="p-4 border-t border-gold bg-gray-800">
              <p className="text-sm text-gold font-bold mb-2">Lock in your 10% discount:</p>
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

      {/* Search */}
      <div className="mb-6 max-w-2xl mx-auto">
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
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {section.items.map((item, i) => (
                <button
                  key={i}
                  className="bg-gray-800 p-3 rounded-lg hover:border-gold border border-transparent transition"
                  onClick={() => addToCart(item)}
                >
                  <p className="font-semibold">{item.name}</p>
                </button>
              ))}
            </div>
          </div>
        ) : null
      )}

      {/* Cart UI */}
      {cartVisible && (
        <div className="fixed bottom-0 left-0 w-full bg-gray-900 border-t border-gold p-4 z-50">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-gold font-bold">Your Cart ({cart.length} items)</h3>
            <button onClick={() => setCartVisible(false)} className="text-white hover:text-gold">
              Close
            </button>
          </div>
          <ul className="max-h-40 overflow-y-auto text-sm">
            {cart.map((item, idx) => (
              <li key={idx} className="flex justify-between mb-1">
                {item.name}
                <button onClick={() => removeFromCart(idx)} className="text-red-400 hover:text-red-600">
                  ✕
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-sm">
            Load: {loadLabel} — ${finalPrice.toFixed(2)}
            {discountApplied && (
              <>
                {" "}
                | Discounted:{" "}
                <span className="text-gold">${totalWithDiscount.toFixed(2)}</span>
              </>
            )}
          </p>
          <div className="w-full bg-gray-700 h-2 mt-2 rounded">
            <div className="bg-gold h-2 rounded" style={{ width: `${truckFillPercent}%` }} />
          </div>
        </div>
      )}

      {/* Floating Cart Button */}
      <button
        className="fixed bottom-6 left-6 bg-gold text-black font-bold px-4 py-2 rounded-full shadow-lg"
        onClick={() => setCartVisible(!cartVisible)}
      >
        View Cart ({cart.length})
      </button>
    </div>
  );
}

export default ItemizedPage;
