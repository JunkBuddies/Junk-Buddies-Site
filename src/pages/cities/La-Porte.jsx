// File: src/pages/cities/LaPorte.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const LaPorte = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen px-6 py-12">
      <h1 className="text-4xl text-gold font-bold mb-6 text-center">Junk Removal in La Porte, TX</h1>

      <p className="text-lg text-gray-300 max-w-4xl mx-auto mb-6">
        Need dependable junk removal in La Porte? <strong>Junk Buddies</strong> brings fast, affordable, and friendly junk pickup right to your curb — from home cleanouts and office furniture to garage clutter and heavy debris.
      </p>
      <p className="text-md text-gray-400 max-w-3xl mx-auto mb-10">
        Serving neighborhoods near Fairmont Parkway, Morgan’s Point, Bayshore Drive, and everywhere in between. Transparent pricing, instant scheduling, and no hidden fees — you only pay when the job’s done.
      </p>

      {/* Trust Section */}
      <div className="bg-gray-800 border border-gold rounded-xl shadow-lg p-6 mb-10 max-w-4xl mx-auto">
        <h2 className="text-2xl text-gold font-bold mb-4">Why La Porte Chooses Junk Buddies</h2>
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
          Get Instant Pricing in La Porte
        </Link>
      </div>

      {/* Neighborhoods */}
      <div className="max-w-4xl mx-auto mb-10">
        <h3 className="text-xl text-gold font-bold mb-2 text-center">La Porte Neighborhoods We Serve</h3>
        <div className="text-center text-gray-300">
          <p>Bay Oaks</p>
          <p>Morgan’s Point</p>
          <p>Bayshore North</p>
          <p>Fairmont Park</p>
          <p>Shoreacres</p>
          <p>La Porte Terrace</p>
          <p>Brookglen</p>
          <p>Lomax</p>
        </div>
        <p className="text-sm text-center text-gray-400 mt-4">
          Serving La Porte and surrounding ZIP codes: <span className="text-gold">77571, 77536, 77507, 77586, 77520</span>, and more.
        </p>
        <ul className="sr-only">
          <li>77571</li><li>77536</li><li>77507</li><li>77586</li><li>77520</li><li>77058</li><li>77059</li><li>77521</li><li>77598</li>
          <li>77562</li><li>77506</li><li>77015</li><li>77049</li><li>77029</li><li>77503</li><li>77502</li><li>77504</li><li>77505</li>
          <li>77530</li><li>77597</li>
        </ul>
      </div>

      {/* Google Map Embed */}
      <div className="max-w-4xl mx-auto mb-12">
        <iframe
          title="La Porte, TX Service Area"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110990.54026390249!2d-95.113235!3d29.664518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640b3ea82a64365%3A0xfdf3176bb7b8b709!2sLa%20Porte%2C%20TX!5e0!3m2!1sen!2sus!4v1752296020000!5m2!1sen!2sus"
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
        <h2 className="text-2xl text-gold font-bold mb-4 text-center">Why La Porte Trusts Junk Buddies</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-sm">
          <div className="silver-badge">⏱️ Fast Service</div>
          <div className="silver-badge">💰 Upfront Pricing</div>
          <div className="silver-badge">🧤 Full-Service Crew</div>
          <div className="silver-badge">🧾 No Hidden Fees</div>
        </div>
      </div>

      {/* Photo Grid */}
      <div className="max-w-6xl mx-auto mb-12">
        <h3 className="text-2xl text-gold font-bold mb-6 text-center">La Porte Crews in Action</h3>
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

export default LaPorte;
