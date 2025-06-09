// File: src/pages/cities/Friendswood.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Friendswood = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-12">
      <h1 className="text-4xl text-gold font-bold mb-6">Junk Removal in Friendswood, TX</h1>
      <p className="text-lg mb-4">
        Searching for reliable junk removal in Friendswood? Junk Buddies is your go-to team for fast, local, and affordable service.
        From appliance pickup near FM 518 to garage cleanouts in West Ranch or hauling old furniture out of Wilderness Trails —
        we do it all with hustle and heart.
      </p>
      <p className="text-md text-gray-300 mb-6">
        We serve homeowners, renters, realtors, contractors, and property managers across Friendswood with same-day junk pickup,
        transparent pricing, and no upfront payments. Clear out your clutter the easy way.
      </p>

      <p className="text-md mb-4">
        Proudly serving ZIP codes: <span className="text-gold">77546, 77581, 77089, 77598, 77573</span>, and more.
      </p>

      {/* Hidden crawlable ZIP codes */}
      <ul className="sr-only">
        <li>77546</li>
        <li>77581</li>
        <li>77089</li>
        <li>77598</li>
        <li>77573</li>
        <li>77584</li>
        <li>77034</li>
        <li>77539</li>
        <li>77075</li>
        <li>77511</li>
        <li>77587</li>
        <li>77062</li>
        <li>77565</li>
        <li>77578</li>
        <li>77545</li>
        <li>77505</li>
        <li>77507</li>
        <li>77058</li>
        <li>77059</li>
        <li>77504</li>
      </ul>

      <div className="mt-8">
        <Link
          to="/schedule"
          className="inline-block bg-gold text-black font-bold py-3 px-6 rounded-xl shadow-lg hover:scale-105 transition"
        >
          Schedule Friendswood Pickup
        </Link>
      </div>
    </div>
  );
};

export default Friendswood;
