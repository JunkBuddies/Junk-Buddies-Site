// File: src/pages/cities/Richmond.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Richmond = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-12">
      <h1 className="text-4xl text-gold font-bold mb-6">Junk Removal in Richmond, TX</h1>
      <p className="text-lg mb-4">
        Live in Richmond and need junk gone? Junk Buddies has you covered — from Long Meadow Farms to Downtown Richmond, our crew shows up with big trucks and instant pricing that’s up to 30% lower than the national chains.
      </p>
      <p className="text-md text-gray-300 mb-6">
        Whether it’s old furniture, garage clutter, office junk, or a full estate cleanout, we make space fast. No surprises, no upfront payment. Just fast, friendly junk removal on your schedule.
      </p>

      <p className="text-md mb-4">
        Serving ZIP codes: <span className="text-gold">77406, 77407, 77469, 77441, 77471</span>, and more.
      </p>

      {/* Hidden crawlable ZIP codes */}
      <ul className="sr-only">
        <li>77406</li>
        <li>77407</li>
        <li>77469</li>
        <li>77441</li>
        <li>77471</li>
        <li>77476</li>
        <li>77494</li>
        <li>77485</li>
        <li>77417</li>
        <li>77423</li>
        <li>77464</li>
        <li>77461</li>
        <li>77430</li>
        <li>77545</li>
        <li>77420</li>
      </ul>

      <div className="mt-8">
        <Link
          to="/schedule"
          className="inline-block bg-gold text-black font-bold py-3 px-6 rounded-xl shadow-lg hover:scale-105 transition"
        >
          Schedule Richmond Pickup
        </Link>
      </div>
    </div>
  );
};

export default Richmond;
