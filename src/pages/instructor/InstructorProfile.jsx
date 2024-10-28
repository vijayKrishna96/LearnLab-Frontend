import React, { useState } from "react";

import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { userLogout } from "../../services/userApi";
import { BiLogOutCircle } from "react-icons/bi";
import { LOGOUT_API } from "../../Utils/Constants/Api";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function InstructorProfile() {
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(LOGOUT_API);
      console.log(response);
      if (response?.data?.success) {
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-auto bg-primary flex justify-center py-12 px-4 sm:px-6 lg:px-8">
      {isLoading ? (
        <div className="w-full h-screen flex items-center justify-center">
          <div
            className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl w-full bg-white p-8 rounded-md shadow-md">
          <div className="flex justify-between">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-8">
              Profile & Settings
            </h2>
            <label
              className="flex items-center justify-center text-md gap-2 hover:text-red-700"
              onClick={handleLogout}
            >
              Logout
              <span className="text-2xl">
                
                <BiLogOutCircle />
              </span>
            </label>
          </div>
          {/* Add other components or elements */}
          <form>
          <div className="space-y-4">
            <div className="flex flex-col items-center m-14">
              <div className="relative">
                <img
                  src={imagePreview || "https://via.placeholder.com/150"}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover mb-4"
                />
                <label
                  htmlFor="profileImage"
                  className="absolute bottom-0 right-0 bg-gray-700 text-white p-2 rounded-full cursor-pointer text-2xl"
                >
                  <MdOutlineAddPhotoAlternate />
                </label>
                <input
                  type="file"
                  id="profileImage"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
            </div>

            {/* The rest of your form fields go here */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="language"
                className="block text-sm font-medium text-gray-700"
              >
                Language
              </label>
              <select
                name="language"
                id="language"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option>English (US)</option>
                <option>French</option>
                <option>German</option>
                <option>Spanish</option>
              </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
              <div>
                <label
                  htmlFor="website"
                  className="block text-sm font-medium text-gray-700"
                >
                  Bio
                </label>
                <input
                  type="text"
                  name="website"
                  id="website"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="twitter"
                  className="block text-sm font-medium text-gray-700"
                >
                  Expertise
                </label>
                <input
                  type="text"
                  name="twitter"
                  id="twitter"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-md text-sm font-medium text-white bg-primarybtn hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>
        </form>
        </div>
      )}
    </div>
  );
}

export default InstructorProfile;
