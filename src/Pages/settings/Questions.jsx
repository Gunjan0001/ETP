import React, { useState } from "react";
import { DeleteIcon, EditIcon } from "../../Components/Icons";
import AddQuestionnaire from "./AddQuestionnaire";
import { doc, deleteDoc ,updateDoc} from "firebase/firestore";
import { db } from "../../firebase";

const Questions = ({ mapData, LevelId }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [showAddQuestionnaire, setShowAddQuestionnaire] = useState(false);
  const handleEdit = (index) => {
    setEditingIndex(index);
    setShowAddQuestionnaire(index);
    // You can add further logic here to handle editing
  };

  const handleDelete = async (index) => {
    try {

      let new_data = [];
      
      for (const item in mapData) {
        if(item !== mapData[index]){
          new_data.push(item);
        }
      }
      console.log(mapData);
      console.log(new_data);

      
      // const  json = mapData.splice(index, 1);
      
      
      // Construct the document reference based on your data structure
      const docRef = doc(db, "Test" ,LevelId);
      updateDoc(docRef, {questions: new_data});
     console.log(LevelId);
    //  docRef.updateDoc()
     
      // Delete the document
      // await deleteDoc(docRef);
      console.log("Successfully deleted document with index:", index);
    } catch (error) {
      console.error("Error deleting document:", error.message);
    }
  };
  const handleAddQuestion = () => {
    setShowAddQuestionnaire(true);
  };

  const handleChangeQuestion = (newQuestion) => {
    // Logic to update the question at the editingIndex
    console.log("Updated question:", newQuestion);
    setEditingIndex(null);
  };
  return (
    <div className="overflow-y-scroll Question_height relative z-10">
      {mapData && mapData.length > 0 && mapData.map((data, index) => {
        console.log(data);
        
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
                  onClick={() => handleDelete(index)}
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
        <AddQuestionnaire
          setShowPopups={setShowAddQuestionnaire}
          handleChangeQuestion={handleChangeQuestion}
        />
      )}
    </div>
  );
};

export default Questions;
