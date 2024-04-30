import React, { useEffect, useState } from "react";
import { AddItemIcon } from "../../Components/Icons";
import AddQuestionnaire from "./AddQuestionnaire";
import Level from "./Level";
import Questions from "./Questions";
import { questionOption } from "../../Components/Helper";
import { QuestiongetterContext } from "../../Components/Context/TestQuestions";
import Loader from "../Loader";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import Navbar from "../../Components/Navbar";

import { toast } from "react-toastify"; // Add this line
import "react-toastify/dist/ReactToastify.css"; // Add this line
const ManageTest = () => {
  const { QuestionsData, updateQuestionData, DeleteQuestionarie } =
    QuestiongetterContext();
  const [showPopups, setShowPopups] = useState(false);
  const [loading, setloading] = useState(false);
  const [editData, setEditData] = useState(null);
  const [levelId, setLevelId] = useState(null);
  // console.log(QuestionsData);
  useEffect(() => {
    if (showPopups) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [showPopups]);
  const deleteLevel = async (levelId) => {
    try {
      setloading(true);
      await deleteDoc(doc(db, "Test", levelId));
      DeleteQuestionarie(levelId);
      setloading(false);
      toast.success("Level Delete successfully", {
        position: "top-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      setloading(false);
      toast.success("Level not Delete", {
        position: "top-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log("Error in Delete Questionarie ", error);
    }
  };
  const editLevel = (title, description, lavelId) => {
    setShowPopups(true);
    setloading(true);
    setEditData({ title, description });
    setLevelId(lavelId); // Set title and description in state
    setloading(false);
  };
  if (loading) {
    return <Loader></Loader>;
  }

  return (
    <>
      <Navbar
        navbarData="Manage Test"
        startData="Settings / "
        data="Questions"
      />
      <div className="px-[30px] py-5 bg-[#F8F9FA] mt-20">
        <div className="flex justify-between items-center py-5">
          <h2 className="font-semibold text-lg ff_outfit text-black capitalize">
            Test List
          </h2>
          {/* <button
            onClick={() => setShowPopups(true)}
            className="ff_outfit bg-[#FF2000] text-white font-normal text-base flex items-center justify-center rounded-[10px] gap-2 outline-none border border-transparent py-2.5 px-3 hover:bg-transparent hover:border-[#ff2000] hover:text-[#ff2000] duration-300 group"
          >
            <AddItemIcon /> Add New Questionnaire
          </button> */}
          <button
            onClick={() => {
              if (QuestionsData && QuestionsData.length >= 3) {
                setShowPopups(false);
                setEditData(null);
              } else {
                setShowPopups(true);
              }
            }}
            disabled={QuestionsData && QuestionsData.length >= 3}
            className={`ff_outfit bg-[#FF2000] text-white font-normal text-base flex items-center justify-center rounded-[10px] gap-2 outline-none border border-transparent py-2.5 px-3 hover:bg-transparent hover:border-[#ff2000] hover:text-[#ff2000] duration-300 group ${
              QuestionsData && QuestionsData.length >= 3
                ? "opacity-50 pointer-events-none "
                : ""
            }`}
          >
            <AddItemIcon /> Add New Questionnaire
          </button>

          {showPopups && (
            <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-[60]">
              <div
                onClick={() => {
                  setShowPopups(false);
                  setEditData(null);
                }}
                className="w-screen h-screen fixed top-0 left-0 bg-black/50 z-[40]"
              ></div>

              <AddQuestionnaire
                className="relative z-[70]"
                hanleclosepopup={() => setShowPopups(false)}
                setShowPopups={setShowPopups}
                editData={editData}
                lavelId={levelId}
              />
            </div>
          )}
        </div>
        <div className="overflow-auto">
          <div className="flex -mx-2 min-w-[1500px]">
            {QuestionsData &&
              QuestionsData.length > 0 &&
              QuestionsData.sort((a, b) => a.Level - b.Level).map((level) => (
                <div key={level.id} className="w-4/12 px-2">
                  <div className="bg-white p-5 rounded-[10px]">
                    <Level
                      className="fixed top-0  z-10"
                      level={level.Level}
                      title={level.LevelTitle}
                      description={level.instructionText}
                      deleteLevel={() => deleteLevel(level.id)}
                      LevelId={level.id}
                      editLevel={() =>
                        editLevel(
                          level.LevelTitle,
                          level.instructionText,
                          level.id
                        )
                      }
                    />
                    <Questions
                      className="relative z-10"
                      mapData={level.questions}
                      LevelId={level.id}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageTest;
