import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

function SingleBlog() {
  const blogs = useSelector((state) => state.data.blogs);
  const { id } = useParams();
  const [blog, setBlog] = useState({});
const navigate=useNavigate()
  useEffect(() => {
    const findBlog = blogs?.filter((blog) => blog._id === id);
    setBlog(findBlog[0]);
  }, [id, blogs]);

  if (Object.keys(blog).length > 0) {
    return (
      <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
       <div className="mb-4">
          <button
            onClick={() => navigate('/blogs')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
          >
            ← Back to Blogs
          </button>
        </div>
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
          <img
            src={blog.image?.url}
            alt={blog.title}
            className="w-full h-72 object-cover"
          />
          <div className="p-6">
            <h1 className="text-3xl font-bold text-blue-700 mb-4">{blog.title}</h1>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">{blog.content}</p>

            <div className="space-y-2">
              <div className="text-sm text-gray-600 font-medium">
                Category:
                <span className="ml-1 capitalize text-gray-800">{blog.category}</span>
              </div>
              <div className="text-sm text-gray-600">
                Created At:
                <span className="ml-1 font-medium text-gray-800">
                  {new Date(blog.createdAt).toLocaleDateString('en-US', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                  })}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                Updated At:
                <span className="ml-1 font-medium text-gray-800">
                  {new Date(blog.updatedAt).toLocaleDateString('en-US', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <h1 className="text-xl text-red-600 font-semibold">No blog found</h1>
    </div>
  );
}

export default SingleBlog;
