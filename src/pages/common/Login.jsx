import React, { useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../services/userApi";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
function Login({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
  
    const data = {
      email: email,
      password: password,
    };
  
    try {
      // Send the login data to the login route using axios with credentials
      const response = await userLogin(data);
      
      const userId = response.data.user.id; // Extract userId from the response
      const token = response.data.token; // Get the token from the response (ensure your backend sends it)
  
      // Save the token to localStorage
      if (token) {
        localStorage.setItem('authToken', token);
      }
  
      // Navigate based on user role
      if (response.data.user.role === 'student') {
        navigate(`/student/${userId}`);
        onClose(); // Close the modal
      } else if (response.data.user.role === 'instructor') {
        navigate(`/instructor/${userId}`);
        onClose();
      } else if (response.data.user.role === 'admin') {
        navigate(`/admin/${userId}`);
        onClose();
      }
    } catch (err) {
      // Handle error cases
      console.log(err.response);
      if (err.response?.data?.message === 'User not found') {
        toast.error("User not Found, Check the UserID !");
      } else if (err.response?.data?.message === "Invalid password") {
        toast.error("Invalid password, please try again !");
      } else if (err.response?.data?.message === 'User is not active') {
        toast.error("User is not active !");
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };


  if (!isOpen) return null; // Only render the component if isOpen is true

  return (
    <div className="fixed inset-0 z-50 flex justify-end  bg-gray-900 bg-opacity-50">
      <div className=" p-4 rounded-md  max-w-md h-[60%] relative mt-16 mr-10">
        <IoCloseCircle
          className="absolute top-2 right-2 text-4xl cursor-pointer text-red-400"
          onClick={onClose}
        />
        <form
          onSubmit={handleLogin}
          className="bg-white border border-sky-500 p-4 shadow-md rounded-md"
        >
          <h3 className="text-3xl text-center uppercase text-black font-semibold">
            Sign In
          </h3>
          <div className="flex flex-col p-6 mt-3">
            <label className="text-2xl my-2">Email</label>
            <input
              type="email"
              className="box my-5 border rounded p-2"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <label className="text-2xl my-2">Password</label>
            <input
              type="password"
              className="box my-5 border rounded p-2"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="check-box flex items-center gap-2 px-8">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button
            type="submit"
            className="btn text-center w-full my-5 bg-primarybtn p-2 text-lg text-white"
          >
            {loading ? <Loader /> : "SigIn"}
          </button>
          <p>
            Forgot password?{" "}
            <a href="#" className="text-sky-500">
              Click here
            </a>
          </p>
          <p>
            Don't have an account?{" "}
            <a href="#" className="text-sky-500">
              Create an account
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
