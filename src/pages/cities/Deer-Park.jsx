// File: src/pages/cities/DeerPark.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const DeerPark = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-12">
      <h1 className="text-4xl text-gold font-bold mb-6">Junk Removal in Deer Park, TX</h1>
      <p className="text-lg mb-4">
        Need junk removed fast in Deer Park? Junk Buddies delivers efficient and affordable junk hauling
        with transparent pricing and no surprises. Whether it's a garage cleanout on San Augustine, old furniture on Luella Ave,
        or renovation debris on Center Street — we show up ready to clear space.
      </p>
      <p className="text-md text-gray-300 mb-6">
        Our crews serve every neighborhood and business park in Deer Park with same-day availability and upfront pricing you can trust.
      </p>

      <p className="text-md mb-4">
        Proudly serving ZIP codes: <span className="text-gold">77536, 77571, 77505, 77015, 77507</span>, and more.
      </p>

      {/* Hidden crawlable ZIP codes */}
      <ul className="sr-only">
        <li>77536</li>
        <li>77571</li>
        <li>77505</li>
        <li>77015</li>
        <li>77507</li>
        <li>77506</li>
        <li>77503</li>
        <li>77501</li>
        <li>77502</li>
        <li>77504</li>
        <li>77530</li>
        <li>77049</li>
        <li>77520</li>
        <li>77521</li>
        <li>77029</li>
        <li>77532</li>
        <li>77547</li>
        <li>77586</li>
        <li>77061</li>
        <li>77034</li>
        <li>77075</li>
        <li>77087</li>
        <li>77013</li>
        <li>77089</li>
      </ul>

      <div className="mt-8">
        <Link
          to="/schedule"
          className="inline-block bg-gold text-black font-bold py-3 px-6 rounded-xl shadow-lg hover:scale-105 transition"
        >
          Book Junk Removal in Deer Park
        </Link>
      </div>
    </div>
  );
};

export default DeerPark;
