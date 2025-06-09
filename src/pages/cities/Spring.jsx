// File: src/pages/cities/Spring.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Spring = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-12">
      <h1 className="text-4xl text-gold font-bold mb-6">Junk Removal in Spring, TX</h1>
      <p className="text-lg mb-4">
        Junk Buddies proudly serves Spring, TX with fast, affordable, and professional junk removal — from single-item pickups to full-home, office, or garage cleanouts. Whether you're clearing space in Northampton or emptying a property in Gleannloch Farms, we’ve got you covered.
      </p>
      <p className="text-md text-gray-300 mb-6">
        Our local team hauls it all: couches, mattresses, hot tubs, construction debris, old appliances, yard waste, electronics, and more. Transparent pricing, same-day service, and no payment until the job is done — just honest junk removal for the people of Spring.
      </p>

      <p className="text-md mb-4">
        Serving ZIP codes: <span className="text-gold">77373, 77379, 77386, 77388, 77389</span>, and more.
      </p>

      {/* Hidden but crawlable ZIPs */}
      <ul className="sr-only">
        <li>77373</li>
        <li>77379</li>
        <li>77386</li>
        <li>77388</li>
        <li>77389</li>
        <li>77383</li>
        <li>77380</li>
        <li>77381</li>
        <li>77382</li>
        <li>77385</li>
        <li>77090</li>
        <li>77375</li>
        <li>77377</li>
        <li>77338</li>
        <li>77068</li>
        <li>77365</li>
        <li>77014</li>
        <li>77346</li>
        <li>77345</li>
        <li>77067</li>
        <li>77302</li>
        <li>77301</li>
      </ul>

      <div className="mt-8">
        <Link
          to="/schedule"
          className="inline-block bg-gold text-black font-bold py-3 px-6 rounded-xl shadow-lg hover:scale-105 transition"
        >
          Schedule Spring Pickup
        </Link>
      </div>
    </div>
  );
};

export default Spring;
