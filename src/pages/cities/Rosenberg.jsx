// File: src/pages/cities/Rosenberg.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Rosenberg = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-12">
      <h1 className="text-4xl text-gold font-bold mb-6">Junk Removal in Rosenberg, TX</h1>
      <p className="text-lg mb-4">
        Need junk removal in Rosenberg? Junk Buddies is your fast, affordable solution for garage cleanouts, furniture haul away, curbside pickup, and full-home junk removal — all with upfront pricing and no hidden fees.
      </p>
      <p className="text-md text-gray-300 mb-6">
        We handle bulk trash, mattress removal, hot tub disposal, appliance pickups, and everything in between. Same-day and next-day service available. Proudly serving neighborhoods across Rosenberg from Brazos Town Center to Historic Downtown.
      </p>

      <p className="text-md mb-4">
        Serving ZIP codes: <span className="text-gold">77471, 77469, 77406, 77494, 77441</span>, and more.
      </p>

      {/* Hidden but crawlable ZIPs for Rosenberg */}
      <ul className="sr-only">
        <li>77471</li>
        <li>77469</li>
        <li>77406</li>
        <li>77494</li>
        <li>77441</li>
        <li>77485</li>
        <li>77423</li>
        <li>77417</li>
        <li>77464</li>
        <li>77461</li>
        <li>77430</li>
        <li>77545</li>
        <li>77420</li>
        <li>77476</li>
      </ul>

      <div className="mt-8">
        <Link
          to="/schedule"
          className="inline-block bg-gold text-black font-bold py-3 px-6 rounded-xl shadow-lg hover:scale-105 transition"
        >
          Schedule Rosenberg Pickup
        </Link>
      </div>
    </div>
  );
};

export default Rosenberg;
