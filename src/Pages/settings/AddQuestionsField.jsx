import React, { useEffect, useState } from "react";
import {
  AddItemIcon,
  ChooseOptionActiveIcon,
  ChooseOptionIcon,
  ResetIcon,
} from "../../Components/Icons";
import Level from "./Level";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../Loader";
const AddQuestionsField = ({ setShowPopups, levelId, LavelId, editingQus }) => {
  const [chooseAns, setChooseAns] = useState(null);
  const [addQuestions, setAddQuestions] = useState(false);
  const [answeroption, setAnsweroption] = useState([]);
  const [answertext, setAnswertext] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitQuestion, setSubmitQuestions] = useState({
    question: "",
    description: "",
  });
  const getNextOptionLetter = () => {
    const lastOption = answeroption[answeroption.length - 1];
    if (!lastOption) {
      return "a"; // If no options, start with 'a'
    }
    const lastOptionLetter = lastOption.optionNo;
    // Increment the last letter to get the next one
    return String.fromCharCode(lastOptionLetter.charCodeAt(0) + 1);
  };

  function HandleAddAnsweroption() {
    const nextOptionLetter = getNextOptionLetter();
    setAnsweroption((prevVariants) => [
      ...prevVariants,
      {
        answertext: answertext,
        iscorrect: false,
        optionNo: nextOptionLetter,
      },
    ]);
    // Reset individual variant properties
    setAnswertext("");
  }

  useEffect(() => {
    if (editingQus) {
      editingQus.map((itm) => {
        setSubmitQuestions({
          question: itm.question,
          description: itm.description,
        });
        // Set answer options
        setAnsweroption(itm.answeroption);

        // Find the index of the correct answer
        const correctIndex = itm.answeroption.findIndex(
          (option) => option.iscorrect
        );
        // Set the chosen answer for styling
        setChooseAns(correctIndex);
      });
    }
  }, []);

  async function addQuestionToFirebase(question, description, answeroption) {
    try {
      // Get the current data of the document
      const docRef = doc(db, `Test/${levelId}`);
      const docSnap = await getDoc(docRef);
      // Get the existing questions array or initialize to empty array if it doesn't exist
      const questions = docSnap.exists() ? docSnap.data().questions || [] : [];
      // Add the new question to the existing questions array
      const updatedQuestions = [
        ...questions,
        { question, description, answeroption },
      ];

      const updatedData = {
        ...docSnap.data(),
        questions: updatedQuestions,
      };

      // Update the document with the merged data
      await updateDoc(docRef, updatedData);
    } catch (error) {
      console.error("Error updating document: ", error);
      alert("Error updating document. Please try again.");
    }
  }
  function handleInputChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    setSubmitQuestions({ ...submitQuestion, [name]: value });
  }

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    try {
      // setLoading(true);
      // if (submitQuestion.question.trim() === '' || answeroption.length === 0) {
      //   // alert('Please fill in the question and at least one option.');
      //   toast.error('Please fill in the question and at least one option', {
      //     position: 'top-right',
      //     autoClose: 5000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: 'light',
      //   });
      //   setLoading(false);
      //   return;
      // }

      if (editingQus) {
        console.log(editingQus, "gunjan");
        setLoading(true);
        const docRef = doc(db, `Test/${LavelId}`);
        const docSnap = await getDoc(docRef);
        // Get the existing questions array or initialize to empty array if it doesn't exist
        const questions = docSnap.exists()
          ? docSnap.data().questions || []
          : [];
        console.log(docRef);
        const editedQuestionIndex = questions.findIndex(
          (qus) => qus.question === editingQus[0].question
        );
        console.log(editedQuestionIndex);
        console.log(questions[0]);
        if (editedQuestionIndex !== -1) {
          questions[editedQuestionIndex] = {
            description: submitQuestion.description,
            question: submitQuestion.question,
            answeroption: answeroption,
          };

          setShowPopups(false);
          await updateDoc(docRef, { questions: questions });
          setLoading(false);
          console.log("Document updated successfully");
          alert("Document updated successfully");
        } else {
          throw new Error("Question not found for editing.");
        }
      } else {
        setLoading(true);
        
       

        await addQuestionToFirebase(
          submitQuestion.question,
          submitQuestion.description,
          answeroption
        );
      }

      setSubmitQuestions({
        question: "",
        description: "",
      });
      setAnsweroption([]);
      setShowPopups(false);
      setLoading(false);
    } catch (error) {
      console.error("Error submitting question: ", error);
      alert(`Error submitting question: ${error.message}`);
    } finally {
      setLoading(false); // Reset loading state after submission
    }
  };

  // Function to handle setting the correct option
  const handleSetCorrectOption = (index) => {
    const updatedOptions = answeroption.map((option, i) => {
      if (i === index) {
        return { ...option, iscorrect: true };
      } else {
        return { ...option, iscorrect: false };
      }
    });
    setAnsweroption(updatedOptions);
    setChooseAns(index); // Set the chosen answer for styling (if needed)
  };
  if (loading) {
    return <Loader />;
  }
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
            name="question"
            value={submitQuestion.question}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="flex flex-col gap-1 ">
          <label htmlFor="des">Description (optional)</label>
          <textarea
            className="border-none outline-none p-2.5 text-black/50 bg-[#EEEEEE] text-base rounded-[10px] h-[44px] resize-none"
            name="description"
            id="des"
            placeholder="The project went through the usual teething troubles"
            value={submitQuestion.description}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <div className="flex justify-end">
          <div
            onClick={HandleAddAnsweroption}
            className="ff_ubuntu text-[#ff2000] cursor-pointer font-normal text-sm flex items-center rounded-[10px] outline-none border border-transparent level_add_btn"
          >
            + Add Option
          </div>
        </div>
        <div className="max-h-[200px] overflow-y-scroll">
          {answeroption.map((optn, index) => {
            return (
              <div
                key={index}
                className="border-t border-black/20 pt-5 mt-5 gap-2.5 "
              >
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
                    value={optn.answertext}
                    onChange={(e) =>
                      setAnsweroption((prevVariants) =>
                        prevVariants.map((v, i) =>
                          i === index ? { ...v, answertext: e.target.value } : v
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
            <AddItemIcon /> {editingQus ? "Update" : "Add"}
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
      <ToastContainer></ToastContainer>
    </div>
  );
};
export default AddQuestionsField;
