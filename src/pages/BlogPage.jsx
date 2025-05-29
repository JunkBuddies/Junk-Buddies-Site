import React from 'react';
import { Link } from 'react-router-dom';

function BlogPage() {
  return (
    <div className="bg-black text-white min-h-screen px-6 py-10 max-w-5xl mx-auto">
      <h1 className="text-4xl text-gold font-bold mb-8">Junk Buddies Blog</h1>

      <div className="space-y-6">
        <div>
          <Link to="/blog/how-much-does-junk-removal-cost" className="text-2xl text-gold hover:underline font-semibold">
            How Much Does Junk Removal Cost in Houston? (2025 Guide)
          </Link>
          <p className="text-gray-300 mt-2">Our honest breakdown of what junk removal really costs in Houston. No fluff, no hidden fees.</p>
        </div>

        {/* Add more blog links here manually for now */}
      </div>
    </div>
  );
}

export default BlogPage;
