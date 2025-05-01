// File: src/pages/ItemizedPage.jsx

import React, { useState } from 'react'; import { useNavigate, useLocation } from 'react-router-dom';

const itemData = [ { category: 'Furniture', items: [ { name: 'Sofa (Standard)', price: 90 }, { name: 'Sofa (Sectional)', price: 150 }, { name: 'Chair', price: 60 }, { name: 'Recliner', price: 80 }, { name: 'Dining Table', price: 125 }, { name: 'Coffee Table', price: 70 }, { name: 'Bed Frame (Twin)', price: 85 }, { name: 'Bed Frame (Queen)', price: 100 }, { name: 'Bed Frame (King)', price: 120 }, { name: 'Mattress (Twin)', price: 85 }, { name: 'Mattress (Queen)', price: 95 }, { name: 'Mattress (King)', price: 105 }, { name: 'Dresser', price: 100 }, { name: 'Nightstand', price: 45 }, { name: 'Bookshelf', price: 60 }, ], }, { category: 'Kitchen Appliances', items: [ { name: 'Refrigerator (Standard)', price: 140 }, { name: 'Refrigerator (Commercial)', price: 200 }, { name: 'Oven', price: 110 }, { name: 'Dishwasher', price: 100 }, { name: 'Microwave', price: 75 }, { name: 'Freezer (Chest)', price: 130 }, ], }, { category: 'Laundry Appliances', items: [ { name: 'Washing Machine', price: 100 }, { name: 'Dryer', price: 90 }, { name: 'Stackable Washer/Dryer', price: 160 }, { name: 'Utility Sink', price: 60 }, ], }, { category: 'Electronics', items: [ { name: 'Television (40"-59")', price: 90 }, { name: 'Television (60"+)', price: 120 }, { name: 'Computer Monitor', price: 60 }, { name: 'Printer', price: 50 }, { name: 'Stereo System', price: 75 }, { name: 'Game Console', price: 40 }, ], }, { category: 'Outdoor & Miscellaneous', items: [ { name: 'Lawnmower (Push)', price: 90 }, { name: 'Lawnmower (Riding)', price: 150 }, { name: 'Grill (Small)', price: 80 }, { name: 'Grill (Large)', price: 130 }, { name: 'Hot Tub', price: 200 }, { name: 'Yard Debris (Per Bag)', price: 30 }, { name: 'Bicycle', price: 45 }, { name: 'Trampoline', price: 180 }, { name: 'Above Ground Pool', price: 300 }, { name: 'Playset', price: 250 }, ], }, ];

function ItemizedPage() { const [cart, setCart] = useState([]); const [search, setSearch] = useState(''); const navigate = useNavigate(); const location = useLocation(); const initialCart = location.state?.cart || []; const initialTotal = location.state?.total || 0;

const addToCart = (item) => { setCart([...cart, item]); };

const removeFromCart = (index) => { const updated = [...cart]; updated.splice(index, 1); setCart(updated); };

const getTotal = () => (initialTotal || 0) + cart.reduce((sum, item) => sum + item.price, 0);

const filteredData = itemData.map((section) => ({ ...section, items: section.items.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()) ), }));

return ( <div className="bg-black text-white min-h-screen p-6"> <h1 className="text-gold text-4xl font-bold mb-6 text-center">Itemized Junk Removal</h1>

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
            <div key={i} className="bg-white text-black p-4 rounded-xl shadow flex flex-col justify-between">
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
  ))}

  {/* Cart Summary */}
  <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gold p-4 flex flex-col md:flex-row justify-between items-center gap-4">
    <div className="flex-1">
      <p className="font-bold text-lg mb-2">Cart:</p>
      <ul>
        {cart.map((item, idx) => (
          <li key={idx} className="flex justify-between items-center text-sm">
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
        className="bg-gold px-6 py-3 rounded-xl text-black font-bold hover:bg-yellow-400 w-full"
        onClick={() =>
          navigate('/schedule', { state: { cart, total: getTotal() } })
        }
      >
        Schedule Now
      </button>
    </div>
  </div>
</div>

); }

export default ItemizedPage;

// ItemizedPage.jsx - responsive search, add/remove cart, total
