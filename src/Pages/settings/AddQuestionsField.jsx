import React, { useState } from "react";
import {
  AddItemIcon,
  ChooseOptionActiveIcon,
  ChooseOptionIcon,
  ResetIcon,
} from "../../Components/Icons";
import { chooseOptionsData } from "../../Components/Helper";
import Level from "./Level";

const AddQuestionsField = ({ setShowPopups }) => {
  const [chooseAns, setChooseAns] = useState(false);
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
    <div className="bg-white p-5 rounded-[10px] flex flex-col gap-2.5 w-[490px] max-w-[490px]  z-40">
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
          <label htmlFor="des">Description (optional)</label>
          <textarea
            className="border-none outline-none p-2.5 text-black/50 bg-[#EEEEEE] text-base rounded-[10px] h-[44px] resize-none"
            name="des"
            id="des"
            placeholder="Question hint / details"
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setAddQuestions(!addQuestions)}
            className="ff_ubuntu text-[#ff2000] font-normal text-sm flex items-center rounded-[10px] outline-none border border-transparent level_add_btn"
          >
            + Add Option
          </button>
        </div>
        <div
          className={`border-t border-black/20 pt-5 mt-5 gap-2.5 ${
            addQuestions ? "block" : "hidden"
          }`}
        >
          {chooseOptionsData.map((obj, i) => (
            <label key={i} htmlFor="" className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <h2 className="ff_ubuntu font-normal text-sm text-black capitalize ">
                  Option {obj.option}
                </h2>
                <h2
                  onClick={() => setChooseAns("index")}
                  className="ff_ubuntu font-normal text-sm text-black capitalize flex gap-1 group"
                >
                  Answer
                  {chooseAns === "index" ? (
                    <ChooseOptionIcon />
                  ) : (
                    <ChooseOptionActiveIcon />
                  )}
                </h2>
              </div>
              <input
                type="text"
                className="border-none outline-none p-2.5 my-2 text-black/50 bg-[#EEEEEE] text-base rounded-[10px] h-[44px] resize-none w-full"
              />
            </label>
          ))}
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
      </form>
    </div>
  );
};
export default AddQuestionsField;
