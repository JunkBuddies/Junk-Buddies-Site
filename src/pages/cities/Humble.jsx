// File: src/pages/cities/Humble.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Humble = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen px-6 py-12">
      <h1 className="text-4xl text-gold font-bold mb-6 text-center">Junk Removal in Humble, TX</h1>

      <p className="text-lg text-gray-300 max-w-4xl mx-auto mb-6">
        Looking for fast and affordable junk removal in Humble? <strong>Junk Buddies</strong> has you covered. Whether you’re near Deerbrook Mall,
        Atascocita, Fall Creek, or right off 59 — we haul away furniture, appliances, yard debris, and more — same day, no hassle.
      </p>
      <p className="text-md text-gray-400 max-w-3xl mx-auto mb-10">
        We proudly serve homes, apartments, commercial properties, and construction sites across Humble with upfront pricing,
        professional crews, and no hidden fees.
      </p>

      {/* Trust Section */}
      <div className="bg-gray-800 border border-gold rounded-xl shadow-lg p-6 mb-10 max-w-4xl mx-auto">
        <h2 className="text-2xl text-gold font-bold mb-4">Why Humble Chooses Junk Buddies</h2>
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
          Get Instant Pricing in Humble
        </Link>
      </div>

      {/* Neighborhoods */}
      <div className="max-w-4xl mx-auto mb-10">
        <h3 className="text-xl text-gold font-bold mb-2 text-center">Humble Neighborhoods We Serve</h3>
        <div className="text-center text-gray-300">
          <p>Atascocita</p>
          <p>Fall Creek</p>
          <p>Kenswick</p>
          <p>Deerbrook Estates</p>
          <p>Foxwood</p>
          <p>Walden on Lake Houston</p>
          <p>Woodland Pines</p>
          <p>Sunset Ridge</p>
        </div>
        <p className="text-sm text-center text-gray-400 mt-4">
          Serving Humble and surrounding ZIP codes: <span className="text-gold">77338, 77346, 77396, 77345, 77347</span> and more.
        </p>
        <ul className="sr-only">
          <li>77338</li><li>77346</li><li>77396</li><li>77345</li><li>77347</li><li>77325</li><li>77044</li><li>77032</li>
          <li>77050</li><li>77093</li><li>77365</li><li>77532</li><li>77357</li><li>77339</li><li>77372</li><li>77073</li>
          <li>77060</li><li>77090</li><li>77373</li><li>77377</li>
        </ul>
      </div>

      {/* Google Map Embed */}
      <div className="max-w-4xl mx-auto mb-12">
        <iframe
          title="Humble, TX Service Area"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110432.05059910915!2d-95.33012785!3d29.99931925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640b9733b1733ef%3A0x75f122f4de58fa65!2sHumble%2C%20TX!5e0!3m2!1sen!2sus!4v1752293200000!5m2!1sen!2sus"
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
        <h2 className="text-2xl text-gold font-bold mb-4 text-center">Why Humble Trusts Junk Buddies</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-sm">
          <div className="silver-badge">⏱️ Fast Service</div>
          <div className="silver-badge">💰 Upfront Pricing</div>
          <div className="silver-badge">🧤 Full-Service Crew</div>
          <div className="silver-badge">🧾 No Hidden Fees</div>
        </div>
      </div>

      {/* Photo Grid */}
      <div className="max-w-6xl mx-auto mb-12">
        <h3 className="text-2xl text-gold font-bold mb-6 text-center">Humble Crews in Action</h3>
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
          <Link to="/itemized" className="silver-button mr-2">
            Browse Itemized Pricing
          </Link>
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

export default Humble;

