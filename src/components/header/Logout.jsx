import React from 'react';
import { useDispatch } from "react-redux";
import { logout } from '../../app/feature/authSlice/authSlice';
import { useNavigate } from 'react-router-dom';
import { removeBlogs } from '../../app/feature/dataSlice/dataSlice';

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function logoutUser() {
    dispatch(logout());
    dispatch(removeBlogs());
    localStorage.removeItem("x-auth-token")
    navigate("/login");
  }

  return (
    <button
      onClick={logoutUser}
      className="ml-4 px-4 py-2 rounded-md bg-rose-600 text-white hover:bg-rose-700 transition"
    >
      Logout
    </button>
  );
}

export default Logout;
