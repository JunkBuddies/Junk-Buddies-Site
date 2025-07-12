// File: src/pages/cities/Pasadena.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Pasadena = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-12">
      <div className="max-w-4xl mx-auto space-y-10">

        {/* Hero Title */}
        <h1 className="text-4xl font-bold text-gold text-center">
          Junk Removal in Pasadena, TX
        </h1>

        {/* Local Intro */}
        <p className="text-lg leading-relaxed">
          From Red Bluff to Spencer Hwy, Junk Buddies is Pasadena’s go-to team for fast, affordable junk removal.
          Whether it’s appliance pickup, garage cleanouts, or construction debris — we haul it all. 
          No hidden fees. No waiting. Just clean spaces and instant pricing.
        </p>

        {/* Trust Section */}
        <div className="bg-gray-800 p-6 rounded-xl border border-gold">
          <h2 className="text-2xl font-semibold text-gold mb-4">
            Why Pasadena Chooses Junk Buddies
          </h2>
          <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
            <li>✅ Same-day or next-day junk removal across Pasadena</li>
            <li>✅ Large 16ft trucks – more space for less money</li>
            <li>✅ Transparent pricing with zero surprises</li>
            <li>✅ Friendly, local crews with real hustle</li>
            <li>✅ Licensed, insured, and background-checked pros</li>
          </ul>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/selection"
            className="inline-block bg-gold text-black font-bold py-3 px-6 rounded-xl shadow-lg hover:scale-105 transition"
          >
            Get Instant Pricing in Pasadena
          </Link>
        </div>

        {/* Neighborhoods */}
        <div>
          <h2 className="text-2xl font-semibold text-gold mb-2">
            Pasadena Neighborhoods We Serve
          </h2>
          <p className="text-sm text-gray-300">
            Red Bluff Terrace, Golden Acres, Pasadena Oaks, Village Grove, Burke Meadow, Baywood, Vince Heights, Deepwater, Tanglebriar, Park View, and surrounding communities.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Serving Pasadena and surrounding ZIP codes: 77502, 77503, 77504, 77505, 77034, 77075, 77501, 77506, 77507, 77087, 77536, 77061, 77089, 77520, 77530, 77571, 77062, 77598, 77015
          </p>
        </div>

        {/* Embedded Google Map */}
        <div className="w-full rounded-xl overflow-hidden shadow-lg">
          <iframe
            title="Pasadena TX Junk Removal Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110892.07330426237!2d-95.25828388251288!3d29.679844168770266!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86409e61dfdfbfbd%3A0x3e6e7bfb06d3f740!2sPasadena%2C%20TX!5e0!3m2!1sen!2sus!4v1752302891222!5m2!1sen!2sus"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Why Pasadena Trusts Junk Buddies */}
        <div>
          <h2 className="text-2xl font-semibold text-gold mb-4 text-center">
            Why Pasadena Trusts Junk Buddies
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-sm text-gray-300">
            <div>⏱️ Fast Service</div>
            <div>💰 Upfront Pricing</div>
            <div>🧤 Full-Service Crew</div>
            <div>🧾 No Hidden Fees</div>
          </div>
        </div>

        {/* Local Photos */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
          <div className="bg-gray-700 h-24 rounded-xl shadow-inner" />
          <div className="bg-gray-700 h-24 rounded-xl shadow-inner" />
          <div className="bg-gray-700 h-24 rounded-xl shadow-inner" />
          <div className="bg-gray-700 h-24 rounded-xl shadow-inner" />
        </div>

        {/* Bottom CTAs */}
        <div className="flex flex-col sm:flex-row sm:justify-center gap-4 mt-10 text-center">
          <Link
            to="/selection"
            className="bg-gold text-black font-bold py-3 px-5 rounded-xl shadow-lg hover:scale-105 transition"
          >
            Select Your Items
          </Link>
          <Link
            to="/blog"
            className="bg-gray-800 border border-gold text-gold font-medium py-3 px-5 rounded-xl hover:scale-105 transition"
          >
            📝 Junk Removal Blog
          </Link>
          <Link
            to="/faq"
            className="bg-gray-800 border border-gold text-gold font-medium py-3 px-5 rounded-xl hover:scale-105 transition"
          >
            📌 FAQ
          </Link>
          <Link
            to="/cities"
            className="bg-gray-800 border border-gold text-gold font-medium py-3 px-5 rounded-xl hover:scale-105 transition"
          >
            🌎 Cities We Serve
          </Link>
        </div>

        {/* Hidden crawlable ZIPs */}
        <ul className="sr-only">
          <li>77502</li>
          <li>77503</li>
          <li>77504</li>
          <li>77505</li>
          <li>77034</li>
          <li>77075</li>
          <li>77501</li>
          <li>77506</li>
          <li>77507</li>
          <li>77087</li>
          <li>77536</li>
          <li>77061</li>
          <li>77089</li>
          <li>77520</li>
          <li>77530</li>
          <li>77571</li>
          <li>77062</li>
          <li>77598</li>
          <li>77015</li>
        </ul>

        {/* Footer */}
        <footer className="text-center text-sm text-gray-500 mt-12">
          © 2025 Junk Buddies. All rights reserved.
        </footer>

      </div>
    </div>
  );
};

export default Pasadena;
