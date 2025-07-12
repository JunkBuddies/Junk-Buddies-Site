import React from 'react';
import { Link } from 'react-router-dom';

const Baytown = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-12">
      <h1 className="text-4xl text-gold font-bold text-center mb-10">
        Junk Removal in Baytown, TX
      </h1>

      <p className="text-lg max-w-4xl mx-auto mb-8 text-gray-300">
        Need junk gone in Baytown? <strong>Junk Buddies</strong> brings fast, affordable, full-service junk removal to homes and businesses across Baytown, Texas. Whether it’s curbside pickup, garage cleanouts, or large-scale debris removal — we handle it all. Transparent pricing, same-day service, and a local team you can count on.
      </p>

      <div className="bg-gray-800 border border-gold rounded-xl shadow-lg p-6 mb-10 max-w-4xl mx-auto">
        <h2 className="text-2xl text-gold font-bold mb-4">
          Why Choose Junk Buddies in Baytown?
        </h2>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li>✅ Bigger trucks — more room, better value</li>
          <li>✅ Transparent pricing — no hidden fees</li>
          <li>✅ Based near Baytown — locally trusted</li>
          <li>✅ Fully licensed, insured, and background-checked</li>
          <li>✅ Same-day or next-day pickups available</li>
        </ul>
      </div>

      <div className="text-center">
        <Link to="/selection" className="cta-metallic-button inline-block mt-4 mb-10">
          Get Instant Pricing
        </Link>
      </div>

      {/* === Neighborhood + ZIP CODE INDEX === */}
      <div className="max-w-5xl mx-auto mb-16">
        <h2 className="text-2xl text-gold font-semibold mb-4">Baytown ZIP Codes We Serve</h2>
        <p className="text-gray-400 mb-4">
          We proudly serve every part of Baytown and nearby areas:
        </p>
        <div className="text-sm text-gray-400 leading-loose grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          <span>77520</span>
          <span>77521</span>
          <span>77522</span>
          <span>77523</span>
          <span>77535</span>
          <span>77562</span>
          <span>77580</span>
          <span>77597</span>
          <span>77532</span>
          <span>77536</span>
          <span>77514</span>
          <span>77571</span>
          <span>77530</span>
          <span>77560</span>
          <span>77518</span>
          <span>77507</span>
          <span>77510</span>
          <span>77517</span>
          <span>77539</span>
          <span>77541</span>
        </div>
      </div>

      {/* === Neighborhoods (crawlable) === */}
      <div className="max-w-5xl mx-auto mb-16">
        <h2 className="text-2xl text-gold font-semibold mb-4">Baytown Neighborhoods We Serve</h2>
        <p className="text-sm text-gray-400 leading-loose">
          Lakewood • Craigmont • Roseland Oaks • Country Club Oaks • Goose Creek • Plumwood • Eastpoint • Sterling Green • Wooster • Hunters Creek • Ponderosa • Meadow Lake • Tanglewilde • Baytown Central • Baker Road • Cary Bayou • Glen Arbor • Whispering Pines • East Baytown • South Baytown • North Baytown
        </p>
      </div>

      {/* === Embedded Google Map === */}
      <div className="w-full max-w-5xl mx-auto mb-20">
        <iframe
          title="Baytown Junk Removal Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d111721.73163012226!2d-95.070245!3d29.7432346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640c816f7208a01%3A0x6c39b1d8396bdb30!2sBaytown%2C%20TX!5e0!3m2!1sen!2sus!4v1752280000000!5m2!1sen!2sus"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-xl shadow-lg border border-gold"
        ></iframe>
      </div>

      {/* === Local Trust Grid === */}
      <section className="max-w-6xl mx-auto mb-20">
        <h2 className="text-2xl text-gold font-semibold text-center mb-6">
          Why Baytown Trusts Junk Buddies
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm text-gray-300">
          <div className="bg-gray-800 p-4 rounded-xl border border-gold shadow">
            🛻 We bring bigger trucks for better value and fewer trips.
          </div>
          <div className="bg-gray-800 p-4 rounded-xl border border-gold shadow">
            💬 Real, upfront pricing before you book.
          </div>
          <div className="bg-gray-800 p-4 rounded-xl border border-gold shadow">
            📍 Locally owned & operated — born near Baytown.
          </div>
          <div className="bg-gray-800 p-4 rounded-xl border border-gold shadow">
            🚛 Same-day or next-day service, no delays.
          </div>
          <div className="bg-gray-800 p-4 rounded-xl border border-gold shadow">
            💪 Fast crew. Clean trucks. 5-star results every time.
          </div>
          <div className="bg-gray-800 p-4 rounded-xl border border-gold shadow">
            🧾 No payment until the job is done — no pressure.
          </div>
        </div>
      </section>

      {/* === Work Grid === */}
      <section className="max-w-6xl mx-auto mb-20">
        <h2 className="text-2xl text-gold font-semibold text-center mb-6">
          Our Work in Action
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <img src="/images/couch-carrying.png" alt="Carrying couch" className="rounded-full w-full h-36 object-cover border-4 border-gold hover:scale-105 transition" />
          <img src="/images/team-sunset.png" alt="Team photo" className="rounded-full w-full h-36 object-cover border-4 border-gold hover:scale-105 transition" />
          <img src="/images/truck-fleet.png" alt="Truck fleet" className="rounded-full w-full h-36 object-cover border-4 border-gold hover:scale-105 transition" />
          <img src="/images/demolition-crew.png" alt="Demo crew" className="rounded-full w-full h-36 object-cover border-4 border-gold hover:scale-105 transition" />
        </div>
      </section>

      {/* === Final CTA === */}
      <div className="text-center mb-20">
        <Link to="/selection" className="cta-metallic-button">
          Select Items in Seconds
        </Link>
      </div>

      {/* === Footer Links for SEO & Crawlability === */}
      <footer className="bg-black text-gray-400 py-10 px-4 text-center border-t border-gold">
        <div className="text-sm space-y-3">
          <Link to="/blog" className="text-gold font-semibold hover:underline block">
            📝 Read Our Blog — Junk Removal Tips, Pricing & More
          </Link>
          <Link to="/faq" className="text-gold hover:underline block">
            📌 Frequently Asked Questions
          </Link>
          <Link to="/cities" className="text-gold hover:underline block">
            🌎 Explore All Service Areas
          </Link>
          <div className="text-xs text-gray-500 mt-2">
            © {new Date().getFullYear()} Junk Buddies. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Baytown;
