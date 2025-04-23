import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-100 text-center py-6 border-t border-gray-200">
      <p className="text-gray-600 text-sm">
        &copy; {new Date().getFullYear()} DesiBlogs. All rights reserved.
      </p>
      <p className="text-gray-400 text-xs mt-1">
        Made with ❤️ for the Desi community
      </p>
    </footer>
  );
}

export default Footer;
