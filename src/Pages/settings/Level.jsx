import React, { useEffect, useState } from "react";
import { AddItemIcon, DeleteIcon, EditIcon } from "../../Components/Icons";
import AddQuestionsField from "./AddQuestionsField";
import { QuestiongetterContext } from "../../Components/Context/TestQuestions";
const Level = ({
  level,
  addedQuestionCls,
  deleteLevel,
  description,
  title,
  LevelId,
  editLevel,
}) => {
  const [showPopups, setShowPopups] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
 
  useEffect(() => {
    if (deletePopup || showPopups) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [deletePopup, showPopups]);
 
  return (
    <>
      {deletePopup === true ? (
        <div className="w-[100%] h-[100%] fixed top-0 left-0 bg-black/50 z-[60]"></div>
      ) : null}
      <div
        className={`border-b border-black/20 mt-3 bg-white ${addedQuestionCls}`}
      >
        <div className="flex justify-between items-center">
         <div>
         <h2 className="font-semibold text-lg ff_outfit text-black capitalize">
            Level :{level}
          </h2>
          <h2 className="text-base ff_outfit text-black capitalize">
          {title}
          </h2>
         </div>
          {deletePopup === true ? (
            <div className="w-[500px]  bg-white fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-8  rounded-2xl z-[100]">
              <p className="text-lg font-medium text-black text-center">
                Are you sure want to delete this Level
              </p>
              <div className="flex items-center justify-center gap-11 mt-6">
                <button
                  onClick={() => setDeletePopup(false)}
                  className="text-base font-medium border-[1px] border-[black] py-2 px-4 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    deleteLevel();
                    setDeletePopup(false);
                  }}
                  className="text-base font-medium  py-[10px] px-4 rounded-md bg-[#FF2000] text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          ) : null}
          <div className="flex items-center justify-center gap-2">
            <span className="cursor-pointer" onClick={editLevel}>
              <EditIcon />
            </span>
            <span
              className="cursor-pointer"
              onClick={() => setDeletePopup(true)}
            >
              <DeleteIcon />
            </span>
          </div>
        </div>
        <p className="font-normal ff_outfit text-base text-black capitalize">
          {description}
        </p>
        <div className="flex justify-end mt-2.5">
          <button
            onClick={() => setShowPopups(true)}
            className="ff_ubuntu text-[#ff2000] font-normal text-base flex items-center rounded-[10px] outline-none border border-transparent py-2.5 px-3 level_add_btn"
          >
            + Add Question
          </button>
          {showPopups && (
            <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-50">
              <div
                onClick={() => setShowPopups(false)}
                className="w-screen h-screen fixed top-0 left-0 bg-black/50"
              ></div>
              <AddQuestionsField
                setShowPopups={setShowPopups}
                levelId={LevelId}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Level;
