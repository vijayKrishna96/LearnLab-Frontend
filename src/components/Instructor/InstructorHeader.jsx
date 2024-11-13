import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { FaHeart } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { SiAlchemy } from "react-icons/si";
import { FaSortDown } from "react-icons/fa";
import DarkMode from "../ui/DarkMode";
import { useSelector } from "react-redux";
import { selectWishlistItems } from "../../features/wishlistSlice";

function InstructorHeader() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const Id = useParams();

  let timer;

  const item = useSelector((state) => state.cart.cartItems);
  const filterItem = item?.filter((course) => course.userId === Id.userId)

  const wishlistItems = useSelector(selectWishlistItems)
  const filterWislist = wishlistItems?.filter((wlist)=> wlist.userId === Id.userId)
  console.log(wishlistItems , "items")

  const userData = useSelector((state) => state.user.userData);

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
        <div className="container mx-auto flex justify-between items-center py-4 ">
          <ul className="navbar-links flex gap-11 items-center">
            <li className="navbar-logo text-3xl text-primarybtn pl-4 md:pl-0">
              <Link to={`/instructor/${Id.userId}`}>
                <SiAlchemy />
              </Link>
            </li>
            <li className="hidden md:block">
              <Link to={`/instructor/${Id.userId}`}>Home</Link>
            </li>
            <li className="hidden md:block">
              <Link to={`/instructor/students/${Id.userId}`}>
                Students List
              </Link>
            </li>
            <li className="hidden md:block">
              <Link to={`/instructor/mycourses/${Id.userId}`}>My Course </Link>
            </li>
            <li className="hidden md:block">
              <Link to={`/instructor/aboutus/${Id.userId}`}>About Us</Link>
            </li>
            <li className="hidden md:block">
              <Link to={`/instructor/contact/${Id.userId}`}>Contact</Link>
            </li>
          </ul>
          <div className="Login flex gap-5 md:gap-10 items-center">
            <div className="flex items-center border-dashed border-2 border-red-600 rounded-full h-7">
              <DarkMode />
            </div>
            <div className="text-xl md:text-2xl relative">
              <Link to={`/instructor/cart/${Id.userId}`}>
                <FaCartShopping />
              </Link>
              <span className="absolute -top-2 -right-2 text-xs bg-primarybtn text-white rounded-full py-0.5 w-5 h-5 text-center justify-center">{filterItem?.length > 0 ? filterItem.length : 0}</span>
            </div>
            <div className="text-red-400 text-xl md:text-2xl relative">
              <Link to={`/instructor/wishlist/${Id.userId}`}>
              <FaHeart />
              </Link>
              <span className="absolute -top-2 -right-2 text-xs bg-primarybtn text-white rounded-full py-0.5 w-5 h-5 text-center justify-center">{filterWislist?.length > 0 ? filterWislist.length : 0}</span>
            </div>
            <div className="hidden md:block">
              <Link to={`/instructor/profile/${Id.userId}`}>
                <img
                  className="h-10 w-10 rounded-full"
                  src={userData?.profilePicture.url}
                  alt=""
                />
              </Link>
            </div>
            <button className="md:hidden p-2" onClick={handleToggleSidebar}>
              ☰
            </button>
          </div>
        </div>
        {isSidebarOpen && (
          <div className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg p-4 z-50" id="Tags">
            <button
              onClick={handleToggleSidebar}
              className="text-xl absolute right-5"
            >
              X
            </button>
            <ul className="flex flex-col mt-8 gap-10">
              <li>
                <Link
                  onClick={handleToggleSidebar}
                  to={`/instructor/${Id.userId}`}
                >
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
              <li className="">
                <Link
                  onClick={handleToggleSidebar}
                  to={`/instructor/students/${Id.userId}`}
                >
                  Students List
                </Link>
              </li>
              <li className="">
                <Link
                  onClick={handleToggleSidebar}
                  to={`/instructor/mycourses/${Id.userId}`}
                >
                  My Course{" "}
                </Link>
              </li>
              <li>
                <Link
                  onClick={handleToggleSidebar}
                  to={`/instructor/aboutus/${Id.userId}`}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  onClick={handleToggleSidebar}
                  to={`/instructor/contact/${Id.userId}`}
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

export default InstructorHeader;
