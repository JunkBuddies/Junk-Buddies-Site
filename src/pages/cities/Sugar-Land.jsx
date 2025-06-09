// File: src/pages/cities/SugarLand.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const SugarLand = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-12">
      <h1 className="text-4xl text-gold font-bold mb-6">Junk Removal in Sugar Land, TX</h1>
      <p className="text-lg mb-4">
        Junk Buddies is Sugar Land’s top-rated junk removal service — locally driven, trusted, and built for your schedule. Whether it’s clearing furniture in First Colony, appliance haul-offs in New Territory, or entire garage cleanouts in Telfair, we bring the muscle and the hustle.
      </p>
      <p className="text-md text-gray-300 mb-6">
        Our team offers same-day junk removal in Sugar Land for furniture, electronics, yard waste, hot tubs, construction debris, commercial junk, eviction cleanouts, and more. You’ll never pay upfront — and our pricing beats the big guys every time.
      </p>

      <p className="text-md mb-4">
        Serving ZIP codes: <span className="text-gold">77478, 77479, 77487, 77496, 77498</span>, and more.
      </p>

      {/* Hidden crawlable ZIPs */}
      <ul className="sr-only">
        <li>77478</li>
        <li>77479</li>
        <li>77487</li>
        <li>77496</li>
        <li>77498</li>
        <li>77099</li>
        <li>77083</li>
        <li>77082</li>
        <li>77407</li>
        <li>77459</li>
        <li>77489</li>
        <li>77071</li>
        <li>77085</li>
        <li>77406</li>
        <li>77469</li>
        <li>77477</li>
        <li>77072</li>
        <li>77031</li>
        <li>77063</li>
        <li>77450</li>
      </ul>

      <div className="mt-8">
        <Link
          to="/schedule"
          className="inline-block bg-gold text-black font-bold py-3 px-6 rounded-xl shadow-lg hover:scale-105 transition"
        >
          Book Sugar Land Junk Pickup
        </Link>
      </div>
    </div>
  );
};

export default SugarLand;
