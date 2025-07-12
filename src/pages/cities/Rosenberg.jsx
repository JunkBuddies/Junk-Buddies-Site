// File: src/pages/cities/Rosenberg.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Rosenberg = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-12">
      <div className="max-w-4xl mx-auto space-y-10">

        {/* Hero Title */}
        <h1 className="text-4xl font-bold text-gold text-center">
          Junk Removal in Rosenberg, TX
        </h1>

        {/* Local Intro */}
        <p className="text-lg leading-relaxed">
          Need junk removal in Rosenberg? Junk Buddies is your fast, affordable solution for garage cleanouts, furniture haul away, curbside pickup, and full-home junk removal — all with upfront pricing and no hidden fees.
        </p>
        <p className="text-lg leading-relaxed">
          We handle bulk trash, mattress removal, hot tub disposal, appliance pickups, and everything in between.
          Same-day and next-day service available. Proudly serving neighborhoods across Rosenberg from Brazos Town Center to Historic Downtown.
        </p>

        {/* Trust Section */}
        <div className="bg-gray-800 p-6 rounded-xl border border-gold">
          <h2 className="text-2xl font-semibold text-gold mb-4">
            Why Rosenberg Chooses Junk Buddies
          </h2>
          <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
            <li>✅ Large 16 ft box trucks – fewer trips, better value</li>
            <li>✅ Transparent pricing — no bait-and-switch</li>
            <li>✅ Local, licensed & insured crew</li>
            <li>✅ Fully background-checked professionals</li>
            <li>✅ Same-day or next-day scheduled pickup</li>
          </ul>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/selection"
            className="inline-block bg-gold text-black font-bold py-3 px-6 rounded-xl shadow-lg hover:scale-105 transition"
          >
            Get Instant Pricing in Rosenberg
          </Link>
        </div>

        {/* Neighborhoods */}
        <div>
          <h2 className="text-2xl font-semibold text-gold mb-2">
            Rosenberg Neighborhoods We Serve
          </h2>
          <p className="text-sm text-gray-300">
            Brazos Town Center, Historic Downtown, The Reserve at Brazos Town Center, River Run, Cottonwood, Walnut Creek, Summer Lakes, Sunrise Meadow, and more.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Serving Rosenberg and nearby ZIP codes: 77471, 77469, 77406, 77494, 77441, 77485, 77423, 77417, 77464, 77461, 77430, 77545, 77420, 77476
          </p>
        </div>

        {/* Embedded Google Map */}
        <div className="w-full rounded-xl overflow-hidden shadow-lg">
          <iframe
            title="Rosenberg TX Junk Removal Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13910.994235259032!2d-95.8210395!3d29.5573364!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640de85e34e1745%3A0x678ad758d9a0e8a9!2sRosenberg%2C%20TX!5e0!3m2!1sen!2sus!4v1720628000000!5m2!1sen!2sus"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Trust Icons */}
        <div>
          <h2 className="text-2xl font-semibold text-gold mb-4 text-center">
            Why Rosenberg Trusts Junk Buddies
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-sm text-gray-300">
            <div>⏱️ Fast Service</div>
            <div>💰 Upfront Pricing</div>
            <div>🧤 Full-Service Crew</div>
            <div>🧾 No Hidden Fees</div>
          </div>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
          <div className="bg-gray-700 h-24 rounded-xl shadow-inner" />
          <div className="bg-gray-700 h-24 rounded-xl shadow-inner" />
          <div className="bg-gray-700 h-24 rounded-xl shadow-inner" />
          <div className="bg-gray-700 h-24 rounded-xl shadow-inner" />
        </div>

        {/* Bottom Sitelinks */}
        <div className="flex flex-col sm:flex-row sm:justify-center gap-4 mt-10 text-center text-sm text-gold underline">
          <Link to="/selection">Select Your Items</Link>
          <Link to="/blog">📝 Read Our Blog</Link>
          <Link to="/faq">📌 Frequently Asked Questions</Link>
          <Link to="/cities">🌎 View All Cities We Serve</Link>
        </div>

        {/* Hidden crawlable ZIP codes */}
        <ul className="sr-only">
          <li>77471</li><li>77469</li><li>77406</li><li>77494</li><li>77441</li>
          <li>77485</li><li>77423</li><li>77417</li><li>77464</li><li>77461</li>
          <li>77430</li><li>77545</li><li>77420</li><li>77476</li>
        </ul>

        {/* Footer */}
        <footer className="text-center text-sm text-gray-500 mt-12">
          © 2025 Junk Buddies. All rights reserved.
        </footer>

      </div>
    </div>
  );
};

export default Rosenberg;
