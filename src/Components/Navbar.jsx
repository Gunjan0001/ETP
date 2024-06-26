import React from 'react';
import { Message, UserSign } from './Icons';
import profile from '../assets/images/svg/profile.svg';
const Navbar = (props) => {
  return (
    <>
      <div className=" w-full p-[30px] border-b border-gray-300 bg-white  z-50 fixed  top-0 navbar_width">
        <div className="flex items-center">
          <div className="flex items-center justify-between w-full ">
            <div>
              <h2 className="ff_inter font-semibold text-xl mb-0">{props.navbarData}</h2>
            </div>
            <p className="text-[#04B92C]">
              <span className="text-[#00000080]"> {props.startData}</span> {props.data}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
