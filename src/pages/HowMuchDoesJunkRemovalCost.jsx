import React from 'react';

function HowMuchDoesJunkRemovalCost() {
  return (
    <div className="bg-black text-white min-h-screen px-6 py-10 max-w-4xl mx-auto">
      <h1 className="text-3xl md:text-4xl text-gold font-bold mb-6">
        How Much Does Junk Removal Cost in Houston? (2025 No-BS Breakdown)
      </h1>

      <p className="text-lg text-gray-300 mb-6">
        Let’s be real — junk removal pricing is all over the place. Some companies give you a fake quote just to get in the door. Others show up with tiny trucks and then hit you with surprise fees.
        <br /><br />
        Not us. We’re <span className="text-gold font-semibold">Junk Buddies</span>. We show up with <strong>big trucks, better energy, and honest prices</strong> — every time.
      </p>

      <h2 className="text-2xl text-gold font-semibold mt-10 mb-4">💸 Average Junk Removal Prices in Houston</h2>
      <p className="text-gray-300 mb-4">
        Here’s a rough breakdown of what you’ll pay with most companies in 2025:
      </p>

      <table className="w-full text-left text-gray-300 border border-gold mb-6">
        <thead>
          <tr className="bg-gold text-black">
            <th className="p-2">Service Type</th>
            <th className="p-2">Typical Price Range</th>
          </tr>
        </thead>
        <tbody>
          <tr><td className="p-2 border-t border-gold">¼ Load</td><td className="p-2 border-t border-gold">$100 – $250</td></tr>
          <tr><td className="p-2 border-t border-gold">½ Load</td><td className="p-2 border-t border-gold">$300 – $500</td></tr>
          <tr><td className="p-2 border-t border-gold">Full Load</td><td className="p-2 border-t border-gold">$600 – $1,200+</td></tr>
          <tr><td className="p-2 border-t border-gold">Single Items</td><td className="p-2 border-t border-gold">$75 – $150</td></tr>
        </tbody>
      </table>

      <h2 className="text-2xl text-gold font-semibold mt-10 mb-4">🚛 Why Junk Buddies is a Better Deal</h2>
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
        <li><span className="text-gold font-semibold">Bigger trucks</span> mean more room for less money</li>
        <li><span className="text-gold font-semibold">Flat-rate $1,000 cap</span> on full loads — no surprises</li>
        <li>Choose <span className="text-gold font-semibold">load size or itemized pricing</span> — whichever saves you more</li>
        <li><span className="text-gold font-semibold">No upfront payment</span>. Pay when the job is done.</li>
      </ul>

      <h2 className="text-2xl text-gold font-semibold mt-10 mb-4">🆚 Compare Us to the Big Guys</h2>

      <table className="w-full text-left text-gray-300 border border-gold mb-6">
        <thead>
          <tr className="bg-gold text-black">
            <th className="p-2">Company</th>
            <th className="p-2">Base Rate</th>
            <th className="p-2">Full Load Price</th>
            <th className="p-2">Truck Size</th>
            <th className="p-2">Hidden Fees?</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2 border-t border-gold">Junk Buddies</td>
            <td className="p-2 border-t border-gold">$100</td>
            <td className="p-2 border-t border-gold">$1,000 Max</td>
            <td className="p-2 border-t border-gold">✅ Big Truck</td>
            <td className="p-2 border-t border-gold">❌ Never</td>
          </tr>
          <tr>
            <td className="p-2 border-t border-gold">1-800-GOT-JUNK</td>
            <td className="p-2 border-t border-gold">$139+</td>
            <td className="p-2 border-t border-gold">$700–$1,200+</td>
            <td className="p-2 border-t border-gold">❌ Smaller Truck</td>
            <td className="p-2 border-t border-gold">✅ Often</td>
          </tr>
          <tr>
            <td className="p-2 border-t border-gold">LoadUp</td>
            <td className="p-2 border-t border-gold">$75+</td>
            <td className="p-2 border-t border-gold">$800–$1,100+</td>
            <td className="p-2 border-t border-gold">❓ Varies</td>
            <td className="p-2 border-t border-gold">✅ Sometimes</td>
          </tr>
        </tbody>
      </table>

      <h2 className="text-2xl text-gold font-semibold mt-10 mb-4">🕒 When to Book</h2>
      <p className="text-gray-300 mb-6">
        Need a pickup today or tomorrow? We offer <span className="text-gold font-semibold">same-day and next-day options</span> in most parts of Houston.
        <br />
        Booking ahead? No problem. Weekend spots fill fast, so hit us early if you can.
      </p>

      <h2 className="text-2xl text-gold font-semibold mt-10 mb-4">📍 Service Areas</h2>
      <p className="text-gray-300 mb-6">
        We haul across the entire Houston metro: River Oaks (77019), Galleria (77056), Downtown (77002), Heights (77007), Memorial (77024), and beyond.
      </p>

      <h2 className="text-2xl text-gold font-semibold mt-10 mb-4">💥 Final Word</h2>
      <p className="text-gray-300 mb-8">
        Don’t gamble on price. Don’t waste your weekend hauling stuff yourself. Let Junk Buddies make space for what matters — with zero stress.
      </p>

      <div className="text-center mt-10">
        <a
          href="/selection"
          className="inline-block bg-gold text-black font-bold py-3 px-6 rounded-xl shadow-md hover:scale-105 transition-transform"
        >
          Get Instant Pricing → Book in 60 Seconds
        </a>
      </div>
    </div>
  );
}

export default HowMuchDoesJunkRemovalCost;
