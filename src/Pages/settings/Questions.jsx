import React, { useState } from "react";
import AddQuestionnaire from "./AddQuestionnaire";
import { DeleteIcon, EditIcon } from "../../Components/Icons";

const Questions = ({ mapData, }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [showAddQuestionnaire, setShowAddQuestionnaire] = useState(false);
  const handleEdit = (index) => {
    setEditingIndex(index);
    setShowAddQuestionnaire(index);
    // You can add further logic here to handle editing
  };

  const handleDelete = (index) => {
    // You can add logic here to delete the question
    console.log("Delete question at index:", index);
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
    <div>
      {mapData.map((data, index) => {
        return (
          <div
            key={index}
            className="border border-black/20 p-2.5 rounded-[10px] mt-2.5"
          >
            <div className="flex justify-between items-center ">
              <h2 className="font-normal text-base ff_ubuntu text-black uppercase">
                q: {data.Q}
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
              {data.ans.map((ops, index) => (
                <li
                  key={index}
                  className="ff_ubuntu font-normal text-xsm text-black capitalize mt-1.5"
                >
                  {ops.option}
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
