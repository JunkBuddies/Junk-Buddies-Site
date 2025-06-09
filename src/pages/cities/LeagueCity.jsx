// File: src/pages/cities/LeagueCity.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const LeagueCity = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-12">
      <h1 className="text-4xl text-gold font-bold mb-6">Junk Removal in League City, TX</h1>
      <p className="text-lg mb-4">
        Searching for affordable junk removal in League City? Junk Buddies is your go-to team for fast, reliable cleanouts with no hidden fees — just honest pricing and hustle that gets the job done right the first time.
      </p>
      <p className="text-md text-gray-300 mb-6">
        Whether you’re in South Shore Harbour, Westover Park, Brittany Lakes, or closer to FM 518 and I-45, we’re hauling it all — furniture, appliances, garage clutter, yard waste, hot tubs, and more.
      </p>

      <p className="text-md mb-4">
        Serving ZIP codes: <span className="text-gold">77573, 77539, 77565, 77546, 77058</span>, and more.
      </p>

      {/* Hidden crawlable ZIP codes */}
      <ul className="sr-only">
        <li>77573</li>
        <li>77539</li>
        <li>77565</li>
        <li>77546</li>
        <li>77058</li>
        <li>77059</li>
        <li>77598</li>
        <li>77584</li>
        <li>77578</li>
        <li>77581</li>
        <li>77583</li>
        <li>77511</li>
        <li>77518</li>
        <li>77510</li>
        <li>77591</li>
        <li>77586</li>
        <li>77587</li>
        <li>77507</li>
        <li>77504</li>
        <li>77502</li>
        <li>77505</li>
        <li>77062</li>
        <li>77089</li>
      </ul>

      <div className="mt-8">
        <Link
          to="/schedule"
          className="inline-block bg-gold text-black font-bold py-3 px-6 rounded-xl shadow-lg hover:scale-105 transition"
        >
          Book League City Pickup
        </Link>
      </div>
    </div>
  );
};

export default LeagueCity;
