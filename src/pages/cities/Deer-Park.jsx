// File: src/pages/cities/Deer-Park.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const DeerPark = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen px-6 py-12">
      <h1 className="text-4xl text-gold font-bold mb-6 text-center">Junk Removal in Deer Park, TX</h1>

      <p className="text-lg text-gray-300 max-w-4xl mx-auto mb-6">
        Need junk removed fast in Deer Park? <strong>Junk Buddies</strong> delivers efficient and affordable junk hauling with 
        transparent pricing and no surprises. Whether it’s a garage cleanout on San Augustine, furniture pickup on Luella Ave, 
        or post-renovation debris near Center Street — we show up ready to make space.
      </p>
      <p className="text-md text-gray-400 max-w-3xl mx-auto mb-10">
        Serving every neighborhood and business park across Deer Park, TX with same-day scheduling, bigger trucks, and crews that hustle.
      </p>

      {/* Trust Section */}
      <div className="bg-gray-800 border border-gold rounded-xl shadow-lg p-6 mb-10 max-w-4xl mx-auto">
        <h2 className="text-2xl text-gold font-bold mb-4">Why Deer Park Chooses Junk Buddies</h2>
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
          Get Instant Pricing in Deer Park
        </Link>
      </div>

      {/* Neighborhoods */}
      <div className="max-w-4xl mx-auto mb-10">
        <h3 className="text-xl text-gold font-bold mb-2 text-center">Deer Park Neighborhoods We Serve</h3>
        <div className="text-center text-gray-300">
          <p>San Augustine</p>
          <p>Luella</p>
          <p>College Park</p>
          <p>P Street District</p>
          <p>Deer Meadows</p>
          <p>Park Green</p>
          <p>Bayou Bend</p>
          <p>Wincrest</p>
        </div>
        <p className="text-sm text-center text-gray-400 mt-4">
          Serving Deer Park and surrounding ZIP codes: <span className="text-gold">77536, 77571, 77505, 77015, 77507</span> and more.
        </p>
        <ul className="sr-only">
          <li>77536</li><li>77571</li><li>77505</li><li>77015</li><li>77507</li><li>77506</li><li>77503</li><li>77501</li>
          <li>77502</li><li>77504</li><li>77530</li><li>77049</li><li>77520</li><li>77521</li><li>77029</li><li>77532</li>
          <li>77547</li><li>77586</li><li>77061</li><li>77034</li><li>77075</li><li>77087</li><li>77013</li><li>77089</li>
        </ul>
      </div>

      {/* Google Map Embed */}
      <div className="max-w-4xl mx-auto mb-12">
        <iframe
          title="Deer Park, TX Service Area"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d111406.03076309753!2d-95.18600449999999!3d29.69440115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640c3dd12276b9d%3A0x33ad3bcb34cbfa12!2sDeer%20Park%2C%20TX!5e0!3m2!1sen!2sus!4v1752289200001!5m2!1sen!2sus"
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
        <h2 className="text-2xl text-gold font-bold mb-4 text-center">Why Deer Park Trusts Junk Buddies</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-sm">
          <div className="silver-badge">⏱️ Fast Service</div>
          <div className="silver-badge">💰 Upfront Pricing</div>
          <div className="silver-badge">🧤 Full-Service Crew</div>
          <div className="silver-badge">🧾 No Hidden Fees</div>
        </div>
      </div>

      {/* Photo Grid */}
      <div className="max-w-6xl mx-auto mb-12">
        <h3 className="text-2xl text-gold font-bold mb-6 text-center">Deer Park Crews in Action</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <img src="/images/couch-carrying.png" alt="Couch removal" className="rounded-full border-4 border-gold h-36 object-cover w-full" />
          <img src="/images/team-sunset.png" alt="Team photo" className="rounded-full border-4 border-gold h-36 object-cover w-full" />
          <img src="/images/truck-fleet.png" alt="Fleet" className="rounded-full border-4 border-gold h-36 object-cover w-full" />
          <img src="/images/demolition-crew.png" alt="Demolition" className="rounded-full border-4 border-gold h-36 object-cover w-full" />
        </div>
      </div>

      {/* Final CTA */}
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

export default DeerPark;
