import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const benefits = [
  {
    title: '30% Partner Rate',
    text: 'Approved partner teams receive 30% off qualifying Junk Buddies removal projects, with no minimum amount of work required.',
  },
  {
    title: 'Built for Property Operations',
    text: 'Use the program for unit cleanouts, abandoned furniture, appliances, turnover debris, storage areas, office cleanouts, and similar removal needs.',
  },
  {
    title: 'Partner Code',
    text: 'Each approved company can receive a simple partner code so your team has an easy way to identify eligible projects and access partner pricing.',
  },
  {
    title: 'Resident Support',
    text: 'Qualifying savings may also be extended to residents or tenants connected to partner properties when arranged through the program.',
  },
  {
    title: 'Community Cleanout Support',
    text: 'For approved properties, we can coordinate community cleanout days and optional on-site materials such as QR cards or event signage.',
  },
  {
    title: 'Partner Recognition',
    text: 'With permission, approved partners may be featured as a Junk Buddies property partner. We can also provide our brand assets for approved vendor or resident-resource pages.',
  },
];

const uses = [
  'Unit and apartment cleanouts',
  'Abandoned furniture and appliances',
  'Move-out and turnover debris',
  'Storage and common-area cleanups',
  'Office and leasing-space cleanouts',
  'Bulk-item and resident removal needs',
];

