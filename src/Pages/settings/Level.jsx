// import React, { useState } from "react";
// import { AddItemIcon, ,  } from "../../Components/Icons";
// import AddQuestionsField from "./AddQuestionsField";
// import { LevelData } from "../../Components/Helper";

// const Level = ({ level, addedQuestionCls, deleteLevel }) => {
//   const [showPopups, setShowPopups] = useState(false);


//   return (
//     <>
//       <div
//         className={`border-b border-black/20 mt-3 bg-white ${addedQuestionCls}`}
//       >
//         {LevelData.map((value, i) => {
//           return (
//             <>
//               <div className="flex justify-between items-center">
//                 <h2 className="font-semibold text-lg ff_outfit text-black capitalize">
//                   Level :{value.level}
//                 </h2>
//                 <div className="flex items-center justify-center gap-2">
//                   <span className="cursor-pointer">
//                     <EditIcon />
//                   </span>
//                   <span className="cursor-pointer" onClick={deleteLevel}>
//                     <DeleteIcon />
//                   </span>
//                 </div>
//               </div>
//               <p className="font-normal ff_outfit text-base text-black capitalize">
//                 {value.desc}
//               </p>
//             </>
//           );
//         })}
//         <div className="flex justify-end mt-2.5">
//           <button
//             onClick={() => setShowPopups(true)}
//             className="ff_ubuntu text-[#ff2000] font-normal text-base flex items-center rounded-[10px] outline-none border border-transparent py-2.5 px-3 level_add_btn"
//           >
//             + Add Question
//           </button>
//           {showPopups && (
//             <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center">
//               <div
//                 onClick={() => setShowPopups(false)}
//                 className="w-screen h-screen fixed top-0 left-0 bg-black/50"
//               ></div>

//               <AddQuestionsField setShowPopups={setShowPopups} />
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Level;