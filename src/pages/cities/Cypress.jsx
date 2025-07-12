// File: src/pages/cities/Cypress.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Cypress = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-12">
      {/* TITLE */}
      <h1 className="text-4xl text-gold font-bold text-center mb-10">
        Junk Removal in Cypress, TX
      </h1>

      {/* LOCAL INTRO */}
      <p className="text-lg max-w-4xl mx-auto mb-6 text-gray-300">
        From Bridgeland to Towne Lake and Cypress Creek Lakes, <strong>Junk Buddies</strong> provides fast, full-service junk removal in Cypress, TX. Whether you’re doing a major cleanout or just tossing old furniture, we bring the muscle, trucks, and hustle to every job. Get <span className="text-gold font-semibold">instant pricing</span> online and same-day pickup — no surprises, ever.
      </p>

      {/* WHY TRUST US */}
      <div className="bg-gray-800 border border-gold rounded-xl shadow-lg p-6 mb-10 max-w-4xl mx-auto">
        <h2 className="text-2xl text-gold font-bold mb-4">
          Why Cypress Trusts Junk Buddies
        </h2>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li>✅ Bigger trucks = better value (16ft box trucks)</li>
          <li>✅ Licensed, insured, and background-checked crew</li>
          <li>✅ Transparent pricing — no quotes or hidden fees</li>
          <li>✅ Same-day or next-day availability</li>
          <li>✅ Built in Houston, trusted by Cypress locals</li>
        </ul>
      </div>

      {/* CTA */}
      <div className="text-center">
        <Link
          to="/selection"
          className="cta-metallic-button inline-block mt-4 mb-10"
        >
          Get Instant Pricing
        </Link>
      </div>

      {/* ZIP CODES + NEIGHBORHOODS */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        <div>
          <h3 className="text-xl font-semibold text-gold mb-2">
            Cypress Neighborhoods We Serve:
          </h3>
          <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
            <li>Bridgeland</li>
            <li>Towne Lake</li>
            <li>Fairfield</li>
            <li>Miramesa</li>
            <li>Cypress Creek Lakes</li>
            <li>Coles Crossing</li>
            <li>Blackhorse Ranch</li>
            <li>Cypress Mill</li>
            <li>Westgate</li>
            <li>Villages of Cypress Lakes</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gold mb-2">ZIP Codes Covered:</h3>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>77429, 77433, 77095, 77065, 77070, 77064</li>
            <li>77084, 77041, 77040, 77447, 77493, 77449</li>
            <li>77406, 77407, 77450, 77377, 77375</li>
            <li>77379, 77388, 77389, 77373, 77382, 77410</li>
          </ul>
        </div>
      </div>

      {/* EMBEDDED MAP */}
      <div className="mb-16">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13805.65733114889!2d-95.7236829!3d29.9691115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640c0f70c55a009%3A0x834f637ad4bfc1dc!2sCypress%2C%20TX!5e0!3m2!1sen!2sus!4v1752300000000"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-xl border border-gold shadow-lg"
        ></iframe>
      </div>

      {/* TRUST GRID */}
      <section className="mb-20">
        <h2 className="text-3xl text-gold font-bold text-center mb-8">
          Why Cypress Residents Choose Junk Buddies
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-sm">
          <div className="bg-gray-800 border border-gold p-4 rounded-lg">✅ Transparent Pricing</div>
          <div className="bg-gray-800 border border-gold p-4 rounded-lg">✅ Same-Day Availability</div>
          <div className="bg-gray-800 border border-gold p-4 rounded-lg">✅ 16ft Box Trucks</div>
          <div className="bg-gray-800 border border-gold p-4 rounded-lg">✅ Local Houston Crew</div>
        </div>
      </section>

      {/* LOCAL PHOTO GRID */}
      <section className="mb-20">
        <h2 className="text-3xl text-gold font-bold text-center mb-6">Cypress in Action</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <img src="/images/couch-carrying.png" alt="Crew lifting couch" className="rounded-lg w-full h-36 object-cover border border-gold" />
          <img src="/images/team-sunset.png" alt="Team at sunset" className="rounded-lg w-full h-36 object-cover border border-gold" />
          <img src="/images/truck-fleet.png" alt="Fleet of trucks" className="rounded-lg w-full h-36 object-cover border border-gold" />
          <img src="/images/demolition-crew.png" alt="Demo crew" className="rounded-lg w-full h-36 object-cover border border-gold" />
        </div>
      </section>

      {/* CTA */}
      <div className="text-center mb-16">
        <Link
          to="/selection"
          className="cta-metallic-button"
        >
          Schedule Your Cypress Pickup
        </Link>
      </div>

      {/* INTERNAL LINKS + FOOTER */}
      <footer className="text-sm text-center text-gray-500 border-t border-gold pt-8 mt-10 space-y-3">
        <Link to="/blog" className="text-gold hover:underline block">📝 Read Our Blog</Link>
        <Link to="/faq" className="text-gold hover:underline block">📌 FAQ</Link>
        <Link to="/service-areas" className="text-gold hover:underline block">🌎 Cities We Serve</Link>
        <p className="text-xs text-gray-600">
          © {new Date().getFullYear()} Junk Buddies. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Cypress;
