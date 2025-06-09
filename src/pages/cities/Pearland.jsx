// File: src/pages/cities/Pearland.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Pearland = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-12">
      <h1 className="text-4xl text-gold font-bold mb-6">Junk Removal in Pearland, TX</h1>
      <p className="text-lg mb-4">
        Junk Buddies is your local solution for junk removal in Pearland — from Shadow Creek Ranch to East Broadway and everywhere in between. Whether it’s a couch, garage, storage unit, or entire property, we make junk disappear fast.
      </p>
      <p className="text-md text-gray-300 mb-6">
        Our big trucks and friendly crew handle the heavy lifting so you don’t have to. Self-schedule online, lock in instant pricing, and pay nothing until the job is complete. Transparent. Affordable. Trusted by Pearland homeowners and businesses alike.
      </p>

      <p className="text-md mb-4">
        Serving ZIP codes: <span className="text-gold">77581, 77584, 77047, 77588, 77089</span>, and more.
      </p>

      {/* Hidden crawlable ZIP codes */}
      <ul className="sr-only">
        <li>77581</li>
        <li>77584</li>
        <li>77588</li>
        <li>77047</li>
        <li>77089</li>
        <li>77583</li>
        <li>77578</li>
        <li>77545</li>
        <li>77546</li>
        <li>77048</li>
        <li>77598</li>
        <li>77511</li>
        <li>77565</li>
        <li>77075</li>
        <li>77034</li>
        <li>77085</li>
      </ul>

      <div className="mt-8">
        <Link
          to="/schedule"
          className="inline-block bg-gold text-black font-bold py-3 px-6 rounded-xl shadow-lg hover:scale-105 transition"
        >
          Schedule Pearland Pickup
        </Link>
      </div>
    </div>
  );
};

export default Pearland;
