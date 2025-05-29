import React from 'react';
import { Link } from 'react-router-dom';

function BlogPage() {
  return (
    <div className="bg-black text-white min-h-screen px-6 py-10 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-gold mb-4">Junk Buddies Blog</h1>
      <p className="text-lg text-gray-300 mb-10">
        Real advice from local pros. No fluff. No corporate-speak. Just solid info on junk removal in Houston — and how to save time, money, and space.
      </p>

      <div className="space-y-10">
        {/* Blog Post Preview #1 */}
        <div className="border border-gold p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
          <Link to="/blog/how-much-does-junk-removal-cost" className="text-2xl text-gold font-bold hover:underline">
            How Much Does Junk Removal Cost in Houston? (2025 No-BS Breakdown)
          </Link>
          <p className="text-gray-300 mt-3">
            Most companies hide their prices. We don’t. See what junk removal really costs in Houston — and how to avoid getting ripped off.
          </p>
          <Link
            to="/blog/how-much-does-junk-removal-cost"
            className="inline-block mt-4 text-sm text-gold hover:underline"
          >
            Read More →
          </Link>
        </div>

        {/* Placeholder for future posts */}
        {/* 
        <div>
          <Link to="/blog/next-post-slug" className="text-xl text-gold font-semibold hover:underline">
            Future Blog Title
          </Link>
          <p className="text-gray-400 mt-2">Short preview text for future post...</p>
        </div>
        */}
      </div>
    </div>
  );
}

export default BlogPage;
