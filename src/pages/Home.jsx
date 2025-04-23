import React from 'react';

function Home() {
  return (
    <div className="bg-gradient-to-br from-white via-rose-50 to-white py-16 px-4">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-500 mb-6">
          Welcome to DesiBlogs
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mb-6">
          A vibrant space to express, connect, and grow. DesiBlogs is more than just a blog site—it's a community of Desi writers and readers who believe in the power of real stories, shared knowledge, and authentic experiences.
        </p>

        <div className="bg-white shadow-lg border border-rose-100 rounded-xl px-8 py-6 text-left w-full max-w-3xl">
          <h2 className="text-2xl font-semibold text-rose-600 mb-4">
            ✍️ Create your account and start writing blogs
          </h2>
          <p className="text-gray-700">
            Dive into your creativity. Whether you're sharing personal journeys, tech tips, travel stories, cultural insights, or poetry — DesiBlogs gives your voice a home.
          </p>
          <p className="mt-3 text-gray-700">
            Join a community that celebrates originality and diverse perspectives. It’s your time to write, inspire, and be heard.
          </p>
        </div>

        <div className="mt-10 text-sm text-gray-500">
          📌 Note: To view or create blogs, <span className="text-rose-500 font-medium">please register first</span>.
        </div>
      </div>
    </div>
  );
}

export default Home;
