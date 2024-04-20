import React, { useRef, useState, useEffect } from "react";
import { Downarrow, FilterIcon, ThreeDotIcon } from "../../Components/Icons";
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
import Navbar from "../../Components/Navbar";
import { StudentgetterContext } from "../../Components/Context/AllStudentsData";
import DeletePage from "../DeletePage";

const User = () => {
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [showpopup, setShowpopup] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [searchCategory, setSearchCategory] = useState("Name");
  // context
  console.log(filteredStudents);
  
  const { studentsData } = StudentgetterContext();
  useEffect(() => {
    const filteredData = studentsData.filter((student) => {
      const fullName = student.name && student.name.toLowerCase(); 
      const email = student.email && student.email.toLowerCase(); 

      if (searchCategory === "Name" && fullName) {
        return fullName.includes(searchValue.toLowerCase());
      } else if (searchCategory === "Email" && email) {
        return email.includes(searchValue.toLowerCase());
      }else {
        return false;
      }
    });
    setFilteredStudents(filteredData);
  }, [studentsData, searchValue, searchCategory]);


  useEffect(() => {
    if (showpopup) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [showpopup]);
  function convertArrayToCSV(array) {
    const headers = [
      "dateofadmission",
      "refferncename",
      "name",
      "first_name",
      "last_name",
      "gender",
      "branch",
      "address_1",
      "state",
      "parent_phone",
      "student_email",
      "variant_name",
      "course_duration",
      "total_fee",
      "last_payment_date",
      "_createdAt",
      "_updatedAt",
      "certificate_no",
      "issue_date",
    ];

    const rows = array.map((obj) => {
      return {
        dateofadmission: obj.dateofadmission, // Update according to your data
        refferncename: obj.refferncename,
        name: obj.name,
        first_name: obj.first_name,
        last_name: obj.last_name,
        gender: obj.gender,
        branch: obj.branch,
        address_1: obj.address_1,
        state: obj.state,
        parent_phone: obj.parent_phone,
        student_email: obj.student_email,
        variant_name: obj.variant_name,
        course_duration: obj.course_duration,
        total_fee: obj.total_fee,
        last_payment_date: obj.last_payment_date,
        _createdAt: obj._createdAt,
        _updatedAt: obj._updatedAt,
        certificate_no: obj.certificate_no,
        issue_date: obj.issue_date,
      };
    });

    const headerRow = headers.join(",");
    const dataRows = rows
      .map((row) => headers.map((header) => row[header]).join(","))
      .join("\n");

    return `${headerRow}\n${dataRows}`;
  }

  function downloadCSV(array) {
    const csv = convertArrayToCSV(array);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "students.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
  // Function to calculate the percentage
  const calculatePercentage = (correctAnswers, totalQuestions) => {
    if (totalQuestions === 0) {
      return 0;
    }
    return ((correctAnswers / totalQuestions) * 100).toFixed(2);
  };
  return (
    <>
      <div className="mt-10">
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
            {/* Dropdown to select search category */}
            <div className="flex items-center gap-[18px]">
               {/* Dropdown for search category */}
               <div className="flex items-center rounded-[10px] py-3 text-[#FF0000] bg-[#EFEFEF]">
                <div className="relative">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
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
                    <div className="absolute right-0 mt-2 w-[100px] origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                      >
                        <button
                          onClick={() => {
                            setIsOpen(false);
                            setSearchCategory("Name");
                          }}
                          className="block w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          Name
                        </button>
                        <button
                          onClick={() => {
                            setIsOpen(false);
                            setSearchCategory("Email");
                          }}
                          className="block w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          Email
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
             
              {/* Filter and Download Buttons */}
              <div className="ff-outfit text-base font-normal text-white ff_inter font-base bg-[#8C8C8C] py-3 gap-[10px] px-[15px] rounded-[10px] flex items-center">
                <FilterIcon />
                Filter
              </div>
              <button
                onClick={() => downloadCSV(filteredStudents)}
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
          <div className="overflow-x-scroll table_hight">
          <table className="table-auto  w-[2979px]">
              <div>
                <thead className="table_head">
                  <tr>
                    <th className=" border border-[#D9D9D9] bg-white ff_inter font-normal text-base text-[#FF0000] px-4 py-2 w-[99px]">
                      <p> Sr.</p>
                    </th>
                    <th className=" border border-[#D9D9D9] bg-white ff_inter font-normal text-base text-[#FF0000] px-4 py-2 w-[310px]">
                      Full Name
                    </th>
                    <th className=" border border-[#D9D9D9] bg-white ff_inter font-normal text-base text-[#FF0000] px-4 py-2 w-[480px]">
                      Test Score
                    </th>
                    <th className=" border border-[#D9D9D9] bg-white ff_inter font-normal text-base text-[#FF0000] px-4 py-2 w-[310px]">
                      Email Address
                    </th>
                    <th className=" border border-[#D9D9D9] bg-white ff_inter font-normal text-base text-[#FF0000] px-4 py-2 w-[220px]">
                      Phone Number
                    </th>
                    <th className=" border border-[#D9D9D9] bg-white ff_inter font-normal text-base text-[#FF0000] px-4 py-2 w-[220px]">
                      Alternate Phone Number
                    </th>
                    <th className=" border border-[#D9D9D9] bg-white ff_inter font-normal text-base text-[#FF0000] px-4 py-2 w-[300px]">
                      The hometown for them
                    </th>
                    <th className=" border border-[#D9D9D9] bg-white ff_inter font-normal text-base text-[#FF0000] px-4 py-2 w-[300px]">
                      The country calling their name for higher studies?
                    </th>
                    <th className=" border border-[#D9D9D9] bg-white ff_inter font-normal text-base text-[#FF0000] px-4 py-2 w-[200px]">
                      Choice of IELTS or PTE
                    </th>
                    <th className=" border border-[#D9D9D9] bg-white ff_inter font-normal text-base text-[#FF0000] px-4 py-2 w-[350px]">
                      School or college they last grace.
                    </th>
                    <th className=" border border-[#D9D9D9] bg-white ff_inter font-normal text-base text-[#FF0000] px-4 py-2 w-[150px]">
                      Age
                    </th>
                    <th className=" text-center border border-[#D9D9D9] bg-white ff_inter font-normal text-base text-[#FF0000] px-4 py-2 w-[100px]">
                      Action
                    </th>
                  </tr>
                </thead>
              </div>
              <div className="overflow-y-auto">
                {filteredStudents.map((value, index) => {
                  const isLastRow = index === TableData.length - 1;
                  // Calculate the percentages for each level
                  const levelPercentages = value.scores.map((score) =>
                    calculatePercentage(
                      score.correctAnswers,
                      score.totalQuestions
                    )
                  );
                  // const level2Percentage = calculatePercentage(
                  //   value.scores[1].correctAnswers,
                  //   value.scores[1].totalQuestions
                  // );
                  // const level3Percentage = calculatePercentage(
                  //   value.scores[2].correctAnswers,
                  //   value.scores[2].totalQuestions
                  // );
                  return (
                    <tr className="!w-full">
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

                      <td className="border w-[310px] border-[#D9D9D9] px-4 py-2 ff_inter font-normal text-base text-[#808080] text-center">
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
                      <td
                        className="border w-[200px] border-[#D9D9D9] px-4 py-2 ff_inter font-normal text-base text-center"
                      >
                        {value.IeltsOrPte}
                      </td>
                      <td className="border w-[350px] border-[#D9D9D9] px-4 py-2 ff_inter font-normal text-base text-[#808080] text-center">
                        xyz high school
                      </td>
                      <td className="border w-[150px] border-[#D9D9D9] px-4 py-2 ff_inter font-normal text-base text-[#808080] text-center">
                        24 Years
                      </td>
                      <td className=" border w-[100px] relative border-[#D9D9D9] px-4 py-2 ff_inter font-normal text-base  text-[#808080] text-center">
                        <div className="relative">
                          <Menu>
                            <Menu.Button className="inline-flex justify-center w-full cursor-pointer">
                              <ThreeDotIcon />
                            </Menu.Button>
                            <Menu.Items
                              className={`absolute right-10 z-20 -top-[20px] mt-2 w-56 origin-top-right max-w-48 rounded-lg border border-solid bg-white border-[#D9D9D9]${
                                isLastRow ? "transform translate-y-[-70%]" : ""
                              }`}
                            >
                              <Menu.Item>
                                <Link
                                  // to={`/users/veiwprofile/${value.id}`}
                                  className="flex items-center py-3 px-5 gap-4 cursor-pointer"
                                >
                                  <ViewIcon />
                                  <p className="ff_inter font-normal text-base mb-0 text-[#808080]">
                                    View Profile
                                  </p>
                                </Link>
                              </Menu.Item>
                              <Menu.Item disabled>
                                <Link
                                  // to="/users/newuser"
                                  className="flex items-center py-3 px-5 gap-4 cursor-pointer"
                                >
                                  <EditIcon />
                                  <p className="ff_inter font-normal text-base mb-0 text-[#808080]">
                                    Edit Profile
                                  </p>
                                </Link>
                              </Menu.Item>
                              <Menu.Item>
                                <Link
                                  onClick={() => {
                                    setShowpopup(true);
                                  }}
                                  className="flex items-center py-3 px-5 gap-4 cursor-pointer"
                                >
                                  <BinIcon />
                                  <p className="ff_inter font-normal text-base mb-0 text-[#808080]">
                                    Delete
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
              </div>
            </table>
          </div>
        </div>
      </div>
      {/* Conditional Rendering of DeletePage */}
      {showpopup && <DeletePage statuspopup={setShowpopup} />}
    </>
  );
};

export default User;
