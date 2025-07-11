import React from 'react';
import { Link } from 'react-router-dom';

const Houston = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-12">
      {/* Main Title */}
      <h1 className="text-4xl text-gold font-bold text-center mb-10">
        Junk Removal in Houston, TX
      </h1>

      {/* Intro Paragraph */}
      <p className="text-lg max-w-4xl mx-auto mb-8 text-gray-300 text-center">
        Need junk removal in Houston? <strong>Junk Buddies</strong> brings fast, full-service junk pickup to every corner of the city — from Midtown to The Heights, Galleria, and beyond. Get <span className="text-gold font-semibold">instant pricing</span>, same-day service, and a trusted local team that’s got your back.
      </p>

      {/* Google Map Embed */}
      <div className="mt-10 max-w-4xl mx-auto">
  <h2 className="text-2xl text-gold font-bold mb-4 text-center">Serving All of Houston</h2>
  <iframe
    className="w-full h-[350px] rounded-md shadow-md"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d443004.1876612651!2d-95.7908319326249!3d29.8362814736436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640b8b4488d8501%3A0xca0d02def365053b!2sHouston%2C%20TX!5e0!3m2!1sen!2sus!4v1752277075315!5m2!1sen!2sus"
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  />
</div>


      {/* Why Houston Trusts Junk Buddies */}
      <div className="bg-gray-800 border border-gold rounded-xl shadow-lg p-6 mb-10 max-w-4xl mx-auto text-center">
        <h2 className="text-2xl text-gold font-bold mb-4">Why Houston Trusts Junk Buddies</h2>
        <ul className="grid sm:grid-cols-2 gap-4 text-gray-300 text-left list-disc list-inside">
          <li>✅ 16ft trucks – 30% more space than competitors</li>
          <li>✅ Transparent upfront pricing</li>
          <li>✅ Houston-based crew, born and raised</li>
          <li>✅ Fully licensed, insured, background-checked</li>
          <li>✅ Same-day and next-day service</li>
          <li>✅ Easy online booking in seconds</li>
        </ul>
      </div>

      {/* Call-to-Action */}
      <div className="text-center">
        <Link
          to="/selection"
          className="cta-metallic-button inline-block mt-4 mb-10"
        >
          Get Instant Pricing
        </Link>
      </div>

      {/* Neighborhoods Section */}
      <section className="text-center max-w-5xl mx-auto mb-14">
        <h3 className="text-2xl text-gold font-bold mb-4">We Serve Every Neighborhood in Houston</h3>
        <p className="text-gray-300 text-lg">
          From Downtown to Kingwood, Montrose to Westchase — we’ve got Houston covered:
        </p>
        <div className="flex flex-wrap justify-center gap-3 mt-4 text-sm text-white">
          {[
            'The Heights', 'Midtown', 'Galleria', 'River Oaks', 'Montrose',
            'Memorial', 'Spring Branch', 'Westchase', 'EaDo', 'Museum District',
            'Sharpstown', 'Greenspoint', 'Kingwood', 'West University', 'Bellaire'
          ].map((hood) => (
            <span
              key={hood}
              className="bg-black/30 border border-gold rounded-full px-4 py-1"
            >
              {hood}
            </span>
          ))}
        </div>
      </section>

      {/* Image Grid */}
      <section className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {[
          { src: '/images/couch-carrying.png', alt: 'Crew lifting couch' },
          { src: '/images/team-sunset.png', alt: 'Crew sunset shot' },
          { src: '/images/truck-fleet.png', alt: 'Fleet of trucks' },
          { src: '/images/demolition-crew.png', alt: 'Demolition work' }
        ].map((img, i) => (
          <img
            key={i}
            src={img.src}
            alt={img.alt}
            className="w-full h-36 object-cover rounded-full border-4 border-gold hover:scale-105 transition-transform"
          />
        ))}
      </section>

      {/* Testimonials Marquee */}
      <section className="w-full bg-gray-800 py-10 px-4 rounded-xl shadow-inner border border-gold mb-16">
        <h3 className="text-2xl text-gold font-bold text-center mb-6">What Houstonians Are Saying</h3>
        <div className="overflow-hidden whitespace-nowrap">
          <div className="animate-marquee flex space-x-6 text-sm text-white">
            {[
              '⭐⭐⭐⭐⭐ “Garage cleanout done in 45 min – amazing!”',
              '⭐⭐⭐⭐⭐ “No hassle, just honest pricing and great work.”',
              '⭐⭐⭐⭐⭐ “Best crew I’ve worked with in Houston!”',
              '⭐⭐⭐⭐⭐ “Same-day pickup and super professional.”',
              '⭐⭐⭐⭐⭐ “On time, fast, clean. Definitely calling again.”',
              '⭐⭐⭐⭐⭐ “Easiest junk removal I’ve ever booked.”'
            ].map((review, i) => (
              <div key={i} className="silver-badge shrink-0">
                {review}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Crawlable Zip Codes (hidden but indexed) */}
      <div className="sr-only">
        Serving zip codes: 77002, 77003, 77004, 77005, 77006, 77007, 77008, 77009, 77010, 77019, 77098,
        77024, 77027, 77042, 77043, 77055, 77056, 77057, 77063, 77077, 77079, 77080, 77081, 77082, 77083, 77084, 77094,
        77014, 77018, 77022, 77037, 77038, 77040, 77064, 77065, 77066, 77067, 77068, 77069, 77070, 77086, 77088, 77090, 77091, 77092, 77093, 77095,
        77011, 77012, 77013, 77015, 77016, 77017, 77020, 77021, 77023, 77029, 77033, 77034, 77047, 77048, 77049, 77050, 77051, 77061, 77075, 77087, 77089,
        77031, 77035, 77036, 77045, 77053, 77071, 77072, 77085, 77096, 77099
      </div>

      {/* Footer Internal Links */}
      <div className="text-center text-sm mt-8 border-t border-gold pt-6 text-gray-400">
        <Link to="/blog" className="text-gold hover:underline block mb-1">
          📝 Read Our Blog
        </Link>
        <Link to="/faq" className="text-gold hover:underline block mb-1">
          📌 Frequently Asked Questions
        </Link>
        <Link to="/service-areas" className="text-gold hover:underline block">
          📍 View All Cities We Serve
        </Link>
      </div>
    </div>
  );
};

export default Houston;