function PartnersPage() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Property Partner Program | Junk Buddies Houston';
    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      <section className="relative border-b border-[#d4af37]/30">
        <div
          className="absolute inset-0 opacity-20"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(circle at 50% 0%, rgba(212,175,55,.34), transparent 43%), radial-gradient(circle at 95% 35%, rgba(184,134,11,.15), transparent 28%)',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-6 pb-16 sm:pb-20 lg:pb-24">
          <nav className="flex items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-3 min-w-0" aria-label="Junk Buddies home">
              <img src="/images/logo-icon.png" alt="" className="h-11 sm:h-14 w-auto object-contain" />
              <div className="leading-tight">
                <div className="text-xl sm:text-2xl font-extrabold text-[#d4af37]">Junk Buddies</div>
                <div className="hidden xs:block text-[11px] sm:text-xs text-white/60 tracking-wide">
                  Making Space For What Matters
                </div>
              </div>
            </Link>

            <a
              href="tel:3465936080"
              className="shrink-0 rounded-xl border border-[#d4af37]/70 bg-[#d4af37] px-4 py-2.5 text-sm sm:text-base font-extrabold text-black shadow-lg transition hover:brightness-110 active:scale-[.98]"
            >
              Call Partner Team
            </a>
          </nav>

          <div className="max-w-4xl mx-auto text-center pt-16 sm:pt-20 lg:pt-24">
            <span className="inline-flex items-center rounded-full border border-[#d4af37]/50 bg-[#d4af37]/10 px-4 py-2 text-xs sm:text-sm font-bold tracking-[0.18em] uppercase text-[#e7c65f]">
              Houston Property Partner Program
            </span>

            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight">
              A better junk removal option
              <span className="block text-[#d4af37]">for your properties.</span>
            </h1>

            <p className="mt-6 max-w-3xl mx-auto text-base sm:text-lg lg:text-xl leading-relaxed text-white/72">
              A simple working relationship for property managers, multifamily teams, real estate operators, and select Houston-area partners who want dependable removal help and a preferred rate when something comes up.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
              <a href="tel:3465936080" className="cta-metallic-button text-center">
                Talk About Partnership
              </a>
              <Link
                to="/selection"
                className="rounded-xl border border-white/20 bg-white/[0.06] px-6 py-3 text-center text-base sm:text-lg font-bold text-white transition hover:border-[#d4af37]/70 hover:bg-[#d4af37]/10"
              >
                See Junk Removal Options
              </Link>
            </div>

            <p className="mt-5 text-sm text-white/45">No minimum amount of work required.</p>
          </div>
        </div>
      </section>

      <section className="bg-[#0a0a0a] border-b border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          <div className="px-6 py-7 text-center">
            <div className="text-3xl sm:text-4xl font-black text-[#d4af37]">30%</div>
            <div className="mt-1 text-sm text-white/60">off qualifying partner projects</div>
          </div>
          <div className="px-6 py-7 text-center">
            <div className="text-3xl sm:text-4xl font-black text-[#d4af37]">0</div>
            <div className="mt-1 text-sm text-white/60">minimum jobs required</div>
          </div>
          <div className="px-6 py-7 text-center">
            <div className="text-3xl sm:text-4xl font-black text-[#d4af37]">Houston</div>
            <div className="mt-1 text-sm text-white/60">local team and surrounding service area</div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-16 sm:py-20">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#d4af37]">What partners get</p>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black">Useful when you need us. No pressure when you don't.</h2>
          <p className="mt-5 text-base sm:text-lg leading-relaxed text-white/65">
            The program is designed to be an easy operational resource, not another contract your team has to manage.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
          {benefits.map((benefit, index) => (
            <article
              key={benefit.title}
              className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.055] to-white/[0.025] p-6 sm:p-7 shadow-[0_18px_50px_rgba(0,0,0,.28)]"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-bold tracking-[0.2em] text-[#d4af37]/70">0{index + 1}</span>
                <span className="h-px flex-1 bg-gradient-to-r from-[#d4af37]/40 to-transparent" />
              </div>
              <h3 className="mt-5 text-xl sm:text-2xl font-extrabold text-[#e1bd4d]">{benefit.title}</h3>
              <p className="mt-3 leading-relaxed text-white/65">{benefit.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[#d4af37]/20 bg-[#0c0b08]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-16 sm:py-20 grid lg:grid-cols-[.9fr_1.1fr] gap-10 lg:gap-16 items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#d4af37]">Common partner uses</p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-black">When property life creates junk, we're already in your corner.</h2>
            <p className="mt-5 text-white/65 leading-relaxed">
              Jobs can be scheduled as they arise. Your team does not need to hit a monthly quota or commit to a fixed volume.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {uses.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-xl border border-[#d4af37]/20 bg-black/35 p-4">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#d4af37] text-sm font-black text-black">✓</span>
                <span className="font-semibold text-white/85">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-16 sm:py-20">
        <div className="rounded-3xl border border-[#d4af37]/35 bg-gradient-to-br from-[#15120a] via-[#090909] to-[#050505] p-6 sm:p-9 lg:p-12 shadow-[0_0_70px_rgba(212,175,55,.08)]">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#d4af37]">How it works</p>
              <h2 className="mt-3 text-3xl sm:text-4xl font-black">Simple enough to actually use.</h2>
            </div>

            <ol className="space-y-5">
              {[
                ['Connect with us', 'We confirm the relationship and the types of projects your team expects to use us for.'],
                ['Receive your partner setup', 'Approved companies can receive a partner code and simple instructions for accessing partner pricing.'],
                ['Use us when something comes up', 'Your team contacts Junk Buddies, identifies the property and partner relationship, and we help move the job toward pricing and scheduling.'],
                ['Keep the relationship flexible', 'No monthly minimum. No need to manufacture work. The rate is there for qualifying projects when you need it.'],
              ].map(([title, text], index) => (
                <li key={title} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#d4af37]/50 bg-[#d4af37]/10 font-black text-[#d4af37]">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-extrabold text-white">{title}</h3>
                    <p className="mt-1 text-sm sm:text-base leading-relaxed text-white/60">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-white text-black">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-14 sm:py-16 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#9b7613]">For residents & communities</p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-black">Make the partnership useful beyond the office.</h2>
            <p className="mt-5 text-gray-600 leading-relaxed">
              Partner properties can ask about qualifying resident or tenant savings, community cleanout events, QR materials, and approved on-site event signage. These options are coordinated property by property so your team stays in control.
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-[#f7f4ec] p-6 sm:p-8">
            <div className="text-sm font-bold text-[#9b7613]">OPTIONAL PROPERTY SUPPORT</div>
            <div className="mt-4 grid gap-3 text-sm sm:text-base">
              <div className="rounded-xl bg-white p-4 shadow-sm">Resident or tenant referral savings on qualifying services</div>
              <div className="rounded-xl bg-white p-4 shadow-sm">Community cleanout-day coordination</div>
              <div className="rounded-xl bg-white p-4 shadow-sm">QR cards or leasing-office information</div>
              <div className="rounded-xl bg-white p-4 shadow-sm">Event signage or feather-flag placement where property approval is provided</div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-5 sm:px-8 py-16 sm:py-20 text-center">
        <img src="/images/logo-icon.png" alt="" className="h-16 sm:h-20 w-auto mx-auto object-contain" />
        <h2 className="mt-5 text-3xl sm:text-5xl font-black">Let's make the next cleanout easier.</h2>
        <p className="mt-4 max-w-2xl mx-auto text-white/65 text-base sm:text-lg">
          If your team manages properties in Houston or the surrounding area, call Junk Buddies and ask about getting your company set up as a property partner.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
          <a href="tel:3465936080" className="cta-metallic-button text-center">
            Call 346-593-6080
          </a>
          <Link
            to="/selection"
            className="rounded-xl border border-white/20 bg-white/[0.06] px-6 py-3 text-center text-base sm:text-lg font-bold transition hover:border-[#d4af37]/70"
          >
            Book a Junk Removal
          </Link>
        </div>

        <p className="mt-8 text-xs sm:text-sm leading-relaxed text-white/40">
          Partner pricing applies to qualifying standard junk removal and cleanout services. Specialty disposal, unusually heavy materials, hazardous materials, third-party disposal charges, and other special-service costs may be excluded. Partner and resident benefits are subject to project eligibility and availability.
        </p>
      </section>

      <footer className="border-t border-white/10 bg-black px-5 py-8 text-center">
        <div className="font-extrabold text-[#d4af37]">Junk Buddies</div>
        <div className="mt-1 text-sm text-white/50">Making Space For What Matters</div>
        <div className="mt-3 text-xs text-white/35">Houston, Texas · 346-593-6080</div>
      </footer>
    </main>
  );
}

export default PartnersPage;
