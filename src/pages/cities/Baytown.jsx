// File: src/pages/cities/Baytown.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Baytown = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-12">
      <h1 className="text-4xl text-gold font-bold mb-6">Junk Removal in Baytown, TX</h1>
      <p className="text-lg mb-4">
        Looking for fast and affordable junk removal in Baytown? Junk Buddies has you covered.
        From residential cleanouts to commercial hauling, we make junk disappear—on your schedule, at your price.
      </p>
      <p className="text-md text-gray-300 mb-6">
        Whether you're near Garth Rd, San Jacinto Mall, or out by the Baytown Nature Center,
        our team shows up with big trucks and no excuses. Just honest work and instant pricing.
      </p>

      <ul className="sr-only">
        <li>77520</li>
        <li>77521</li>
        <li>77522</li>
        <li>77523</li>
        <li>77535</li>
        <li>77562</li>
        <li>77580</li>
        <li>77597</li>
        <li>77532</li>
        <li>77536</li>
        <li>77514</li>
        <li>77571</li>
        <li>77530</li>
        <li>77560</li>
        <li>77518</li>
        <li>77507</li>
        <li>77510</li>
        <li>77517</li>
        <li>77539</li>
        <li>77541</li>
      </ul>

      <div className="mt-8">
        <Link
          to="/schedule"
          className="inline-block bg-gold text-black font-bold py-3 px-6 rounded-xl shadow-lg hover:scale-105 transition"
        >
          Book Junk Removal in Baytown
        </Link>
      </div>
    </div>
  );
};

export default Baytown;
