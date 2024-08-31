import React, { useState } from 'react';
import { Link, Outlet, useMatchRoute } from "@tanstack/react-router";
import SideBar from "./SideBar";

const NavigationHeader = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const matchRoute = useMatchRoute();
  

  const toggleSideBar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <nav className="bg-gradient-to-r z-90 from-gray-600 flex flex-row justify-between mb-8 to-blue-900 p-4 border-b-2 shadow-xl border-blue border-solid">
        <div className="text-white text-2xl md:text-xl lg:text-2xl font-bold">
          <Link to="/" className="hover:text-gray-300">
            Google Book API
          </Link>
        </div>
        <div className="lg:flex hidden gap-8 justify-end">
          <Link
            to="/"
            className={`text-white px-4 py-2 rounded-md text-sm font-semibold transition hover:scale-105 duration-300 ${
              matchRoute("/")
                ? "bg-gray-400 text-blue-500"
                : "hover:bg-blue-500"
            }`}
          >
            Home
          </Link>
          <Link
            to="/hero"
            className={`text-white px-4 py-2 rounded-md text-sm font-semibold transition hover:scale-105 duration-300 ${
              matchRoute("/hero")
                ? "bg-gray-400 text-blue-700"
                : "hover:bg-blue-500"
            }`}
          >
            Favorites
          </Link>
          <Link
            to="/herorq"
            className={`text-white px-4 py-2 rounded-md text-sm font-semibold transition hover:scale-105 duration-300 ${
              matchRoute("/herorq")
                ? "bg-gray-400 text-blue-900"
                : "hover:bg-blue-500"
            }`}
          >
            HeroRq
          </Link>
          <Link
            to="/sign-up"
            className={`text-white px-4 py-2 rounded-md text-sm font-semibold transition hover:scale-105 duration-300 ${
              matchRoute("/sign-up")
                ? "bg-gray-400 text-blue-900"
                : "hover:bg-blue-500"
            }`}
          >
            Sign up
          </Link>
        </div>
        <button 
          className="lg:hidden text-white text-2xl" 
          onClick={toggleSideBar}
        >
          &#9776;
        </button>
        <SideBar isOpen={isSidebarOpen} toggleSideBar={toggleSideBar} />
      </nav>

      <Outlet />
    </>
  );
};

export default NavigationHeader;
