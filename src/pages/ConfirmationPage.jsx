// File: src/pages/ConfirmationPage.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFacebookSquare, FaInstagram, FaTiktok } from 'react-icons/fa';

function ConfirmationPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-black min-h-screen text-white flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl text-gold font-bold mb-4">Thank You!</h1>
      <p className="text-lg max-w-md mb-6">
        Your junk removal booking has been confirmed. A confirmation email has been sent to your inbox.
      </p>

      {/* Social Media Icons */}
      <div className="flex gap-6 mb-8">
        <a
          href="https://facebook.com/JunkBuddies.info"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gold text-black rounded-full p-3 hover:bg-yellow-400 transition"
        >
          <FaFacebookSquare size={32} />
        </a>
        <a
          href="https://instagram.com/JunkBuddies.info"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gold text-black rounded-full p-3 hover:bg-yellow-400 transition"
        >
          <FaInstagram size={32} />
        </a>
        <a
          href="https://tiktok.com/@JunkBuddies.info"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gold text-black rounded-full p-3 hover:bg-yellow-400 transition"
        >
          <FaTiktok size={32} />
        </a>
      </div>

      <button
        className="bg-gold text-black font-bold py-3 px-6 rounded-xl hover:bg-yellow-400 transition"
        onClick={() => navigate('/')}
      >
        Back to Home
      </button>
    </div>
  );
}

export default ConfirmationPage;// ConfirmationPage.jsx - thank you + responsive social links
