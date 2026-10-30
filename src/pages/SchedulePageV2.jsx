import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useCart } from '../context/CartContext';
import { calculatePrice } from '../utils/pricing';

const STEPS = ['Your info', 'Property', 'Date & time', 'Review'];
const WINDOWS = [
  ['Morning', '7:00 AM – 12:00 PM'],
  ['Afternoon', '12:00 PM – 5:00 PM'],
  ['Evening', '5:00 PM – 9:00 PM'],
];

const dates = Array.from({ length: 6 }, (_, i) => {
  const d = new Date();
  d.setDate(d.getDate() + i);
  return {
    value: d.toISOString().split('T')[0],
    label: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-US', { weekday: 'short' }),
    sub: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  };
});

export default function SchedulePageV2() {
  const { cart } = useCart();
  const { finalPrice } = calculatePrice(cart);
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    street: '', city: '', state: 'TX', zip: '',
    date: '', time: ''
  });

  const grouped = useMemo(() => {
    const map = new Map();
    cart.forEach((item) => {
      const current = map.get(item.name) || { ...item, qty: 0 };
      current.qty += 1;
      map.set(item.name, current);
    });
    return Array.from(map.values());
  }, [cart]);

  const field = 'w-full rounded-2xl border border-white/10 bg-[#111] px-4 py-3.5 text-white placeholder:text-white/35 outline-none focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/15';

  const update = (name, value) => {
    setForm((f) => ({ ...f, [name]: value }));
    setError('');
  };

  const validate = (target = step) => {
    if (target === 0 && (!form.name.trim() || !form.email.trim() || !form.phone.trim())) return 'Add your name, email, and phone number.';
    if (target === 1 && (!form.street.trim() || !form.city.trim() || !form.zip.trim())) return 'Add the pickup address.';
    if (target === 2 && (!form.date || !form.time)) return 'Choose a date and arrival window.';
    return '';
  };

  const next = () => {
    const msg = validate();
    if (msg) return setError(msg);
    setStep((s) => Math.min(s + 1, 3));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const confirm = async () => {
    if (busy) return;
    const msg = validate(2);
    if (msg) return setError(msg);

    setBusy(true);
    setError('');
    const orderNumber = 'JB-' + Math.floor(100000 + Math.random() * 900000);
    const fullAddress = form.street + ', ' + form.city + ', ' + form.state + ' ' + form.zip;
    const timeOfDay = form.time.startsWith('7:00') ? 'Morning' : form.time.startsWith('12:00') ? 'Afternoon' : 'Evening';

    try {
      await addDoc(collection(db, 'jobs'), {
        ...form,
        fullAddress,
        timeOfDay,
        orderNumber,
        items: cart,
        total: finalPrice,
        Latitude: null,
        Longitude: null,
        bookingSource: 'website-v2',
        status: 'Scheduled',
        createdAt: Timestamp.now(),
      });

      navigate('/confirmation', {
        state: {
          orderNumber,
          name: form.name,
          date: form.date,
          time: form.time,
          fullAddress,
          total: finalPrice,
          itemCount: cart.length,
        },
      });
    } catch (e) {
      console.error(e);
      setBusy(false);
      setError('We could not lock in the booking. Try again or call 346-593-6080.');
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <header className="border-b border-white/10 bg-black">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <Link to="/" className="flex items-center gap-3">
            <img src="/images/logo-icon.png" alt="" className="h-10 w-auto" />
            <div>
              <div className="font-extrabold text-[#d4af37]">Junk Buddies</div>
              <div className="text-[11px] text-white/40">Making Space For What Matters</div>
            </div>
          </Link>
          <a href="tel:3465936080" className="text-sm font-bold text-[#d4af37]">Need help? Call</a>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8 sm:py-12">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[.18em] text-[#e6c45c]">No payment today</span>
          <h1 className="mt-4 text-3xl font-black sm:text-5xl">Lock in your pickup.</h1>
          <p className="mt-3 text-white/55">Four quick steps. You don't pay until the job is done.</p>
        </div>

        <div className="mx-auto mt-8 grid max-w-4xl grid-cols-4 gap-2">
          {STEPS.map((label, i) => (
            <div key={label}>
              <div className={'h-1.5 rounded-full ' + (i <= step ? 'bg-[#d4af37]' : 'bg-white/10')} />
              <div className={'mt-2 truncate text-[10px] font-semibold sm:text-sm ' + (i === step ? 'text-[#d4af37]' : 'text-white/35')}>{label}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
          <section className="rounded-3xl border border-white/10 bg-[#0b0b0b] p-5 shadow-2xl sm:p-8">
            {step === 0 && <>
              <p className="text-xs font-bold uppercase tracking-[.2em] text-[#d4af37]">Step 1</p>
              <h2 className="mt-2 text-2xl font-black sm:text-3xl">Who should we confirm with?</h2>
              <p className="mt-2 text-sm text-white/45">We use this for booking details and arrival updates.</p>
              <div className="mt-7 space-y-4">
                <input className={field} placeholder="Your name" value={form.name} onChange={(e) => update('name', e.target.value)} />
                <input className={field} type="email" placeholder="Email address" value={form.email} onChange={(e) => update('email', e.target.value)} />
                <input className={field} type="tel" placeholder="Phone number" value={form.phone} onChange={(e) => update('phone', e.target.value)} />
              </div>
            </>}

            {step === 1 && <>
              <p className="text-xs font-bold uppercase tracking-[.2em] text-[#d4af37]">Step 2</p>
              <h2 className="mt-2 text-2xl font-black sm:text-3xl">Where are we picking up?</h2>
              <p className="mt-2 text-sm text-white/45">Houston and surrounding service areas.</p>
              <div className="mt-7 space-y-4">
                <input className={field} placeholder="Street address" value={form.street} onChange={(e) => update('street', e.target.value)} />
                <div className="grid gap-4 sm:grid-cols-[1fr_110px_120px]">
                  <input className={field} placeholder="City" value={form.city} onChange={(e) => update('city', e.target.value)} />
                  <select className={field} value={form.state} onChange={(e) => update('state', e.target.value)}><option value="TX">TX</option></select>
                  <input className={field} placeholder="ZIP" inputMode="numeric" value={form.zip} onChange={(e) => update('zip', e.target.value)} />
                </div>
              </div>
            </>}

            {step === 2 && <>
              <p className="text-xs font-bold uppercase tracking-[.2em] text-[#d4af37]">Step 3</p>
              <h2 className="mt-2 text-2xl font-black sm:text-3xl">Pick what works for you.</h2>
              <p className="mt-2 text-sm text-white/45">Choose your preferred day and arrival window.</p>

              <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {dates.map((d) => (
                  <button key={d.value} type="button" onClick={() => update('date', d.value)} className={'rounded-2xl border p-4 text-left transition ' + (form.date === d.value ? 'border-[#d4af37] bg-[#d4af37] text-black' : 'border-white/10 bg-white/[.035] hover:border-[#d4af37]/50')}>
                    <div className="font-black">{d.label}</div>
                    <div className={'mt-1 text-sm ' + (form.date === d.value ? 'text-black/60' : 'text-white/45')}>{d.sub}</div>
                  </button>
                ))}
              </div>

              <label className="mt-4 block">
                <span className="text-xs text-white/40">Or choose another date</span>
                <input className={field + ' mt-2 [color-scheme:dark]'} type="date" min={dates[0].value} value={form.date} onChange={(e) => update('date', e.target.value)} />
              </label>

              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {WINDOWS.map(([label, time]) => (
                  <button key={time} type="button" onClick={() => update('time', time)} className={'rounded-2xl border p-4 text-left transition ' + (form.time === time ? 'border-[#d4af37] bg-[#d4af37] text-black' : 'border-white/10 bg-white/[.035] hover:border-[#d4af37]/50')}>
                    <div className="font-black">{label}</div>
                    <div className={'mt-1 text-xs ' + (form.time === time ? 'text-black/60' : 'text-white/45')}>{time}</div>
                  </button>
                ))}
              </div>
            </>}

            {step === 3 && <>
              <p className="text-xs font-bold uppercase tracking-[.2em] text-[#d4af37]">Step 4</p>
              <h2 className="mt-2 text-2xl font-black sm:text-3xl">One last look.</h2>
              <p className="mt-2 text-sm text-white/45">Nothing is charged today.</p>
              <div className="mt-7 space-y-3">
                <div className="rounded-2xl border border-white/10 bg-white/[.035] p-4">
                  <div className="text-xs uppercase tracking-wider text-white/35">Contact</div>
                  <div className="mt-1 font-bold">{form.name}</div>
                  <div className="text-sm text-white/55">{form.email} · {form.phone}</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[.035] p-4">
                  <div className="text-xs uppercase tracking-wider text-white/35">Pickup</div>
                  <div className="mt-1 font-bold">{form.street}</div>
                  <div className="text-sm text-white/55">{form.city}, {form.state} {form.zip}</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[.035] p-4">
                  <div className="text-xs uppercase tracking-wider text-white/35">Preferred time</div>
                  <div className="mt-1 font-bold">{form.date}</div>
                  <div className="text-sm text-white/55">{form.time}</div>
                </div>
              </div>
            </>}

            {error && <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</div>}

            <div className="mt-8 flex gap-3">
              {step > 0 && <button type="button" onClick={() => setStep((s) => Math.max(0, s - 1))} className="rounded-xl border border-white/15 px-5 py-3 font-bold text-white/75">Back</button>}
              {step < 3
                ? <button type="button" onClick={next} className="cta-metallic-button flex-1">Continue</button>
                : <button type="button" onClick={confirm} disabled={busy} className="cta-metallic-button flex-1 disabled:opacity-60">{busy ? 'Locking in pickup…' : 'Confirm Pickup'}</button>}
            </div>
          </section>

          <aside className="rounded-3xl border border-[#d4af37]/20 bg-gradient-to-b from-[#15120a] to-[#090909] p-5 lg:sticky lg:top-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black">Your pickup</h2>
              <Link to="/itemized" className="text-xs font-bold text-[#d4af37]">Edit items</Link>
            </div>
            <div className="mt-5 max-h-56 space-y-3 overflow-y-auto">
              {grouped.length ? grouped.map((item) => (
                <div key={item.name} className="flex justify-between gap-4 text-sm">
                  <span className="text-white/70">{item.qty > 1 && <b className="text-[#d4af37]">{item.qty}x </b>}{item.name}</span>
                  <span className="text-white/45">{'$'}{(item.price * item.qty).toFixed(2)}</span>
                </div>
              )) : <div className="text-sm text-white/40">No itemized items selected.</div>}
            </div>
            <div className="mt-5 border-t border-white/10 pt-5">
              <div className="text-xs uppercase tracking-wider text-white/35">Estimated total</div>
              <div className="mt-1 text-3xl font-black text-[#d4af37]">{'$'}{finalPrice.toFixed(2)}</div>
              <div className="mt-2 text-xs text-white/40">Pay after completion.</div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
