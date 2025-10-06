import React, { useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function FurnitureRemovalPage() {
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
   {/* HERO SECTION – Furniture Removal */}
<section className="relative w-full min-h-[90vh] flex flex-col bg-black text-white overflow-hidden">

  {/* Top Section – Junk Buddies + Image */}
  <div className="flex flex-col lg:flex-row items-center justify-between w-full h-[55vh] px-6 lg:px-16 pt-12 lg:pt-16">
    
    {/* Left Logo Column */}
    <div className="flex flex-col justify-center items-center lg:items-start w-full lg:w-1/2 space-y-4 text-center lg:text-left">
      <div className="shine-wrapper flex justify-center items-center gap-2 sm:gap-3 whitespace-nowrap bg-black/80 rounded-xl px-3 sm:px-6 py-2 sm:py-3 shadow-lg border border-gold/30">
        <span
          ref={junkRef}
          className="text-[2.25rem] sm:text-5xl md:text-6xl lg:text-7xl metallic-text-3d shine-junk"
        >
          Junk
        </span>
        <img
          src="/images/logo-icon.png"
          alt="Logo"
          className="h-[2.75rem] sm:h-[4rem] md:h-[5rem] w-auto object-contain"
        />
        <span
          ref={buddiesRef}
          className="text-[2.25rem] sm:text-5xl md:text-6xl lg:text-7xl metallic-text-3d shine-buddies"
        >
          Buddies
        </span>
      </div>
    </div>

    {/* Right Image Column */}
    <div className="relative w-full lg:w-1/2 h-full flex justify-center items-center">
      <div className="absolute inset-0 bg-black" />
      <img
        src="/images/furniture-removal-visual.png"
        alt="Furniture Removal Junk Buddies"
        className="object-contain relative z-10 
                   h-[60vw] sm:h-[50vw] md:h-full 
                   w-auto max-w-[85%] sm:max-w-[80%] 
                   lg:max-w-[90%] mx-auto"
      />
    </div>
  </div>

  {/* Bottom Text Area */}
  <div className="w-full text-center px-6 lg:px-16 py-10 bg-[#f9fafb] text-gray-800">
    <h1 className="text-2xl sm:text-4xl font-extrabold text-gold leading-tight mb-4">
      Furniture Removal in Houston, TX & Surrounding Areas
    </h1>

    <p className="text-sm sm:text-lg text-gray-700 max-w-2xl mx-auto mb-6">
      Need old furniture gone? Junk Buddies provides fast, affordable furniture
      pickup and disposal across Houston and surrounding cities. We handle
      couches, dressers, desks, tables, and more — donating or recycling when possible
      to keep usable items out of landfills.
    </p>

    <ul className="text-gray-700 text-sm sm:text-lg space-y-2 list-disc list-inside max-w-md mx-auto text-left sm:text-center mb-6">
      <li>🛋️ Furniture Removal & Disposal</li>
      <li>🚚 Same-Day & Next-Day Pickup</li>
      <li>♻️ Eco-Friendly Recycling & Donation</li>
      <li>💵 Upfront Pricing – No Surprises</li>
    </ul>

    {/* Centered CTA Buttons */}
    <div className="flex flex-wrap justify-center gap-4 mt-4">
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
</section>



      {/* REQUIRE SERVICE TODAY BAR */}
      <div className="w-full text-center text-lg text-white py-10 px-6 about-reveal silver">
        <p className="text-xl mb-4">
          Need that old furniture gone today? Call us for immediate pickup — fast, affordable, and reliable.
        </p>
        <a href="tel:3465936080" className="cta-metallic-button inline-block">
          Call Now
        </a>
      </div>

      {/* INTRO SECTION */}
      <section className="bg-white text-gray-700 py-4 px-3 text-center border-t border-gold opacity-60 hover:opacity-80 transition-opacity duration-300">
        <h2 className="text-xs sm:text-sm font-semibold text-gold mb-1 tracking-wide">
          Furniture Removal, Pickup & Disposal in Houston, TX
        </h2>
        <p className="max-w-3xl mx-auto text-[10px] sm:text-xs leading-snug text-gray-500">
          Junk Buddies offers same-day furniture haul-away services in Houston and surrounding areas 
          like Katy, Pearland, Pasadena, and Sugar Land. We recycle or donate whenever possible to 
          keep usable furniture out of landfills — providing comfort for your home and the environment.
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
