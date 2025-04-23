import React from 'react';

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 to-white py-14 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-10 border border-rose-100">
        <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500 mb-8">
          About DesiBlogs
        </h1>

        <div className="space-y-6 text-gray-700 text-lg">
          <p className="flex items-start gap-2">
            <span className="text-rose-500 text-xl">📝</span>
            <span>
              <strong>DesiBlogs</strong> is your home for sharing thoughts, stories, ideas, and experiences with a Desi touch.
            </span>
          </p>

          <p className="flex items-start gap-2">
            <span className="text-rose-500 text-xl">🌍</span>
            <span>
              Whether you're into culture, travel, food, tech, or personal reflections — we welcome it all in one shared space.
            </span>
          </p>

          <p className="flex items-start gap-2">
            <span className="text-rose-500 text-xl">🔐</span>
            <span>
              <strong>Please register</strong> to view or create blogs and become part of our growing community.
            </span>
          </p>

          <p className="flex items-start gap-2">
            <span className="text-rose-500 text-xl">🤝</span>
            <span>
              Our goal is to provide a welcoming environment for writers and readers alike — real voices, real stories.
            </span>
          </p>
        </div>

        <div className="mt-10 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} DesiBlogs — Made with ❤️ for the Desi community.
        </div>
      </div>
    </div>
  );
}

export default About;
