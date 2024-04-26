import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar';
import adminlogo from '../../assets/images/png/adminlogo.png';
import { StudentgetterContext } from '../../Components/Context/AllStudentsData';
import { type } from '@testing-library/user-event/dist/type';
import { Menu } from '@headlessui/react';
import Loader from '../../Pages/Loader';
import { LineChart } from '@mui/x-charts';
import { NotInterestedIcon, SuccedIcon, ThreeDotIcon, ViewIcon } from '../../Components/Icons';
import { Link } from 'react-router-dom';

const Choice = {
  IELTS: 'IELTS',
  PTE: 'PTE',
};

const LeadStatus = {
  NEW: 'NEW',
  SUCCEED: 'SUCCEED',
  NOT_INTERESTED: 'NOT INTERESTED',
};

const DashBoard = () => {
  const [loading, setLoading] = useState(false);
  const [totalSuccessfulIELTSLeads, setTotalSuccessfulIELTSLeads] = useState(0);
  const [totalSuccessfulPTELeads, setTotalSuccessfulPTELeads] = useState(0);
  const { studentsData } = StudentgetterContext();
  // Filter studentsArray to get IELTS and PTE leads
  const ieltsLeads = studentsData.filter((student) => {
    // Check if student.IeltsOrPte exists and is not undefined before calling toLowerCase()
    return student.IeltsOrPte && student.IeltsOrPte.toLowerCase() === 'ielts';
  });

  const pteLeads = studentsData.filter((student) => {
    // Check if student.IeltsOrPte exists and is not undefined before calling toLowerCase()
    return student.IeltsOrPte && student.IeltsOrPte.toLowerCase() === 'pte';
  });

  // Count the number of IELTS and PTE leads
  const totalIELTSLeads = ieltsLeads.length;
  const totalPTELeads = pteLeads.length;
  const [studentData, setStudentData] = useState([]);
  useEffect(() => {
    // Filter IELTS leads with status "Mark Succeed"
    const successfulIELTSLeads = studentsData.filter(
      (lead) => lead.IeltsOrPte === Choice.IELTS && lead.status === LeadStatus.SUCCEED
    );

    // Filter PTE leads with status "Mark Succeed"
    const successfulPTELeads = studentsData.filter(
      (lead) =>
        // Check if lead.IeltsOrPte exists
        lead.IeltsOrPte === Choice.PTE && lead.status.trim() === LeadStatus.SUCCEED
    );

    // Set the counts
    setTotalSuccessfulIELTSLeads(successfulIELTSLeads.length);
    setTotalSuccessfulPTELeads(successfulPTELeads.length);

    // Graph Function //

    let filterData = studentsData.filter((itm) => {
      return new Date().getMonth() === new Date(itm.createdAt).getMonth();
    });

    console.log(filterData.map((v) => v.status));

    const closedDeals = filterData.reduce((acc, student) => {
      const _createdAt = new Date(student.createdAt);
      const _updatedAt = new Date(student.updatedAt);
      if (_createdAt != _updatedAt && student.status === LeadStatus.SUCCEED) {
        const dateKey = _createdAt.getDate();
        acc[dateKey] = acc[dateKey] ? acc[dateKey] + 1 : 1;
      }
      return acc;
    }, {});
    // Group data by creation date
    const groupedByDate = filterData.reduce((acc, student) => {
      const _createdAt = new Date(student.createdAt);
      const dateKey = _createdAt.getDate();
      acc[dateKey] = acc[dateKey] ? acc[dateKey] + 1 : 1;
      return acc;
    }, {});
    // Initialize accumulator with count properties

    // Generate array for the graph
    const currentDate = new Date();
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      currentDate.getDate()
    ).getDate();

    let newCount = 0;
    let closeCount = 0;
    const graphData = Array.from({ length: daysInMonth }, (_, index) => {
      const dateKey = index + 1;

      const count = groupedByDate[dateKey] || 0;
      newCount += count;
      const close = closedDeals[dateKey] || 0;
      closeCount += close;
      return {
        date: dateKey,
        count: newCount,
        closed: closeCount,
      };
    });

    setStudentData(graphData);
  }, [studentsData]); // Run this effect whenever studentsData changes

  console.log(studentData);
  const totalsucessleads = studentsData.filter((lead) => lead.status === LeadStatus.SUCCEED);
  // Function to calculate the percentage
  const calculatePercentage = (correctAnswers, totalQuestions) => {
    if (totalQuestions === 0) {
      return 0;
    }
    return ((correctAnswers / totalQuestions) * 100).toFixed(2);
  };
  //  conversation rate
  const calculateConversionRate = (totalLeads, totalSuccessfulLeads) => {
    if (totalLeads === 0) {
      return 0; // Avoid division by zero
    }
    return ((totalSuccessfulLeads / totalLeads) * 100).toFixed(2);
  };
  const conversionRateIELTS = calculateConversionRate(totalIELTSLeads, totalSuccessfulIELTSLeads);
  const conversionRatePTE = calculateConversionRate(totalPTELeads, totalSuccessfulPTELeads);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar navbarData="Dashboard" />
      <div className="mt-20 p-8  bg-[#F8F9FA]">
        <p className="text-lg mb-0  text-[#0047FF] text-end">April 2024</p>
        <div className="flex gap-3 flex-wrap w-full mt-5">
          <div className="max-w-[282px] w-full border-2 border-[#00000066] shadow-lg p-5 rounded-md flex justify-center items-center flex-col">
            <img src={adminlogo} alt="logo" />
            <p className="mb-0 mt-[10px] text-center">Welcome Admin</p>
          </div>
          <div className="max-w-[282px] w-full border-2 border-[#FF2000] shadow-lg p-5 rounded-md flex justify-center items-center flex-col">
            <p className="font-medium  mb-2">Total Leads</p>
            <div className="border-t border-t-[#00000033] flex py-2 w-full justify-center gap-10">
              <p className="text-center mb-0">
                IELTS<br></br>
                <span className="font-bold text-[32px] text-[#FF2000]">{totalIELTSLeads}</span>
              </p>
              <p className="text-center mb-0">
                PTE<br></br>
                <span className="font-bold text-[32px] text-[#FF2000]">{totalPTELeads}</span>
              </p>
            </div>
          </div>
          <div className="max-w-[282px] w-full border-2 border-[#04B92C] shadow-lg p-5 rounded-md flex justify-center items-center flex-col">
            <p className="font-medium mb-2">Leads Closed</p>
            <div className="border-t border-t-[#00000033] flex py-2 w-full justify-center gap-10">
              <p className="text-center mb-0">
                IELTS
                <br />
                <span className="font-bold text-[32px] text-[#04B92C]">
                  {totalSuccessfulIELTSLeads}
                </span>
              </p>
              <p className="text-center mb-0">
                PTE
                <br />
                <span className="font-bold text-[32px] text-[#04B92C]">
                  {totalSuccessfulPTELeads}
                </span>
              </p>
            </div>
          </div>
          <div className="max-w-[282px] w-full border-2 border-[#FFA620] shadow-lg p-5 rounded-md flex justify-center items-center flex-col">
            <p className="font-medium  mb-2">Conversion Rate</p>
            <div className="border-t border-t-[#00000033] flex py-2 w-full justify-center gap-3">
              <p className="text-center mb-0">
                IELTS<br></br>
                <span className="font-bold text-[32px] text-[#FFA620]">{conversionRateIELTS}%</span>
              </p>
              <p className="text-center mb-0">
                PTE<br></br>
                <span className="font-bold text-[32px] text-[#FFA620]">{conversionRatePTE}%</span>
              </p>
            </div>
          </div>
        </div>
        <div className="shadow-md bg-white p-[2px]  rounded-[10px]  mt-6 px-5">
          <div className="flex justify-between mt-5">
            <p className="font-medium mb-0">Conversion Graph</p>
            <div>
              <div className="flex items-center gap-2 ">
                <span className="w-[38px] h-[6px] bg-[#B63336] rounded-[5px]"></span>
                <p className="mb-0 text-xs">/ Total Leads</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-[38px] h-[6px] bg-[#04B92C] rounded-[5px]"></span>
                <p className="mb-0 text-xs">% Attributed Students</p>
              </div>
            </div>
          </div>
          <div className="catt">
            <LineChart
              xAxis={[{ data: studentData.map((e) => e.date) }]}
              series={[
                { data: studentData.map((e) => e.count) },
                { data: studentData.map((e) => e.closed) },
              ]}
              height={373}
            />
          </div>
        </div>
        <p className="mb-0 font-medium my-4">Recently Closed</p>
        <div className="overflow-x-auto table_hight2 mt-8">
          <table className="table-auto w-[3100px]">
            <thead>
              <tr className="!w-full">
                <th className="border border-[#D9D9D9] bg-white ff_inter font-normal text-base text-[#FF0000] px-4 py-2 w-[99px]">
                  <p className="flex items-center justify-between">Sr.</p>
                </th>
                <th
                  // onClick={() => sorting("name")}
                  className="border cursor-pointer border-[#D9D9D9] bg-white ff_inter font-normal text-base text-[#FF0000] px-4 py-2 w-[310px]">
                  <p className="flex items-center justify-between">
                    Full Name
                    {/* <SortIcon /> */}
                  </p>
                </th>
                <th className="border cursor-pointer border-[#D9D9D9] bg-white ff_inter font-normal text-base text-[#FF0000] px-4 py-2 w-[480px]">
                  <p className="flex items-center justify-between">Test Score</p>
                </th>
                <th className="border cursor-pointer border-[#D9D9D9] bg-white ff_inter font-normal text-base text-[#FF0000] px-4 py-2 w-[313px]">
                  <p className="flex items-center justify-between">Email Address</p>
                </th>
                <th className="border cursor-pointer border-[#D9D9D9] bg-white ff_inter font-normal text-base text-[#FF0000] px-4 py-2 w-[220px]">
                  <p className="flex items-center justify-between">Phone Number</p>
                </th>
                <th className="border cursor-pointer border-[#D9D9D9] bg-white ff_inter font-normal text-base text-[#FF0000] px-4 py-2 w-[220px]">
                  <p className="flex items-center justify-between">Alternate Phone Number</p>
                </th>
                <th className="border cursor-pointer border-[#D9D9D9] bg-white ff_inter font-normal text-base text-[#FF0000] px-4 py-2 w-[300px]">
                  <p className="flex items-center justify-between">Hometown</p>
                </th>
                <th className="border cursor-pointer border-[#D9D9D9] bg-white ff_inter font-normal text-base text-[#FF0000] px-4 py-2 w-[300px]">
                  <p className="flex items-center justify-between">
                    Destination for Higher Studies
                  </p>
                </th>
                <th
                  // onClick={() => sorting("IeltsOrPte")}
                  className="border cursor-pointer border-[#D9D9D9] bg-white ff_inter font-normal text-base text-[#FF0000] px-4 py-2 w-[200px]">
                  <p className="flex items-center justify-between">
                    Choice of IELTS or PTE
                    {/* <SortIcon /> */}
                  </p>
                </th>
                <th className="border cursor-pointer border-[#D9D9D9] bg-white ff_inter font-normal text-base text-[#FF0000] px-4 py-2 w-[350px]">
                  <p className="flex items-center justify-between">
                    School or college they last attended.
                  </p>
                </th>
                <th className="border cursor-pointer border-[#D9D9D9] bg-white ff_inter font-normal text-base text-[#FF0000] px-4 py-2 w-[150px]">
                  <p className="flex items-center justify-between">Age</p>
                </th>
                <th className="border cursor-pointer border-[#D9D9D9] bg-white ff_inter font-normal text-base text-[#FF0000] px-4 py-2 w-[150px]">
                  <p className="flex items-center justify-between">Status</p>
                </th>
                <th className="text-center border border-[#D9D9D9] bg-white ff_inter font-normal text-base text-[#FF0000] px-4 py-2 w-[100px]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="overflow-y-auto">
              {totalsucessleads.map((value, index) => {
                const isLastRow = index === totalsucessleads.length - 1;
                // // Calculate the percentages for each level
                const levelPercentages = value.scores.map((score) =>
                  calculatePercentage(score.correctAnswers, score.totalQuestions)
                );
                return (
                  <tr key={index} className="!w-full">
                    <td className="border  w-[99px] border-[#D9D9D9] px-4 py-2 ff_inter font-normal text-base text-[#808080] text-center">
                      {index + 1}
                    </td>
                    <td className="border w-[310px] border-[#D9D9D9] px-4 py-2 ff_inter font-normal text-base text-[#808080] text-center">
                      {value.name}
                    </td>
                    <td className="border w-[480px] border-[#D9D9D9] px-4 py-2 ff_inter font-normal text-base text-[#808080]">
                      {levelPercentages.map((percentage, levelIndex) => (
                        <span key={levelIndex} className="me-5">
                          Level {levelIndex + 1}: {percentage}%
                        </span>
                      ))}
                    </td>
                    <td className="border w-[313px] border-[#D9D9D9] px-4 py-2 ff_inter font-normal text-base text-[#808080] text-center">
                      {value.email}
                    </td>
                    <td className="border w-[220px] border-[#D9D9D9] px-4 py-2 ff_inter font-normal text-base text-[#808080] text-center">
                      {value.phoneNumber}
                    </td>
                    <td className="border w-[220px] border-[#D9D9D9] px-4 py-2 ff_inter font-normal text-base text-[#808080] text-center">
                      {value.alternatePhoneNumber}
                    </td>
                    <td className="border w-[300px] border-[#D9D9D9] px-4 py-2 ff_inter font-normal text-base text-[#808080] text-center">
                      {value.hometown}
                    </td>
                    <td className="border w-[300px] border-[#D9D9D9] px-4 py-2 ff_inter font-normal text-base text-[#808080] text-center">
                      {value.coutryHigherStudies}
                    </td>
                    <td className="border w-[200px] border-[#D9D9D9] px-4 py-2 ff_inter font-normal text-base text-center">
                      {value.IeltsOrPte}
                    </td>
                    <td className="border w-[350px] border-[#D9D9D9] px-4 py-2 ff_inter font-normal text-base text-[#808080] text-center">
                      {value.School}
                    </td>
                    <td className="border w-[150px] border-[#D9D9D9] px-4 py-2 ff_inter font-normal text-base text-[#808080] text-center">
                      {value.Age}
                    </td>
                    <td className="border w-[150px] border-[#D9D9D9] px-4 py-2 ff_inter font-normal text-base text-[#808080] text-center">
                      {value.status || LeadStatus.NEW}
                    </td>

                    <td className="border w-[100px] relative border-[#D9D9D9] px-4 py-2 ff_inter font-normal text-base  text-[#808080] text-center">
                      <div className="relative">
                        <Menu>
                          <Menu.Button className="inline-flex justify-center w-full cursor-pointer">
                            <ThreeDotIcon />
                          </Menu.Button>
                          <Menu.Items
                            className={`absolute right-10 z-20 -top-[20px] mt-2 w-56 origin-top-right max-w-48 rounded-lg border border-solid bg-white border-[#D9D9D9]${
                              isLastRow ? 'transform translate-y-[-70%]' : ''
                            }`}>
                            <Menu.Item>
                              <Link
                                // to={`/users/veiwprofile/${value.id}`}
                                className="flex items-center py-3 px-5 gap-4 cursor-pointer">
                                <ViewIcon />
                                <p className="ff_inter font-normal text-base mb-0 ">View Profile</p>
                              </Link>
                            </Menu.Item>
                            <Menu.Item>
                              <Link
                                // onClick={() =>
                                //   handleUpdateStatus(
                                //     value.id,
                                //     LeadStatus.SUCCEED
                                //   )
                                // }
                                className="flex items-center py-3 px-5 gap-4 cursor-pointer">
                                <SuccedIcon />
                                <p className="ff_inter font-normal text-base mb-0 ">Mark Succeed</p>
                              </Link>
                            </Menu.Item>
                            <Menu.Item>
                              <Link
                                // onClick={() =>
                                //   handleUpdateStatus(
                                //     value.id,
                                //     LeadStatus.NOT_INTERESTED
                                //   )
                                // }
                                className="flex items-center py-3 px-5 gap-4 cursor-pointer">
                                <NotInterestedIcon />
                                <p className="ff_inter font-normal text-base mb-0 ">
                                  Not Interested
                                </p>
                              </Link>
                            </Menu.Item>
                          </Menu.Items>
                        </Menu>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
