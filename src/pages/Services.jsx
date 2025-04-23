import React from 'react';

function Services() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-rose-600 mb-8">Our Blog Services</h1>

      <div className="space-y-6">
        <div className="bg-white shadow-sm rounded-lg p-6 border">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">✍️ Blog Writing Help</h2>
          <p className="text-sm text-gray-600">Get writing tips, prompts, and AI tools to improve your posts.</p>
        </div>

        <div className="bg-white shadow-sm rounded-lg p-6 border">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">🎨 Custom Themes</h2>
          <p className="text-sm text-gray-600">Explore clean and modern blog templates you can use for free.</p>
        </div>


        <div className="bg-white shadow-sm rounded-lg p-6 border">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">🗓️ Content Planning</h2>
          <p className="text-sm text-gray-600">Access ready-made content calendars to stay consistent.</p>
        </div>

        <div className="bg-white shadow-sm rounded-lg p-6 border">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">🤝 Community Collaboration</h2>
          <p className="text-sm text-gray-600">Connect and collaborate with other Desi bloggers in your niche.</p>
        </div>
      </div>
    </div>
  );
}

export default Services;
