import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useUserAuth } from "../Components/Context/AuthContext";
import Loader from "./Loader";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi"; // Assuming you're using react-icons library for icons

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to track password visibility
  const { loginUser } = useUserAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await loginUser(email, password);
      navigate("/");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
      console.log(error.message);
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle the state to show/hide password
  };

  return (
    <>
      <div className="bg-login min-h-screen bg-no-repeat bg-cover flex relative ">
        <div className="flex justify-end items-center w-[412px] ">
          <div className="flex items-center justify-end fixed right-40 py-[76px] px-5  bg_login rounded-[20px]  w-[412px] ">
            <form className="w-full" onSubmit={handleSubmit} action="">
              <h1 className="text-xl font-semibold  text-black  text-center mb-0">
                ETP English Level Test!
              </h1>
              <p className="text-[32px] font-semibold   text-[#FF0000] pt-[10px] text-center">
                ADMIN LOGIN
              </p>
              <div className="flex flex-col  mt-10">
                <input
                  className="text-base font-normal  text-black h-[50px]  outline-none border rounded-[10px] ps-3 border-[#B5B5B5]"
                  type="email"
                  placeholder="Enter your email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col mt-4 relative">
                <input
                  className="text-base font-normal  text-black h-[50px]  outline-none border rounded-[10px] ps-3 border-[#B5B5B5]"
                  type={showPassword ? "text" : "password"} // Show password if showPassword is true
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className="absolute top-1/2 transform -translate-y-1/2 right-3 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />} 
                </span>
              </div>

              <button
                type="submit"
                className="text-base font-normal bg-[#FF2000]  h-[50px]  px-4 rounded-[10px] mt-8 text-white w-full"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
