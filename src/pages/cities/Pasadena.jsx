// File: src/pages/cities/Pasadena.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Pasadena = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-12">
      <h1 className="text-4xl text-gold font-bold mb-6">Junk Removal in Pasadena, TX</h1>
      <p className="text-lg mb-4">
        From Red Bluff to Spencer Hwy, Junk Buddies is Pasadena’s #1 choice for reliable junk removal.
        No hidden fees, no long waits — just fast, affordable cleanouts from a locally trusted team
        with big trucks and even bigger hustle.
      </p>
      <p className="text-md text-gray-300 mb-6">
        We handle appliance haul-offs, garage cleanouts, furniture pickups, eviction junkouts, and more.
        Our instant pricing tool makes it simple — you only pay when the job’s done.
      </p>

      <div className="bg-gray-800 border border-gold rounded-xl shadow-lg p-6 mb-10 max-w-4xl mx-auto">
        <h2 className="text-2xl text-gold font-bold mb-4">Why Pasadena Chooses Junk Buddies</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li>✅ Big 16ft box trucks — more space, fewer trips</li>
          <li>✅ Transparent pricing — zero hidden fees</li>
          <li>✅ Local crews that actually show up</li>
          <li>✅ Licensed, insured, and background-checked</li>
          <li>✅ Same-day or next-day pickups in Pasadena</li>
        </ul>
      </div>

      <div className="text-center mb-12">
        <Link
          to="/selection"
          className="cta-metallic-button inline-block mt-4"
        >
          Get Instant Pricing in Pasadena
        </Link>
      </div>

      <div className="max-w-4xl mx-auto text-left mb-10">
        <h2 className="text-2xl text-gold font-semibold mb-3">
          Pasadena Neighborhoods We Serve
        </h2>
        <ul className="list-disc list-inside text-gray-300">
          <li>Golden Acres</li>
          <li>Red Bluff Terrace</li>
          <li>Village Grove</li>
          <li>Spencer View Terrace</li>
          <li>Parkview South</li>
          <li>Burke Meadow</li>
          <li>Deepwater</li>
          <li>Southmore Plaza</li>
          <li>Vista Villas</li>
          <li>Baywood</li>
        </ul>
      </div>

      <div className="text-sm text-gray-400 max-w-4xl mx-auto mb-12">
        Serving Pasadena and surrounding zip codes:
        <span className="text-gold font-semibold ml-1">
          77502, 77503, 77504, 77505, 77034, 77075, 77501, 77506, 77507, 77087,
          77536, 77061, 77089, 77520, 77530, 77571, 77062, 77598, 77015
        </span>
      </div>

      <div className="max-w-4xl mx-auto mb-12">
        <iframe
          className="w-full h-64 rounded-lg"
          loading="lazy"
          style={{ border: 0 }}
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55529.38582777616!2d-95.2320437030081!3d29.68027183045873!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640c3cb1273a355%3A0x39a4f61eafe35332!2sPasadena%2C%20TX!5e0!3m2!1sen!2sus!4v1752277762625!5m2!1sen!2sus"
        ></iframe>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16">
        <img src="/images/crew-carrying-sofa.jpg" alt="Carrying Sofa" className="rounded-lg shadow-md" />
        <img src="/images/junk-truck.jpg" alt="Truck Fleet" className="rounded-lg shadow-md" />
        <img src="/images/demo-before.jpg" alt="Demo Cleanout" className="rounded-lg shadow-md" />
        <img src="/images/crew-flex.jpg" alt="Team Photo" className="rounded-lg shadow-md" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm text-gray-300 max-w-4xl mx-auto mb-16">
        <div className="bg-gray-800 border border-gold rounded-xl py-4 px-2">⏱️ Fast Service</div>
        <div className="bg-gray-800 border border-gold rounded-xl py-4 px-2">💰 Upfront Pricing</div>
        <div className="bg-gray-800 border border-gold rounded-xl py-4 px-2">🧤 Full-Service Crew</div>
        <div className="bg-gray-800 border border-gold rounded-xl py-4 px-2">🧾 No Hidden Fees</div>
      </div>

      <div className="text-center mb-8">
        <Link
          to="/selection"
          className="inline-block bg-gold text-black font-bold py-3 px-6 rounded-xl shadow-lg hover:scale-105 transition mb-4"
        >
          Schedule Pasadena Pickup
        </Link>
        <br />
        <Link
          to="/blog"
          className="text-sm underline text-gray-400 hover:text-white"
        >
          📝 Read Our Blog — Junk Removal Tips & More
        </Link>
      </div>

      <div className="text-center text-sm text-gray-500 mb-4">
        <Link to="/faq" className="underline mr-4">📌 FAQ</Link>
        <Link to="/cities" className="underline">🌎 All Cities We Serve</Link>
      </div>

      <footer className="text-center text-xs text-gray-600 mt-8">
        © 2025 Junk Buddies. All rights reserved.
      </footer>

      {/* Hidden crawlable ZIPs */}
      <ul className="sr-only">
        <li>77502</li><li>77503</li><li>77504</li><li>77505</li><li>77034</li>
        <li>77075</li><li>77501</li><li>77506</li><li>77507</li><li>77087</li>
        <li>77536</li><li>77061</li><li>77089</li><li>77520</li><li>77530</li>
        <li>77571</li><li>77062</li><li>77598</li><li>77015</li>
      </ul>
    </div>
  );
};

export default Pasadena;
