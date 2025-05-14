import React, { useEffect, useRef } from 'react'; import { useNavigate } from 'react-router-dom';

function LandingPage() { const navigate = useNavigate(); const junkRef = useRef(null); const buddiesRef = useRef(null); const aboutRef = useRef(null);

useEffect(() => { const handleIntersection = (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) { const junk = junkRef.current; const buddies = buddiesRef.current; if (junk && buddies) { junk.classList.remove('shine-junk'); buddies.classList.remove('shine-buddies'); void junk.offsetWidth; void buddies.offsetWidth; buddies.classList.add('shine-buddies'); setTimeout(() => junk.classList.add('shine-junk'), 2500); } } }); };

const observer = new IntersectionObserver(handleIntersection, {
  threshold: 0.5,
});

if (junkRef.current && buddiesRef.current) {
  observer.observe(junkRef.current.parentElement);
}

return () => observer.disconnect();

}, []);

useEffect(() => { const about = aboutRef.current; if (!about) return;

const handleAboutIntersection = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      about.classList.add('about-reveal');
    }
  });
};

const aboutObserver = new IntersectionObserver(handleAboutIntersection, {
  threshold: 0.5,
});

aboutObserver.observe(about);

return () => aboutObserver.disconnect();

}, []);

return ( <div className="hero-space-background"> <div className="relative bg-gray-900 text-white min-h-screen flex flex-col justify-center items-center text-center px-6"> {/* Gradient Overlay */} <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-gray-900/80 z-0" />

{/* Motto with Shine */}
    <div className="relative z-10 mt-24">
      <div className="relative z-10 shine-wrapper">
        <div className="flex flex-wrap justify-center items-center gap-3 whitespace-nowrap">
          <span
            ref={junkRef}
            className="text-[2.75rem] sm:text-6xl md:text-7xl lg:text-8xl metallic-text-3d"
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
            className="text-[2.75rem] sm:text-6xl md:text-7xl lg:text-8xl metallic-text-3d"
          >
            Buddies
          </span>
        </div>
      </div>
      <p className="text-2xl font-semibold tracking-wide mt-4">
        Making Space For What Matters
      </p>
    </div>

    {/* CTA Buttons */}
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

    {/* Content Sections */}
    <div className="relative z-10 mt-20 max-w-6xl w-full space-y-20">
      <section className="bg-gray-800/60 rounded-xl p-6 shadow-lg">
        <h2 className="text-3xl text-gold font-bold mb-4 border-b border-gold pb-2">How It Works</h2>
        <ol className="space-y-3 text-lg">
          <li>1️⃣ Choose your load size or itemized items.</li>
          <li>2️⃣ Schedule your pickup at your convenience.</li>
          <li>3️⃣ We arrive and clear your junk fast!</li>
        </ol>
      </section>

      {/* UPDATED About Us */}
      <section
        ref={aboutRef}
        className="bg-gray-800/60 rounded-xl p-6 shadow-lg border-gold border-2 animate-border"
      >
        <h2 className="text-3xl text-gold font-bold mb-4 border-b border-gold pb-2">About Us</h2>
        <p className="text-lg leading-relaxed burn-in-metallic floating">
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
</div>

); }

export default LandingPage;

