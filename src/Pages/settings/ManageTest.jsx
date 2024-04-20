// import React, { useState } from "react";
// import { AddItemIcon } from "../../Components/Icons";
// import AddQuestionnaire from "./AddQuestionnaire";
// import Level from "./Level";
// import Questions from "./Questions";
// import { questionOption } from "../../Components/Helper";
// import Navbar from "../../Components/Navbar";

// const ManageTest = () => {
//   const [levels, setLevels] = useState([
//     { id: 1, level: "1" },
//     { id: 2, level: "2" },
//     { id: 3, level: "3" },
//   ]);
//   const [showPopups, setShowPopups] = useState(false);
//   const deleteLevel = (levelId) => {
//         const updatedLevels = levels.filter((level) => level.id !== levelId);
//         setLevels(updatedLevels);
//       };
//   return (
//     <>
//       <div className="h-14">
//         <Navbar navbarData="Manage Leads" data="Settings / Questions" />
//       </div>
//       <div className="px-[30px] mt-6 py-5 bg-[#F8F9FA]">
//         <div className="flex justify-between items-center py-5">
//           <h2 className="font-semibold text-lg ff_outfit text-black capitalize">
//             Test List
//           </h2>
//           <button
//             onClick={() => setShowPopups(true)}
//             className="ff_outfit bg-[#FF2000] text-white font-normal text-base flex items-center justify-center rounded-[10px] gap-2 outline-none border border-transparent py-2.5 px-3 hover:bg-transparent hover:border-[#ff2000] hover:text-[#ff2000] duration-300 group"
//           >
//             <AddItemIcon /> Add New Questionnaire
//           </button>
//           {showPopups && (
//             <div className="fixed z-40 top-0 left-0 w-screen h-screen flex justify-center items-center">
//               <div
//                 onClick={() => setShowPopups(false)}
//                 className="w-screen h-screen fixed top-0 left-0 bg-black/50"
//               ></div>
//               <AddQuestionnaire
//                 setShowPopups={setShowPopups}
//                 levels={levels}
//                 setLevels={setLevels}
//               />
//             </div>
//           )}
//         </div>
//         <div className="overflow-auto question_height">
//           <div className="flex -mx-2 min-w-[1500px]">
//             {levels.map((level) => (
//               <div key={level.id} className="w-4/12 px-2">
//                 <div className="bg-white p-5 rounded-[10px]  overflow-auto">
//                   <Level
//                     level={level.level}
//                     deleteLevel={() => deleteLevel(level.id)}
//                   />
//                   <Questions mapData={questionOption} />

//                   <Questions mapData={questionOption} />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ManageTest;
import React from "react";

export default function ManageTest() {
  return (
    <div className="p-10">
      <h1 className="text-5xl text-center">Comimg Soon</h1>
    </div>
  );
}
