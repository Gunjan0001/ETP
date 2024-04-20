// import React, { useState } from "react";
// import Level from "./Level";
// import { AddItemIcon } from "../../Components/Icons";

// const AddQuestionnaire = ({
//   setShowAddQuestionnaire,
//   handleChangeQuestion,
//   setShowPopups,
//   levels,
//   setLevels,
// }) => {
//   const [submitQuestion, setSubmitQuestions] = useState({
//     title: "",
//     des: "",
//   });

//   function handleInputChange(e) {
//     let name = e.target.name;
//     let value = e.target.value;
//     setSubmitQuestions({ ...submitQuestion, [name]: value });
//   }

//   const onHandleSubmit = (e) => {
//     e.preventDefault();
//     handleChangeQuestion(submitQuestion);
//     setSubmitQuestions({
//       title: "",
//       des: "",
//     });
//   };

//   const addNewLevel = () => {
//     const newLevel = {
//       id: levels.length + 1, // Generate a unique ID
//       level: "", // You can set some default value here
//     };
//     setLevels([...levels, newLevel]);
//   };

//   return (
//     <div className="bg-white p-5 rounded-[10px] flex flex-col gap-2.5 w-[490px] max-w-[490px] z-10">
//       <h2 className="ff_ubuntu font-bold text-lg capitalize text-black">
//         Add Questionnaire
//       </h2>
//       <form onSubmit={onHandleSubmit} className="flex flex-col gap-2.5">
//         <div className="flex flex-col gap-1">
//           <label
//             htmlFor="title"
//             className="ff_ubuntu font-normal text-sm text-black capitalize"
//           >
//             Title
//           </label>
//           <input
//             className="border-none outline-none p-2.5 text-black/50 bg-[#EEEEEE] text-base rounded-[10px]"
//             id="title"
//             placeholder="Enter Title"
//             type="text"
//             name="title"
//             required
//             value={submitQuestion.title}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div className="flex flex-col gap-1">
//           <label htmlFor="des">Description</label>{" "}
//           <textarea
//             className="border-none outline-none p-2.5 text-black/50 bg-[#EEEEEE] text-base rounded-[10px] h-[80px] resize-none"
//             name="des"
//             id="des"
//             required
//             placeholder="Enter detailed instructions"
//             value={submitQuestion.des}
//             onChange={handleInputChange}
//           ></textarea>
//         </div>
//         <div className="flex justify-end">
//           <button
//             type="button" // Change type to "button"
//             onClick={() => {
//               setShowPopups(false);
//               addNewLevel(); // Add a new level when clicked
//             }}
//             className="ff_outfit bg-[#FF2000] text-white font-normal text-base flex items-center justify-center rounded-[10px] gap-2 outline-none border border-transparent py-2.5 px-3 hover:bg-transparent hover:border-[#ff2000] hover:text-[#ff2000] duration-300 group"
//           >
//             <AddItemIcon /> Add Section
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddQuestionnaire;
