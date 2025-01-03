import React, { useEffect, useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import axios from "axios";
import { SIGNUP_API } from "../../Utils/Constants/Api";
import { toast } from "react-toastify";

function Signup({ isOpenn, onClosee, onSignupSuccess }) {
  const [error, setError] = useState("");
  const [passwordLengthError, setPasswordLengthError] = useState(false);
  const [isToggled, setToggled] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      userRole: isToggled ? "instructor" : "student",
    }));
  }, [isToggled]);

  // Now you can use isToggled to update userRole in formData

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, confirmPassword, name, email, userRole } = formData;

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setPasswordLengthError(true);
      return;
    }

    console.log(userRole);

    try {
      const response = await axios.post(SIGNUP_API, {
        name,
        email,
        password,
        role: userRole,
      });

      if (response.data.success) {
        // Call the onSignupSuccess prop instead of managing login modal here
        toast.success("Signup Successful")
        onSignupSuccess();
      }
    } catch (error) {
      toast.error("Signup Failed")
      console.error("Error Sending Data", error.message);
    }
  };

  if (!isOpenn) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg relative w-96" id="Tags">
        <div className="flex  items-center gap-20">
          <h1 className="text-2xl font-bold mb-4" id="Text">
            Sign Up
          </h1>
          <div className="flex gap-2 items-center justify-center mb-4">
            <label className="User">
              {isToggled ? "Instructor" : "Student"}
            </label>
            <input
              type="checkbox"
              className="toggle border-dashed border-2 border-red-400 "
              checked={isToggled}
              onChange={(e) => setToggled(e.target.checked)}
            />
          </div>
        </div>
        <IoCloseCircle
          className="absolute top-2 right-2 text-4xl cursor-pointer text-red-400"
          onClick={onClosee}
        />

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
              id="Popup"
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
              id="Popup"
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
              id="Popup"
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
              id="Popup"
              required
            />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button
            type="submit"
            className="bg-primarybtn text-white py-2 px-4 rounded w-full m-2"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
