// File: src/pages/cities/Friendswood.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Friendswood = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen px-6 py-12">
      <h1 className="text-4xl text-gold font-bold mb-6 text-center">Junk Removal in Friendswood, TX</h1>

      <p className="text-lg text-gray-300 max-w-4xl mx-auto mb-6">
        Searching for reliable junk removal in Friendswood? <strong>Junk Buddies</strong> is your go-to team for fast, local, and affordable service.
        From appliance pickups near FM 518 to garage cleanouts in West Ranch or hauling furniture from Wilderness Trails — 
        we get it done with hustle and heart.
      </p>
      <p className="text-md text-gray-400 max-w-3xl mx-auto mb-10">
        We proudly serve homeowners, renters, realtors, contractors, and property managers across Friendswood with same-day pickup, 
        transparent pricing, and zero upfront payments.
      </p>

      {/* Trust Section */}
      <div className="bg-gray-800 border border-gold rounded-xl shadow-lg p-6 mb-10 max-w-4xl mx-auto">
        <h2 className="text-2xl text-gold font-bold mb-4">Why Friendswood Chooses Junk Buddies</h2>
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
          Get Instant Pricing in Friendswood
        </Link>
      </div>

      {/* Neighborhoods */}
      <div className="max-w-4xl mx-auto mb-10">
        <h3 className="text-xl text-gold font-bold mb-2 text-center">Friendswood Neighborhoods We Serve</h3>
        <div className="text-center text-gray-300">
          <p>West Ranch</p>
          <p>Wilderness Trails</p>
          <p>The Forest of Friendswood</p>
          <p>Heritage Park</p>
          <p>Sunmeadow</p>
          <p>Autumn Creek</p>
          <p>Falcon Ridge</p>
          <p>Eagle Lakes</p>
        </div>
        <p className="text-sm text-center text-gray-400 mt-4">
          Serving Friendswood and surrounding ZIP codes: <span className="text-gold">77546, 77581, 77089, 77598, 77573</span> and more.
        </p>
        <ul className="sr-only">
          <li>77546</li><li>77581</li><li>77089</li><li>77598</li><li>77573</li><li>77584</li><li>77034</li><li>77539</li>
          <li>77075</li><li>77511</li><li>77587</li><li>77062</li><li>77565</li><li>77578</li><li>77545</li><li>77505</li>
          <li>77507</li><li>77058</li><li>77059</li><li>77504</li>
        </ul>
      </div>

      {/* Google Map Embed */}
      <div className="max-w-4xl mx-auto mb-12">
        <iframe
          title="Friendswood, TX Service Area"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d111595.72335714559!2d-95.28586605000001!3d29.5152981!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86409dbb4d79d159%3A0xb3b4705f4c7e64e0!2sFriendswood%2C%20TX!5e0!3m2!1sen!2sus!4v1752289840000!5m2!1sen!2sus"
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
        <h2 className="text-2xl text-gold font-bold mb-4 text-center">Why Friendswood Trusts Junk Buddies</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-sm">
          <div className="silver-badge">⏱️ Fast Service</div>
          <div className="silver-badge">💰 Upfront Pricing</div>
          <div className="silver-badge">🧤 Full-Service Crew</div>
          <div className="silver-badge">🧾 No Hidden Fees</div>
        </div>
      </div>

      {/* Photo Grid */}
      <div className="max-w-6xl mx-auto mb-12">
        <h3 className="text-2xl text-gold font-bold mb-6 text-center">Friendswood Crews in Action</h3>
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

export default Friendswood;
