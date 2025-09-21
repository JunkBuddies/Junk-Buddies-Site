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

        <div className="absolute top-6 right-6 z-50">
          <Link
            to="/service-areas"
            className="text-gold font-semibold hover:underline bg-black/70 px-4 py-2 rounded-lg shadow-md"
          >
            Cities We Serve
          </Link>
        </div>

    {/* HERO TITLE + TAGLINE + CTAs */}
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

  {/* CTA BUTTONS – stay further down on mobile, tuck under tagline on md+ */}
  <div
    className="
      relative z-10 flex flex-col items-center space-y-4
      mt-8
      md:mt-4   /* reduce gap and bring closer on md+ */
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
      onClick={() => document.getElementById("jb-open-button")?.click()}
    >
      See Price In Seconds
    </button>
  </div>
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
 
 
