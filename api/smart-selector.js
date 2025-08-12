// app/selection/page.jsx
'use client';
import { useState } from 'react';

const SMART_SELECTOR_URL = 'https://smartselector-nbclj4qvoq-uc.a.run.app';

export default function SmartSelector() {
  const [input, setInput] = useState('');
  const [chat, setChat] = useState([]); // {sender: 'user'|'bot', text: string}[]
  const [cartItems, setCartItems] = useState([]); // [{name, price, volume, category}]
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Optional lead capture fields (wire to your UI if desired)
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadSaved, setLeadSaved] = useState(false);

  async function callSmartSelector(userText) {
    setLoading(true);
    setError(null);

    // Build messages array the endpoint expects
    const messages = [
      ...chat.map(m => ({ role: m.sender === 'user' ? 'user' : 'assistant', content: m.text })),
      { role: 'user', content: userText }
    ];

    try {
      const res = await fetch(SMART_SELECTOR_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages,
          // Only include leadInfo if you want to save a discount lead
          leadInfo: leadSaved
            ? { name: leadName || '', phone: leadPhone || '', submitted: true }
            : { submitted: false }
        })
      });

      // Surface non-200s cleanly
      if (!res.ok) {
        const maybeJson = await res.json().catch(() => ({}));
        const msg = maybeJson?.error || `API error: ${res.status}`;
        throw new Error(msg);
      }

      const data = await res.json(); // { reply, cartItems }
      const replyText = data?.reply || 'OK.';
      const items = Array.isArray(data?.cartItems) ? data.cartItems : [];

      setChat(prev => [...prev, { sender: 'user', text: userText }, { sender: 'bot', text: replyText }]);

      // Merge new items by name (avoid dupes)
      setCartItems(prev => {
        const names = new Set(prev.map(i => i.name));
        const additions = items.filter(i => i?.name && !names.has(i.name));
        return [...prev, ...additions];
      });
    } catch (e) {
      setError(e.message || 'Unexpected error.');
    } finally {
      setLoading(false);
    }
  }

  const handleSelect = async () => {
    const text = input.trim();
    if (!text) return;
    setInput('');
    await callSmartSelector(text);
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-4">Smart Junk Item Selector</h1>

      {/* Simple chat log */}
      <div className="border rounded p-3 mb-4 h-56 overflow-auto bg-white">
        {chat.length === 0 && (
          <p className="text-gray-500">Start by describing your items (e.g., “couch and 6 moving boxes”).</p>
        )}
        {chat.map((m, i) => (
          <p key={i} className={m.sender === 'user' ? 'text-blue-700' : 'text-gray-800'}>
            <strong>{m.sender === 'user' ? 'You' : 'Assistant'}:</strong> {m.text}
          </p>
        ))}
      </div>

      <textarea
        className="w-full h-28 p-3 border rounded mb-3"
        placeholder="Describe the junk items here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSelect();
          }
        }}
      />

      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={handleSelect}
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 disabled:opacity-60"
          disabled={loading}
        >
          {loading ? 'Analyzing...' : 'Send'}
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {cartItems.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Detected Items:</h2>
          <ul className="list-disc pl-6 space-y-1">
            {cartItems.map((item, index) => (
              <li key={`${item.name}-${index}`} className="text-gray-800">
                {item.name} — ${item.price} • {item.volume} cu ft • <em>{item.category}</em>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Optional lead capture (use if you want to save the 10% lead via the function) */}
      <div className="mt-10 border rounded p-4 bg-white">
        <h3 className="font-semibold mb-2">Save 10% (optional)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            className="border rounded p-2"
            placeholder="Your Name"
            value={leadName}
            onChange={(e) => setLeadName(e.target.value)}
          />
          <input
            className="border rounded p-2"
            placeholder="Your Phone"
            value={leadPhone}
            onChange={(e) => setLeadPhone(e.target.value)}
          />
        </div>
        <button
          className="mt-3 bg-black text-white px-4 py-2 rounded disabled:opacity-60"
          onClick={() => setLeadSaved(true)}
          disabled={leadSaved}
        >
          {leadSaved ? 'Saved' : 'Save Discount'}
        </button>
      </div>
    </div>
  );
}
