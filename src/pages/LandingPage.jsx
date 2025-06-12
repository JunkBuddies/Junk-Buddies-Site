import React, { useEffect, useRef, useState } from 'react'; import { useNavigate, Link } from 'react-router-dom';

function LandingPage() { const navigate = useNavigate(); const junkRef = useRef(null); const buddiesRef = useRef(null); const aboutRef = useRef(null); const aboutTitleRef = useRef(null); const aboutParagraphRef = useRef(null); const cardRefs = useRef([]); cardRefs.current = [];

const [aboutInView, setAboutInView] = useState(false);

const setCardRef = (el) => { if (el && !cardRefs.current.includes(el)) { cardRefs.current.push(el); } };

useEffect(() => { const junk = junkRef.current; const buddies = buddiesRef.current; if (junk && buddies) { junk.classList.remove('shine-junk'); buddies.classList.remove('shine-buddies'); void junk.offsetWidth; void buddies.offsetWidth; buddies.classList.add('shine-buddies'); setTimeout(() => junk.classList.add('shine-junk'), 2500); } }, []);

useEffect(() => { const observer = new IntersectionObserver( ([entry]) => { if (entry.isIntersecting) setAboutInView(true); }, { threshold: 0.4 } );

if (aboutRef.current) {
  observer.observe(aboutRef.current);
}

return () => {
  if (aboutRef.current) observer.unobserve(aboutRef.current);
};

}, []);

return ( <div className="w-full overflow-hidden"> <div className="hero-earth-bg w-full min-h-screen flex flex-col items-center justify-center text-white text-center relative"> {/* Animated GIF overlay */}
<img
  src="/images/Earth-rotation.gif"
  alt="Earth overlay animation"
  className="absolute top-0 left-0 w-full h-full object-cover z-10 pointer-events-none"
/><div className="absolute top-6 right-6 z-50"> <Link
to="/service-areas"
className="text-gold font-semibold hover:underline bg-black/70 px-4 py-2 rounded-lg shadow-md"
> Cities We Serve </Link> </div> 

<div className="relative z-10 mt-24">
      <div className="relative z-10 shine-wrapper">
        <div className="flex flex-wrap justify-center items-center gap-3 whitespace-nowrap">
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
      </div>
      <p className="text-2xl font-semibold tracking-wide mt-4">Making Space For What Matters</p>
    </div>

    <div className="relative z-10 mt-8 space-y-4">
      <button onClick={() => navigate('/selection')} className="button-glow">
        Get Started
      </button>
      <button
        onClick={() => navigate('/selection')}
        className="bg-white text-black font-bold py-3 px-8 rounded-xl hover:bg-gray-200 transition shadow-lg hover:scale-105"
      >
        View Pricing
      </button>
    </div>
  </div>

  <div className="relative z-10 bg-gray-900 px-6 pt-16 pb-0">
    <div className="max-w-5xl w-full mx-auto self-schedule-section">
      <span className="self-schedule-badge">You don’t pay until the job’s done</span>
      <h2 className="self-schedule-title">Self-Scheduling</h2>
      <h3 className="text-xl text-white font-semibold mb-2">For Guaranteed Instant Pricing</h3>
      <p className="self-schedule-text mt-2">
        Why wait for quotes or callbacks? Our self-scheduling tool gives you instant access to upfront pricing — 30% lower than big-brand junk haulers. Pick your items, book your time, and relax. We show up, clean up, and <strong>you only pay when the job is done</strong>.
      </p>
      <button onClick={() => navigate('/selection')} className="cta-metallic-button mt-4">
  Book Instantly
</button>
    </div>

    <div className="relative z-10 mt-20 max-w-6xl w-full mx-auto">
      <h2 className="text-3xl text-gold font-bold mb-6 text-center">How It Works</h2>
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
          <h3 className="badge-title">We Make Space For What Matters.</h3>
          <p className="badge-subtitle">Your Buddies Show Up. You Only Pay When It’s Done.</p>
        </div>
      </div>
      <div className="mt-8 flex justify-center">
        <button onClick={() => navigate('/selection')} className="cta-metallic-button">
          Get Instant Pricing
        </button>
      </div>
    </div>

    <div className="relative z-10 mt-20 max-w-6xl w-full mx-auto space-y-20">
      <section
  ref={aboutRef}
  className={`about-reveal silver text-center ${aboutInView ? 'in-view' : ''}`}
>
        <h2
  ref={aboutTitleRef}
  className="text-3xl text-gold font-bold mb-4 border-b border-gold pb-2 inline-block mx-auto"
>
          About Us
        </h2>
        <p ref={aboutParagraphRef} className="text-lg leading-relaxed">
          <strong>Built in Houston. Driven by Hustle. Trusted by Thousands.</strong><br /><br />
          At Junk Buddies, we do more than haul junk—we make room for progress. Born and built in Houston, our crew combines precision, speed, and respect for your space to deliver next-level cleanouts. Whether it’s a single item or a full property refresh, we show up with hustle, heart, and zero excuses. Your space, your schedule, our muscle.
        </p>
      </section>

      <section className="bg-gray-800/60 rounded-xl p-6 shadow-lg">
        <h2 className="text-3xl text-gold font-bold mb-4 border-b border-gold pb-2">Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white text-black p-6 rounded-xl shadow-lg border-l-4 border-gold relative">
            <p className="italic text-lg">“They were quick, friendly, and cleaned everything perfectly. Highly recommend!”</p>
            <span className="block mt-4 font-semibold text-right">- Alex R.</span>
          </div>
          <div className="bg-white text-black p-6 rounded-xl shadow-lg border-l-4 border-gold relative">
            <p className="italic text-lg">“Excellent service and easy scheduling. They really came through for us.”</p>
            <span className="block mt-4 font-semibold text-right">- Jamie L.</span>
          </div>
        </div>
      </section>

      <div className="mt-10 flex justify-center">
        <button onClick={() => navigate('/selection')} className="cta-metallic-button">
          Select Items in Seconds
        </button>
      </div>

      <section>
        <h2 className="text-3xl text-gold font-bold mb-6 text-center">Our Work in Action</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <img src="/images/couch-carrying.png" alt="Team carrying a couch" className="rounded-full w-full h-36 object-cover border-4 border-gold hover:scale-105 transition-transform" />
          <img src="/images/team-sunset.png" alt="Junk Buddies team at sunset" className="rounded-full w-full h-36 object-cover border-4 border-gold hover:scale-105 transition-transform" />
          <img src="/images/truck-fleet.png" alt="Fleet of Junk Buddies trucks" className="rounded-full w-full h-36 object-cover border-4 border-gold hover:scale-105 transition-transform" />
          <img src="/images/demolition-crew.png" alt="Junk Buddies team at a demolition site" className="rounded-full w-full h-36 object-cover border-4 border-gold hover:scale-105 transition-transform" />
        </div>
      </section>
    </div>
  </div>

  <footer className="bg-black text-gray-400 py-8 px-4 text-center border-t border-gold">
    <div className="text-sm space-y-3">
      <Link to="/blog" className="text-gold font-semibold hover:underline block">
        📝 Read Our Blog — Junk Removal Tips, Pricing & More
      </Link>
      <a href="/faq" className="text-gold hover:underline block">
        📌 Frequently Asked Questions
      </a>
      <div className="text-xs text-gray-500">
        © {new Date().getFullYear()} Junk Buddies. All rights reserved.
      </div>
    </div>
  </footer>
</div>

); }

export default LandingPage;

