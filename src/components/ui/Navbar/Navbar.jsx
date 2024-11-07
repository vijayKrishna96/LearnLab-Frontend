import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { SiAlchemy } from "react-icons/si";
import { Link } from "react-router-dom";
import Login from "../../../pages/common/Login";
import Signup from "../../../pages/common/Signup";
import DarkMode from "../DarkMode";

function Navbar() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleOpenLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsSignUpModalOpen(false); // Close signup when opening login
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleOpenSignUpModal = () => {
    setIsSignUpModalOpen(true);
    setIsLoginModalOpen(false); // Close login when opening signup
  };

  const handleCloseSignUpModal = () => {
    setIsSignUpModalOpen(false);
  };

  const handleSignupSuccess = () => {
    setIsSignUpModalOpen(false);
    setIsLoginModalOpen(true);
  };

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const scrollToSection = () => {
    const section = document.getElementById("courseSection");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav className="shadow-md">
        <div className="container mx-auto flex justify-between items-center py-4">
          <ul className="navbar-links flex gap-11 items-center">
            <li className="navbar-logo text-3xl text-primarybtn">
              <Link to="/">
                <SiAlchemy />
              </Link>
            </li>
            <li className="hidden md:block">
              <Link to="/">Home</Link>
            </li>
            <li className="hidden md:block">
              <Link onClick={scrollToSection}>Courses</Link>
            </li>
            <li className="hidden md:block">
              <Link to="/about">About Us</Link>
            </li>
            <li className="hidden md:block">
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
          <div className="flex gap-5">
            <div className="flex items-center border-dashed border-2 border-red-600 rounded-full h-7">
              <DarkMode />
            </div>
            <button className="px-3 py-1" onClick={handleOpenSignUpModal}>
              Signup
            </button>
            <button
              className="bg-primarybtn px-4 py-1 rounded-full text-white"
              onClick={handleOpenLoginModal}
            >
              Login
            </button>
            <button className="md:hidden p-2" onClick={handleToggleSidebar}>
              ☰
            </button>
          </div>
        </div>
        
        {isSidebarOpen && (
          <div className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg p-4 z-5">
            <button
              onClick={handleToggleSidebar}
              className="text-xl absolute right-5"
            >
              X
            </button>
            <div>
              <Link to="/student/profile">
                <img
                  className="h-10 w-10 rounded-full"
                  src="https://zultimate.com/wp-content/uploads/2019/12/default-profile-300x300.png"
                  alt=""
                />
              </Link>
            </div>
            <ul className="flex flex-col mt-8 gap-10">
              <li>
                <Link onClick={handleToggleSidebar} to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link onClick={() => {
                  scrollToSection();
                  handleToggleSidebar();
                }}>
                  Courses
                </Link>
              </li>
              <li>
                <Link onClick={handleToggleSidebar} to="/about">
                  About Us
                </Link>
              </li>
              <li>
                <Link onClick={handleToggleSidebar} to="/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        )}

        {isSignUpModalOpen && (
          <Signup 
            isOpenn={isSignUpModalOpen} 
            onClosee={handleCloseSignUpModal}
            onSignupSuccess={handleSignupSuccess}
          />
        )}
        
        {isLoginModalOpen && (
          <Login 
            isOpen={isLoginModalOpen} 
            onClose={handleCloseLoginModal} 
          />
        )}
      </nav>
    </>
  );
}

export default Navbar;