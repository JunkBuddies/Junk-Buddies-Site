import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();
  const junkRef = useRef(null);
  const buddiesRef = useRef(null);
  const aboutRef = useRef(null);
  const aboutTitleRef = useRef(null);
  const aboutParagraphRef = useRef(null);
  const cardRefs = useRef([]);
  cardRefs.current = [];
  
  const [aboutInView, setAboutInView] = useState(false);

  const setCardRef = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setAboutInView(true);
      },
      { threshold: 0.4 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => {
      if (aboutRef.current) observer.unobserve(aboutRef.current);
    };
  }, []);

  return (
  <div className="w-full overflow-hidden">
    <div className="hero-earth-bg w-full min-h-screen flex flex-col items-center justify-center text-white text-center relative px-4 sm:px-8">
{/* Cities Button */}
<div className="absolute top-6 right-6 z-50">
  <Link
    to="/service-areas"
    className="
      text-gold font-semibold hover:underline bg-black/70 
      px-2 py-1 text-xs rounded-md shadow-md   /* 📱 Smaller on mobile */
      sm:px-4 sm:py-2 sm:text-base sm:rounded-lg /* 💻 Normal size on sm+ */
    "
  >
    Cities We Serve
  </Link>
</div>


{/* PROMO TEXT – stays independent of logo/tagline */}
<div
  className="
    absolute z-20 text-white px-2 max-w-md
    top-6 left-2                /* 📱 Mobile: closer to left */
    sm:top-1/3 sm:left-[12%] sm:translate-x-0
    lg:top-1/3 lg:left-[12%] lg:translate-x-0
    text-left
  "
>
  {/* Line 1 stays pinned */}
  <p className="text-sm md:text-lg font-medium mb-1">
    Tired of waiting?
  </p>

  {/* Need Junk Removal */}
  <h2 className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-bold leading-snug">
    Need{" "}
    <span
      className="text-transparent bg-clip-text font-extrabold 
        bg-gradient-to-r from-gray-300 via-gray-100 to-gray-400 drop-shadow-md"
    >
      Junk Removal
    </span>
  </h2>

  {/* Smaller, separate line */}
  <p className="text-xs sm:text-base md:text-lg mt-1">
    in Houston + surrounding cities?
  </p>

  {/* Check Prices further down */}
  <p className="mt-32 sm:mt-6 text-xs sm:text-base md:text-lg">
    Check prices in seconds — we haul it all.
  </p>
</div>




{/* HERO CONTENT */}
<div
  className="
    relative z-20 flex flex-col items-center
    mt-24
    md:absolute md:top-10 md:w-full md:mt-0
  "
>
  {/* Logo Title */}
  <div className="shine-wrapper flex justify-center items-center gap-3 whitespace-nowrap">
    <span
      ref={junkRef}
      className="text-[2.75rem] sm:text-6xl md:text-7xl lg:text-8xl metallic-text-3d shine-junk"
    >
      Junk
    </span>
    <img
      src="/images/logo-icon.png"
      alt="Logo"
      className="h-[3.5rem] sm:h-[4.75rem] md:h-[5.5rem] w-auto object-contain"
    />
    <span
      ref={buddiesRef}
      className="text-[2.75rem] sm:text-6xl md:text-7xl lg:text-8xl metallic-text-3d shine-buddies"
    >
      Buddies
    </span>
  </div>

  {/* Tagline */}
  <p className="text-xl sm:text-2xl font-semibold tracking-wide mt-2">
    Making Space For What Matters
  </p>

  {/* CTA BUTTONS – only show inline here on md+ */}
  <div
    className="
      hidden md:flex md:flex-col md:items-center md:space-y-4 md:mt-6
    "
  >
    <div className="flex flex-wrap justify-center gap-4">
      <button
        onClick={() => navigate('/selection')}
        className="cta-metallic-button"
      >
        Get Started
      </button>
      <button
        onClick={() => navigate('/itemized')}
        className="silver-button"
      >
        Instant Pricing
      </button>
    </div>

    <a href="tel:3465936080" className="cta-metallic-button inline-block">
      Same-Day Pickup
    </a>

    <button
      className="ai-price-button"
      onClick={() => document.getElementById('jb-open-button')?.click()}
    >
      See Price In Seconds
    </button>
  </div>
</div>

{/* CTA BUTTONS – stays for mobile only */}
<div
  className="
    relative z-10 flex flex-col items-center space-y-4
    mt-8
    md:hidden  /* hide on md+ */
  "
>
  <div className="flex flex-wrap justify-center gap-4">
    <button
      onClick={() => navigate('/selection')}
      className="cta-metallic-button"
    >
      Get Started
    </button>
    <button
      onClick={() => navigate('/itemized')}
      className="silver-button"
    >
      Instant Pricing
    </button>
  </div>

  <a href="tel:3465936080" className="cta-metallic-button inline-block">
    Same-Day Pickup
  </a>

  <button
    className="ai-price-button"
    onClick={() => document.getElementById('jb-open-button')?.click()}
  >
    See Price In Seconds
  </button>
</div>
</div>
      {/* REQUIRE SERVICE TODAY BAR */}
      <div className="w-full text-center text-lg text-white py-10 px-6 about-reveal silver">
        <p className="text-xl mb-4">
          Require service today? Call us directly for immediate scheduling — your Same-Day Pickup is just a call away.
        </p>
        <a href="tel:3465936080" className="cta-metallic-button inline-block">
          Call Now
        </a>
      </div>

{/* === WHITE GLOVE SERVICE SECTION === */}
<section className="relative w-full bg-[#fafafa] py-20 px-6 overflow-hidden">
  {/* Badge */}
  <div className="absolute top-6 left-6 flex items-center space-x-2">
    <span className="bg-gold text-black font-bold px-3 py-1 rounded-full text-xs shadow-md">
      ✓ White Glove
    </span>
  </div>

  <div className="max-w-7xl mx-auto flex flex-col lg:grid lg:grid-cols-2 gap-12 items-start relative">
    {/* Left Column */}
    <div className="text-gray-800 z-10 w-full">
      <h2 className="text-3xl sm:text-4xl font-bold text-gold mb-6">
        Junk Buddies: White Glove Junk Removal – For Your Peace of Mind
      </h2>
      <p className="text-lg mb-6 text-gray-700 leading-relaxed">
        From single-item pickups to full estate cleanouts, Junk Buddies handles it all with 
        care and precision. Whether it’s your home, office, storage unit, or yard, 
        we treat every removal like it’s our own space.
      </p>

      {/* Top 8 list with 2 images alongside (MOBILE ONLY) */}
      <div className="flex lg:hidden items-start gap-4">
        {/* List */}
        <ul className="w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left text-gray-900 mt-8">
          {/* ↑ bumped from mt-4 → mt-8 for better vertical centering with images */}
          <li>🛋️ Furniture</li>
          <li>🏠 Appliances</li>
          <li>💻 Electronics</li>
          <li>🌳 Yard Waste & Debris</li>
          <li>🗂️ Office Cleanouts</li>
          <li>📦 Storage Units</li>
          <li>🧹 Hoarder Cleanouts</li>
          <li>🏡 Full Property Refresh</li>
        </ul>

        {/* First 2 images (stacked) */}
        <div className="w-1/2 grid grid-cols-1 gap-4">
          <img
            src="/images/proof-hoarder.jpg"
            alt="Hoarder garage cleanout"
            className="rounded-lg shadow-md border border-gold/30 hover:scale-105 transition-transform"
          />
          <img
            src="/images/proof-home.jpg"
            alt="Home cleanout"
            className="rounded-lg shadow-md border border-gold/30 hover:scale-105 transition-transform"
          />
        </div>
      </div>

      {/* Desktop Top 8 List (unchanged, no images) */}
      <ul className="hidden lg:grid grid-cols-1 sm:grid-cols-2 gap-4 text-left text-gray-900">
        <li>🛋️ Furniture</li>
        <li>🏠 Appliances</li>
        <li>💻 Electronics</li>
        <li>🌳 Yard Waste & Debris</li>
        <li>🗂️ Office Cleanouts</li>
        <li>📦 Storage Units</li>
        <li>🧹 Hoarder Cleanouts</li>
        <li>🏡 Full Property Refresh</li>
      </ul>

      {/* Minimalist Divider */}
      <div className="my-6">
        <hr className="border-t border-gray-300 w-4/5 mx-auto" />
      </div>

      {/* Extended list */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left text-gray-900">
        <li>🛏️ Mattresses & Box Springs</li>
        <li>🚪 Doors, Windows & Fixtures</li>
        <li>🪞 Household Clutter & Decor</li>
        <li>🏗️ Hot Tubs & Above-Ground Pools</li>
        <li>🎹 Pianos & Large Specialty Items</li>
        <li>🏋️ Exercise Equipment</li>
        <li>🪵 Construction Debris & Lumber</li>
        <li>🏚️ Estate & Rental Cleanouts</li>
      </ul>
    </div>

    {/* Right Column (DESKTOP ONLY, all 4 images in grid) */}
    <div className="relative z-10 grid grid-cols-2 gap-4 w-full hidden lg:grid">
      <img
        src="/images/proof-hoarder.jpg"
        alt="Hoarder garage cleanout"
        className="rounded-lg shadow-md border border-gold/30 hover:scale-105 transition-transform"
      />
      <img
        src="/images/proof-home.jpg"
        alt="Home cleanout"
        className="rounded-lg shadow-md border border-gold/30 hover:scale-105 transition-transform"
      />
      <img
        src="/images/proof-storage-before.png"
        alt="Storage cleanout before"
        className="rounded-lg shadow-md border border-gold/30 hover:scale-105 transition-transform"
      />
      <img
        src="/images/proof-storage-after.png"
        alt="Storage cleanout after"
        className="rounded-lg shadow-md border border-gold/30 hover:scale-105 transition-transform"
      />
    </div>
  </div>

  {/* Last 2 images (MOBILE ONLY, under full list) */}
  <div className="grid grid-cols-2 gap-4 mt-6 lg:hidden max-w-7xl mx-auto">
    <img
      src="/images/proof-storage-before.png"
      alt="Storage cleanout before"
      className="rounded-lg shadow-md border border-gold/30 hover:scale-105 transition-transform"
    />
    <img
      src="/images/proof-storage-after.png"
      alt="Storage cleanout after"
      className="rounded-lg shadow-md border border-gold/30 hover:scale-105 transition-transform"
    />
  </div>

  {/* Questions Line */}
  <div className="max-w-7xl mx-auto mt-8 text-center lg:text-left">
    {/* Desktop: inline */}
    <p className="hidden lg:block font-semibold text-sm text-gray-700">
      ❓ Questions? All your answers can be found with{" "}
      <span className="relative font-bold text-gray-900 rgb-underline">
        Junk Buddies’ Assistant
      </span>
    </p>

    {/* Mobile: stacked */}
    <div className="lg:hidden">
      <p className="font-semibold text-sm text-gray-700">
        ❓ Questions? All your answers can be found with —
      </p>
      <p className="font-bold text-gray-900 rgb-underline mt-1 inline-block">
        Junk Buddies’ Assistant
      </p>
    </div>
  </div>
</section>

{/* === DONATION & RECYCLING SECTION === */}
<section className="relative w-full bg-[#fafafa] overflow-hidden">
  {/* Top Grey Separator Bar */}
  <div className="w-full h-4 bg-gray-200"></div>

  <div className="max-w-7xl mx-auto flex flex-row items-stretch relative">
    {/* Eco-Friendly Icons in Corners */}
    <div className="absolute top-4 left-4 text-green-600 text-2xl">♻️</div>
    <div className="absolute top-4 right-4 text-green-600 text-2xl">🌱</div>

  {/* Left Side – Photos (always stacked, responsive) */}
<div className="bg-gray-100 flex flex-col justify-center items-center 
                p-2 xs:p-3 sm:p-4 w-1/2 space-y-2 sm:space-y-4">
  <img
    src="/images/donation-placeholder1.png"
    alt="Donation proof 1"
    className="w-full sm:max-w-[80%] lg:max-w-[70%] h-auto object-cover 
               rounded-lg shadow-md border border-gold/30"
  />
  <img
    src="/images/donation-placeholder2.png"
    alt="Donation proof 2"
    className="w-full sm:max-w-[80%] lg:max-w-[70%] h-auto object-cover 
               rounded-lg shadow-md border border-gold/30"
  />
</div>


    {/* Gold Divider (always visible) */}
    <div className="w-px bg-gold"></div>

    {/* Right Side – Text */}
    <div className="w-1/2 flex-1 text-gray-800 
                    py-4 px-2 xs:py-6 xs:px-4 sm:py-10 sm:px-6 
                    lg:py-20 lg:px-12 bg-white">
      <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gold mb-4 sm:mb-6">
        Donation & Recycling — Built Into Every Job
      </h2>
      <p className="text-sm xs:text-base sm:text-lg mb-6 leading-relaxed text-gray-700">
        At Junk Buddies, responsible sorting is not optional — it’s how we operate. 
        Every pickup is evaluated for donation and recycling first, reducing landfill 
        impact, ensuring reusable items find a second life, and keeping your final price lower.
      </p>
      <p className="text-sm xs:text-base sm:text-lg mb-6 leading-relaxed text-gray-700 font-semibold">
        This approach means less waste, stronger communities, and better value in every service.
      </p>
      <p className="text-sm xs:text-base sm:text-lg mb-6 leading-relaxed text-gray-700">
        When you choose Junk Buddies, you’re not just clearing space — you’re{" "}
        <span className="font-bold text-gold">Making Space For What Matters.</span>
      </p>
      <p className="text-xs xs:text-sm font-semibold text-gray-600">
        Donation and recycling: included with every service, at no extra charge.
      </p>
    </div>
  </div>

  {/* Bottom Grey Separator Bar */}
  <div className="w-full h-4 bg-gray-200"></div>

{/* Partner Logos */}
<div className="max-w-7xl mx-auto mt-12 px-6">
  <h3 className="text-xl font-bold text-center text-gray-800 mb-6">
    Proud Partners In Donation & Recycling
  </h3>
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 items-center justify-items-center">
    {/* Goodwill */}
    <div className="relative w-full h-16 sm:h-20 flex items-center justify-center group cursor-pointer">
      <img
        src="/images/goodwill-logo.png"
        alt="Goodwill"
        className="max-h-16 sm:max-h-20 object-contain transition duration-300 group-hover:opacity-0"
      />
      <p className="absolute inset-0 flex items-center justify-center text-xs sm:text-sm text-gray-700 font-semibold opacity-0 group-hover:opacity-100 transition duration-300 text-center px-2">
        Goodwill: creating jobs & supporting communities.
      </p>
    </div>

    {/* Salvation Army */}
    <div className="relative w-full h-16 sm:h-20 flex items-center justify-center group cursor-pointer">
      <img
        src="/images/Salvation-Army-logo.webp"
        alt="Salvation Army"
        className="max-h-16 sm:max-h-20 object-contain transition duration-300 group-hover:opacity-0"
      />
      <p className="absolute inset-0 flex items-center justify-center text-xs sm:text-sm text-gray-700 font-semibold opacity-0 group-hover:opacity-100 transition duration-300 text-center px-2">
        Salvation Army: relief, shelter & family aid.
      </p>
    </div>

    {/* Habitat for Humanity */}
    <div className="relative w-full h-16 sm:h-20 flex items-center justify-center group cursor-pointer">
      <img
        src="/images/Habitat_for_humanity_logo.png"
        alt="Habitat for Humanity"
        className="max-h-16 sm:max-h-20 object-contain transition duration-300 group-hover:opacity-0"
      />
      <p className="absolute inset-0 flex items-center justify-center text-xs sm:text-sm text-gray-700 font-semibold opacity-0 group-hover:opacity-100 transition duration-300 text-center px-2">
        Habitat: building affordable homes for families.
      </p>
    </div>

    {/* Houston Furniture Bank */}
    <div className="relative w-full h-16 sm:h-20 flex items-center justify-center group cursor-pointer">
      <img
        src="/images/Houston-furniture-bank-logo.png"
        alt="Houston Furniture Bank"
        className="max-h-16 sm:max-h-20 object-contain transition duration-300 group-hover:opacity-0"
      />
      <p className="absolute inset-0 flex items-center justify-center text-xs sm:text-sm text-gray-700 font-semibold opacity-0 group-hover:opacity-100 transition duration-300 text-center px-2">
        Houston Furniture Bank: furnishing homes for those in need.
      </p>
    </div>

    {/* Books Between Kids */}
    <div className="relative w-full h-16 sm:h-20 flex items-center justify-center group cursor-pointer">
      <img
        src="/images/books-between-kids-logo.png"
        alt="Books Between Kids"
        className="max-h-16 sm:max-h-20 object-contain transition duration-300 group-hover:opacity-0"
      />
      <p className="absolute inset-0 flex items-center justify-center text-xs sm:text-sm text-gray-700 font-semibold opacity-0 group-hover:opacity-100 transition duration-300 text-center px-2">
        Books Between Kids: free books for Houston children.
      </p>
    </div>

    {/* Houston Children’s Charity */}
    <div className="relative w-full h-16 sm:h-20 flex items-center justify-center group cursor-pointer">
      <img
        src="/images/Houston-Children’s-Charity-logo.png"
        alt="Houston Children’s Charity"
        className="max-h-16 sm:max-h-20 object-contain transition duration-300 group-hover:opacity-0"
      />
      <p className="absolute inset-0 flex items-center justify-center text-xs sm:text-sm text-gray-700 font-semibold opacity-0 group-hover:opacity-100 transition duration-300 text-center px-2">
        Houston Children’s Charity: improving the lives of underprivileged kids.
      </p>
    </div>
  </div>
</div>


</section>




      <div className="relative z-10 bg-gray-900 px-6 pt-16 pb-0">
        <div className="max-w-5xl w-full mx-auto self-schedule-section text-center">
  <span className="self-schedule-badge">
    You don’t pay until the job’s done
  </span>
  <h2 className="self-schedule-title">Self-Scheduling</h2>
  <h3 className="text-xl text-white font-semibold mb-2">
    For Guaranteed Instant Pricing
  </h3>
  <p className="self-schedule-text mt-2">
    Why wait for quotes or callbacks? Our self-scheduling tool gives you instant access to upfront pricing — 30% lower than big-brand junk haulers. Pick your items, book your time, and relax. We show up, clean up, and <strong>you only pay when the job is done</strong>.
  </p>
  <button
    onClick={() => navigate('/selection')}
    className="cta-metallic-button mt-4 inline-block"
  >
    Book Instantly
  </button>
</div>
        <div className="relative z-10 mt-20 max-w-6xl w-full mx-auto">
          <h2 className="text-3xl text-gold font-bold mb-6 text-center">
            How It Works
          </h2>
          <div className="how-it-works-carousel">
            <div className="how-card floatWaveUp silver">
              <video autoPlay loop muted playsInline className="how-card-video">
                <source src="/videos/step1.mp4" type="video/mp4" />
              </video>
              <h3 className="how-card-title">1. Tap to Start</h3>
            </div>
            <div className="how-card floatWaveDown silver">
              <video autoPlay loop muted playsInline className="how-card-video">
                <source src="/videos/step2.mp4" type="video/mp4" />
              </video>
              <h3 className="how-card-title">2. Add in Seconds</h3>
            </div>
            <div className="how-card floatWaveUp silver">
              <video autoPlay loop muted playsInline className="how-card-video">
                <source src="/videos/step3.mp4" type="video/mp4" />
              </video>
              <h3 className="how-card-title">3. Schedule Instantly</h3>
            </div>
            <div className="howitworks-badge-card how-card floatPulse">
              <h3 className="badge-title">
                We Make Space For What Matters.
              </h3>
              <p className="badge-subtitle">
                Your Buddies Show Up. You Only Pay When It’s Done.
              </p>
            </div>
          </div>
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => navigate('/selection')}
              className="cta-metallic-button"
            >
              Get Instant Pricing
            </button>
          </div>
        </div>

        <div className="relative z-10 mt-20 max-w-6xl w-full mx-auto space-y-20">
          <section
            ref={aboutRef}
            className={`about-reveal silver text-center ${
              aboutInView ? 'in-view' : ''
            }`}
          >
            <h2
              ref={aboutTitleRef}
              className="text-3xl text-gold font-bold mb-4 border-b border-gold pb-2 inline-block mx-auto"
            >
              About Us
            </h2>
            <p ref={aboutParagraphRef} className="text-lg leading-relaxed">
              <strong>Built in Houston. Driven by Hustle. Trusted by Thousands.</strong><br /><br />
              At Junk Buddies, we do more than haul junk—we make room for
              progress. Born and built in Houston, our crew combines precision,
              speed, and respect for your space to deliver next-level cleanouts.
              Whether it’s a single item or a full property refresh, we show up
              with hustle, heart, and zero excuses. Your space, your schedule,
              our muscle.
            </p>
          </section>

          {/* === Our Work in Action & Testimonials WRAPPED IN A SINGLE BACKGROUND === */}
<div className="relative z-10 w-full bg-gray-900 py-20 px-4">

  {/* Our Work in Action */}
  <section className="max-w-6xl w-full mx-auto">
    <h2 className="text-3xl text-gold font-bold mb-6 text-center">Our Work in Action</h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <img src="/images/couch-carrying.png" alt="Team carrying a couch" className="rounded-full w-full h-36 object-cover border-4 border-gold hover:scale-105 transition-transform" />
      <img src="/images/team-sunset.png" alt="Team at sunset" className="rounded-full w-full h-36 object-cover border-4 border-gold hover:scale-105 transition-transform" />
      <img src="/images/truck-fleet.png" alt="Truck fleet" className="rounded-full w-full h-36 object-cover border-4 border-gold hover:scale-105 transition-transform" />
      <img src="/images/demolition-crew.png" alt="Demolition crew" className="rounded-full w-full h-36 object-cover border-4 border-gold hover:scale-105 transition-transform" />
    </div>
  </section>

  {/* CTA Below Work In Action */}
  <div className="mt-10 flex justify-center">
    <button onClick={() => navigate('/selection')} className="cta-metallic-button">
      Select Items in Seconds
    </button>
  </div>

  {/* === TESTIMONIALS === */}
<section className="w-full mt-20">
  <h2 className="text-3xl text-gold font-bold mb-6 text-center">Testimonials</h2>

  {/* ROW 1 */}
  <div className="marquee-row">
    <div className="marquee-content marquee-rtl">
      <div className="silver-badge">⭐⭐⭐⭐⭐ Needed a quick garage clean out — fast and affordable.</div>
      <div className="silver-badge">⭐⭐⭐⭐⭐ Excellent team, on time, super friendly crew.</div>
      <div className="silver-badge">⭐⭐⭐⭐⭐ Booking was easy, upfront price, no surprises!</div>
      <div className="silver-badge">⭐⭐⭐⭐⭐ Backyard shed cleaned same day — lifesaver!</div>
      <div className="silver-badge">⭐⭐⭐⭐⭐ Cleared out my storage unit quick — highly recommend.</div>
      <div className="silver-badge">⭐⭐⭐⭐⭐ Fair price, hardworking crew, left spotless.</div>

      {/* Duplicate for loop */}
      <div className="silver-badge">⭐⭐⭐⭐⭐ Needed a quick garage clean out — fast and affordable.</div>
      <div className="silver-badge">⭐⭐⭐⭐⭐ Excellent team, on time, super friendly crew.</div>
      <div className="silver-badge">⭐⭐⭐⭐⭐ Booking was easy, upfront price, no surprises!</div>
      <div className="silver-badge">⭐⭐⭐⭐⭐ Backyard shed cleaned same day — lifesaver!</div>
      <div className="silver-badge">⭐⭐⭐⭐⭐ Cleared out my storage unit quick — highly recommend.</div>
      <div className="silver-badge">⭐⭐⭐⭐⭐ Fair price, hardworking crew, left spotless.</div>
    </div>
  </div>

  {/* ROW 2 - staggered */}
  <div className="marquee-row mt-6">
    <div className="marquee-content marquee-rtl delay">
      <div className="silver-badge">⭐⭐⭐⭐⭐ Fast booking, showed up on time, awesome service.</div>
      <div className="silver-badge">⭐⭐⭐⭐⭐ They removed my old furniture in no time.</div>
      <div className="silver-badge">⭐⭐⭐⭐⭐ Price was better than the big guys — will use again!</div>
      <div className="silver-badge">⭐⭐⭐⭐⭐ Easy online quote, no hidden fees, great crew.</div>
      <div className="silver-badge">⭐⭐⭐⭐⭐ Same-day pickup — these guys hustle!</div>
      <div className="silver-badge">⭐⭐⭐⭐⭐ Highly recommend Junk Buddies to everyone I know.</div>

      {/* Duplicate for loop */}
      <div className="silver-badge">⭐⭐⭐⭐⭐ Fast booking, showed up on time, awesome service.</div>
      <div className="silver-badge">⭐⭐⭐⭐⭐ They removed my old furniture in no time.</div>
      <div className="silver-badge">⭐⭐⭐⭐⭐ Price was better than the big guys — will use again!</div>
      <div className="silver-badge">⭐⭐⭐⭐⭐ Easy online quote, no hidden fees, great crew.</div>
      <div className="silver-badge">⭐⭐⭐⭐⭐ Same-day pickup — these guys hustle!</div>
      <div className="silver-badge">⭐⭐⭐⭐⭐ Highly recommend Junk Buddies to everyone I know.</div>
    </div>
  </div>
</section>
</div>
</div>
 
      </div>

     <footer className="bg-black text-gray-400 py-10 px-6 text-center border-t border-gold">
  <div className="max-w-7xl mx-auto space-y-6">
    {/* Blog and FAQ */}
    <div className="space-y-2">
      <Link to="/blog" className="text-gold font-semibold hover:underline block">
        📝 Read Our Blog — Junk Removal Tips, Pricing & More
      </Link>
      <Link to="/faq" className="text-gold hover:underline block">
        📌 Frequently Asked Questions
      </Link>
    </div>

    {/* City Links Grid */}
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-sm text-white pt-6 border-t border-gold mt-4">
<Link to="/service-areas/houston">Houston</Link>
<Link to="/service-areas/katy">Katy</Link>
<Link to="/service-areas/sugar-land">Sugar Land</Link>
<Link to="/service-areas/pearland">Pearland</Link>
<Link to="/service-areas/cypress">Cypress</Link>
<Link to="/service-areas/spring">Spring</Link>
<Link to="/service-areas/humble">Humble</Link>
<Link to="/service-areas/missouri-city">Missouri City</Link>
<Link to="/service-areas/pasadena">Pasadena</Link>
<Link to="/service-areas/the-woodlands">The Woodlands</Link>
<Link to="/service-areas/league-city">League City</Link>
<Link to="/service-areas/baytown">Baytown</Link>
<Link to="/service-areas/friendswood">Friendswood</Link>
<Link to="/service-areas/channelview">Channelview</Link>
<Link to="/service-areas/richmond">Richmond</Link>
<Link to="/service-areas/rosenberg">Rosenberg</Link>
<Link to="/service-areas/tomball">Tomball</Link>
<Link to="/service-areas/alvin">Alvin</Link>
<Link to="/service-areas/deer-park">Deer Park</Link>
<Link to="/service-areas/la-porte">La Porte</Link>
</div>


    {/* Copyright */}
    <div className="text-xs text-gray-500 pt-6 border-t border-gold">
      © {new Date().getFullYear()} Junk Buddies LLC. All rights reserved.
    </div>
  </div>
</footer>

    </div>
  );
}

export default LandingPage;
 
 
