import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const isActive = (path) => location.pathname === path ? "border-b-2 border-yellow-300" : "";
  return (
    <header className="bg-gradient-to-r from-[#f06a6a] to-[#c9426b] text-white font-bold tracking-widest text-lg">
      <div className="flex justify-between items-center py-4 md:px-8 lg:px-16">
        <h1 className="text-xl md:text-2xl mx-4 md:mx-0">Logo</h1>

        {/* Hamburger Menu Icon */}
        <button
          onClick={toggleMenu}
          className="text-white md:hidden focus:outline-none mx-4"
          aria-label="Toggle menu"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>

        {/* Menu Items with sliding transition */}
        <nav
          className={`${
            menuOpen ? "max-h-96" : "max-h-0"
          } transition-all duration-500 ease-in-out overflow-hidden md:overflow-visible flex-col md:flex md:flex-row md:gap-8 lg:gap-20 absolute md:relative top-16 md:top-0 w-full md:w-auto bg-gradient-to-r from-[#f06a6a] to-[#c9426b] md:bg-transparent md:justify-center z-10`}
        >
          <ul className="flex flex-col md:flex-row gap-4 items-center md:gap-8 py-4 md:py-0">
            <li className={`menu-item ${isActive("/home/dashboard")}`}>
              <Link to="/home/dashboard">Home</Link>
            </li>
            <li className={`menu-item ${isActive("/home/summary")}`}>
              <Link to="/home/summary">Summary</Link>
            </li>
            <li className={`menu-item ${isActive("/home/graph")}`}>
              <Link to="/home/graph">Graph</Link>
            </li>
            <li className={`menu-item ${isActive("/home/about")}`}>
              <Link to="/home/about">About Us</Link>
            </li>
            <li className={`menu-item ${isActive("/home/total-bills")}`}>
              <Link to="/home/total-bills">Bills</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
