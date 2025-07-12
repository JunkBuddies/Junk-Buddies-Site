// File: src/pages/cities/Channelview.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Channelview = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-12">
      {/* Title */}
      <h1 className="text-4xl text-gold font-bold text-center mb-10">
        Junk Removal in Channelview, TX
      </h1>

      {/* Intro Paragraph */}
      <p className="text-lg max-w-4xl mx-auto mb-8 text-gray-300">
        Need junk removed fast in Channelview? <strong>Junk Buddies</strong> delivers instant pricing, on-time service,
        and muscle that moves. From garage cleanouts and furniture haul-offs to full construction debris removal,
        we're your local junk removal solution — <span className="text-gold font-semibold">serving all neighborhoods across Channelview, TX</span> and the East Harris County corridor.
      </p>

      {/* Trust Panel */}
      <div className="bg-gray-800 border border-gold rounded-xl shadow-lg p-6 mb-10 max-w-4xl mx-auto">
        <h2 className="text-2xl text-gold font-bold mb-4">Why Channelview Chooses Junk Buddies</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li>✅ 16ft box trucks – more space, fewer trips</li>
          <li>✅ Transparent pricing — no haggling, no upsells</li>
          <li>✅ Local crews that show up ready to work</li>
          <li>✅ Licensed, insured, and background-checked pros</li>
          <li>✅ Same-day or next-day junk removal available</li>
        </ul>
      </div>

      {/* CTA */}
      <div className="text-center mb-12">
        <Link to="/selection" className="cta-metallic-button inline-block">
          Get Instant Pricing in Channelview
        </Link>
      </div>

      {/* Neighborhoods + ZIP Index */}
      <section className="max-w-4xl mx-auto mb-14">
        <h2 className="text-2xl text-gold font-bold mb-4 text-center">Channelview Neighborhoods We Serve</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-gray-300">
          <span>Old River Terrace</span>
          <span>Forest River Estates</span>
          <span>Lakeside Park Estates</span>
          <span>Channelwood</span>
          <span>Lakeview Homes</span>
          <span>Shadowglen</span>
          <span>San Jacinto Terrace</span>
          <span>Sheldon Woods</span>
        </div>
        <div className="sr-only">
          Serving Channelview and surrounding zip codes:
          77530, 77049, 77015, 77532, 77562, 77078, 77520, 77044, 77521, 77536, 77501, 77502, 77504, 77506, 77029,
          77505, 77013, 77093, 77026, 77028
        </div>
      </section>

      {/* Embedded Map */}
      <div className="mb-14">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d111256.16310905198!2d-95.17795780445316!3d29.794213084217975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640cd0f961a7a75%3A0x7a93363e5f0b93f7!2sChannelview%2C%20TX!5e0!3m2!1sen!2sus!4v1752277272730!5m2!1sen!2sus"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Map of Channelview TX"
        ></iframe>
      </div>

      {/* Why Channelview Trusts Us */}
      <section className="max-w-6xl mx-auto mb-14">
        <h2 className="text-2xl text-gold font-bold mb-6 text-center">Why Channelview Trusts Junk Buddies</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
          <div className="bg-gray-800 p-4 rounded-xl border border-gold">
            ⏱️ Fast Service
          </div>
          <div className="bg-gray-800 p-4 rounded-xl border border-gold">
            💰 Upfront Pricing
          </div>
          <div className="bg-gray-800 p-4 rounded-xl border border-gold">
            🧤 Full-Service Crew
          </div>
          <div className="bg-gray-800 p-4 rounded-xl border border-gold">
            🧾 No Hidden Fees
          </div>
        </div>
      </section>

      {/* Local Photo Grid */}
      <section className="max-w-6xl mx-auto mb-14">
        <h2 className="text-2xl text-gold font-bold mb-6 text-center">Channelview Crews in Action</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <img src="/images/couch-carrying.png" alt="Carrying Couch" className="rounded-lg w-full h-36 object-cover" />
          <img src="/images/truck-fleet.png" alt="Truck Fleet" className="rounded-lg w-full h-36 object-cover" />
          <img src="/images/demolition-crew.png" alt="Demolition" className="rounded-lg w-full h-36 object-cover" />
          <img src="/images/team-sunset.png" alt="Team Sunset" className="rounded-lg w-full h-36 object-cover" />
        </div>
      </section>

      {/* CTAs */}
      <div className="text-center mb-20">
        <Link to="/selection" className="cta-metallic-button inline-block mb-4">
          Select Your Items
        </Link>
        <br />
        <Link to="/itemized" className="silver-button inline-block">
          Browse Itemized Pricing
        </Link>
      </div>

      {/* Crawlable Footer */}
      <footer className="bg-black text-gray-400 py-8 px-4 text-center border-t border-gold">
        <div className="text-sm space-y-3">
          <Link
            to="/blog"
            className="text-gold font-semibold hover:underline block"
          >
            📝 Read Our Blog — Junk Removal Tips, Pricing & More
          </Link>
          <a href="/faq" className="text-gold hover:underline block">
            📌 Frequently Asked Questions
          </a>
          <Link
            to="/service-areas"
            className="text-gold hover:underline block"
          >
            🌎 View All Cities We Serve
          </Link>
          <div className="text-xs text-gray-500">
            © {new Date().getFullYear()} Junk Buddies. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Channelview;
