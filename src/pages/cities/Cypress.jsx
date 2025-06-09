// File: src/pages/cities/Cypress.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Cypress = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-12">
      <h1 className="text-4xl text-gold font-bold mb-6">Junk Removal in Cypress, TX</h1>
      <p className="text-lg mb-4">
        Junk Buddies is your trusted partner for junk removal in Cypress, TX. Whether you're clearing out
        a garage in Bridgeland, getting rid of old furniture in Towne Lake, or handling post-renovation debris
        in Cypress Creek Lakes, we’ve got the crew, the trucks, and the hustle to clean it up.
      </p>
      <p className="text-md text-gray-300 mb-6">
        Book instantly, get transparent pricing, and enjoy stress-free junk removal with no hidden fees.
        We handle residential, commercial, and curbside pickups across Cypress.
      </p>

      <ul className="sr-only">
        <li>77429</li>
        <li>77433</li>
        <li>77095</li>
        <li>77065</li>
        <li>77070</li>
        <li>77064</li>
        <li>77084</li>
        <li>77041</li>
        <li>77040</li>
        <li>77447</li>
        <li>77493</li>
        <li>77449</li>
        <li>77406</li>
        <li>77407</li>
        <li>77450</li>
        <li>77377</li>
        <li>77375</li>
        <li>77379</li>
        <li>77388</li>
        <li>77389</li>
        <li>77373</li>
        <li>77382</li>
        <li>77410</li>
      </ul>

      <div className="mt-8">
        <Link
          to="/schedule"
          className="inline-block bg-gold text-black font-bold py-3 px-6 rounded-xl shadow-lg hover:scale-105 transition"
        >
          Book Junk Removal in Cypress
        </Link>
      </div>
    </div>
  );
};

export default Cypress;
