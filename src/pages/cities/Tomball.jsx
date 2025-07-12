// File: src/pages/cities/Tomball.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Tomball = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-12">
      <div className="max-w-4xl mx-auto space-y-10">

        {/* Title */}
        <h1 className="text-4xl text-gold font-bold text-center">
          Junk Removal in Tomball, TX
        </h1>

        {/* Local Copy */}
        <p className="text-lg leading-relaxed">
          Looking for junk removal in Tomball? Junk Buddies brings fast, professional cleanouts to neighborhoods all over the city — from Downtown Tomball to Northpointe, Willowcreek Ranch, Rosehill, and beyond. Whether it's garage clutter, bulk trash, old furniture, yard debris, or commercial junk — our crew handles it all with speed and precision.
        </p>
        <p className="text-lg leading-relaxed">
          Our pricing is instant, our service is guaranteed, and you never pay until the job’s done. Book online and see why Tomball residents trust Junk Buddies for hassle-free junk hauling.
        </p>

        {/* Trust Section */}
        <div className="bg-gray-800 p-6 rounded-xl border border-gold">
          <h2 className="text-2xl font-semibold text-gold mb-4">
            Why Tomball Chooses Junk Buddies
          </h2>
          <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
            <li>✅ Transparent, upfront pricing</li>
            <li>✅ Large 16-ft box trucks</li>
            <li>✅ Same-day or next-day service</li>
            <li>✅ No payment until job is complete</li>
            <li>✅ Local team. Insured. Trusted.</li>
          </ul>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/selection"
            className="inline-block bg-gold text-black font-bold py-3 px-6 rounded-xl shadow-lg hover:scale-105 transition"
          >
            Get Instant Pricing in Tomball
          </Link>
        </div>

        {/* Neighborhood + ZIP Section */}
        <div>
          <h2 className="text-2xl font-semibold text-gold mb-2">
            Neighborhoods & ZIP Codes We Serve
          </h2>
          <p className="text-sm text-gray-300">
            Downtown Tomball, Northpointe, Rosehill, Amira, Willowcreek Ranch, Creekside, Villages of Northpointe, Wildwood, and more.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            ZIPs served: 77375, 77377, 77362, 77447, 77379, and surrounding areas.
          </p>
        </div>

        {/* Embedded Google Map */}
        <div className="w-full rounded-xl overflow-hidden shadow-lg">
          <iframe
            title="Tomball TX Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110570.8428130086!2d-95.73582572544587!3d30.082472097765288!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8647285cd7e7a9f7%3A0x2dd75a99c9382d9b!2sTomball%2C%20TX!5e0!3m2!1sen!2sus!4v1720733900000!5m2!1sen!2sus"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Badge Grid */}
        <div>
          <h2 className="text-2xl font-semibold text-gold mb-4 text-center">
            The Junk Buddies Advantage
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-sm text-gray-300">
            <div>🗓️ Online Booking</div>
            <div>🚛 Big Trucks</div>
            <div>💪 Residential + Commercial</div>
            <div>✅ Pay Upon Completion</div>
          </div>
        </div>

        {/* Image Grid Placeholder */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
          <div className="bg-gray-700 h-24 rounded-xl shadow-inner" />
          <div className="bg-gray-700 h-24 rounded-xl shadow-inner" />
          <div className="bg-gray-700 h-24 rounded-xl shadow-inner" />
          <div className="bg-gray-700 h-24 rounded-xl shadow-inner" />
        </div>

        {/* Internal Site Links */}
        <div className="flex flex-col sm:flex-row sm:justify-center gap-4 mt-10 text-center text-sm text-gold underline">
          <Link to="/selection">Browse Services</Link>
          <Link to="/blog">📚 Junk Removal Blog</Link>
          <Link to="/faq">❓ FAQ</Link>
          <Link to="/cities">🌎 Cities We Serve</Link>
        </div>

        {/* Hidden ZIPs */}
        <ul className="sr-only">
          <li>77375</li><li>77377</li><li>77362</li><li>77447</li><li>77379</li>
          <li>77070</li><li>77389</li><li>77429</li><li>77388</li><li>77386</li>
          <li>77354</li><li>77355</li><li>77380</li><li>77373</li><li>77064</li>
          <li>77338</li><li>77304</li><li>77384</li><li>77316</li><li>77302</li>
        </ul>

        {/* Footer */}
        <footer className="text-center text-sm text-gray-500 mt-12">
          © 2025 Junk Buddies. All rights reserved.
        </footer>

      </div>
    </div>
  );
};

export default Tomball;
