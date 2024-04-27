import React, { useState } from "react";
import { AddItemIcon } from "../../Components/Icons";
import Level from "./Level";
import { QuestiongetterContext } from "../../Components/Context/TestQuestions";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import Loader from '../Loader'

const AddQuestionnaire = ({hanleclosepopup}) => {
  const { QuestionsData,addQuestionaire } = QuestiongetterContext()
  const [addQuestions, setAddQuestions] = useState(false);
  const [loading ,setloading] = useState(false)
  const maxLevel = QuestionsData.reduce((max, question) => {
    return question.Level > max ? question.Level : max;
  }, 0);

  const [submitQuestion, setSubmitQuestions] = useState({
    title: "",
    des: "",
  });
  function handleInputChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    setSubmitQuestions({ ...submitQuestion, [name]: value });
  }
  // const onHandleSubmit = (e) => {
  //   e.preventDefault();
  //   // setShowPopups(false);
  //   // handleChangeQuestion(submitQuestion);
  //   setAddQuestions(true);
  //   setSubmitQuestions({
  //     title: "",
  //     des: "",
  //   });
  // };

  async function handleAddQuestionaire(e) {
    e.preventDefault()

    if (Object.values(submitQuestion).some((value) => value.trim() === '')) {
      // Display an error message or handle the error as needed
      alert('Please fill in all fields.');
      return;
    }
    let data = {
      Level : maxLevel+1,
      LevelTitle:submitQuestion.title,
      instructionText : submitQuestion.des
    }
    setloading(true)
    const docRef = await addDoc(collection(db,"Test"),data)
    await addQuestionaire({ ...data, id: docRef.id });
    setloading(false)
    alert("Questionarie Added Succesfully")
    hanleclosepopup()
    setSubmitQuestions({
      title: "",
      des: "",
    });
    // console.log(data)
  }

  if(loading){
    return (<Loader></Loader>)
  }






  return (
    <div className="bg-white p-5 rounded-[10px] flex flex-col gap-2.5 w-[490px] max-w-[490px] z-40">
      <h2 className="ff_ubuntu font-bold text-lg capitalize text-black">
        Add Questionnaire
      </h2>
      <form className="flex flex-col gap-2.5">
        <div className="flex flex-col gap-1">
          <label
            htmlFor="title"
            className="ff_ubuntu font-normal text-sm text-black capitalize"
          >
            Title
          </label>
          <input
            className="border-none outline-none p-2.5 text-black/50 bg-[#EEEEEE] text-base rounded-[10px]"
            id="title"
            name="title"
            placeholder="Enter Title"
            type="text"
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="des">Description</label>{" "}
          <textarea
            className="border-none outline-none p-2.5 text-black/50 bg-[#EEEEEE] text-base rounded-[10px] h-[80px] resize-none"
            name="des"
            id="des"
            required
            placeholder="Enter detailed instructions"
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="flex justify-end">
          <button onClick={(e) => handleAddQuestionaire(e)} className="ff_outfit bg-[#FF2000] text-white font-normal text-base flex items-center justify-center rounded-[10px] gap-2 outline-none border border-transparent py-2.5 px-3 hover:bg-transparent hover:border-[#ff2000] hover:text-[#ff2000] duration-300 group">
            <AddItemIcon /> Add Section
          </button>
        </div>
      </form>
    </div>
  );
};


export default AddQuestionnaire;
