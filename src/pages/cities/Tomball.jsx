// File: src/pages/cities/Tomball.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Tomball = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-12">
      <h1 className="text-4xl text-gold font-bold mb-6">Junk Removal in Tomball, TX</h1>
      <p className="text-lg mb-4">
        Looking for junk removal in Tomball? Junk Buddies brings fast, professional cleanouts to neighborhoods all over the city—from downtown Tomball to Northpointe, Willowcreek Ranch, Rosehill, and beyond. Whether it's garage clutter, bulk trash, old furniture, yard debris, or commercial junk—our crew handles it all with speed and precision.
      </p>
      <p className="text-md text-gray-300 mb-6">
        Our pricing is instant, our service is guaranteed, and you never pay until the job’s done. Book online and see why Tomball residents trust Junk Buddies for hassle-free junk hauling.
      </p>

      <p className="text-md mb-4">
        Serving ZIP codes: <span className="text-gold">77375, 77377, 77362, 77447, 77379</span>, and more.
      </p>

      {/* Hidden crawlable ZIPs */}
      <ul className="sr-only">
        <li>77375</li>
        <li>77377</li>
        <li>77362</li>
        <li>77447</li>
        <li>77379</li>
        <li>77070</li>
        <li>77389</li>
        <li>77429</li>
        <li>77388</li>
        <li>77386</li>
        <li>77354</li>
        <li>77355</li>
        <li>77380</li>
        <li>77373</li>
        <li>77064</li>
        <li>77338</li>
        <li>77304</li>
        <li>77384</li>
        <li>77316</li>
        <li>77302</li>
      </ul>

      <div className="mt-8">
        <Link
          to="/schedule"
          className="inline-block bg-gold text-black font-bold py-3 px-6 rounded-xl shadow-lg hover:scale-105 transition"
        >
          Book Junk Removal in Tomball
        </Link>
      </div>
    </div>
  );
};

export default Tomball;
