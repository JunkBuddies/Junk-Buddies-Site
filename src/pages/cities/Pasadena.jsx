// File: src/pages/cities/Pasadena.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Pasadena = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-12">
      <h1 className="text-4xl text-gold font-bold mb-6">Junk Removal in Pasadena, TX</h1>
      <p className="text-lg mb-4">
        From Red Bluff to Spencer Hwy, Junk Buddies is Pasadena’s #1 choice for reliable junk removal. No hidden fees, no long waits — just fast, affordable cleanouts from a locally trusted team with big trucks and even bigger hustle.
      </p>
      <p className="text-md text-gray-300 mb-6">
        We handle appliance haul-offs, garage cleanouts, furniture pickups, eviction junkouts, and more. Our instant pricing tool makes it simple — you only pay when the job’s done.
      </p>

      <p className="text-md mb-4">
        Serving ZIP codes: <span className="text-gold">77502, 77503, 77504, 77505, 77034</span>, and more.
      </p>

      {/* Hidden crawlable ZIP codes */}
      <ul className="sr-only">
        <li>77502</li>
        <li>77503</li>
        <li>77504</li>
        <li>77505</li>
        <li>77034</li>
        <li>77075</li>
        <li>77501</li>
        <li>77506</li>
        <li>77507</li>
        <li>77087</li>
        <li>77536</li>
        <li>77061</li>
        <li>77089</li>
        <li>77520</li>
        <li>77530</li>
        <li>77571</li>
        <li>77062</li>
        <li>77598</li>
        <li>77015</li>
      </ul>

      <div className="mt-8">
        <Link
          to="/schedule"
          className="inline-block bg-gold text-black font-bold py-3 px-6 rounded-xl shadow-lg hover:scale-105 transition"
        >
          Schedule Pasadena Pickup
        </Link>
      </div>
    </div>
  );
};

export default Pasadena;
