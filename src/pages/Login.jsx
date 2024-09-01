import React, { useState } from "react";
import { IoCloseCircle } from "react-icons/io5";

function Login({ isOpen, onClose, onSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    onSubmit(data); // Call onSubmit with the login data
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
          <input
            type="submit"
            value="Sign in"
            className="btn text-center w-full my-5 bg-[#00EACE] p-2 text-lg text-black"
          />
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
