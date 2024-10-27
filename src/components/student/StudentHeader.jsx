import React, { useEffect, useState } from "react";
import "../ui/Navbar/Navbar.css";

import { FaHeart } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { SiAlchemy } from "react-icons/si";
import { FaSortDown } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import DarkMode from "../ui/DarkMode";

function StudentHeader() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const Id  = useParams();

  let timer;

  const handleMouseEnter = () => {
    clearTimeout(timer);
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timer = setTimeout(() => setDropdownOpen(false), 200);
  };

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleOpenDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <nav className="shadow-md">
        <div className="container mx-auto flex justify-between items-center py-4">
          {/* Navbar Links */}
          <ul className="navbar-links flex gap-11 items-center">
            <li className="navbar-logo text-3xl text-primarybtn pl-4 md:pl-0">
              <Link to={`/student/${Id.userId}`}>
                <SiAlchemy />
              </Link>
            </li>

            {/* Hidden on mobile screens */}
            <li className="hidden md:block">
              <Link to={`/student/${Id.userId}`}>Home</Link>
            </li>
            {/* Courses Dropdown */}
            <li
              className="navbar-dropdown flex hidden md:block"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex">
                <span>Courses</span>
                <span>
                  <FaSortDown />
                </span>
              </div>
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <ul className="dropdown-list">
                    {/* Course links */}
                    <li>
                      <Link to="/category/development">Development</Link>
                    </li>
                    <li>
                      <Link to="/category/business">Business</Link>
                    </li>
                    {/* Add more categories */}
                  </ul>
                </div>
              )}
            </li>

            {/* Additional links hidden on mobile */}
            <li className="hidden md:block">
              <Link to={`/student/aboutus/${Id.userId}`}>About Us</Link>
            </li>
            <li className="hidden md:block">
              <Link to={`/student/contact/${Id.userId}`}>Contact</Link>
            </li>
            <li className="hidden md:block">
              <Link to={`/student/mylearnings/${Id.userId}`}>My Learnings</Link>
            </li>
          </ul>
          <div className="Login flex gap-5 md:gap-10 items-center">
            <div className="border-dashed border-2 border-red-400 rounded-full">
              <DarkMode />
            </div>
            <div className="text-2xl lg:text-md">
              <Link to={`/student/cart/${Id.userId}`}>
                <FaCartShopping className="text-xl md:text-2xl" />{" "}
              </Link>
            </div>
            <div className="text-red-400 text-xl md:text-2xl">
              <FaHeart />
            </div>

            {/* Profile hidden on mobile */}
            <div className="hidden md:block">
              <Link to={`/student/profile/${Id.userId}`}>
                <img
                  className="h-10 w-10 rounded-full"
                  src="https://th.bing.com/th/id/OIP.ELavGv-PyFA24ucQcJthawHaNc?rs=1&pid=ImgDetMain"
                  alt="Profile"
                />
              </Link>
            </div>

            {/* Sidebar Toggle Button for mobile */}
            <button className="md:hidden p-2" onClick={handleToggleSidebar}>
              ☰
            </button>
          </div>
        </div>

        {/* Sidebar for mobile */}
        {isSidebarOpen && (
          <div className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg p-4 z-50">
            <button
              onClick={handleToggleSidebar}
              className="text-xl absolute right-5"
            >
              X
            </button>
            <ul className="flex flex-col mt-8 gap-10">
              <li>
                <Link onClick={handleToggleSidebar} to={`/student/${Id.userId}`}>
                  Home
                </Link>
              </li>
              <li
                className="navbar-dropdown flex "
                onClick={handleOpenDropdown}
              >
                <div className="flex">
                  <span>Courses</span>
                  <span>
                    <FaSortDown />
                  </span>
                </div>
                {dropdownOpen && (
                  <div className="dropdown-menu">
                    <ul className="dropdown-list">
                      {/* Course links */}
                      <li>
                        <Link to="/category/development">Development</Link>
                      </li>
                      <li>
                        <Link to="/category/business">Business</Link>
                      </li>
                      <li>
                        <Link to="/category/development">Development</Link>
                      </li>
                      <li>
                        <Link to="/category/business">Business</Link>
                      </li>
                      <li>
                        <Link to="/category/development">Development</Link>
                      </li>
                      <li>
                        <Link to="/category/business">Business</Link>
                      </li>
                      {/* Add more categories */}
                    </ul>
                  </div>
                )}
              </li>
              <li>
                <Link
                  onClick={handleToggleSidebar}
                  to={`/student/mylearnings/${Id.userId}`}
                >
                  My Learnings
                </Link>
              </li>
              <li>
                <Link
                  onClick={handleToggleSidebar}
                  to={`/student/aboutus/${Id.userId}`}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  onClick={handleToggleSidebar}
                  to={`/student/contactus/${Id.userId}`}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}

export default StudentHeader;
