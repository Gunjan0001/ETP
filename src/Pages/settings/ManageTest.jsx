import React, { useState } from "react";
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

const ManageTest = () => {
  const { QuestionsData, updateQuestionData, DeleteQuestionarie } =
    QuestiongetterContext();
  const [showPopups, setShowPopups] = useState(false);
  const [loading, setloading] = useState(false);
  // console.log(QuestionsData);

  const deleteLevel = async (levelId) => {
    try {
      setloading(true);
      await deleteDoc(doc(db, "Test", levelId));
      DeleteQuestionarie(levelId);
      setloading(false);
    } catch (error) {
      setloading(false);
      console.log("Error in Delete Questionarie ", error);
    }
  };

  if (loading) {
    return <Loader></Loader>;
  }
  return (
    <>
    <Navbar navbarData="Manage Test" startData="Settings / " data="Questions"/>
    <div className="px-[30px] py-5 bg-[#F8F9FA] mt-20">
      <div className="flex justify-between items-center py-5">
        <h2 className="font-semibold text-lg ff_outfit text-black capitalize">
          Test List
        </h2>
        <button
          onClick={() => setShowPopups(true)}
          className="ff_outfit bg-[#FF2000] text-white font-normal text-base flex items-center justify-center rounded-[10px] gap-2 outline-none border border-transparent py-2.5 px-3 hover:bg-transparent hover:border-[#ff2000] hover:text-[#ff2000] duration-300 group"
        >
          <AddItemIcon /> Add New Questionnaire
        </button>
        {showPopups && (
          <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-40">
            <div
              onClick={() => setShowPopups(false)}
              className="w-screen h-screen fixed top-0 left-0 bg-black/50 "
            ></div>

            <AddQuestionnaire
              className="relative z-50"
              hanleclosepopup={() => setShowPopups(false)}
              setShowPopups={setShowPopups}
            />
          </div>
        )}
      </div>
      <div className="overflow-auto">
        <div className="flex -mx-2 min-w-[1500px]">
          {QuestionsData &&
            QuestionsData.length > 0 &&
            QuestionsData.map((level) => (
              <div key={level.id} className="w-4/12 px-2">
                <div className="bg-white p-5 rounded-[10px] ">
                  <Level
                    className="fixed top-0  z-10"
                    level={level.Level}
                    title={level.LevelTitle}
                    description={level.instructionText}
                    deleteLevel={() => deleteLevel(level.id)}
                    LevelId={level.id}
                  />
                  <Questions className="relative z-10" mapData={level.questions} />
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
