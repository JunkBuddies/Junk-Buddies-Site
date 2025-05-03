// File: src/pages/LoadSizePage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const loadSizes = [
  { name: 'Full Load', price: 1000 },
  { name: '3/4 Load', price: 750 },
  { name: '1/2 Load', price: 500 },
  { name: '1/4 Load', price: 250 },
];

function LoadSizePage() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const addToCart = (item) => {
    setCart((prev) => [...prev, item]); // Now allows adding multiple loads
  };

  const removeFromCart = (index) => {
    const updated = [...cart];
    updated.splice(index, 1);
    setCart(updated);
  };

  const getTotal = () => cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="bg-black text-white min-h-screen p-6 flex flex-col items-center">
      <h1 className="text-4xl text-gold font-bold mb-10 text-center">Select Your Load Size</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
        {loadSizes.map((load, idx) => (
          <div
            key={idx}
            className="bg-white text-black p-6 rounded-2xl shadow-lg flex flex-col justify-between items-center"
          >
            <h2 className="text-2xl font-bold mb-4">{load.name}</h2>
            <p className="text-xl mb-4">${load.price.toFixed(2)}</p>
            <button
              className="button-glow"
              onClick={() => addToCart(load)}
            >
              Add
            </button>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="mt-10 w-full max-w-3xl border-t border-gold pt-6 flex flex-col items-center">
        <p className="text-lg mb-4 font-bold">Total: ${getTotal().toFixed(2)}</p>
        <ul className="mb-4 w-full max-w-md">
          {cart.map((item, idx) => (
            <li key={idx} className="flex justify-between items-center text-sm border-b border-gray-700 py-2">
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
        <div className="flex gap-4">
          <button
            disabled={cart.length === 0}
            className={`button-glow disabled:opacity-50 disabled:cursor-not-allowed`}
            onClick={() =>
              navigate('/itemized', { state: { cart, total: getTotal() } })
            }
          >
            Add Itemized Items
          </button>
          <button
            disabled={cart.length === 0}
            className={`button-glow disabled:opacity-50 disabled:cursor-not-allowed`}
            onClick={() =>
              navigate('/schedule', { state: { cart, total: getTotal() } })
            }
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoadSizePage; // LoadSizePage.jsx - multiple load support, updated buttons (Rule ALPHA)
