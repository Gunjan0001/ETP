import React, { useEffect, useState } from "react";
import { DeleteIcon, EditIcon } from "../../Components/Icons";
import AddQuestionnaire from "./AddQuestionnaire";
import { doc, deleteDoc ,updateDoc} from "firebase/firestore";
import { db } from "../../firebase";
import Loader from "../Loader";
import { QuestiongetterContext } from "../../Components/Context/TestQuestions";
import AddQuestionsField from "./AddQuestionsField";
const Questions = ({ mapData, LevelId }) => {
  const {handleDelete}=QuestiongetterContext()
  const[loading, setloading]=useState(false)
  const [editingIndex, setEditingIndex] = useState(null);
  const [showAddQuestionnaire, setShowAddQuestionnaire] = useState(false);
  const [editQuestionData, setEditQuestionData] = useState(null);
  const handleEdit = (index) => {
    setEditingIndex(index);
    setShowAddQuestionnaire(true);
    const questionData = mapData[index];
    setEditQuestionData(questionData);
    // You can add further logic here to handle editing
  };

  useEffect(() => {
    console.log("first Ata is ", editQuestionData)
  },[editQuestionData])

  const handleAddQuestion = () => {
    setShowAddQuestionnaire(true);
  };

  // const handleChangeQuestion = (newQuestion) => {
  //   // Logic to update the question at the editingIndex
  //   console.log("Updated question:", newQuestion);
  //   setEditingIndex(null);
  // };
  if(loading){
   return <Loader />
  }
  return (
    <div className="overflow-y-scroll Question_height relative z-10">
      {mapData && mapData.length > 0 && mapData.map((data, index) => {
        // console.log(data);
        return (
          <div
            key={index}
            className="border border-black/20 p-2.5 rounded-[10px] mt-2.5"
          >
            <div className="flex justify-between items-center ">
              <h2 className="font-normal text-base ff_ubuntu text-black uppercase">
                q: {data.question}
              </h2>
              <div className="flex items-center justify-center gap-2">
                <span
                  className="cursor-pointer"
                  onClick={() => handleEdit(index)}
                >
                  <EditIcon />
                </span>
                <span
                  className="cursor-pointer"
                  onClick={() => handleDelete(index,LevelId)}
                >
                  <DeleteIcon />
                </span>
              </div>
            </div>
            <ul className="ps-5">
              {data.answeroption.map((ops, index) => (
                <li
                  key={index}
                  className="ff_ubuntu font-normal text-xsm text-black capitalize mt-1.5"
                >
                {ops.optionNo} {ops.answertext}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
      {showAddQuestionnaire && (
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-40">
          <div onClick={() => setShowAddQuestionnaire(false)}
            className="w-screen h-screen fixed top-0 left-0 bg-black/50"
          ></div>
          <AddQuestionsField
            setShowPopups={setShowAddQuestionnaire}
            editQuestionData={editQuestionData}
            editingIndex={editingIndex}
            LevelIDD={LevelId}
          />
        </div>
      )}
    </div>
  );
};

export default Questions;
