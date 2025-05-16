// File: src/pages/SchedulePage.jsx

import React, { useState } from 'react'; import { useLocation, useNavigate } from 'react-router-dom'; import emailjs from 'emailjs-com';

function SchedulePage() { const { state } = useLocation(); const { cart, total } = state || { cart: [], total: 0 }; const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '', date: '', time: '', });

const totalVolume = cart.reduce((sum, item) => sum + item.volume, 0); const tierRates = [ { maxPoints: 125, price: 250, label: '¼ Load' }, { maxPoints: 250, price: 500, label: '½ Load' }, { maxPoints: 375, price: 750, label: '¾ Load' }, { maxPoints: 500, price: 1000, label: 'Full Load' } ]; const applicableTier = tierRates.find(t => totalVolume <= t.maxPoints) || tierRates[tierRates.length - 1]; const loadLabel = applicableTier.label; const truckFillPercent = Math.min((totalVolume / 500) * 100, 100);

const navigate = useNavigate();

const handleChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); };

const handleSubmit = (e) => { e.preventDefault();

const itemsList = cart
  .map((item) => `<li>${item.name}: $${item.price.toFixed(2)}</li>`)
  .join('');

const templateParams = {
  ...formData,
  items: itemsList,
  total: `$${total.toFixed(2)}`
};

emailjs
  .send('JunkBuddies.info', 'Junk_Buddies_Booking', templateParams, 'QCl4Akw_LZ3T8IvUd')
  .then(() => {
    emailjs
      .send('JunkBuddies.info', 'template_57eij3s', {
        ...templateParams,
        email: 'JunkBuddies.info@gmail.com'
      }, 'QCl4Akw_LZ3T8IvUd')
      .then(() => navigate('/confirmation'))
      .catch((error) => alert('Admin email error: ' + error.text));
  })
  .catch((error) => alert('Customer email error: ' + error.text));

};

return ( <div className="bg-black text-white min-h-screen p-6"> <h1 className="text-3xl text-gold font-bold mb-6 text-center">Schedule Your Pickup</h1> <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4"> <input
className="w-full p-3 rounded-xl text-black"
type="text"
name="name"
placeholder="Your Name"
required
onChange={handleChange}
/> <input
className="w-full p-3 rounded-xl text-black"
type="email"
name="email"
placeholder="Your Email"
required
onChange={handleChange}
/> <input
className="w-full p-3 rounded-xl text-black"
type="tel"
name="phone"
placeholder="Your Phone Number"
required
onChange={handleChange}
/> <input
className="w-full p-3 rounded-xl text-black"
type="text"
name="address"
placeholder="Pickup Address"
required
onChange={handleChange}
/> <input
className="w-full p-3 rounded-xl text-black"
type="date"
name="date"
required
onChange={handleChange}
/> <input
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
      <p className="text-yellow-400">Estimated Load Tier: {loadLabel}</p>
      <div className="w-full bg-gray-700 rounded-lg h-4 overflow-hidden mt-2">
        <div
          className="bg-gold h-4 transition-all duration-300"
          style={{ width: `${truckFillPercent}%` }}
        ></div>
      </div>
      <p className="text-xs text-yellow-400 mt-1">
        Truck is {Math.round(truckFillPercent)}% full
      </p>
      <p className="mt-2 italic text-yellow-300">You don't pay until the job is done!</p>
    </div>

    <button type="submit" className="w-full button-glow">
      Schedule Pickup
    </button>
  </form>
</div>

); }

export default SchedulePage;

