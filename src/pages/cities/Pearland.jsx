// File: src/pages/cities/Pearland.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Pearland = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-12">
      <div className="max-w-4xl mx-auto space-y-10">

        {/* Hero Title */}
        <h1 className="text-4xl font-bold text-gold text-center">
          Junk Removal in Pearland, TX
        </h1>

        {/* Local Intro */}
        <p className="text-lg leading-relaxed">
          Junk Buddies is your local solution for junk removal in Pearland — from Shadow Creek Ranch to East Broadway and everywhere in between.
          Whether it’s a couch, garage, storage unit, or entire property, we make junk disappear fast.
        </p>

        <p className="text-lg leading-relaxed">
          Our big trucks and friendly crew handle the heavy lifting so you don’t have to. Self-schedule online, lock in instant pricing,
          and pay nothing until the job is complete. Transparent. Affordable. Trusted by Pearland homeowners and businesses alike.
        </p>

        {/* Trust Section */}
        <div className="bg-gray-800 p-6 rounded-xl border border-gold">
          <h2 className="text-2xl font-semibold text-gold mb-4">
            Why Pearland Chooses Junk Buddies
          </h2>
          <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
            <li>✅ Large 16ft box trucks – fewer trips, more value</li>
            <li>✅ Transparent pricing — no haggling, no bait-and-switch</li>
            <li>✅ Local crews that hustle and clean up right</li>
            <li>✅ Fully licensed, insured, and background-checked</li>
            <li>✅ Same-day or next-day junk removal available</li>
          </ul>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/selection"
            className="inline-block bg-gold text-black font-bold py-3 px-6 rounded-xl shadow-lg hover:scale-105 transition"
          >
            Get Instant Pricing in Pearland
          </Link>
        </div>

        {/* Neighborhoods */}
        <div>
          <h2 className="text-2xl font-semibold text-gold mb-2">
            Pearland Neighborhoods We Serve
          </h2>
          <p className="text-sm text-gray-300">
            Shadow Creek Ranch, Silverlake, Southdown, Green Tee Terrace, Dixie Hollow, Sunrise Lakes, Southern Trails, West Oaks, Corrigan North, Highland Crossing, and more.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Serving Pearland and surrounding ZIP codes: 77581, 77584, 77588, 77047, 77089, 77583, 77578, 77545, 77546, 77048, 77598, 77511, 77565, 77075, 77034, 77085
          </p>
        </div>

        {/* Embedded Google Map */}
        <div className="w-full rounded-xl overflow-hidden shadow-lg">
          <iframe
            title="Pearland TX Junk Removal Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d88459.06286267468!2d-95.3777998311188!3d29.552165415753038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640958b62ff5b6f%3A0x577ef1e2c2f9aa67!2sPearland%2C%20TX!5e0!3m2!1sen!2sus!4v1752307620006!5m2!1sen!2sus"
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
            Why Pearland Trusts Junk Buddies
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

        {/* Hidden crawlable ZIPs */}
        <ul className="sr-only">
          <li>77581</li>
          <li>77584</li>
          <li>77588</li>
          <li>77047</li>
          <li>77089</li>
          <li>77583</li>
          <li>77578</li>
          <li>77545</li>
          <li>77546</li>
          <li>77048</li>
          <li>77598</li>
          <li>77511</li>
          <li>77565</li>
          <li>77075</li>
          <li>77034</li>
          <li>77085</li>
        </ul>

        {/* Footer */}
        <footer className="text-center text-sm text-gray-500 mt-12">
          © 2025 Junk Buddies. All rights reserved.
        </footer>

      </div>
    </div>
  );
};

export default Pearland;

