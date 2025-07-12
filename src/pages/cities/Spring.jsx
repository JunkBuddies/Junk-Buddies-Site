// File: src/pages/cities/Spring.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Spring = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-12">
      <div className="max-w-4xl mx-auto space-y-10">

        {/* Hero Title */}
        <h1 className="text-4xl font-bold text-gold text-center">
          Junk Removal in Spring, TX
        </h1>

        {/* Local Intro */}
        <p className="text-lg leading-relaxed">
          Junk Buddies proudly serves Spring, TX with fast, affordable, and professional junk removal — from single-item pickups to full-home, office, or garage cleanouts. Whether you're clearing space in Northampton or emptying a property in Gleannloch Farms, we’ve got you covered.
        </p>
        <p className="text-lg leading-relaxed">
          Our local team hauls it all: couches, mattresses, hot tubs, construction debris, old appliances, yard waste, electronics, and more. Transparent pricing, same-day service, and no payment until the job is done — just honest junk removal for the people of Spring.
        </p>

        {/* Trust Section */}
        <div className="bg-gray-800 p-6 rounded-xl border border-gold">
          <h2 className="text-2xl font-semibold text-gold mb-4">
            Why Spring Chooses Junk Buddies
          </h2>
          <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
            <li>✅ Large 16 ft box trucks – more space, fewer trips</li>
            <li>✅ Instant online pricing with no hidden fees</li>
            <li>✅ Licensed, insured, and background-checked pros</li>
            <li>✅ Local crews based in the Spring/Woodlands area</li>
            <li>✅ Same-day or next-day availability</li>
          </ul>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/selection"
            className="inline-block bg-gold text-black font-bold py-3 px-6 rounded-xl shadow-lg hover:scale-105 transition"
          >
            Get Instant Pricing in Spring
          </Link>
        </div>

        {/* Neighborhoods */}
        <div>
          <h2 className="text-2xl font-semibold text-gold mb-2">
            Spring Neighborhoods We Serve
          </h2>
          <p className="text-sm text-gray-300">
            Northampton, Gleannloch Farms, Legends Ranch, Spring Trails, Windrose, Imperial Oaks, Cypresswood Lake, Harmony, Bridgestone West, Devonshire Woods, Fox Run, Benders Landing, and more.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Serving Spring and nearby ZIP codes: 77373, 77379, 77386, 77388, 77389, 77383, 77380, 77381, 77382, 77385, 77090
          </p>
        </div>

        {/* Embedded Google Map */}
        <div className="w-full rounded-xl overflow-hidden shadow-lg">
          <iframe
            title="Spring TX Junk Removal Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13880.370103729264!2d-95.400508!3d30.0799506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86473076d9ad2fe7%3A0x489b0f62ee6aa98d!2sSpring%2C%20TX!5e0!3m2!1sen!2sus!4v1720629900000!5m2!1sen!2sus"
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
            Why Spring Trusts Junk Buddies
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
          <li>77373</li><li>77379</li><li>77386</li><li>77388</li><li>77389</li>
          <li>77383</li><li>77380</li><li>77381</li><li>77382</li><li>77385</li>
          <li>77090</li><li>77375</li><li>77377</li><li>77338</li><li>77068</li>
          <li>77365</li><li>77014</li><li>77346</li><li>77345</li><li>77067</li>
          <li>77302</li><li>77301</li>
        </ul>

        {/* Footer */}
        <footer className="text-center text-sm text-gray-500 mt-12">
          © 2025 Junk Buddies. All rights reserved.
        </footer>

      </div>
    </div>
  );
};

export default Spring;
