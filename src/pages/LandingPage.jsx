// File: src/pages/LandingPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="relative bg-black text-white min-h-screen flex flex-col justify-center items-center text-center px-4">
      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>

      {/* Motto */}
      <div className="relative z-10 mt-20">
        <h1 className="text-6xl font-bold text-gold mb-4">Junk Buddies</h1>
        <p className="text-2xl font-bold">Making Space For What Matters</p>
      </div>

      {/* CTA */}
      <div className="relative z-10 mt-8">
        <button
          onClick={() => navigate('/selection')}
          className="bg-gold text-black font-bold py-3 px-6 rounded-xl hover:bg-yellow-400 transition"
        >
          Get Started
        </button>
      </div>

      {/* Other sections */}
      <div className="relative z-10 mt-20 max-w-4xl">
        <h2 className="text-3xl text-gold font-bold mb-4">How It Works</h2>
        <ol className="space-y-2 text-left">
          <li>1️⃣ Choose your load size or itemized items.</li>
          <li>2️⃣ Schedule your pickup at your convenience.</li>
          <li>3️⃣ We arrive and clear your junk fast!</li>
        </ol>

        <h2 className="text-3xl text-gold font-bold mt-12 mb-4">About Us</h2>
        <p>
          We’re a dedicated junk removal team serving Houston and surrounding areas with reliability,
          speed, and friendly service. Our mission is to help you make space for what matters most.
        </p>

        <h2 className="text-3xl text-gold font-bold mt-12 mb-4">Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white text-black p-4 rounded-xl shadow">
            <p>"They were quick, friendly, and cleaned everything perfectly. Highly recommend!"</p>
            <span>- Alex R.</span>
          </div>
          <div className="bg-white text-black p-4 rounded-xl shadow">
            <p>"Excellent service and easy scheduling. They really came through for us."</p>
            <span>- Jamie L.</span>
          </div>
        </div>

        {/* Image placeholders */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          <div className="bg-gray-300 rounded-full w-full h-32"></div>
          <div className="bg-gray-300 rounded-full w-full h-32"></div>
          <div className="bg-gray-300 rounded-full w-full h-32"></div>
          <div className="bg-gray-300 rounded-full w-full h-32"></div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;// LandingPage.jsx - responsive with video, CTAs, testimonials
