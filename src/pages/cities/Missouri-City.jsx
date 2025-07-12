// File: src/pages/cities/MissouriCity.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const MissouriCity = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen px-6 py-12">
      <h1 className="text-4xl text-gold font-bold mb-6 text-center">Junk Removal in Missouri City, TX</h1>

      <p className="text-lg text-gray-300 max-w-4xl mx-auto mb-6">
        Got junk in Missouri City? <strong>Junk Buddies</strong> delivers fast, fair, and fully insured junk removal services across every neighborhood — from Sienna to Quail Valley, and everything in between. No waiting, no surprise fees.
      </p>
      <p className="text-md text-gray-400 max-w-3xl mx-auto mb-10">
        Whether you're clearing out your garage, remodeling a kitchen, or tackling yard waste, our expert crew shows up on time and gets it done right. Instant pricing, big trucks, and real hustle — that's the Junk Buddies way.
      </p>

      {/* Trust Section */}
      <div className="bg-gray-800 border border-gold rounded-xl shadow-lg p-6 mb-10 max-w-4xl mx-auto">
        <h2 className="text-2xl text-gold font-bold mb-4">Why Missouri City Chooses Junk Buddies</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li>✅ 16ft box trucks – more space, fewer trips</li>
          <li>✅ Transparent pricing — no haggling, no upsells</li>
          <li>✅ Local crews that show up ready to work</li>
          <li>✅ Licensed, insured, and background-checked pros</li>
          <li>✅ Same-day or next-day junk removal available</li>
        </ul>
      </div>

      {/* CTA */}
      <div className="text-center mb-10">
        <Link to="/selection" className="cta-metallic-button">
          Get Instant Pricing in Missouri City
        </Link>
      </div>

      {/* Neighborhoods */}
      <div className="max-w-4xl mx-auto mb-10">
        <h3 className="text-xl text-gold font-bold mb-2 text-center">Missouri City Neighborhoods We Serve</h3>
        <div className="text-center text-gray-300">
          <p>Quail Valley</p>
          <p>Sienna</p>
          <p>Riverstone</p>
          <p>Hunters Glen</p>
          <p>Lake Olympia</p>
          <p>Colony Lakes</p>
          <p>Lexington Square</p>
          <p>Fort Bend Houston</p>
        </div>
        <p className="text-sm text-center text-gray-400 mt-4">
          Serving Missouri City and surrounding ZIP codes: <span className="text-gold">77459, 77489, 77071, 77085, 77545</span>, and more.
        </p>
        <ul className="sr-only">
          <li>77459</li><li>77489</li><li>77071</li><li>77085</li><li>77545</li><li>77477</li><li>77099</li><li>77583</li>
          <li>77053</li><li>77478</li><li>77031</li><li>77479</li><li>77487</li><li>77469</li><li>77476</li><li>77406</li><li>77534</li>
        </ul>
      </div>

      {/* Google Map Embed */}
      <div className="max-w-4xl mx-auto mb-12">
        <iframe
          title="Missouri City, TX Service Area"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110568.68223262348!2d-95.61052322896936!3d29.565246947123382!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640ddef0d394ca5%3A0xa6a9e6d179f3a62f!2sMissouri%20City%2C%20TX!5e0!3m2!1sen!2sus!4v1752298800000!5m2!1sen!2sus"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      {/* Why Trust Section */}
      <div className="bg-gray-800 border border-gold rounded-xl p-6 max-w-4xl mx-auto mb-12">
        <h2 className="text-2xl text-gold font-bold mb-4 text-center">Why Missouri City Trusts Junk Buddies</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-sm">
          <div className="silver-badge">⏱️ Fast Service</div>
          <div className="silver-badge">💰 Upfront Pricing</div>
          <div className="silver-badge">🧤 Full-Service Crew</div>
          <div className="silver-badge">🧾 No Hidden Fees</div>
        </div>
      </div>

      {/* Photo Grid */}
      <div className="max-w-6xl mx-auto mb-12">
        <h3 className="text-2xl text-gold font-bold mb-6 text-center">Missouri City Crews in Action</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <img src="/images/couch-carrying.png" alt="Couch removal" className="rounded-full border-4 border-gold h-36 object-cover w-full" />
          <img src="/images/team-sunset.png" alt="Team photo" className="rounded-full border-4 border-gold h-36 object-cover w-full" />
          <img src="/images/truck-fleet.png" alt="Fleet" className="rounded-full border-4 border-gold h-36 object-cover w-full" />
          <img src="/images/demolition-crew.png" alt="Demolition" className="rounded-full border-4 border-gold h-36 object-cover w-full" />
        </div>
      </div>

      {/* Final CTA & Links */}
      <div className="text-center mb-12">
        <Link to="/selection" className="cta-metallic-button">
          Select Your Items
        </Link>
        <div className="mt-4">
          <Link to="/blog" className="text-gold underline mx-2">
            📝 Read Our Blog
          </Link>
          <Link to="/faq" className="text-gold underline mx-2">
            📌 FAQ
          </Link>
          <Link to="/service-areas" className="text-gold underline mx-2">
            🌎 Cities We Serve
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-500 mt-10 border-t border-gold pt-4">
        © {new Date().getFullYear()} Junk Buddies. All rights reserved.
      </footer>
    </div>
  );
};

export default MissouriCity;

