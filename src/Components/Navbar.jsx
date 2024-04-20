import React from "react";
import { Message, UserSign } from "./Icons";
import profile from "../assets/images/svg/profile.svg";
const Navbar = (props) => {
  return (
    <>
      <div className=" w-full p-[30px] border-b border-gray-300 bg-white  fixed  top-0 navbar_width z-20">
        <div className="flex items-center">
          <div className="flex items-center justify-between w-full ">
            <div>
              <h2 className="ff_inter font-semibold text-xl mb-0">
                {props.navbarData}
              </h2>
            </div>
            <p className="flex items-center gap-5 text-[#04B92C]">
              {props.data}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
