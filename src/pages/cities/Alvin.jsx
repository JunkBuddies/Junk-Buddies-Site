import React from 'react';
import { Link } from 'react-router-dom';

const Alvin = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-12">
      <h1 className="text-4xl text-gold font-bold text-center mb-10">
        Junk Removal in Alvin, TX
      </h1>

      <p className="text-lg max-w-4xl mx-auto mb-8 text-gray-300 text-center">
        Looking for junk removal in Alvin? <strong>Junk Buddies</strong> offers full-service, same-day junk removal throughout Alvin and nearby areas. Whether you're clearing out your garage, upgrading furniture, or doing a full cleanout — you’ll get <span className="text-gold font-semibold">upfront pricing</span>, fast service, and zero hidden fees. Book online in seconds.
      </p>

      <div className="bg-gray-800 border border-gold rounded-xl shadow-lg p-6 mb-10 max-w-4xl mx-auto">
        <h2 className="text-2xl text-gold font-bold mb-4">Why Alvin Chooses Junk Buddies</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li>✅ 16ft trucks — 30% more space than competitors</li>
          <li>✅ Transparent pricing with no hidden fees</li>
          <li>✅ Local crew near Alvin — licensed and insured</li>
          <li>✅ Same-day or next-day service available</li>
          <li>✅ Instant online booking, no phone tag</li>
        </ul>
      </div>

      <div className="text-center mb-12">
        <Link to="/selection" className="cta-metallic-button inline-block">
          Get Instant Pricing
        </Link>
      </div>

      <div className="max-w-5xl mx-auto mb-12">
        <h2 className="text-2xl text-gold font-bold mb-4 text-center">
          Serving All of Alvin and Surrounding ZIP Codes
        </h2>
        <div className="rounded-xl overflow-hidden shadow-lg border border-gold">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11131.16380106228!2d-95.26516226688455!3d29.423413304655472!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864099cc4075e3cb%3A0x8bafc8be4b1ec84a!2sAlvin%2C%20TX!5e0!3m2!1sen!2sus!4v1752279998881!5m2!1sen!2sus"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Map of Alvin TX"
          ></iframe>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mb-16">
        <h2 className="text-2xl text-gold font-bold mb-6 text-center">
          What We Haul in Alvin
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <img src="/images/couch-carrying.png" alt="Furniture Removal" className="rounded-full w-full h-36 object-cover border-4 border-gold hover:scale-105 transition-transform" />
          <img src="/images/team-sunset.png" alt="Team at Sunset" className="rounded-full w-full h-36 object-cover border-4 border-gold hover:scale-105 transition-transform" />
          <img src="/images/truck-fleet.png" alt="Truck Fleet" className="rounded-full w-full h-36 object-cover border-4 border-gold hover:scale-105 transition-transform" />
          <img src="/images/demolition-crew.png" alt="Demolition" className="rounded-full w-full h-36 object-cover border-4 border-gold hover:scale-105 transition-transform" />
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto">
        <h2 className="text-2xl text-gold font-bold mb-6 text-center">
          Alvin Loves Junk Buddies
        </h2>
        <div className="marquee-row">
          <div className="marquee-content marquee-rtl">
            <div className="silver-badge">⭐⭐⭐⭐⭐ Scheduled online, crew came same-day — smooth and easy!</div>
            <div className="silver-badge">⭐⭐⭐⭐⭐ Garage cleanout was done in less than an hour. Unreal.</div>
            <div className="silver-badge">⭐⭐⭐⭐⭐ Very professional, affordable, and respectful team.</div>
            <div className="silver-badge">⭐⭐⭐⭐⭐ No hidden fees, no stress — just solid junk removal.</div>
            <div className="silver-badge">⭐⭐⭐⭐⭐ Needed a rush job. They showed up within 2 hours.</div>
            <div className="silver-badge">⭐⭐⭐⭐⭐ Highly recommend for Alvin or anywhere nearby!</div>

            {/* Loop for SEO */}
            <div className="silver-badge">⭐⭐⭐⭐⭐ Scheduled online, crew came same-day — smooth and easy!</div>
            <div className="silver-badge">⭐⭐⭐⭐⭐ Garage cleanout was done in less than an hour. Unreal.</div>
            <div className="silver-badge">⭐⭐⭐⭐⭐ Very professional, affordable, and respectful team.</div>
            <div className="silver-badge">⭐⭐⭐⭐⭐ No hidden fees, no stress — just solid junk removal.</div>
            <div className="silver-badge">⭐⭐⭐⭐⭐ Needed a rush job. They showed up within 2 hours.</div>
            <div className="silver-badge">⭐⭐⭐⭐⭐ Highly recommend for Alvin or anywhere nearby!</div>
          </div>
        </div>
      </div>

      <div className="sr-only">
        ZIP codes served in Alvin: 77511, 77512. Also covering nearby zones including 77583, 77584, 77581, 77546, 77578, 77598, 77545, 77588, 77566, 77422, 77534, 77515, 77480, 77531, 77541, 77577, 77542, 77520, 77047, 77048, 77539, 77510, 77517, 77573, 77574, 77565, 77568, 77590, 77591, 77592.
      </div>

      <div className="mt-16 text-sm text-center text-gray-400">
        <Link to="/blog" className="text-gold hover:underline">
          📝 Junk Removal Blog
        </Link>{' '}
        |{' '}
        <Link to="/faq" className="text-gold hover:underline">
          FAQ
        </Link>{' '}
        |{' '}
        <Link to="/service-areas" className="text-gold hover:underline">
          All Cities We Serve
        </Link>{' '}
        |{' '}
        <Link to="/" className="text-gold hover:underline">
          Home
        </Link>
      </div>
    </div>
  );
};

export default Alvin;
