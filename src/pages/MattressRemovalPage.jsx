import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function MattressRemovalPage() {
  const navigate = useNavigate();
  const junkRef = useRef(null);
  const buddiesRef = useRef(null);

  useEffect(() => {
    const junk = junkRef.current;
    const buddies = buddiesRef.current;
    if (junk && buddies) {
      junk.classList.remove('shine-junk');
      buddies.classList.remove('shine-buddies');
      void junk.offsetWidth;
      void buddies.offsetWidth;
      buddies.classList.add('shine-buddies');
      setTimeout(() => junk.classList.add('shine-junk'), 2500);
    }
  }, []);

  return (
    <div className="w-full overflow-hidden bg-white text-gray-800">
      {/* HERO SECTION – Mattress Removal */}
      <section className="relative w-full min-h-[90vh] flex flex-col lg:flex-row items-center justify-between px-6 lg:px-16 py-16 bg-[#f9fafb]">
        {/* Left Text Column */}
        <div className="z-20 lg:w-2/3 text-left space-y-6">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-gold leading-tight">
            Mattress Removal in Houston, TX & Surrounding Areas
          </h1>

          <p className="text-base sm:text-lg text-gray-700 max-w-2xl">
            Got an old mattress you need gone? Junk Buddies provides fast, affordable mattress
            pickup and disposal across Houston and nearby cities. We’ll haul it out, recycle or
            donate when possible, and ensure it’s handled responsibly — so you can rest easy.
          </p>

          <ul className="text-gray-700 text-base sm:text-lg space-y-2 list-disc list-inside">
            <li>🛏️ Old Mattress & Box Spring Removal</li>
            <li>🚚 Same-Day & Next-Day Pickup</li>
            <li>♻️ Eco-Friendly Recycling & Donation</li>
            <li>💵 Upfront Pricing – No Surprises</li>
          </ul>

          <div className="flex flex-wrap gap-4 mt-6">
            <button
              className="ai-price-button"
              onClick={() => document.getElementById('jb-open-button')?.click()}
            >
              View Price In Seconds
            </button>
            <button
              className="cta-metallic-button"
              onClick={() => navigate('/schedule')}
            >
              Schedule Pickup
            </button>
            <a href="tel:3465936080" className="silver-button inline-block">
              Call Now
            </a>
          </div>
        </div>

        {/* Right Side Image */}
        <div className="relative w-full lg:w-1/3 flex justify-center items-center mt-8 lg:mt-0">
          <img
            src="/images/junk buddies chat bot visual.png"
            alt="Mattress Removal Junk Buddies"
            className="rounded-xl shadow-lg border border-gold/40 object-cover w-[90%] lg:w-full max-w-[400px]"
          />
        </div>
      </section>

      {/* REQUIRE SERVICE TODAY BAR */}
      <div className="w-full text-center text-lg text-white py-10 px-6 about-reveal silver">
        <p className="text-xl mb-4">
          Need that old mattress gone today? Call us for immediate pickup — fast, affordable, and reliable.
        </p>
        <a href="tel:3465936080" className="cta-metallic-button inline-block">
          Call Now
        </a>
      </div>

      {/* INTRO SECTION */}
      <section className="bg-white text-gray-700 py-4 px-3 text-center border-t border-gold opacity-60 hover:opacity-80 transition-opacity duration-300">
        <h2 className="text-xs sm:text-sm font-semibold text-gold mb-1 tracking-wide">
          Mattress Removal, Pickup & Disposal in Houston, TX
        </h2>
        <p className="max-w-3xl mx-auto text-[10px] sm:text-xs leading-snug text-gray-500">
          Junk Buddies offers same-day mattress haul-away services in Houston and surrounding cities 
          like Katy, Pearland, Pasadena, and Sugar Land. We recycle or donate whenever possible to 
          keep usable items out of landfills — providing comfort for your home and the environment.
        </p>
        <div className="flex justify-center mt-2">
          <button
            className="ai-price-button text-[10px] sm:text-xs px-2 py-1"
            onClick={() => document.getElementById('jb-open-button')?.click()}
          >
            View Price In Seconds
          </button>
        </div>
      </section>
