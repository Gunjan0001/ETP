import React, { useRef, useState, useEffect } from "react";
import {
  Arrow,
  Downarrow,
  FilterIcon,
  NotInterestedIcon,
  SortIcon,
  SuccedIcon,
  ThreeDotIcon,
} from "../../Components/Icons";
import {
  BinIcon,
  DownloadIcon,
  EditIcon,
  NewUserIcon,
  SearchIcon,
  ViewIcon,
} from "../../Components/Icons";
import { Link } from "react-router-dom";
import { TableData } from "../../Components/Helper";
import { Menu } from "@headlessui/react";
import Loader from "../../Pages/Loader";
import Navbar from "../../Components/Navbar";
import { StudentgetterContext } from "../../Components/Context/AllStudentsData";
import DeletePage from "../DeletePage";

const LeadStatus = {
  NEW: "NEW",
  SUCCEED: "SUCCEED",
  NOT_INTERESTED: "NOT INTERESTED",
};

const User = () => {
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [showpopup, setShowpopup] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenall, setIsOpenall] = useState(false);
  const [searchCategory, setSearchCategory] = useState("School Name");

  const [order, setorder] = useState("ASC");
  const [loading, setLoading] = useState(true);
  // context
  // console.log(filteredStudents);
  const { studentsData, updateStudentData, updateStatusonFirebase } =
    StudentgetterContext();
  // console.log(studentsData, "gunjan");
  const [iletsorpte, setIletsorpte] = useState(() => {
    if (studentsData.length > 0) {
      return "All";
    } else {
      return "";
    }
  });
  const handleUpdateStatus = (studentId, newStatus) => {
    updateStatusonFirebase(studentId, newStatus);
  };
  function getStatusColor(status) {
    switch (status) {
      case LeadStatus.NEW:
        return "#000000"; // Black color for NEW status
      case LeadStatus.SUCCEED:
        return "#008000"; // Green color for SUCCEED status
      case LeadStatus.NOT_INTERESTED:
        return "#FFA500"; // Orange color for NOT_INTERESTED status
      default:
        return "#000000"; // Default color
    }
  }

  useEffect(() => {
    setLoading(true);
    const filteredData = studentsData.filter((student) => {
      const schoolname = student.School && student.School.toLowerCase();
      const hometown = student.hometown && student.hometown.toLowerCase();
      const countrydestination =
        student.coutryHigherStudies &&
        student.coutryHigherStudies.toLowerCase();
      if (searchCategory === "hometown" && hometown) {
        return hometown.includes(searchValue.toLowerCase());
      } else if (
        searchCategory === "Country Destination" &&
        countrydestination
      ) {
        return countrydestination.includes(searchValue.toLowerCase());
      } else if (searchCategory === "School Name" && schoolname) {
        return schoolname.includes(searchValue.toLowerCase());
      } else {
        return studentsData;
      }
    });
    setFilteredStudents(filteredData);
    setLoading(false);
  }, [studentsData, searchValue, searchCategory]);

  useEffect(() => {
    if (showpopup) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [showpopup]);
  /*  *******************************
    Export  Excel File start from here  
  *********************************************   **/
  const ExcelJS = require("exceljs");

  function exportExcelFile() {
    const workbook = new ExcelJS.Workbook();
    const excelSheet = workbook.addWorksheet("Student List");
    excelSheet.properties.defaultRowHeight = 20;

    excelSheet.getRow(1).font = {
      name: "Conic Sans MS",
      family: 4,
      size: 14,
      bold: true,
    };
    excelSheet.columns = [
      { header: "Sr.", key: "Sr", width: 15 },
      { header: "Full Name", key: "FullName", width: 30 },
      { header: "Test Score", key: "TestScore", width: 30 },
      { header: "Email Address", key: "EmailAddress", width: 30 },
      { header: "Phone Number", key: "PhoneNumber", width: 20 },
      {
        header: "Alternate Phone Number",
        key: "AlternatePhoneNumber",
        width: 20,
      },
      { header: "Hometown", key: "Hometown", width: 30 },
      {
        header: "Destination for Higher Studies",
        key: "DestinationHigherStudies",
        width: 30,
      },
      { header: "Choice of IELTS or PTE", key: "IeltsOrPte", width: 20 },
      { header: "School or College", key: "School", width: 30 },
      { header: "Age", key: "Age", width: 15 },
      { header: "Status", key: "Status", width: 15 },
    ];

    filteredStudents.forEach((student, index) => {
      const levelPercentages = student.scores.map((score) =>
        calculatePercentage(score.correctAnswers, score.totalQuestions)
      );

      excelSheet.addRow({
        Sr: index + 1,
        FullName: student.name,
        TestScore: levelPercentages.join(", "),
        EmailAddress: student.email,
        PhoneNumber: student.phoneNumber,
        AlternatePhoneNumber: student.alternatePhoneNumber,
        Hometown: student.hometown,
        DestinationHigherStudies: student.coutryHigherStudies,
        IeltsOrPte: student.IeltsOrPte,
        School: student.School,
        Age: student.Age,
        Status: "New", // Assuming 'Status' is a fixed value
      });
    });

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "studentList.xlsx";
      anchor.click();
      window.URL.revokeObjectURL(url);
    });
  }

  /*  *******************************
    Export  Excel File end  here  
  *********************************************   **/

  // Function to calculate the percentage
  const calculatePercentage = (correctAnswers, totalQuestions) => {
    if (totalQuestions === 0) {
      return 0;
    }
    return ((correctAnswers / totalQuestions) * 100).toFixed(2);
  };

  const sorting = (col) => {
    // Create a copy of the data array
    const sortedData = [...studentsData];
    // console.log("sorting data ,",sortedData)
    if (order === "ASC") {
      sortedData.sort((a, b) => {
        const valueA =
          typeof getProperty(a, col) === "number"
            ? getProperty(a, col)
            : getProperty(a, col).toLowerCase();
        const valueB =
          typeof getProperty(b, col) === "number"
            ? getProperty(b, col)
            : getProperty(b, col).toLowerCase();
        return typeof valueA === "number"
          ? valueA - valueB
          : valueA.localeCompare(valueB);
      });
    } else {
      // If the order is not ASC, assume it's DESC
      sortedData.sort((a, b) => {
        const valueA =
          typeof getProperty(a, col) === "number"
            ? getProperty(a, col)
            : getProperty(a, col).toLowerCase();
        const valueB =
          typeof getProperty(b, col) === "number"
            ? getProperty(b, col)
            : getProperty(b, col).toLowerCase();
        return typeof valueA === "number"
          ? valueB - valueA
          : valueB.localeCompare(valueA);
      });
    }
    // Update the order state
    const newOrder = order === "ASC" ? "DESC" : "ASC";
    setorder(newOrder);
    updateStudentData(sortedData);
  };
  const getProperty = (obj, path) => {
    const keys = path.split(".");
    let result = obj;
    for (let key of keys) {
      result = result[key];
    }
    return result;
  };
  return (
    <>
      <Navbar navbarData="Manage Leads" startData="Leads /" data=" Manage Leads" />
      <div className="mt-24">
        <div className="py-5 px-8 relative z-10">
          {/* Search and Filter Section */}
          <div className="flex items-center justify-between">
            {/* Search Input */}
            <div>
              <p className="ff-outfit font-semibold text-lg mb-0">
                Student’s List
              </p>
              <p className="ff-outfit font-normal text-xs mb-0 mt-1">
                {`Total ${filteredStudents.length} students`}
              </p>
            </div>

            <div className="flex items-center gap-[18px]">
              {/* Dropdown to select iletsorpte */}
              <div className="flex items-center rounded-[10px] py-3 text-[#FF0000] bg-[#EFEFEF]">
                <div className="relative z-[999]">
                  <button
                    onClick={() => {
                      setIsOpenall(!isOpenall);
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-2 text-[#B63336] rounded-md focus:outline-none px-3"
                  >
                    <svg
                      className={`w-4 h-4xx transition-transform transform ${
                        isOpenall ? "rotate-180" : ""
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="#000000"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                    {iletsorpte}
                  </button>
                  {isOpenall && (
                    <div className="absolute z-50 right-0 mt-2 w-[180px] origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                      >
                        <button
                          onClick={() => {
                            setIsOpenall(false);
                            setIsOpen(false);
                            const firstStudentIeltsOrPte =
                              studentsData.length > 0 ? "All" : "";
                            setIletsorpte(firstStudentIeltsOrPte);
                          }}
                          className="block w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          All
                        </button>
                        <button
                          onClick={() => {
                            setIsOpenall(false);
                            setIsOpen(false);
                            setIletsorpte("ILETS");
                          }}
                          className="block w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          ILETS
                        </button>
                        <button
                          onClick={() => {
                            setIsOpenall(false);
                            setIsOpen(false);
                            setIletsorpte("PTE");
                          }}
                          className="block w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          PTE
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Dropdown for search category */}
              <div className="flex items-center rounded-[10px] py-3 text-[#FF0000] bg-[#EFEFEF]">
                <div className="relative z-[999]">
                  <button
                    onClick={() => {
                      setIsOpen(!isOpen);
                      setIsOpenall(false);
                    }}
                    className="flex items-center gap-2 text-[#B63336] rounded-md focus:outline-none px-3"
                  >
                    <svg
                      className={`w-4 h-4xx transition-transform transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="#000000"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                    {searchCategory}
                  </button>
                  {isOpen && (
                    <div className="absolute z-50 right-0 mt-2 w-[180px] origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                      >
                        <button
                          onClick={() => {
                            setIsOpen(false);
                            setIsOpenall(false);
                            setSearchCategory("School Name");
                          }}
                          className="block w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          School Name
                        </button>
                        <button
                          onClick={() => {
                            setIsOpen(false);
                            setIsOpenall(false);
                            setSearchCategory("hometown");
                          }}
                          className="block w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          hometown
                        </button>
                        <button
                          onClick={() => {
                            setIsOpen(false);
                            setIsOpenall(false);
                            setSearchCategory("Country Destination");
                          }}
                          className="block w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          Country Destination
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between border h-[48px] px-5 border-[#B5B5B5] rounded-lg">
                <input
                  className="text-base font-normal ff_inter text-black  w-[372px] rounded-lg outline-none"
                  type="text"
                  placeholder="Search in the table..."
                  required
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <div className="cursor-pointer">
                  <SearchIcon />
                </div>
              </div>
              <button
                onClick={exportExcelFile}
                className="ff-outfit text-base font-normal text-white ff_inter font-base bg-[#8C8C8C] py-3 gap-[10px] px-[15px] rounded-[10px] flex items-center"
              >
                <DownloadIcon />
                Download CSV
              </button>
            </div>
          </div>
        </div>
        {/* Table Section */}
        <div className="py-5 px-8">
          {loading ? ( // Conditional rendering based on loading state
            <Loader />
          ) : (
            <div className="overflow-x-auto table_hight">
              <table className="table-auto w-[3100px]">
                <thead>
                  <tr className="!w-full">
                    <th className="border border-[#D9D9D9] bg-white ff_inter font-normal text-base text-[#FF0000] px-4 py-2 w-[99px]">
                      <p className="flex items-center justify-between">Sr.</p>
                    </th>
                    <th
                      onClick={() => sorting("name")}
                      className="border cursor-pointer border-[#D9D9D9] bg-white ff_inter font-normal text-base text-[#FF0000] px-4 py-2 w-[310px]"
                    >
                      <p className="flex items-center justify-between">
                        Full Name
                        <SortIcon />
                      </p>
                    </th>
                    <th className="border cursor-pointer border-[#D9D9D9] bg-white ff_inter font-normal text-base text-[#FF0000] px-4 py-2 w-[480px]">
                      <p className="flex items-center justify-between">
                        Test Score
                      </p>
                    </th>
                    <th className="border cursor-pointer border-[#D9D9D9] bg-white ff_inter font-normal text-base text-[#FF0000] px-4 py-2 w-[313px]">
                      <p className="flex items-center justify-between">
                        Email Address
                      </p>
                    </th>
                    <th className="border cursor-pointer border-[#D9D9D9] bg-white ff_inter font-normal text-base text-[#FF0000] px-4 py-2 w-[220px]">
                      <p className="flex items-center justify-between">
                        Phone Number
                      </p>
                    </th>
                    <th className="border cursor-pointer border-[#D9D9D9] bg-white ff_inter font-normal text-base text-[#FF0000] px-4 py-2 w-[220px]">
                      <p className="flex items-center justify-between">
                        Alternate Phone Number
                      </p>
                    </th>
                    <th className="border cursor-pointer border-[#D9D9D9] bg-white ff_inter font-normal text-base text-[#FF0000] px-4 py-2 w-[300px]">
                      <p className="flex items-center justify-between">
                        Hometown
                      </p>
                    </th>
                    <th className="border cursor-pointer border-[#D9D9D9] bg-white ff_inter font-normal text-base text-[#FF0000] px-4 py-2 w-[300px]">
                      <p className="flex items-center justify-between">
                        Destination for Higher Studies
                      </p>
                    </th>
                    <th
                      // onClick={() => sorting("IeltsOrPte")}
                      className="border cursor-pointer border-[#D9D9D9] bg-white ff_inter font-normal text-base text-[#FF0000] px-4 py-2 w-[200px]"
                    >
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
                      <p className="flex items-center justify-between">
                        Status
                      </p>
                    </th>
                    <th className="text-center border border-[#D9D9D9] bg-white ff_inter font-normal text-base text-[#FF0000] px-4 py-2 w-[100px]">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="overflow-y-auto">
                  {filteredStudents.map((value, index) => {
                    const isLastRow = index === filteredStudents.length - 1;
                    // Calculate the percentages for each level
                    const levelPercentages = value.scores.map((score) =>
                      calculatePercentage(
                        score.correctAnswers,
                        score.totalQuestions
                      )
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
                          {isOpenall && iletsorpte === "All"
                            ? value.IeltsOrPte
                            : iletsorpte}
                        </td>

                        <td className="border w-[350px] border-[#D9D9D9] px-4 py-2 ff_inter font-normal text-base text-[#808080] text-center">
                          {value.School}
                        </td>
                        <td className="border w-[150px] border-[#D9D9D9] px-4 py-2 ff_inter font-normal text-base text-[#808080] text-center">
                          {value.Age}
                        </td>
                        <td
                          className="border w-[150px] border-[#D9D9D9] px-4 py-2 ff_inter font-normal text-base text-center"
                          style={{ color: getStatusColor(value.status) }}
                        >
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
                                  isLastRow
                                    ? "transform translate-y-[-70%]"
                                    : ""
                                }`}
                              >
                                <Menu.Item>
                                  <Link
                                    to={`/userprofile/${value.id}`}
                                    className="flex items-center py-3 px-5 gap-4 cursor-pointer"
                                  >
                                    <ViewIcon />
                                    <p className="ff_inter font-normal text-base mb-0 ">
                                      View Profile
                                    </p>
                                  </Link>
                                </Menu.Item>
                                <Menu.Item>
                                  <Link
                                    onClick={() =>
                                      handleUpdateStatus(
                                        value.id,
                                        LeadStatus.SUCCEED
                                      )
                                    }
                                    className="flex items-center py-3 px-5 gap-4 cursor-pointer"
                                  >
                                    <SuccedIcon />
                                    <p className="ff_inter font-normal text-base mb-0 ">
                                      Mark Succeed
                                    </p>
                                  </Link>
                                </Menu.Item>
                                <Menu.Item>
                                  <Link
                                    onClick={() =>
                                      handleUpdateStatus(
                                        value.id,
                                        LeadStatus.NOT_INTERESTED
                                      )
                                    }
                                    className="flex items-center py-3 px-5 gap-4 cursor-pointer"
                                  >
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
          )}
        </div>
      </div>
      {/* Conditional Rendering of DeletePage */}
      {showpopup && <DeletePage statuspopup={setShowpopup} />}
    </>
  );
};

export default User;
