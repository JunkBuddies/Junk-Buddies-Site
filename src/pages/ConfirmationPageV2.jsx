import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function ConfirmationPageV2() {
  const navigate = useNavigate();
  const { state = {} } = useLocation();
  const firstName = state.name ? state.name.split(' ')[0] : '';
  const css = '@keyframes jbCheck{0%{transform:scale(.2);opacity:0}70%{transform:scale(1.12);opacity:1}100%{transform:scale(1);opacity:1}}@keyframes jbFall{0%{transform:translateY(-12vh) rotate(0);opacity:0}10%{opacity:.9}100%{transform:translateY(105vh) rotate(540deg);opacity:0}}';

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] px-4 py-10 text-white flex items-center justify-center">
      <style>{css}</style>
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {Array.from({ length: 24 }).map((_, i) => (
          <span key={i} className="absolute top-0 h-2.5 w-1 rounded bg-[#d4af37]" style={{ left: ((i * 37) % 100) + '%', opacity: 0, animation: 'jbFall ' + (3 + (i % 5) * .3) + 's ease-in ' + ((i % 8) * .1) + 's 1' }} />
        ))}
      </div>

      <section className="relative z-10 w-full max-w-2xl rounded-[2rem] border border-[#d4af37]/30 bg-gradient-to-b from-[#11100c] to-[#080808] p-6 text-center shadow-2xl sm:p-10">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#d4af37] text-4xl font-black text-black shadow-[0_0_50px_rgba(212,175,55,.3)]" style={{ animation: 'jbCheck .7s cubic-bezier(.2,.9,.25,1.2) both' }}>✓</div>
        <p className="mt-6 text-xs font-bold uppercase tracking-[.22em] text-[#d4af37]">Pickup locked in</p>
        <h1 className="mt-2 text-4xl font-black sm:text-5xl">You're on the schedule.</h1>
        <p className="mx-auto mt-4 max-w-xl text-white/60 sm:text-lg">Thanks{firstName ? ', ' + firstName : ''}. Your pickup request has been saved. We'll contact you if anything needs to be confirmed before arrival.</p>

        {state.orderNumber && <div className="mt-6 inline-flex rounded-full border border-[#d4af37]/25 bg-[#d4af37]/10 px-4 py-2 text-sm font-black text-[#e6c45c]">Confirmation {state.orderNumber}</div>}

        <div className="mt-8 grid gap-3 text-left sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[.035] p-4">
            <div className="text-xs uppercase tracking-wider text-white/35">Preferred pickup</div>
            <div className="mt-1 font-bold">{state.date || 'Scheduled'}</div>
            <div className="text-sm text-white/50">{state.time || 'Arrival window saved'}</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[.035] p-4">
            <div className="text-xs uppercase tracking-wider text-white/35">Estimated total</div>
            <div className="mt-1 text-2xl font-black text-[#d4af37]">{'$'}{Number(state.total || 0).toFixed(2)}</div>
            <div className="text-sm text-white/50">{state.itemCount || 0} item{state.itemCount === 1 ? '' : 's'} selected</div>
          </div>
          {state.fullAddress && <div className="rounded-2xl border border-white/10 bg-white/[.035] p-4 sm:col-span-2"><div className="text-xs uppercase tracking-wider text-white/35">Pickup address</div><div className="mt-1 font-bold">{state.fullAddress}</div></div>}
        </div>

        <div className="mt-7 rounded-2xl border border-[#d4af37]/20 bg-black/30 p-5">
          <div className="font-black text-[#d4af37]">No payment was taken.</div>
          <div className="mt-1 text-sm text-white/50">You don't pay until the job is done.</div>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <a href="tel:3465936080" className="cta-metallic-button text-center">Call Junk Buddies</a>
          <button onClick={() => navigate('/')} className="rounded-xl border border-white/15 bg-white/[.04] px-6 py-3 font-bold">Back to Home</button>
        </div>
        <Link to="/itemized" className="mt-6 inline-block text-sm font-bold text-white/40 hover:text-[#d4af37]">Need another pickup? Start a new estimate</Link>
      </section>
    </main>
  );
}
