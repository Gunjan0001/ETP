import React, { useState, useEffect } from "react";
import logo from "../assets/images/svg/logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Arrow,
  Dashboard,
  LessIcon,
  Logout,
  Projects,
  Settings,
  TeamIcon,
  User,
  WhiteIcon,
} from "./Icons";
import { useUserAuth } from "./Context/AuthContext";
import logout from "../assets/images/png/logout.png";
const SideBar = () => {
  const navigate = useNavigate();
  const [projectDropdown, setProjectDropdown] = useState(true);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const handeldropdown = (dropdownname) => {
    setProjectDropdown((dropdownclose) =>
      dropdownclose === dropdownname ? null : dropdownname
    );
  };
  useEffect(() => {
    // Prevent scrolling when the popup is shown
    if (showLogoutPopup) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [showLogoutPopup]);
  const handleLogout = async () => {
    setShowLogoutPopup(true);
  };
  const { logoutUser } = useUserAuth();
  async function Logoutuser() {
    await logoutUser();
    navigate("/login");
  }
  const confirmLogout = async () => {
    await logoutUser();
    navigate("/login");
  };
  return (
    <div className="w-[270px] h-full border-r border-r-solid border-r-black-15 h-screen">
      <div className="w-[267px] bg-white fixed left-0 sidebar pb-5">
        <Link to="/">
          <p className="font-bold text-[24px] text-center p-[30px] text-[#B63336]">
            ETP
            <span className="font-medium text-base block text-black">
              {" "}
              English Level Test!
            </span>
          </p>
        </Link>
        <NavLink
          onClick={() => handeldropdown("")}
          to="/"
          className="flex items-center p-[10px] svg_color  text-xs  ms-4 rounded-l-[50px] ease-out transition-all duration-300 "
        >
          <Dashboard />
          <h2 className="pl-3 font-normal ff_inter text-lg">Dashboard</h2>
        </NavLink>
        <NavLink
          onClick={() => handeldropdown("")}
          to="users"
          className="flex items-center p-[10px] svg_color mt-2 text-xs ms-4 rounded-l-[50px] ease-out transition-all duration-300"
        >
          <User />
          <h2 className="pl-3 font-normal ff_inter text-lg">Leads</h2>
        </NavLink>
        <div>
          <NavLink
            onClick={() => handeldropdown("settings")}
            to="settings"
            className=" flex items-center svg_color justify-between p-[10px] mt-2 text-xs ms-4 rounded-l-[50px] ease-out transition-all duration-300"
          >
            <div className="flex items-center  ">
              <Settings />
              <h2 className="pl-3 font-normal ff_inter text-lg">Settings</h2>
            </div>
            <div className="tranform rotate-90">
              <Arrow />
            </div>
          </NavLink>
          {projectDropdown === "settings" && (
            <ul>
              <NavLink
                to="settings"
                end
                className={({ isActive }) =>
                  isActive
                    ? " flex items-center  p-[10px] mt-2 text-xs ms-5 justify-between project_data_active rounded-l-[50px] ease-out transition-all duration-300 "
                    : "flex items-center  p-[10px] mt-2 text-xs ms-5 justify-between  rounded-l-[50px] ease-out transition-all duration-300 "
                }
              >
                <h2 className="pl-3 font-normal ff_inter text-lg">User Form</h2>
                <Arrow />
              </NavLink>
              <NavLink
                to="settings/questions"
                className={({ isActive }) =>
                  isActive
                    ? " flex items-center  p-[10px] mt-2 text-xs ms-5 justify-between  project_data_active rounded-l-[50px] ease-out transition-all duration-300 "
                    : "flex items-center  p-[10px] mt-2 text-xs ms-5 justify-between  rounded-l-[50px] ease-out transition-all duration-300 "
                }
              >
                <h2 className="pl-3 font-normal ff_inter text-lg">Questions</h2>
                <Arrow />
              </NavLink>
            </ul>
          )}
        </div>
        {/* <NavLink
          onClick={() => handeldropdown("")}
          to="settings"
          className="flex items-center p-[10px] svg_stroke mt-2 text-xs  ms-4 rounded-l-[50px] ease-out transition-all duration-300  fill-current ! hover:fill-white"
        >
          <Settings />
          <h2 className="pl-3 font-normal ff_inter text-lg">Settings</h2>
        </NavLink> */}
        <Link
          onClick={() => setShowLogoutPopup(true)}
          className="flex items-center p-[10px] svg_stroke mt-2 text-xs    ms-4 rounded-l-[50px] ease-out transition-all duration-300  "
        >
          <Logout />
          <h2 className="pl-3 font-normal ff_inter text-lg">Logout</h2>
        </Link>
      </div>
      {showLogoutPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-30 z-[100]">
          <div className=" p-[40px] max-w-[486px] mx-auto bg-white rounded-md">
            <img
              className="max-w-[238px] h-[178px] mx-auto"
              src={logout}
              alt="logout"
            />
            <p className=" font-medium text-3xl text-center  text-[#FF0000] mt-5 ">
              Are you leaving?
            </p>
            <p className=" text-center mt-5 border-b border-b-gray-200 pb-4 ">
              Are you sure want to log out? All your unsaved data will be lost.
            </p>
            <div className=" w-full flex items-center justify-center gap-5">
              <button
                onClick={() => setShowLogoutPopup(false)} // Close popup
                class="rounded-lg flex items-center gap-2 border border-solid  py-3 px-4 mt-5   text-base font-normal bg-[#EDEDED]"
              >
             <LessIcon />
                Cancel
              </button>
              <button
                onClick={confirmLogout} // Logout user
                class="rounded-lg  flex items-center gap-2 border border-solid py-3 px-4 mt-5 bg-[#04B92C]  text-base font-normal text-white "
              >
                Yes
                <WhiteIcon />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
