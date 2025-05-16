// File: src/pages/ConfirmationPage.jsx

import React from 'react'; import { useNavigate, useLocation } from 'react-router-dom'; import { FaFacebookSquare, FaInstagram, FaTiktok } from 'react-icons/fa';

function ConfirmationPage() { const navigate = useNavigate(); const { state } = useLocation(); const { cart = [], total = 0 } = state || {};

const totalVolume = cart.reduce((sum, item) => sum + item.volume, 0); const tierRates = [ { maxPoints: 125, price: 250, label: '¼ Load' }, { maxPoints: 250, price: 500, label: '½ Load' }, { maxPoints: 375, price: 750, label: '¾ Load' }, { maxPoints: 500, price: 1000, label: 'Full Load' } ]; const applicableTier = tierRates.find(t => totalVolume <= t.maxPoints) || tierRates[tierRates.length - 1]; const loadLabel = applicableTier.label; const truckFillPercent = Math.min((totalVolume / 500) * 100, 100);

return ( <div className="bg-black min-h-screen text-white flex flex-col items-center justify-center px-4 text-center"> <h1 className="text-4xl text-gold font-bold mb-4">Thank You!</h1> <p className="text-lg max-w-md mb-6"> Your junk removal booking has been confirmed. A confirmation email has been sent to your inbox. </p>

{cart.length > 0 && (
    <div className="bg-gray-900 p-4 rounded-xl w-full max-w-lg mt-6">
      <h2 className="text-lg font-bold text-gold mb-2">Booking Summary</h2>
      <ul className="text-sm mb-2">
        {cart.map((item, i) => (
          <li key={i}>{item.name} - ${item.price.toFixed(2)}</li>
        ))}
      </ul>
      <p className="text-yellow-400">Load Tier: {loadLabel}</p>
      <p className="text-yellow-400">Truck Fill: {Math.round(truckFillPercent)}%</p>
      <p className="font-bold">Total Paid: ${total.toFixed(2)}</p>
    </div>
  )}

  <div className="flex gap-6 mt-10 mb-8">
    <a
      href="https://facebook.com/JunkBuddies.info"
      target="_blank"
      rel="noopener noreferrer"
      className="button-glow-always rounded-full p-3 transition"
    >
      <FaFacebookSquare size={32} />
    </a>
    <a
      href="https://instagram.com/JunkBuddies.info"
      target="_blank"
      rel="noopener noreferrer"
      className="button-glow-always rounded-full p-3 transition"
    >
      <FaInstagram size={32} />
    </a>
    <a
      href="https://tiktok.com/@JunkBuddies.info"
      target="_blank"
      rel="noopener noreferrer"
      className="button-glow-always rounded-full p-3 transition"
    >
      <FaTiktok size={32} />
    </a>
  </div>

  <button
    className="button-glow w-full max-w-xs"
    onClick={() => navigate('/')}
  >
    Back to Home
  </button>
</div>

); }

export default ConfirmationPage;

