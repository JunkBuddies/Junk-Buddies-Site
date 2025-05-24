// File: src/pages/SchedulePage.jsx

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';
import { calculatePrice } from '../utils/pricing';

function SchedulePage() {
  const { state } = useLocation();
  const { cart } = state || { cart: [] };

  const { finalPrice, totalVolume } = calculatePrice(cart);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
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

    const itemsList = cart
      .map((item) => `<li>${item.name}: $${item.price.toFixed(2)}</li>`)
      .join('');

    const templateParams = {
      ...formData,
      items: itemsList,
      total: `$${finalPrice.toFixed(2)}`
    };

    emailjs
      .send('JunkBuddies.info', 'Junk_Buddies_Booking', templateParams, 'QCl4Akw_LZ3T8IvUd')
      .then(() => {
        return emailjs.send(
          'JunkBuddies.info',
          'template_57eij3s',
          { ...templateParams, email: 'JunkBuddies.info@gmail.com' },
          'QCl4Akw_LZ3T8IvUd'
        );
      })
      .then(() => {
        navigate('/confirmation', {
          state: { cart, total: finalPrice, volume: totalVolume }
        });
      })
      .catch((error) => alert('Email error: ' + error.text));
  };

  return (
    <div className="bg-black text-white min-h-screen p-6">
      <h1 className="text-3xl text-gold font-bold mb-6 text-center">Book Junk Pickup - Pay nothing now</h1>
      <div className="mt-4 mb-6 flex justify-center">
        <div className="compare-badge-silver">
          No Upfront Payment Required
        </div>
      </div>

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
          type="tel"
          name="phone"
          placeholder="Your Phone Number"
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

        {/* Time Selection Buttons */}
        <div>
          <label className="block mb-2 font-semibold">Select Time Window:</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Morning', time: '8:00 AM – 11:00 AM' },
              { label: 'Afternoon', time: '12:00 PM – 3:00 PM' },
              { label: 'Evening', time: '4:00 PM – 7:00 PM' },
            ].map(({ label, time }) => (
              <button
                key={time}
                type="button"
                onClick={() => setFormData({ ...formData, time })}
                className={`text-center py-3 rounded-xl transition-all border-2 w-full ${
                  formData.time === time
                    ? 'bg-gold text-black border-white'
                    : 'bg-gray-300 text-black border-gray-400 hover:bg-gray-200'
                }`}
              >
                <div className="font-bold text-lg">{label}</div>
                <div className="text-sm">{time}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 text-white p-4 rounded-xl">
          <h2 className="text-lg font-bold mb-2">Your Cart:</h2>
          <ul className="mb-2">
            {cart.map((item, idx) => (
              <li key={idx}>
                {item.name} - ${item.price.toFixed(2)}
              </li>
            ))}
          </ul>
          <p className="font-bold">Total: ${finalPrice.toFixed(2)}</p>
          <p className="mt-2 italic text-yellow-300">You don't pay until the job is done!</p>
        </div>

        <button type="submit" className="w-full button-glow">
          Schedule Pickup
        </button>
      </form>
    </div>
  );
}

export default SchedulePage;
