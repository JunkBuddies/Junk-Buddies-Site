// File: src/pages/ItemizedPage.jsx

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const itemData = [
  // ... (same data as before, unchanged)
];

function ItemizedPage() {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const initialCart = location.state?.cart || [];
  const initialTotal = location.state?.total || 0;

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (index) => {
    const updated = [...cart];
    updated.splice(index, 1);
    setCart(updated);
  };

  const getTotal = () =>
    (initialTotal || 0) + cart.reduce((sum, item) => sum + item.price, 0);

  const filteredData = itemData.map((section) => ({
    ...section,
    items: section.items.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    ),
  }));

  return (
    <div className="bg-black text-white min-h-screen p-6">
      <h1 className="text-gold text-4xl font-bold mb-6 text-center">
        Itemized Junk Removal
      </h1>

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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {section.items.map((item, i) => (
                <div
                  key={i}
                  className="bg-white text-black p-4 rounded-xl shadow flex flex-col justify-between"
                >
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm">${item.price.toFixed(2)}</p>
                  </div>
                  <button
                    className="bg-gold mt-4 px-4 py-2 rounded text-black font-bold hover:bg-yellow-400"
                    onClick={() => addToCart(item)}
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : null
      )}

      {/* Cart Summary */}
      <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gold p-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex-1">
          <p className="font-bold text-lg mb-2">Cart:</p>
          <ul>
            {cart.map((item, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center text-sm"
              >
                {item.name} - ${item.price.toFixed(2)}
                <button
                  onClick={() => removeFromCart(idx)}
                  className="text-red-500 text-xs ml-2 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="font-bold">Total: ${getTotal().toFixed(2)}</p>
          <button
            className="btn-glow px-6 py-3 rounded-xl text-black font-bold w-full"
            onClick={() =>
              navigate('/schedule', { state: { cart, total: getTotal() } })
            }
          >
            Schedule Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemizedPage;
