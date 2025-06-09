// File: src/pages/cities/TheWoodlands.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const TheWoodlands = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-12">
      <h1 className="text-4xl text-gold font-bold mb-6">Junk Removal in The Woodlands, TX</h1>
      <p className="text-lg mb-4">
        Need junk hauled fast in The Woodlands? Junk Buddies delivers the cleanout power you need — whether it’s furniture removal in Alden Bridge, appliance pickup in Sterling Ridge, or a full garage cleanout in Creekside Park. We’re local, reliable, and always upfront with pricing.
      </p>
      <p className="text-md text-gray-300 mb-6">
        We handle single items, entire estate cleanouts, office junk, yard waste, mattress removal, hot tub disposal, and more — all with zero hidden fees. Our self-scheduling tool makes booking your junk pickup in The Woodlands easy and instant.
      </p>

      <p className="text-md mb-4">
        Serving ZIP codes: <span className="text-gold">77380, 77381, 77382, 77384, 77385</span>, and more.
      </p>

      {/* Hidden crawlable ZIPs */}
      <ul className="sr-only">
        <li>77380</li>
        <li>77381</li>
        <li>77382</li>
        <li>77384</li>
        <li>77385</li>
        <li>77386</li>
        <li>77375</li>
        <li>77354</li>
        <li>77389</li>
        <li>77355</li>
        <li>77372</li>
        <li>77365</li>
        <li>77302</li>
        <li>77301</li>
        <li>77316</li>
        <li>77318</li>
        <li>77303</li>
        <li>77304</li>
        <li>77306</li>
        <li>77339</li>
      </ul>

      <div className="mt-8">
        <Link
          to="/schedule"
          className="inline-block bg-gold text-black font-bold py-3 px-6 rounded-xl shadow-lg hover:scale-105 transition"
        >
          Book Junk Removal in The Woodlands
        </Link>
      </div>
    </div>
  );
};

export default TheWoodlands;
