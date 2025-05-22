// File: src/pages/SelectionPage.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Sofa } from 'lucide-react';

function SelectionPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-black text-white min-h-screen flex flex-col justify-center items-center px-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl text-gold font-bold mb-3">
          What Are You Getting Rid Of?
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl">
        {/* Load Size Option */}
        <div
          onClick={() => navigate('/load-size')}
          className="cursor-pointer button-glow text-center text-2xl flex flex-col items-center py-6"
        >
          <Trash2 className="w-10 h-10 mb-2 text-white" />
          <span>Load Size</span>
          <p className="text-sm text-gray-300 mt-2">
            Choose <span className="text-gold font-semibold">‘Load Size’</span> for piles or large cleanouts.
          </p>
        </div>

        {/* Itemized Option */}
        <div
          onClick={() => navigate('/itemized')}
          className="cursor-pointer button-glow text-center text-2xl flex flex-col items-center py-6"
        >
          <Sofa className="w-10 h-10 mb-2 text-white" />
          <span>Itemized</span>
          <p className="text-sm text-gray-300 mt-2">
            Choose <span className="text-gold font-semibold">‘Itemized’</span> for specific furniture or appliances.
          </p>
        </div>
      </div>
    </div>
  );
}

export default SelectionPage;
