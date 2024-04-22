// import React, { useState } from "react";
// import Navbar from "../../Components/Navbar";
// import { AddItemIcon, EditIcon, DeleteIcon } from "../../Components/Icons";
// import AddQuestionnaire from "./AddQuestionnaire";
// import Level from "./Level";

// const Test = () => {
//   const [showPopups, setShowPopups] = useState(false);
//   const [titleQus, setTitleQus] = useState([
//     {
//       level: 1,
//       desc: "vikram",
//       qusOpt: [
//         {
//           question: "question1",
//           options: [ { id: 1, text: "ram" },
//           { id: 2, text: "harish" },
//           { id: 3, text: "vikram" },],
//         },
//       ],
//     },
//     {
//       level: 2,
//       desc: "vikram2",
//       qusOpt: [
//         [ { id: 1, text:  "harish"},
//         { id: 2, text: "ram" },
//         { id: 3, text: "vikram" },],
//       ],
//     },
//   ]);
//   function addTitileQuestion() {}
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
//               <div className="bg-white p-5 rounded-[10px] flex flex-col gap-2.5 w-[490px] max-w-[490px] z-10">
//                 <h2 className="ff_ubuntu font-bold text-lg capitalize text-black">
//                   Add Questionnaire
//                 </h2>
//                 <form className="flex flex-col gap-2.5">
//                   <div className="flex flex-col gap-1">
//                     <label
//                       htmlFor="title"
//                       className="ff_ubuntu font-normal text-sm text-black capitalize"
//                     >
//                       Title
//                     </label>
//                     <input
//                       onChange={addTitileQuestion}
//                       className="border-none outline-none p-2.5 text-black/50 bg-[#EEEEEE] text-base rounded-[10px]"
//                       id="title"
//                       placeholder="Enter Title"
//                       type="text"
//                       name="level"
//                       required
//                       value=""
//                     />
//                   </div>
//                   <div className="flex flex-col gap-1">
//                     <label htmlFor="des">Description</label>
//                     <textarea
//                       className="border-none outline-none p-2.5 text-black/50 bg-[#EEEEEE] text-base rounded-[10px] h-[80px] resize-none"
//                       name="des"
//                       id="des"
//                       required
//                       placeholder="Enter detailed instructions"
//                     ></textarea>
//                   </div>
//                   <div className="flex justify-end">
//                     <button
//                       type="button"
//                       onClick={() => {
//                         setShowPopups(false);
//                       }}
//                       className="ff_outfit bg-[#FF2000] text-white font-normal text-base flex items-center justify-center rounded-[10px] gap-2 outline-none border border-transparent py-2.5 px-3 hover:bg-transparent hover:border-[#ff2000] hover:text-[#ff2000] duration-300 group"
//                     >
//                       <AddItemIcon /> Add Section
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           )}
//         </div>
//         <div className="overflow-auto question_height">
//           <div className="flex -mx-2 min-w-[1500px]">
//             <div className=" px-2">
//               <div className="">
//                 <div className="mt-3 flex items-start gap-[20px]">
//                   {titleQus.map((value, index) => {
//                     return (
//                       <div className="bg-white p-5 rounded-[10px]  min-w-[436px] ">
//                         <div>
//                           <div className="flex justify-between items-center">
//                             <h2 className="font-semibold text-lg ff_outfit text-black capitalize">
//                               Level :{value.level}
//                             </h2>
//                             <div className="flex items-center justify-center gap-2">
//                               <span className="cursor-pointer">
//                                 <EditIcon />
//                               </span>
//                               <span className="cursor-pointer">
//                                 <DeleteIcon />
//                               </span>
//                             </div>
//                           </div>
//                           <p className="font-normal ff_outfit text-base text-black capitalize">
//                             {value.desc}
//                           </p>
//                           <div>{value.option}</div>
//                           <div className="text-end border-b border-black/20">
//                             <button
//                               onClick={() => setShowPopups(true)}
//                               className="ff_ubuntu text-[#ff2000] font-normal text-base  outline-none border border-transparent py-2.5 px-3 level_add_btn"
//                             >
//                               + Add Question
//                             </button>
//                           </div>
//                         </div>
//                         <div>
//                           <p>{value.qusOpt[0].question}</p>
//                           <p> {value.qusOpt[0].options[index]}</p>
//                         </div>
//                       </div>
//                     );
//                   })}
//                   <div className="flex justify-end mt-2.5">
//                     {showPopups && (
//                       <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center">
//                         <div
//                           onClick={() => setShowPopups(false)}
//                           className="w-screen h-screen fixed top-0 left-0 bg-black/50"
//                         ></div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Test;
