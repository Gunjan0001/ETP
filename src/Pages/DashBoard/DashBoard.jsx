import React from "react";
import Navbar from "../../Components/Navbar";
import adminlogo from "../../assets/images/png/adminlogo.png";
const DashBoard = () => {
  return (
    <>
      <Navbar navbarData="Dashboard" />
      <div className="mt-24 px-8">
        <p className="text-lg mb-0 mt-2 text-[#0047FF] text-end">April 2024</p>
        <div className="flex gap-3 flex-wrap w-full mt-5">
          <div className="max-w-[282px] w-full border-2 border-[#00000066] shadow-lg p-5 rounded-md flex justify-center items-center flex-col">
            <img src={adminlogo} alt="logo" />
            <p className="mb-0 mt-[10px] text-center">Welcome Admin</p>
          </div>
          <div className="max-w-[282px] w-full border-2 border-[#FF2000] shadow-lg p-5 rounded-md flex justify-center items-center flex-col">
            <p className="font-medium  mb-2">Total Leads</p>
            <div className="border-t border-t-[#00000033] flex py-2 w-full justify-center gap-20">
              <p className="text-center mb-0">
                IELTS<br></br>
                <span className="font-bold text-[32px] text-[#FF2000]">23</span>
              </p>
              <p className="text-center mb-0">
                PTE<br></br>
                <span className="font-bold text-[32px] text-[#FF2000]">30</span>
              </p>
            </div>
          </div>
          <div className="max-w-[282px] w-full border-2 border-[#04B92C] shadow-lg p-5 rounded-md flex justify-center items-center flex-col">
            <p className="font-medium  mb-2">Leads Closed</p>
            <div className="border-t border-t-[#00000033] flex py-2 w-full justify-center gap-20">
              <p className="text-center mb-0">
                IELTS<br></br>
                <span className="font-bold text-[32px] text-[#04B92C]">7</span>
              </p>
              <p className="text-center mb-0">
                PTE<br></br>
                <span className="font-bold text-[32px] text-[#04B92C]">12</span>
              </p>
            </div>
          </div>
          <div className="max-w-[282px] w-full border-2 border-[#FFA620] shadow-lg p-5 rounded-md flex justify-center items-center flex-col">
            <p className="font-medium  mb-2">Conversion Rate</p>
            <div className="border-t border-t-[#00000033] flex py-2 w-full justify-center gap-20">
              <p className="text-center mb-0">
                IELTS<br></br>
                <span className="font-bold text-[32px] text-[#FFA620]">30.4%</span>
              </p>
              <p className="text-center mb-0">
                PTE<br></br>
                <span className="font-bold text-[32px] text-[#FFA620]">40%</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
