// File: src/pages/cities/LaPorte.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const LaPorte = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-12">
      <h1 className="text-4xl text-gold font-bold mb-6">Junk Removal in La Porte, TX</h1>
      <p className="text-lg mb-4">
        Need dependable junk removal in La Porte? Junk Buddies brings fast, affordable, and friendly junk pickup right to your curb — from home cleanouts and office furniture to garage clutter and heavy debris.
      </p>
      <p className="text-md text-gray-300 mb-6">
        Serving neighborhoods near Fairmont Parkway, Morgan’s Point, Bayshore Drive, and everywhere in between. Transparent pricing, instant scheduling, and no hidden fees — you only pay when the job’s done.
      </p>

      <p className="text-md mb-4">
        Serving ZIP codes: <span className="text-gold">77571, 77536, 77507, 77586, 77520</span>, and more.
      </p>

      {/* Hidden crawlable ZIP codes */}
      <ul className="sr-only">
        <li>77571</li>
        <li>77536</li>
        <li>77507</li>
        <li>77586</li>
        <li>77520</li>
        <li>77058</li>
        <li>77059</li>
        <li>77521</li>
        <li>77598</li>
        <li>77562</li>
        <li>77506</li>
        <li>77015</li>
        <li>77049</li>
        <li>77029</li>
        <li>77503</li>
        <li>77502</li>
        <li>77504</li>
        <li>77505</li>
        <li>77530</li>
        <li>77597</li>
      </ul>

      <div className="mt-8">
        <Link
          to="/schedule"
          className="inline-block bg-gold text-black font-bold py-3 px-6 rounded-xl shadow-lg hover:scale-105 transition"
        >
          Schedule La Porte Junk Pickup
        </Link>
      </div>
    </div>
  );
};

export default LaPorte;
