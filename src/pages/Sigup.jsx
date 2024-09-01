import React, { useState } from 'react'
import { IoCloseCircle } from "react-icons/io5";

function Sigup({isOpen , onClose}) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        userRole: 'student' // Default role
      });
    
      const [error, setError] = useState('');
      const [passwordLengthError, setPasswordLengthError] = useState(false);
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };
    
      const handleRoleChange = (role) => {
        setFormData({ ...formData, userRole: role });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        const { password, confirmPassword } = formData;
    
        if (password !== confirmPassword) {
          setError("Passwords do not match");
          return;
        }
    
        if (password.length < 8) {
          setPasswordLengthError(true);
          return;
        }
    
        // Perform submission logic here
        // onSubmit(formData);
        onClose(); // Close the modal after submission
      };
    
      if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg relative w-96">
        <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
        <IoCloseCircle
          className="absolute top-2 right-2 text-4xl cursor-pointer text-red-400"
          onClick={onClose}
        />
        {/* Option Selector */}
        <div className="mb-4">
          <div className="relative inline-flex w-full justify-center ">
            {/* Background slider */}
            <div
              className={`absolute inset-0 flex items-center justify-center  transition-transform duration-300 transform rounded-full bg-pink-300 ${
                formData.userRole === "instructor"
                  ? "translate-x-full"
                  : "translate-x-0"
              }`}
              style={{ width: "50%" }}
            />
            {/* Options */}
            <button
              onClick={() => handleRoleChange("student")}
              className={`relative z-10 px-6 py-2 text-black mr-6 rounded-full transition-colors duration-300 ${
                formData.userRole === "student" ? "text-black" : "text-gray-600"
              }`}
            >
              Student
            </button>
            <button
              onClick={() => handleRoleChange("instructor")}
              className={`relative z-10 px-6 py-2 text-black ml-6 rounded-full transition-colors duration-300 ${
                formData.userRole === "instructor" ? "text-black" : "text-gray-600"
              }`}
            >
              Instructor
            </button>
          </div>
        </div>
        {/* Sign-Up Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-left m-2">
              Name
            </label>
            <input
              onChange={handleChange}
              type="text"
              name="name"
              placeholder="Enter name"
              className="form-input w-full p-2 border rounded m-2"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-left m-2">
              Email
            </label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Enter your email"
              className="form-input w-full p-2 border rounded m-2"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-left m-2">
              Password
            </label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="Enter Password"
              className="form-input w-full p-2 border rounded m-2"
              required
            />
            {passwordLengthError && (
              <p className="text-red-500 m-2">
                Password must be at least 8 characters long
              </p>
            )}
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-left m-2">
              Confirm Password
            </label>
            <input
              onChange={handleChange}
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="form-input w-full p-2 border rounded m-2"
              required
            />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded w-full m-2"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default Sigup