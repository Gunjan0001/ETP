import React, { useEffect, useState } from 'react';
import { DeleteIcon, EditIcon } from '../../Components/Icons';
import AddQuestion from './AddQuestion';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import AddQuestionsField from './AddQuestionsField';

const Questions = ({ mapData, LevelId }) => {
  const [editingQus, setEditingQus] = useState([]);
  const [editingQusIndex, setEditingQusIndex] = useState(null);
  const [showAddQuestionnaire, setShowAddQuestionnaire] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const handleEdit = (index) => {
    let filterQues = mapData.filter((qus, i) => i === index);
    setEditingQus(filterQues);
    setShowAddQuestionnaire(true);
    setEditingQusIndex(index);
    // console.log(filterQues)
    // You can add further logic here to handle editing
  };
  const handleDelete = async (index) => {
    try {
      // let new_data = [];
      let filterQues = mapData.filter((qus, i) => i !== index);
      // for (const item in mapData) {
      //   if (item !== index) {
      //     new_data.push(mapData[item]);
      //   }
      // }
      // console.log(new_data);
      const docRef = doc(db, 'Test', LevelId);
      updateDoc(docRef, { questions: filterQues });
      console.log('Successfully deleted document with index:', index);
    } catch (error) {
      console.error('Error deleting document:', error.message);
    }
  };

  const handleAddQuestion = () => {
    setShowAddQuestionnaire(true);
  };
  useEffect(() => {
    if (deletePopup || showAddQuestionnaire) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [deletePopup, showAddQuestionnaire]);
  // const handleChangeQuestion = (newQuestion) => {
  //   // Logic to update the question at the editingIndex
  //   console.log('Updated question:', newQuestion);
  //   setEditingIndex(null);
  // };
  return (
    <div className="overflow-y-scroll Question_height relative">
      {deletePopup === true ? (
        <div className="w-[100%] h-[100%] fixed top-0 left-0 bg-black/50 z-[60]"></div>
      ) : null}
      {mapData &&
        mapData.length > 0 &&
        mapData.map((data, index) => {
          return (
            <div key={index} className="border border-black/20 p-2.5 rounded-[10px] mt-2.5">
              <div className="flex justify-between items-center ">
                <h2 className="font-normal text-base ff_ubuntu text-black uppercase">
                  q: {data.question}
                </h2>
                {deletePopup === true ? (
                  <div className="w-[500px]  bg-white fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-8  rounded-2xl z-[100]">
                    <p className="text-lg font-medium text-black text-center">
                      Are you sure want to delete this question
                    </p>
                    <div className="flex items-center justify-center gap-11 mt-6">
                      <button
                        onClick={() => setDeletePopup(false)}
                        className="text-base font-medium border-[1px] border-[black] py-2 px-4 rounded-md">
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          handleDelete(index);
                          setDeletePopup(false);
                        }}
                        className="text-base font-medium  py-[10px] px-4 rounded-md bg-[#FF2000] text-white">
                        Delete
                      </button>
                    </div>
                  </div>
                ) : null}
                <div className="flex items-center justify-center gap-2">
                  <span className="cursor-pointer" onClick={() => handleEdit(index)}>
                    <EditIcon />
                  </span>
                  <span className="cursor-pointer" onClick={() => setDeletePopup(true)}>
                    <DeleteIcon />
                  </span>
                </div>
              </div>
              <ul className="ps-5">
                {data.answeroption.map((ops, index) => (
                  <li
                    key={index}
                    className="ff_ubuntu font-normal text-xsm text-black capitalize mt-1.5">
                    {ops.optionNo} {ops.answertext}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}

      {showAddQuestionnaire && (
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-[100]">
          <div
            onClick={() => {
              setShowAddQuestionnaire(false);
              setEditingQus(false);
            }}
            className="w-screen h-screen fixed top-0 left-0 bg-black/50 z-[30]"></div>

          <AddQuestionsField
            className="relative z-50"
            LavelId={LevelId}
            editingQusIndex={editingQusIndex}
            setShowPopups={setShowAddQuestionnaire}
            editingQus={editingQus}
            // handleChangeQuestion={handleChangeQuestion}
          />
        </div>
      )}
    </div>
  );
};

export default Questions;
