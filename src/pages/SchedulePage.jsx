// File: src/pages/SchedulePage.jsx

import React, { useState } from 'react'; import { useNavigate } from 'react-router-dom'; import emailjs from 'emailjs-com'; import { useCart } from '../context/CartContext'; import { calculatePrice } from '../utils/pricing'; import { FaChevronDown } from 'react-icons/fa';

const generatePresetDates = () => { const presets = []; for (let i = 0; i < 6; i++) { const date = new Date(); date.setDate(date.getDate() + i);

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

presets.push({ label, dateFormatted, value: isoDate });

} return presets; };

const presetDates = generatePresetDates();

function SchedulePage() { const { cart } = useCart(); const { finalPrice, totalVolume } = calculatePrice(cart);

const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '', date: '', time: '', customDateFormatted: '' });

const navigate = useNavigate();

const handleChange = (e) => { const { name, value } = e.target; let updated = { ...formData, [name]: value };

if (name === 'date' && !presetDates.some(d => d.value === value)) {
  const d = new Date(value);
  const formatted = d.toLocaleDateString('en-US', {
    weekday: 'long',
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  });
  updated.customDateFormatted = formatted;
} else if (name === 'date') {
  updated.customDateFormatted = '';
}

setFormData(updated);

};

const handleSubmit = (e) => { e.preventDefault(); const itemsList = cart.map(item => <li>${item.name}: $${item.price.toFixed(2)}</li>).join('');

const templateParams = {
  ...formData,
  items: itemsList,
  total: `$${finalPrice.toFixed(2)}`
};

emailjs.send('JunkBuddies.info', 'Junk_Buddies_Booking', templateParams, 'QCl4Akw_LZ3T8IvUd')
  .then(() => {
    return emailjs.send(
      'JunkBuddies.info',
      'template_57eij3s',
      { ...templateParams, email: 'JunkBuddies.info@gmail.com' },
      'QCl4Akw_LZ3T8IvUd'
    );
  })
  .then(() => navigate('/confirmation'))
  .catch(error => alert('Email error: ' + error.text));

};

return ( <div className="bg-black text-white min-h-screen p-6"> <h1 className="text-3xl text-gold font-bold mb-6 text-center">Book Junk Pickup - Pay nothing now</h1>

<div className="mt-4 mb-6 flex justify-center">
    <div className="compare-badge-silver">No Upfront Payment Required</div>
  </div>

  <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
    <input className="w-full p-3 rounded-xl text-black" type="text" name="name" placeholder="Your Name" required onChange={handleChange} />
    <input className="w-full p-3 rounded-xl text-black" type="email" name="email" placeholder="Your Email" required onChange={handleChange} />
    <input className="w-full p-3 rounded-xl text-black" type="tel" name="phone" placeholder="Your Phone Number" required onChange={handleChange} />
    <input className="w-full p-3 rounded-xl text-black" type="text" name="address" placeholder="Pickup Address" required onChange={handleChange} />

    <div className="space-y-3">
      <label className="block font-semibold">Select Date:</label>
      <div className="grid grid-cols-3 gap-4">
        {presetDates.map(({ label, dateFormatted, value }) => (
          <button
            key={value}
            type="button"
            onClick={() => setFormData({ ...formData, date: value, customDateFormatted: '' })}
            className={`silver-button ${formData.date === value ? 'silver-button-active' : ''} h-[72px] w-full flex flex-col justify-center items-center text-center`}
          >
            <div className="text-base font-bold leading-snug">{label}</div>
            <div className="text-sm">{dateFormatted}</div>
          </button>
        ))}
      </div>

      <div className="relative">
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className={`w-full p-3 rounded-xl text-transparent caret-transparent appearance-none transition-all duration-200 pr-10 ${
            formData.date && !presetDates.some(d => d.value === formData.date)
              ? 'bg-[#FFD700] font-bold border-2 border-[#FFD700]'
              : 'silver-button text-black'
          }`}
        />
        <FaChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black pointer-events-none text-lg" />
        {!formData.date && (
          <span className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 text-center text-sm text-black pointer-events-none">
            Or choose custom date
          </span>
        )}
        {formData.customDateFormatted && (
          <span className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 text-center text-black font-bold text-sm pointer-events-none">
            {formData.customDateFormatted}
          </span>
        )}
      </div>
    </div>

    <div>
      <label className="block mb-2 font-semibold">Select Time Window:</label>
      <div className="grid grid-cols-3 gap-4">
        {[{ label: 'Morning', time: '8:00 AM – 11:00 AM' }, { label: 'Afternoon', time: '12:00 PM – 3:00 PM' }, { label: 'Evening', time: '4:00 PM – 7:00 PM' }].map(({ label, time }) => (
          <button
            key={time}
            type="button"
            onClick={() => setFormData({ ...formData, time })}
            className={`silver-button ${formData.time === time ? 'silver-button-active' : ''} w-full text-center`}
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
          <li key={idx}>{item.name} - ${item.price.toFixed(2)}</li>
        ))}
      </ul>
      <p className="font-bold">Total: ${finalPrice.toFixed(2)}</p>
      <p className="mt-2 italic text-yellow-300">You don't pay until the job is done!</p>
    </div>

    <button type="submit" className="w-full button-glow">Schedule Pickup</button>
  </form>
</div>

); }

export default SchedulePage;

