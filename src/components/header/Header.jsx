import React from 'react';
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Logout from './Logout';

function Header() {
  const isAuth = useSelector((state) => state.auth.status);
  const user = useSelector((state) => state.auth.user);

  const nav = [
    { name: "Home", slug: "/", isAuth: true },
    { name: "About", slug: "/about", isAuth: true },
    { name: "Services", slug: "/services", isAuth: true },
    { name: "Blogs", slug: "/blogs", isAuth: isAuth },
    { name: "Signin", slug: "/login", isAuth: !isAuth },
    { name: "Register", slug: "/register", isAuth: !isAuth },
  ];

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold text-rose-600">DesiBlogs</h1>

        <div className="flex flex-wrap gap-3">
          {nav.map((item, idx) =>
            item.isAuth ? (
              <NavLink
                key={idx}
                to={item.slug}
                className={({ isActive }) =>
                  `${isActive
                    ? "text-rose-600 font-semibold"
                    : "text-gray-600 hover:text-rose-600"} px-2 py-1 transition`
                }
              >
                {item.name}
              </NavLink>
            ) : null
          )}

          {isAuth && user && (
            <NavLink
              to={`/${user.userId}`}
              className={({ isActive }) =>
                `${isActive
                  ? "text-rose-600 font-semibold"
                  : "text-gray-600 hover:text-rose-600"} px-2 py-1 transition`
              }
            >
              Profile
            </NavLink>
          )}

          {isAuth && <Logout />}
        </div>
      </nav>
    </header>
  );
}

export default Header;
