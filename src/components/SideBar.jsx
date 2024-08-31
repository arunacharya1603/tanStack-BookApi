import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaGift, FaHandsHelping } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { FiLogOut } from "react-icons/fi";
import { Link, useMatchRoute } from "@tanstack/react-router";

const SideBar = ({ isOpen, toggleSideBar }) => {
  const matchRoute = useMatchRoute();

  const handleClick = () => {
    // Close the sidebar when a link is clicked
    toggleSideBar();
  };

  return (
    <div
      className={`fixed lg:hidden top-0 left-0 h-full bg-gray-800 shadow-lg transform transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 duration-300 ease-in-out z-40 w-64`}
      >
      <div className="p-6 bg-gray-900 text-white">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Menu</h2>
          <button onClick={toggleSideBar}>
            <AiOutlineClose className="text-2xl" />
          </button>
        </div>
        <hr className="w-full border shadow-sm" />

        {/* Menu Items */}
        <div className="mt-4">
          <ul className="space-y-4">
            <Link
              to="/"
              onClick={handleClick}
              className={`flex items-center px-4 py-2 rounded-md text-white font-semibold transition duration-300 ${
                  matchRoute("/")
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "hover:bg-blue-500"
                }`}
            >
              Home
            </Link>

            <Link
              to="/hero"
              onClick={handleClick}
              className={`flex items-center px-4 py-2 rounded-md text-white font-semibold transition duration-300 ${
                  matchRoute("/")
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "hover:bg-blue-500"
                }`}
            >
             <FaGift className="mr-2" /> Favorites
            </Link>
            <Link
              to="/herorq"
              onClick={handleClick}
              className={`flex items-center px-4 py-2 rounded-md text-white font-semibold transition duration-300 ${
                  matchRoute("/")
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "hover:bg-blue-500"
                }`}
            >
              <CiHeart className="mr-2" /> HeroRq
            </Link>
            <Link
              to="/sign-up"
              onClick={handleClick}
              className={`flex items-center px-4 py-2 rounded-md text-white font-semibold transition duration-300 ${
                  matchRoute("/")
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "hover:bg-blue-500"
                }`}
            >
              <FiLogOut className="mr-2" /> Sign up
            </Link>
          </ul>
        </div>

        {/* Blog Link */}
        <hr className='w-full mt-8 border-gray-600' />
      </div>
    </div>
  );
};

export default SideBar;
