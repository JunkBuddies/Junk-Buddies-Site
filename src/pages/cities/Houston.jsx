import React from 'react'; import { Link } from 'react-router-dom';

const Houston = () => { return ( <div className="min-h-screen bg-gray-900 text-white px-6 py-12"> <h1 className="text-4xl text-gold font-bold text-center mb-10"> Junk Removal in Houston, TX </h1>

<p className="text-lg max-w-4xl mx-auto mb-8 text-gray-300">
    Looking for junk removal in Houston? <strong>Junk Buddies</strong> offers full-service, same-day junk removal across all neighborhoods in Houston, Texas. Whether you're cleaning out a garage, remodeling a home, or clearing commercial property — we’ve got the muscle, trucks, and speed to handle it all. You’ll get <span className="text-gold font-semibold">instant pricing</span>, professional crew members, and zero hidden fees.
  </p>

  <div className="bg-gray-800 border border-gold rounded-xl shadow-lg p-6 mb-10 max-w-4xl mx-auto">
    <h2 className="text-2xl text-gold font-bold mb-4">Why Choose Junk Buddies in Houston?</h2>
    <ul className="list-disc list-inside text-gray-300 space-y-2">
      <li>✅ 16ft trucks — 30% more space than competitors</li>
      <li>✅ Transparent pricing, no surprises</li>
      <li>✅ Local team based in Houston</li>
      <li>✅ Fully licensed, insured, and background-checked</li>
      <li>✅ Same-day or next-day service available</li>
    </ul>
  </div>

  <div className="text-center">
    <Link
      to="/selection"
      className="cta-metallic-button inline-block mt-4 mb-10"
    >
      Get Instant Pricing
    </Link>
  </div>

  <div className="sr-only">
    Serving the following Houston zip codes:
    77002, 77003, 77004, 77005, 77006, 77007, 77008, 77009, 77010, 77019, 77098,
    77024, 77027, 77042, 77043, 77055, 77056, 77057, 77063, 77077, 77079, 77080, 77081, 77082, 77083, 77084, 77094,
    77014, 77018, 77022, 77037, 77038, 77040, 77064, 77065, 77066, 77067, 77068, 77069, 77070, 77086, 77088, 77090, 77091, 77092, 77093, 77095,
    77011, 77012, 77013, 77015, 77016, 77017, 77020, 77021, 77023, 77029, 77033, 77034, 77047, 77048, 77049, 77050, 77051, 77061, 77075, 77087, 77089,
    77031, 77035, 77036, 77045, 77053, 77071, 77072, 77085, 77096, 77099
  </div>
</div>

); };

export default Houston;

