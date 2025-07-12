// File: src/pages/cities/TheWoodlands.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const TheWoodlands = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-12">
      <div className="max-w-4xl mx-auto space-y-10">

        {/* Hero Title */}
        <h1 className="text-4xl font-bold text-gold text-center">
          Junk Removal in The Woodlands, TX
        </h1>

        {/* Local Intro */}
        <p className="text-lg leading-relaxed">
          Need junk hauled fast in The Woodlands? Junk Buddies delivers the cleanout power you need — whether it’s furniture removal in Alden Bridge, appliance pickup in Sterling Ridge, or a full garage cleanout in Creekside Park. We’re local, reliable, and always upfront with pricing.
        </p>
        <p className="text-lg leading-relaxed">
          We handle single items, entire estate cleanouts, office junk, yard waste, mattress removal, hot tub disposal, and more — all with zero hidden fees. Our self-scheduling tool makes booking your junk pickup in The Woodlands easy and instant.
        </p>

        {/* Trust Section */}
        <div className="bg-gray-800 p-6 rounded-xl border border-gold">
          <h2 className="text-2xl font-semibold text-gold mb-4">
            Why The Woodlands Trusts Junk Buddies
          </h2>
          <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
            <li>✅ Big 16 ft trucks — more space, fewer trips</li>
            <li>✅ Instant pricing and online scheduling</li>
            <li>✅ Same-day or next-day availability</li>
            <li>✅ Fully insured, background-checked crews</li>
            <li>✅ Pay nothing until the job is complete</li>
          </ul>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/selection"
            className="inline-block bg-gold text-black font-bold py-3 px-6 rounded-xl shadow-lg hover:scale-105 transition"
          >
            Get Instant Pricing in The Woodlands
          </Link>
        </div>

        {/* Neighborhoods */}
        <div>
          <h2 className="text-2xl font-semibold text-gold mb-2">
            Areas We Serve in The Woodlands
          </h2>
          <p className="text-sm text-gray-300">
            Alden Bridge, Sterling Ridge, Creekside Park, Grogan’s Mill, Indian Springs, Panther Creek, College Park, Cochran’s Crossing, Carlton Woods, and more.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Serving ZIP codes: 77380, 77381, 77382, 77384, 77385, and surrounding areas.
          </p>
        </div>

        {/* Embedded Map */}
        <div className="w-full rounded-xl overflow-hidden shadow-lg">
          <iframe
            title="The Woodlands TX Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110837.21939219373!2d-95.53540090605722!3d30.16528607902101!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864735d33e9cf889%3A0x66f682a370db1218!2sThe%20Woodlands%2C%20TX!5e0!3m2!1sen!2sus!4v1720723700000!5m2!1sen!2sus"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Trust Badge Grid */}
        <div>
          <h2 className="text-2xl font-semibold text-gold mb-4 text-center">
            The Junk Buddies Advantage
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-sm text-gray-300">
            <div>🗓️ Book Online Anytime</div>
            <div>🚛 Big Box Trucks</div>
            <div>💼 Commercial & Residential</div>
            <div>✅ Pay on Completion</div>
          </div>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
          <div className="bg-gray-700 h-24 rounded-xl shadow-inner" />
          <div className="bg-gray-700 h-24 rounded-xl shadow-inner" />
          <div className="bg-gray-700 h-24 rounded-xl shadow-inner" />
          <div className="bg-gray-700 h-24 rounded-xl shadow-inner" />
        </div>

        {/* Internal Links */}
        <div className="flex flex-col sm:flex-row sm:justify-center gap-4 mt-10 text-center text-sm text-gold underline">
          <Link to="/selection">Browse Services</Link>
          <Link to="/blog">📚 Junk Removal Blog</Link>
          <Link to="/faq">❓FAQ</Link>
          <Link to="/cities">🌎 Cities We Serve</Link>
        </div>

        {/* Hidden ZIP Codes */}
        <ul className="sr-only">
          <li>77380</li><li>77381</li><li>77382</li><li>77384</li><li>77385</li>
          <li>77386</li><li>77375</li><li>77354</li><li>77389</li><li>77355</li>
          <li>77372</li><li>77365</li><li>77302</li><li>77301</li><li>77316</li>
          <li>77318</li><li>77303</li><li>77304</li><li>77306</li><li>77339</li>
        </ul>

        {/* Footer */}
        <footer className="text-center text-sm text-gray-500 mt-12">
          © 2025 Junk Buddies. All rights reserved.
        </footer>

      </div>
    </div>
  );
};

export default TheWoodlands;
