import React, { useEffect, useState } from "react";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { BiLogOutCircle } from "react-icons/bi";
import axios from "axios";
import { LOGOUT_API, UPDATE_USER_DETAILS } from "../../Utils/Constants/Api";
import { useSelector } from "react-redux";

function StudentProfile() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { userId } = useParams();
  const userData = useSelector((state) => state.user.userData);

  const [formsData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    headline: "",
    bio: "",
    expertise: "",
    language: "English (US)",
    profilePicture: null
  });

  const [imagePreview, setImagePreview] = useState("https://via.placeholder.com/150");

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || "",
        headline: userData.headline || "",
        bio: userData.bio || "",
        expertise: userData.expertise || "",
        language: userData.language || "English (US)",
        profilePicture: null
      });
      
      if (userData.profilePicture?.url) {
        setImagePreview(userData.profilePicture.url);
      }
    }
  }, [userData]);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(LOGOUT_API);
      if (response?.data?.success) {
        navigate("/");
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setFormData(prev => ({ ...prev, profilePicture: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formsData.name);
      formDataToSend.append("phone", formsData.phone);
      formDataToSend.append("headline", formsData.headline);
      formDataToSend.append("bio", formsData.bio);
      formDataToSend.append("expertise", formsData.expertise);
      formDataToSend.append("language", formsData.language);

      if (formsData.profilePicture) {
        formDataToSend.append("images", formsData.profilePicture);
      }

      const response = await axios.patch(
        `${UPDATE_USER_DETAILS}/${userId}`, 
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.data) {
        alert("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Error updating profile", error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-auto flex justify-center py-12 px-4 sm:px-6 lg:px-8">
      {isLoading ? (
        <div className="w-full h-screen flex items-center justify-center text-xl">
          <span className="loading loading-infinity loading-lg text-info"></span>
        </div>
      ) : (
        <div className="max-w-4xl w-full bg-primary p-8 rounded-md shadow-md" id="Tags">
          <div className="flex justify-between">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-8" id="Text">
              Profile & Settings
            </h2>
            <label
              className="flex items-center justify-center text-md gap-2 hover:text-red-700"
              onClick={handleLogout}
            >
              Logout{" "}
              <span className="text-2xl">
                <BiLogOutCircle />
              </span>
            </label>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="flex flex-col items-center m-14">
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover mb-4"
                  />
                  <label
                    htmlFor="profilePicture"
                    className="absolute bottom-0 right-0 bg-gray-700 text-white p-2 rounded-full cursor-pointer text-2xl"
                  >
                    <MdOutlineAddPhotoAlternate />
                  </label>
                  <input
                    type="file"
                    id="profilePicture"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                    id="Text"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="InputBg"
                    value={formsData.name}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                    id="Text"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="InputBg"
                    value={formsData.email}
                    readOnly
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="headline"
                    className="block text-sm font-medium text-gray-700"
                    id="Text"
                  >
                    Headline
                  </label>
                  <input
                    type="text"
                    name="headline"
                    id="InputBg"
                    value={formsData.headline}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                    id="Text"
                  >
                    PhoneNumber
                  </label>
                  <input
                    type="text"
                    name="phone"
                    id="InputBg"
                    value={formsData.phone}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="bio"
                  className="block text-sm font-medium text-gray-700"
                  id="Text"
                >
                  Biography
                </label>
                <textarea
                  name="bio"
                  id="InputBg"
                  rows="4"
                  value={formsData.bio}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                ></textarea>
              </div>

              <div>
                <label
                  htmlFor="language"
                  className="block text-sm font-medium text-gray-700"
                  id="Text"
                >
                  Language
                </label>
                <select
                  name="language"
                  value={formsData.language}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  id="InputBg"
                >
                  <option>English (US)</option>
                  <option>French</option>
                  <option>German</option>
                  <option>Spanish</option>
                </select>
              </div>
            </div>

            <div className="mt-8">
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
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

export default StudentProfile;