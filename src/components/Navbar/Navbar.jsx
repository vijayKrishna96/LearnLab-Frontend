import React, { useEffect, useState } from "react";
import "../Navbar/Navbar.css";

import { SiAlchemy } from "react-icons/si";
import { FaSortDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import Login from "../../pages/Login";
import Sigup from "../../pages/Sigup";

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  let timer;

  const handleOpenLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleOpenSignUpModal = () => {
    setIsSignUpModalOpen(true);
  };

  const handleCloseSignUpModal = () => {
    setIsSignUpModalOpen(false);
  };

  const handleMouseEnter = () => {
    clearTimeout(timer);
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timer = setTimeout(() => setDropdownOpen(false), 200); // 200ms delay before hiding
  };

  const scrollToSection = () => {
    // Use the browser's native scroll to function
    const section = document.getElementById('courseSection');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <nav className="shadow-md">
        <div className="container mx-auto flex justify-between items-center py-4 ">
          <ul className="navbar-links flex gap-11 items-center">
            <li className="navbar-logo text-3xl text-[#00EACE]">
              <Link to="/">
                <SiAlchemy />
              </Link>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li
              className="navbar-dropdown flex"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex">
                <Link onClick={scrollToSection}>Courses</Link>
              </div>
            </li>
            <li>
              <Link to="/contact">About Us</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
          <div className="Login flex gap-5">
            <button className="px-3 py-1" onClick={handleOpenSignUpModal}>
              Signup
            </button>
            <button
              className="bg-[#00EACE] px-3 py-1 rounded-md"
              onClick={handleOpenLoginModal}
            >
              Login
            </button>
          </div>
        </div>
      </nav>
      {isLoginModalOpen && (
        <Login isOpen={isLoginModalOpen} onClose={handleCloseLoginModal} />
      )}
      {isSignUpModalOpen && (
        <Sigup isOpen={isSignUpModalOpen} onClose={handleCloseSignUpModal} />
      )}
    </>
  );
}

export default Navbar;
