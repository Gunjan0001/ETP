import React from 'react';
import Navbar from '../../Components/Navbar';
import { useParams } from 'react-router-dom';
import { StudentgetterContext } from '../../Components/Context/AllStudentsData';
import userProfilePic from '../../assets/images/svg/profile-icon.svg';
const LeadStatus = {
  NEW: 'NEW',
  SUCCEED: 'SUCCEED',
  NOT_INTERESTED: 'NOT INTERESTED',
};

export default function UserDetails() {
  const { studentsData } = StudentgetterContext();
  const id = useParams();
  let filterData = studentsData.filter((items) => items.id === id.id);
  return (
    <div className="bg-[#F8F9FA] h-full">
      {filterData.map((items) => {
        return (
          <>
            <Navbar navbarData={items.name} startData="Leads / Manage Leads /" data={items.name} />;
            <div className="px-[30px] ff_ubuntu pb-[30px]">
              <div className="flex justify-end mt-[104px] gap-5">
                {/* {items.status === LeadStatus.NEW ||
                  (items.status === undefined && (
                    <button className="text-base font-normal p-[10px] text-[#FF0000] bg-[#FF000026] rounded-[5px]">
                      Not Interested
                    </button>
                  ))}
                {items.status === LeadStatus.NOT_INTERESTED || items.status === undefined ? (
                  <button className="text-base font-normal p-[10px] text-[#0B8700] bg-[#10C50026] rounded-[5px]">
                    Mark Succeed
                  </button>
                ) : null} */}
              </div>
              <div className="flex flex-col  x2l:flex-row gap-5 mt-5">
                <div className="w-full x2l:w-[58.33%] p-5 bg-white rounded-[10px]">
                  <div className="flex items-center gap-5 border-b-[1px] border-[#00000033] pb-[10px]">
                    <img src={userProfilePic} alt="userProfilePic" />
                    <div className="flex items-center justify-between gap-5 w-full">
                      <div className="w-full">
                        <p className="text-lg font-bold text-black mb-1">{items.name}</p>
                        <p className="text-lg font-normal text-black">{items.email}</p>
                      </div>
                      <div>
                        <p className="text-xs font-normal text-[#00000080] whitespace-nowrap">
                          Date of Registration
                        </p>
                        <p className="text-sm font-medium text-black mt-1 whitespace-nowrap">
                          01-01-2024
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex flex-col gap-[10px]">
                      <p className="text-base font-normal text-black py-[10px]">Phone Number :</p>
                      <p className="text-base font-normal text-black py-[10px]">
                        Alt. Phone Number :
                      </p>
                      <p className="text-base font-normal text-black py-[10px]">Home Town</p>
                      <p className="text-base font-normal text-black py-[10px]">
                        Destination for Higher Studies
                      </p>
                      <p className="text-base font-normal text-black py-[10px]">
                        School or College last attended
                      </p>
                      <p className="text-base font-normal text-black py-[10px]">Age</p>
                    </div>
                    <div className="flex flex-col gap-[10px]">
                      <p className="text-base font-normal text-black py-[10px]">
                        {items.phoneNumber}
                      </p>
                      <p className="text-base font-normal text-black py-[10px]">
                        {items.alternatePhoneNumber}
                      </p>
                      <p className="text-base font-normal text-black py-[10px]">{items.hometown}</p>
                      <p className="text-base font-normal text-black py-[10px]">
                        {items.coutryHigherStudies}
                      </p>
                      <p className="text-base font-normal text-black py-[10px]">{items.School}</p>
                      <p className="text-base font-normal text-black py-[10px]">{items.Age}</p>
                    </div>
                  </div>
                </div>
                <div className="x2l:w-[41.66%] flex col-row x2l:flex-col gap-[10px] flex-wrap">
                  {items.scores.map((scor) => {
                    return (
                      <div className=" bg-white p-5 rounded-[10px] w-full">
                        <p className="text-lg font-bold pb-[10px] border-b-[1px] border-[#00000033] text-[#FF2000] text-center">
                          {scor.title}
                        </p>
                        <div className="flex justify-between mt-[10px]">
                          <div className="text-center w-[50%]">
                            <p className="text-sm font-normal text-black">Total Questions</p>
                            <p className="text-xl font-bold text-black mt-1">
                              {scor.totalQuestions}
                            </p>
                          </div>
                          <div className="w-[50%] text-center">
                            <p className="text-sm font-normal text-black">Correct Answers</p>
                            <p className="text-xl font-bold text-[#00C11F] mt-1">
                              {scor.correctAnswers}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
}
