import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useUserAuth } from "../Components/Context/AuthContext";
export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const { loginUser } = useUserAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await loginUser(email, password);
      navigate("/");
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
  }
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
                  className="text-base font-normal  text-black py-3  outline-none border rounded-[10px] ps-3 border-[#B5B5B5]"
                  type="email"
                  placeholder="Enter your email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col mt-4">
                <input
                  className="text-base font-normal  text-black py-2  outline-none border rounded-[10px] ps-3 border-[#B5B5B5]"
                  type="password"
                  placeholder="Enter your password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="text-base font-normal bg-[#FF2000] py-3 px-4 rounded-[10px] mt-8 text-white w-full"
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
