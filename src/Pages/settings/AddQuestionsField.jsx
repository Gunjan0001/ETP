import React, { useEffect, useState } from "react";
import {
  AddItemIcon,
  ChooseOptionActiveIcon,
  ChooseOptionIcon,
  ResetIcon,
} from "../../Components/Icons";
import Level from "./Level";
import { chooseOptionsData } from "../../Components/Helper";
import { db } from "../../firebase";

const AddQuestionsField = ({ setShowPopups, doc }) => {
  const [isDocIdAvailable, setIsDocIdAvailable] = useState(false);
  const [chooseAns, setChooseAns] = useState(null);
  const [addQuestions, setAddQuestions] = useState(false);
  const [answerOption, setAnswerOption] = useState([]);
  const [answerText, setAnswerText] = useState("");
  
  const [submitQuestion, setSubmitQuestions] = useState({
    title: "",
    des: "",
  });
  const getNextOptionLetter = () => {
    const lastOption = answerOption[answerOption.length - 1];
    if (!lastOption) {
      return "a"; // If no options, start with 'a'
    }
    const lastOptionLetter = lastOption.optionNo;
    // Increment the last letter to get the next one
    return String.fromCharCode(lastOptionLetter.charCodeAt(0) + 1);
  };

  function HandleAddAnswerOption() {
    const nextOptionLetter = getNextOptionLetter();
    setAnswerOption((prevVariants) => [
      ...prevVariants,
      {
        answerText: answerText,
        iscorrect: false,
        optionNo: nextOptionLetter,
      },
    ]);
    // Reset individual variant properties
    setAnswerText("");
  }

  useEffect(() => {
    console.log("asdf", answerOption);
  }, [answerOption]);

  useEffect(() => {
    if (doc && doc.id) {
      setIsDocIdAvailable(true);
    } else {
      setIsDocIdAvailable(false);
    }
  }, [doc]);

  const addQuestionToFirebase = () => {
    if (!isDocIdAvailable) {
      console.error("Document ID not available. Unable to add question.");
      return;
    }

    // Add question data to Firebase
    db.collection("Test").doc(doc.id).collection("questions").add({
      title: submitQuestion.title,
      des: submitQuestion.des,
      options: answerOption,
    })
    .then(() => {
      console.log("Question added successfully!");
      // Clear form fields
      setSubmitQuestions({ title: "", des: "" });
      setAnswerOption([]);
    })
    .catch((error) => {
      console.error("Error adding question: ", error);
    });
    
  };
  
  function handleInputChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    setSubmitQuestions({ ...submitQuestion, [name]: value });
  }
  const onHandleSubmit = (e) => {
    e.preventDefault();
    addQuestionToFirebase();
    setSubmitQuestions({
      title: "",
      des: "",
    });
  };

  // Function to handle setting the correct option
  const handleSetCorrectOption = (index) => {
    const updatedOptions = answerOption.map((option, i) => {
      if (i === index) {
        return { ...option, iscorrect: true };
      } else {
        return { ...option, iscorrect: false };
      }
    });
    setAnswerOption(updatedOptions);
    setChooseAns(index); // Set the chosen answer for styling (if needed)
  };

  return (
    <div className="bg-white p-5 rounded-[10px] flex flex-col gap-2.5 w-[490px] max-w-[490px] relative z-50 ">
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
            placeholder="Teething problems | teething troubles"
            type="text"
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col gap-1 ">
          <label htmlFor="des">Description (optional)</label>
          <textarea
            className="border-none outline-none p-2.5 text-black/50 bg-[#EEEEEE] text-base rounded-[10px] h-[44px] resize-none"
            name="des"
            id="des"
            required
            placeholder="The project went through the usual teething troubles"
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="flex justify-end">
          <button
            onClick={HandleAddAnswerOption}
            className="ff_ubuntu text-[#ff2000] font-normal text-sm flex items-center rounded-[10px] outline-none border border-transparent level_add_btn"
          >
            + Add Option
          </button>
        </div>
        <div className="max-h-[200px] overflow-y-scroll">
        {answerOption.map((optn, index) => {
          return (
            <div className="border-t border-black/20 pt-5 mt-5 gap-2.5 ">
              <label htmlFor="" className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <h2 className="ff_ubuntu font-normal text-sm text-black capitalize ">
                    Option {optn.optionNo}
                  </h2>
                  <h2
                    onClick={() => handleSetCorrectOption(index)}
                    className="ff_ubuntu font-normal text-sm text-black capitalize flex gap-1 group"
                  >
                    Correct
                    {chooseAns === index ? (
                      <ChooseOptionActiveIcon />
                    ) : (
                      <ChooseOptionIcon />
                    )}
                  </h2>
                </div>
                <input
                  type="text"
                  className="border-none outline-none p-2.5 text-black/50 bg-[#EEEEEE] text-base rounded-[10px] h-[44px] resize-none w-full"
                  value={optn.answerText}
                  onChange={(e) =>
                    setAnswerOption((prevVariants) =>
                      prevVariants.map((v, i) =>
                        i === index ? { ...v, answerText: e.target.value } : v
                      )
                    )
                  }
                />
              </label>
            </div>
          );
        })}
        </div>
        <div className="flex justify-end gap-2 border-t border-black/20 pt-5 mt-5 ">
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
export default AddQuestionsField;
