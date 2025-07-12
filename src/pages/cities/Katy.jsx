// File: src/pages/cities/Katy.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Katy = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen px-6 py-12">
      <h1 className="text-4xl text-gold font-bold mb-6 text-center">Junk Removal in Katy, TX</h1>

      <p className="text-lg text-gray-300 max-w-4xl mx-auto mb-6">
        Need reliable junk removal in Katy? <strong>Junk Buddies</strong> proudly serves every neighborhood from Old Katy to Cinco Ranch to Grand Lakes.
        Whether you’re clearing clutter in a garage, hauling away furniture, or dealing with construction debris, our team is ready.
      </p>
      <p className="text-md text-gray-400 max-w-3xl mx-auto mb-10">
        We show up with large 16ft trucks, licensed crews, and honest upfront pricing — no surprises. Book online and enjoy same-day or next-day service across all of Katy.
      </p>

      {/* Trust Section */}
      <div className="bg-gray-800 border border-gold rounded-xl shadow-lg p-6 mb-10 max-w-4xl mx-auto">
        <h2 className="text-2xl text-gold font-bold mb-4">Why Katy Chooses Junk Buddies</h2>
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
          Get Instant Pricing in Katy
        </Link>
      </div>

      {/* Neighborhoods */}
      <div className="max-w-4xl mx-auto mb-10">
        <h3 className="text-xl text-gold font-bold mb-2 text-center">Katy Neighborhoods We Serve</h3>
        <div className="text-center text-gray-300">
          <p>Old Katy</p>
          <p>Cinco Ranch</p>
          <p>Grand Lakes</p>
          <p>Firethorne</p>
          <p>Pin Oak Village</p>
          <p>Elyson</p>
          <p>Cross Creek Ranch</p>
          <p>Nottingham Country</p>
          <p>Seven Meadows</p>
        </div>
        <p className="text-sm text-center text-gray-400 mt-4">
          Serving Katy and surrounding ZIP codes: <span className="text-gold">77449, 77450, 77493, 77494, 77441</span> and many more.
        </p>
        <ul className="sr-only">
          <li>77449</li><li>77450</li><li>77491</li><li>77492</li><li>77493</li><li>77494</li><li>77441</li><li>77476</li><li>77407</li>
          <li>77406</li><li>77084</li><li>77094</li><li>77423</li><li>77485</li><li>77043</li><li>77095</li><li>77433</li><li>77429</li>
          <li>77464</li><li>77079</li><li>77077</li><li>77083</li><li>77082</li><li>77466</li><li>77099</li><li>77042</li><li>77072</li><li>77063</li>
        </ul>
      </div>

      {/* Google Map Embed */}
      <div className="max-w-4xl mx-auto mb-12">
        <iframe
          title="Katy, TX Service Area"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d111217.17134594682!2d-95.870353!3d29.7857859!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86412681d13cf373%3A0x29266f982598c49e!2sKaty%2C%20TX!5e0!3m2!1sen!2sus!4v1752294800000!5m2!1sen!2sus"
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
        <h2 className="text-2xl text-gold font-bold mb-4 text-center">Why Katy Trusts Junk Buddies</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-sm">
          <div className="silver-badge">⏱️ Fast Service</div>
          <div className="silver-badge">💰 Upfront Pricing</div>
          <div className="silver-badge">🧤 Full-Service Crew</div>
          <div className="silver-badge">🧾 No Hidden Fees</div>
        </div>
      </div>

      {/* Photo Grid */}
      <div className="max-w-6xl mx-auto mb-12">
        <h3 className="text-2xl text-gold font-bold mb-6 text-center">Katy Crews in Action</h3>
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

export default Katy;

