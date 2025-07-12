// File: src/pages/cities/SugarLand.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const SugarLand = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-12">
      <div className="max-w-4xl mx-auto space-y-10">

        {/* Hero Title */}
        <h1 className="text-4xl font-bold text-gold text-center">
          Junk Removal in Sugar Land, TX
        </h1>

        {/* Local Intro */}
        <p className="text-lg leading-relaxed">
          Junk Buddies is Sugar Land’s top-rated junk removal service — locally driven, trusted, and built for your schedule. Whether it’s clearing furniture in First Colony, appliance haul-offs in New Territory, or entire garage cleanouts in Telfair, we bring the muscle and the hustle.
        </p>
        <p className="text-lg leading-relaxed">
          Our team offers same-day junk removal in Sugar Land for furniture, electronics, yard waste, hot tubs, construction debris, commercial junk, eviction cleanouts, and more. You’ll never pay upfront — and our pricing beats the big guys every time.
        </p>

        {/* Trust Section */}
        <div className="bg-gray-800 p-6 rounded-xl border border-gold">
          <h2 className="text-2xl font-semibold text-gold mb-4">
            Why Sugar Land Trusts Junk Buddies
          </h2>
          <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
            <li>✅ Big 16 ft trucks — more space, fewer trips</li>
            <li>✅ Instant online pricing with no surprises</li>
            <li>✅ Fully insured & background-checked crews</li>
            <li>✅ Fast local service — same day or next day</li>
            <li>✅ Pay nothing until your junk is gone</li>
          </ul>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/selection"
            className="inline-block bg-gold text-black font-bold py-3 px-6 rounded-xl shadow-lg hover:scale-105 transition"
          >
            Get Instant Pricing in Sugar Land
          </Link>
        </div>

        {/* Neighborhoods */}
        <div>
          <h2 className="text-2xl font-semibold text-gold mb-2">
            Neighborhoods We Serve in Sugar Land
          </h2>
          <p className="text-sm text-gray-300">
            First Colony, Telfair, New Territory, Riverstone, Greatwood, Sugar Creek, Avalon, Imperial, Oak Lake, Brazos Landing, and more.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Serving ZIP codes: 77478, 77479, 77487, 77496, 77498, 77099, 77459, and surrounding areas.
          </p>
        </div>

        {/* Embedded Google Map */}
        <div className="w-full rounded-xl overflow-hidden shadow-lg">
          <iframe
            title="Sugar Land TX Junk Removal Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d111663.6163062002!2d-95.7120765936601!3d29.62116337925325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640e4e92ef3780d%3A0xe3958d56ea0f30be!2sSugar%20Land%2C%20TX!5e0!3m2!1sen!2sus!4v1720721100000!5m2!1sen!2sus"
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
            Why Sugar Land Chooses Junk Buddies
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

        {/* Site Links */}
        <div className="flex flex-col sm:flex-row sm:justify-center gap-4 mt-10 text-center text-sm text-gold underline">
          <Link to="/selection">Select Your Items</Link>
          <Link to="/blog">📝 Read Our Blog</Link>
          <Link to="/faq">📌 Frequently Asked Questions</Link>
          <Link to="/cities">🌎 View All Cities We Serve</Link>
        </div>

        {/* Hidden crawlable ZIPs */}
        <ul className="sr-only">
          <li>77478</li><li>77479</li><li>77487</li><li>77496</li><li>77498</li>
          <li>77099</li><li>77083</li><li>77082</li><li>77407</li><li>77459</li>
          <li>77489</li><li>77071</li><li>77085</li><li>77406</li><li>77469</li>
          <li>77477</li><li>77072</li><li>77031</li><li>77063</li><li>77450</li>
        </ul>

        {/* Footer */}
        <footer className="text-center text-sm text-gray-500 mt-12">
          © 2025 Junk Buddies. All rights reserved.
        </footer>

      </div>
    </div>
  );
};

export default SugarLand;
