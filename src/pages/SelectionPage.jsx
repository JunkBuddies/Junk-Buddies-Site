// File: src/pages/SelectionPage.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';

function SelectionPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-black text-white min-h-screen flex flex-col justify-center items-center px-4">
      <h1 className="text-4xl text-gold font-bold mb-10 text-center">
        Choose Your Booking Method
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl">
        {/* Load Size Option */}
        <div
          onClick={() => navigate('/load-size')}
          className="cursor-pointer bg-gold text-black font-bold py-12 px-8 rounded-2xl text-center text-2xl 
          glow-button transition flex flex-col justify-center items-center shadow-lg hover:scale-105"
        >
          Load Size
        </div>

        {/* Itemized Option */}
        <div
          onClick={() => navigate('/itemized')}
          className="cursor-pointer bg-gold text-black font-bold py-12 px-8 rounded-2xl text-center text-2xl 
          glow-button transition flex flex-col justify-center items-center shadow-lg hover:scale-105"
        >
          Itemized
        </div>
      </div>
    </div>
  );
}

export default SelectionPage;
