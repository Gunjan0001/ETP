import React from "react";
import SideBar from "../SideBar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <div className="flex  justify-end ">
        <SideBar />
        <div className="content_width ">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
