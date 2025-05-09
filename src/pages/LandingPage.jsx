// File: src/pages/LandingPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="hero-space-background">
      <div className="relative bg-gray-900 text-white min-h-screen flex flex-col justify-center items-center text-center px-4">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-gray-900/80 z-0"></div>

        {/* Motto */}
        <div className="relative z-10 mt-24">
          <h1 className="text-7xl font-bold text-gold mb-4 drop-shadow-[0_0_20px_gold]">
            Junk Buddies
          </h1>
          <p className="text-2xl font-semibold tracking-wide">Making Space For What Matters</p>
        </div>

        {/* CTA */}
        <div className="relative z-10 mt-8 space-y-4">
          <button
            onClick={() => navigate('/selection')}
            className="button-glow"
          >
            Get Started
          </button>
          <button
            onClick={() => navigate('/selection')}
            className="bg-white text-black font-bold py-3 px-8 rounded-xl hover:bg-gray-200 transition shadow-lg hover:scale-105"
          >
            View Pricing
          </button>
        </div>

        {/* Sections */}
        <div className="relative z-10 mt-20 max-w-6xl w-full space-y-20">
          {/* How It Works */}
          <section className="bg-gray-800/60 rounded-xl p-6 shadow-lg">
            <h2 className="text-3xl text-gold font-bold mb-4 border-b border-gold pb-2">How It Works</h2>
            <ol className="space-y-3 text-lg">
              <li>1️⃣ Choose your load size or itemized items.</li>
              <li>2️⃣ Schedule your pickup at your convenience.</li>
              <li>3️⃣ We arrive and clear your junk fast!</li>
            </ol>
          </section>

          {/* About Us */}
          <section className="bg-gray-800/60 rounded-xl p-6 shadow-lg">
            <h2 className="text-3xl text-gold font-bold mb-4 border-b border-gold pb-2">About Us</h2>
            <p className="text-lg leading-relaxed">
              We’re a dedicated junk removal team serving Houston and surrounding areas with reliability,
              speed, and friendly service. Our mission is to help you make space for what matters most.
            </p>
          </section>

          {/* Testimonials */}
          <section className="bg-gray-800/60 rounded-xl p-6 shadow-lg">
            <h2 className="text-3xl text-gold font-bold mb-4 border-b border-gold pb-2">Testimonials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white text-black p-6 rounded-xl shadow-lg border-l-4 border-gold relative">
                <p className="italic text-lg">
                  “They were quick, friendly, and cleaned everything perfectly. Highly recommend!”
                </p>
                <span className="block mt-4 font-semibold text-right">- Alex R.</span>
              </div>
              <div className="bg-white text-black p-6 rounded-xl shadow-lg border-l-4 border-gold relative">
                <p className="italic text-lg">
                  “Excellent service and easy scheduling. They really came through for us.”
                </p>
                <span className="block mt-4 font-semibold text-right">- Jamie L.</span>
              </div>
            </div>
          </section>

          {/* Gallery */}
          <section>
            <h2 className="text-3xl text-gold font-bold mb-6 text-center">Our Work in Action</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <img
                src="/images/couch-carrying.png"
                alt="Team carrying a couch"
                className="rounded-full w-full h-36 object-cover border-4 border-gold hover:scale-105 transition-transform"
              />
              <img
                src="/images/team-sunset.png"
                alt="Junk Buddies team at sunset"
                className="rounded-full w-full h-36 object-cover border-4 border-gold hover:scale-105 transition-transform"
              />
              <img
                src="/images/truck-fleet.png"
                alt="Fleet of Junk Buddies trucks"
                className="rounded-full w-full h-36 object-cover border-4 border-gold hover:scale-105 transition-transform"
              />
              <img
                src="/images/demolition-crew.png"
                alt="Junk Buddies team at a demolition site"
                className="rounded-full w-full h-36 object-cover border-4 border-gold hover:scale-105 transition-transform"
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
