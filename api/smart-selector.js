// app/selection/page.jsx

'use client';
import { useState } from 'react';

export default function SmartSelector() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSelect = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://smartselector-nbclj4qvoq-uc.a.run.app', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      setItems(data.items || []);
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-4">Smart Junk Item Selector</h1>
      <textarea
        className="w-full h-32 p-3 border rounded mb-4"
        placeholder="Describe the junk items here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        onClick={handleSelect}
        className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
        disabled={loading}
      >
        {loading ? 'Analyzing...' : 'Select Items'}
      </button>

      {error && (
        <p className="text-red-500 mt-4">{error}</p>
      )}

      {items.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Detected Items:</h2>
          <ul className="list-disc pl-6 space-y-1">
            {items.map((item, index) => (
              <li key={index} className="text-gray-800">{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
