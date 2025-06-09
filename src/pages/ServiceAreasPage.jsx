// File: src/pages/ServiceAreasPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const cities = [
  { name: 'Houston, TX', slug: 'junk-removal-houston-tx' },
  { name: 'Katy, TX', slug: 'junk-removal-katy-tx' },
  { name: 'Pearland, TX', slug: 'junk-removal-pearland-tx' },
  { name: 'Sugar Land, TX', slug: 'junk-removal-sugar-land-tx' },
  { name: 'The Woodlands, TX', slug: 'junk-removal-the-woodlands-tx' },
  { name: 'Spring, TX', slug: 'junk-removal-spring-tx' },
  { name: 'Cypress, TX', slug: 'junk-removal-cypress-tx' },
  { name: 'Baytown, TX', slug: 'junk-removal-baytown-tx' },
  { name: 'Pasadena, TX', slug: 'junk-removal-pasadena-tx' },
  { name: 'Conroe, TX', slug: 'junk-removal-conroe-tx' },
];

function ServiceAreasPage() {
  return (
    <div className="bg-black text-white min-h-screen p-6">
      <h1 className="text-3xl font-bold text-gold text-center mb-8">
        Cities We Serve
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {cities.map((city, index) => (
          <Link
            key={index}
            to={`/${city.slug}`}
            className="bg-gray-900 hover:bg-gray-800 border border-gold text-center p-6 rounded-xl transition-transform hover:scale-105 shadow-lg"
          >
            <p className="text-xl font-semibold text-gold">{city.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ServiceAreasPage;
