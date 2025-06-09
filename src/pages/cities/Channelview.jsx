// File: src/pages/cities/Channelview.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Channelview = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-12">
      <h1 className="text-4xl text-gold font-bold mb-6">Junk Removal in Channelview, TX</h1>
      <p className="text-lg mb-4">
        Need junk removed fast in Channelview? Junk Buddies delivers instant pricing, on-time service,
        and muscle that moves. From garage cleanouts and furniture haul-offs to full construction debris removal,
        we're your local junk removal solution.
      </p>
      <p className="text-md text-gray-300 mb-6">
        Whether you're off Sheldon Rd, near Old River Terrace, or right along I-10,
        our team brings the truck—and gets it done right. No quotes. No waiting. Just clean spaces and fair pricing.
      </p>

      <ul className="sr-only">
        <li>77530</li>
        <li>77049</li>
        <li>77015</li>
        <li>77532</li>
        <li>77562</li>
        <li>77078</li>
        <li>77520</li>
        <li>77044</li>
        <li>77521</li>
        <li>77536</li>
        <li>77501</li>
        <li>77502</li>
        <li>77504</li>
        <li>77506</li>
        <li>77029</li>
        <li>77505</li>
        <li>77013</li>
        <li>77093</li>
        <li>77026</li>
        <li>77028</li>
      </ul>

      <div className="mt-8">
        <Link
          to="/schedule"
          className="inline-block bg-gold text-black font-bold py-3 px-6 rounded-xl shadow-lg hover:scale-105 transition"
        >
          Book Junk Removal in Channelview
        </Link>
      </div>
    </div>
  );
};

export default Channelview;
