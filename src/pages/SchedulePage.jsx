// File: src/pages/SchedulePage.jsx

import React, { useState } from 'react'; import { useNavigate } from 'react-router-dom'; import emailjs from 'emailjs-com'; import { useCart } from '../context/CartContext'; import { calculatePrice } from '../utils/pricing';

const generatePresetDates = () => { const labels = ['Today', 'Tomorrow', 'Day After']; const presets = [];

for (let i = 0; i < 6; i++) { const date = new Date(); date.setDate(date.getDate() + i);

const label =
  i === 0 ? 'Today' :
  i === 1 ? 'Tomorrow' :
  i === 2 ? 'Day After' :
  date.toLocaleDateString('en-US', { weekday: 'long' });

const dateFormatted = date.toLocaleDateString('en-US', {
  weekday: i < 3 ? 'long' : undefined,
  month: '2-digit',
  day: '2-digit',
  year: 'numeric'
});

const isoDate = date.toISOString().split('T')[0];

presets.push({
  label,
  dateFormatted,
  value: isoDate
});

}

return presets; };

const presetDates = generatePresetDates();

function SchedulePage() { const { cart } = useCart(); const { finalPrice, totalVolume } = calculatePrice(cart);

const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '', date: '', time: '', });

const navigate = useNavigate();

const handleChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); };

const handleSubmit = (e) => { e.preventDefault();

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
    navigate('/confirmation');
  })
  .catch((error) => alert('Email error: ' + error.text));

};

return ( <div className="bg-black text-white min-h-screen p-6"> <h1 className="text-3xl text-gold font-bold mb-6 text-center"> Book Junk Pickup - Pay nothing now </h1>

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

    {/* Date Selection */}
    <div className="space-y-3">
      <label className="block font-semibold">Select Date:</label>
      <div className="flex flex-wrap justify-between gap-3">
        {presetDates.map(({ label, dateFormatted, value }) => (
          <button
            key={value}
            type="button"
            onClick={() => setFormData({ ...formData, date: value })}
            className={`silver-button min-h-[64px] flex-1 text-center ${
              formData.date === value ? 'silver-button-active' : ''
            }`}
          >
            <div className="text-base font-bold">{label}</div>
            <div className="text-sm">{dateFormatted}</div>
          </button>
        ))}
      </div>

      <div>
        <label className="block font-semibold mt-2 mb-1 text-center text-sm text-gray-300">
          Or choose a custom date:
        </label>
        <input
          className="w-full p-3 rounded-xl text-black silver-button text-center"
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
      </div>
    </div>

    {/* Time Selection */}
    <div>
      <label className="block mb-2 font-semibold">Select Time Window:</label>
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Morning', time: '8:00 AM – 11:00 AM' },
          { label: 'Afternoon', time: '12:00 PM – 3:00 PM' },
          { label: 'Evening', time: '4:00 PM – 7:00 PM' },
        ].map(({ label, time }) => (
          <button
            key={time}
            type="button"
            onClick={() => setFormData({ ...formData, time })}
            className={`silver-button min-h-[64px] w-full text-center ${
              formData.time === time ? 'silver-button-active' : ''
            }`}
          >
            <div className="text-lg font-bold">{label}</div>
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
      <p className="mt-2 italic text-yellow-300">
        You don't pay until the job is done!
      </p>
    </div>

    <button type="submit" className="w-full button-glow">
      Schedule Pickup
    </button>
  </form>
</div>

); }

export default SchedulePage;

