// File: src/pages/SelectionPage.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';

function SelectionPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-black text-white min-h-screen flex flex-col justify-center items-center px-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl text-gold font-bold mb-3">
          What Are You Getting Rid Of?
        </h1>
        <p className="text-lg text-gray-300">
          Choose <span className="text-gold font-semibold">‘Bulk Load Size’</span> for piles or large cleanouts.<br />
          Choose <span className="text-gold font-semibold">‘Itemized’</span> for specific furniture or appliances.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl">
        {/* Load Size Option */}
        <div className="text-center text-yellow-400 text-sm font-semibold mb-1">
          Best for Cleanouts & Piles
        </div>
        <div className="text-center text-yellow-400 text-sm font-semibold mb-1 md:col-start-2">
          Best for Specific Items
        </div>

        <div
          onClick={() => navigate('/load-size')}
          className="cursor-pointer button-glow text-center text-2xl flex flex-col justify-center items-center"
        >
          Load Size
        </div>

        <div
          onClick={() => navigate('/itemized')}
          className="cursor-pointer button-glow text-center text-2xl flex flex-col justify-center items-center"
        >
          Itemized
        </div>
      </div>
    </div>
  );
}

export default SelectionPage;
