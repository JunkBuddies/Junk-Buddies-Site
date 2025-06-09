// File: src/pages/cities/MissouriCity.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const MissouriCity = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-12">
      <h1 className="text-4xl text-gold font-bold mb-6">Junk Removal in Missouri City, TX</h1>
      <p className="text-lg mb-4">
        Got junk in Missouri City? Junk Buddies delivers fast, fair, and fully insured junk removal services across every neighborhood — from Sienna to Quail Valley, and everything in between. No waiting, no surprise fees.
      </p>
      <p className="text-md text-gray-300 mb-6">
        Whether you're clearing out your garage, remodeling a kitchen, or tackling yard waste, our expert crew shows up on time and gets it done right. Instant pricing, big trucks, and real hustle — that's the Junk Buddies way.
      </p>

      <p className="text-md mb-4">
        Serving ZIP codes: <span className="text-gold">77459, 77489, 77071, 77085, 77545</span>, and more.
      </p>

      {/* Hidden crawlable ZIP codes */}
      <ul className="sr-only">
        <li>77459</li>
        <li>77489</li>
        <li>77071</li>
        <li>77085</li>
        <li>77545</li>
        <li>77477</li>
        <li>77099</li>
        <li>77583</li>
        <li>77053</li>
        <li>77085</li>
        <li>77478</li>
        <li>77031</li>
        <li>77479</li>
        <li>77487</li>
        <li>77469</li>
        <li>77476</li>
        <li>77406</li>
        <li>77534</li>
      </ul>

      <div className="mt-8">
        <Link
          to="/schedule"
          className="inline-block bg-gold text-black font-bold py-3 px-6 rounded-xl shadow-lg hover:scale-105 transition"
        >
          Schedule Missouri City Pickup
        </Link>
      </div>
    </div>
  );
};

export default MissouriCity;
