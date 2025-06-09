// File: src/pages/cities/Humble.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Humble = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-12">
      <h1 className="text-4xl text-gold font-bold mb-6">Junk Removal in Humble, TX</h1>
      <p className="text-lg mb-4">
        Looking for fast and affordable junk removal in Humble? Junk Buddies has you covered. Whether you’re near Deerbrook Mall,
        Atascocita, or Fall Creek, we haul away furniture, appliances, debris, and more — same day, no hassle.
      </p>
      <p className="text-md text-gray-300 mb-6">
        We service residential and commercial clients all over Humble. Book junk pickup for your home, apartment, office,
        or construction site — no hidden fees, no upfront payments, and no delays.
      </p>

      <p className="text-md mb-4">
        Serving ZIP codes: <span className="text-gold">77338, 77346, 77396, 77345, 77347</span>, and more.
      </p>

      {/* Hidden crawlable ZIP codes */}
      <ul className="sr-only">
        <li>77338</li>
        <li>77346</li>
        <li>77396</li>
        <li>77345</li>
        <li>77347</li>
        <li>77325</li>
        <li>77044</li>
        <li>77032</li>
        <li>77050</li>
        <li>77093</li>
        <li>77365</li>
        <li>77532</li>
        <li>77357</li>
        <li>77339</li>
        <li>77372</li>
        <li>77073</li>
        <li>77060</li>
        <li>77090</li>
        <li>77373</li>
        <li>77377</li>
      </ul>

      <div className="mt-8">
        <Link
          to="/schedule"
          className="inline-block bg-gold text-black font-bold py-3 px-6 rounded-xl shadow-lg hover:scale-105 transition"
        >
          Book Humble Junk Pickup
        </Link>
      </div>
    </div>
  );
};

export default Humble;
