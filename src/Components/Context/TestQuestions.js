import { createContext, useContext, useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase";
const TestQuestionContext = createContext();
export const QuestiongetterContext = () => {
  return useContext(TestQuestionContext);
};
export const QuestiongetterProvider = ({ children }) => {
  const [QuestionsData, setQuestionsData] = useState([]);
  useEffect(() => {
    async function QuestionData(doc) {
      try {
        const snapshot = await getDocs(collection(db, "Test"));
        const QuestionList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        
        setQuestionsData(QuestionList);
      } catch (error) {
        console.log("error in fetching Questions Data", error);
      }
    }
    QuestionData();
  }, []);
  const updateQuestionData = (updatedData) => {
    console.log("updates working", updatedData);
    if (typeof updatedData === "object" && updatedData.id) {
      console.log("updaaaaaaaaaaaaa");
      setQuestionsData((prevData) => {
        const existingProductIndex = prevData.findIndex(
          (stu) => stu.id === updatedData.id
        );
        if (existingProductIndex !== -1) {
          const newData = [...prevData];
          newData[existingProductIndex] = {
            ...newData[existingProductIndex],
            ...updatedData,
          };
          return newData;
        } else {
          return [...prevData, updatedData];
        }
      });
    } else if (Array.isArray(updatedData)) {
      console.log("upd in else working");
      // Update the entire array
      setQuestionsData(updatedData);
    }
  };

  const addQuestionaire = async (datas) => {
    try {
      updateQuestionData(datas);
    } catch (error) {
      console.error(error);
    }
  };

  const DeleteQuestionarie = async (id) => {
    try {
        setQuestionsData(prevData => prevData.filter(faqs => faqs.id !== id));
    } catch (error) {
        console.error(error);
    }
};
  return (
    <TestQuestionContext.Provider
      value={{
        QuestionsData,
        updateQuestionData,
        addQuestionaire,
        DeleteQuestionarie
      }}
    >
      {children}
    </TestQuestionContext.Provider>
  );
};
