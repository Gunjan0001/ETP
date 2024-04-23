import React, { useState } from "react";
import { AddItemIcon, ResetIcon } from "../../Components/Icons";
import Level from "./Level";

const AddQuestion = ({ setShowPopups }) => {
  const [addQuestions, setAddQuestions] = useState(false);

  const [submitQuestion, setSubmitQuestions] = useState({
    title: "",
    des: "",
  });
  function handleInputChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    setSubmitQuestions({ ...submitQuestion, [name]: value });
  }
  const onHandleSubmit = (e) => {
    e.preventDefault();
    // setShowPopups(false);
    setAddQuestions(true);
    setSubmitQuestions({
      title: "",
      des: "",
    });
    };
    
  return (
    <div className="bg-white p-5 rounded-[10px] flex flex-col gap-2.5 w-[490px] max-w-[490px] z-10">
      <h2 className="ff_ubuntu font-bold text-lg capitalize text-black">
        Add Question
      </h2>
      <form onSubmit={onHandleSubmit} className="flex flex-col gap-2.5">
        <div className="flex flex-col gap-1">
          <label
            htmlFor="title"
            className="ff_ubuntu font-normal text-sm text-black capitalize"
          >
            Question
          </label>
          <input
            className="border-none outline-none p-2.5 text-black/50 bg-[#EEEEEE] text-base rounded-[10px]"
            id="title"
            placeholder="Enter Your Question"
            type="text"
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="des">Description (optional)</label>{" "}
          <textarea
            className="border-none outline-none p-2.5 text-black/50 bg-[#EEEEEE] text-base rounded-[10px] h-[44px] resize-none"
            name="des"
            id="des"
            required
            placeholder="Question hint / details"
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => setShowPopups(true)}
            className="ff_ubuntu text-[#ff2000] font-normal text-sm flex items-center rounded-[10px] outline-none border border-transparent level_add_btn"
          >
            <AddItemIcon />
            Add Question
          </button>
        </div>
        <div className="flex justify-end gap-2 border-t border-black/20 pt-5 mt-5">
          <button className="ff_outfit bg-[#8C8C8C] text-white font-normal text-base flex items-center justify-center rounded-[10px] gap-2 outline-none border border-transparent py-2.5 px-3 ">
            <ResetIcon /> Reset
          </button>
          <button
            type="submit"
            className="ff_outfit bg-[#FF2000] text-white font-normal text-base flex items-center justify-center rounded-[10px] gap-2 outline-none border border-transparent py-2.5 px-3 hover:bg-transparent hover:border-[#ff2000] hover:text-[#ff2000] duration-300 group"
          >
            <AddItemIcon /> Add
          </button>
        </div>
        {addQuestions && (
          <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-30">
            <div
              onClick={() => setAddQuestions(false)}
              className="w-screen h-screen fixed top-0 left-0 bg-black/50"
            ></div>

            <Level addedQuestionCls="w-[436px] p-5 rounded-[10px] relative z-20" />
          </div>
        )}
      </form>
    </div>
  );
};

export default AddQuestion;
