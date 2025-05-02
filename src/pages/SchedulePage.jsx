// File: src/pages/SchedulePage.jsx

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';

function SchedulePage() {
  const { state } = useLocation();
  const { cart, total } = state || { cart: [], total: 0 };
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    date: '',
    time: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const templateParams = {
      ...formData,
      cart: cart.map((item) => `${item.name}: $${item.price}`).join(', '),
      total: `$${total.toFixed(2)}`,
    };

    emailjs
      .send('JunkBuddies.info', 'Junk_Buddies_Booking', templateParams, 'QCl4Akw_LZ3T8IvUd')
      .then(() => navigate('/confirmation'))
      .catch((error) => alert('Error sending confirmation: ' + error.text));
  };

  return (
    <div className="bg-black text-white min-h-screen p-6">
      <h1 className="text-3xl text-gold font-bold mb-6 text-center">Schedule Your Pickup</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
        <input
          className="w-full p-3 rounded-xl text-black"
          type="text"
          name="name"
          placeholder="Your Name"
          required
          onChange={handleChange}
        />
        <input
          className="w-full p-3 rounded-xl text-black"
          type="email"
          name="email"
          placeholder="Your Email"
          required
          onChange={handleChange}
        />
        <input
          className="w-full p-3 rounded-xl text-black"
          type="text"
          name="address"
          placeholder="Pickup Address"
          required
          onChange={handleChange}
        />
        <input
          className="w-full p-3 rounded-xl text-black"
          type="date"
          name="date"
          required
          onChange={handleChange}
        />
        <input
          className="w-full p-3 rounded-xl text-black"
          type="time"
          name="time"
          required
          onChange={handleChange}
        />

        <div className="bg-gray-800 text-white p-4 rounded-xl">
          <h2 className="text-lg font-bold mb-2">Your Cart:</h2>
          <ul className="mb-2">
            {cart.map((item, idx) => (
              <li key={idx}>
                {item.name} - ${item.price.toFixed(2)}
              </li>
            ))}
          </ul>
          <p className="font-bold">Total: ${total.toFixed(2)}</p>
          <p className="mt-2 italic text-yellow-300">You don't pay until the job is done!</p>
        </div>

        <button
          type="submit"
          className="w-full bg-gold text-black font-bold py-3 px-6 rounded-xl hover:bg-yellow-400"
        >
          Schedule Pickup
        </button>
      </form>
    </div>
  );
}

export default SchedulePage;

// SchedulePage.jsx - responsive form, emailJS, cart summary
