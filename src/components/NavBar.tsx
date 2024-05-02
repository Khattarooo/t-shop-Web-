import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetAuthState } from "@/Redux/slices/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleNewsClick = () => {
    navigate("/productNews");
  };

  const handleLogout = () => {
    dispatch(resetAuthState());
    navigate("/");
  };

  return (
    <nav className="top-0 left-0 mt-4 fixed right-0 bg-gradient-to-r from-green-600 to-lime-600 text-white py-2 px-4 flex items-center justify-between  mx-6 rounded-xl shadow-lg shadow-gray-400">
      <div
        className="font-semibold cursor-pointer text-sm sm:text-xl md:text-2xl lg:text-3xl  hover:text-lime-300 "
        onClick={handleHomeClick}
      >
        T-Shop
      </div>
      <div className="space-x-2">
        <button
          onClick={handleHomeClick}
          className="px-4 py-3 text-white rounded-xl hover:text-white hover:bg-green-900 "
        >
          Home
        </button>
        <button
          onClick={handleNewsClick}
          className="px-4 py-3 text-white rounded-xl hover:text-white hover:bg-green-900"
        >
          News
        </button>
        <button
          onClick={handleLogout}
          className="px-4 py-3 text-white rounded-xl hover:text-white hover:bg-green-900"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
