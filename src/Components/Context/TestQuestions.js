import { createContext, useContext, useState, useEffect } from "react";
import { getDocs, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
const TestQuestionContext = createContext();
export const QuestiongetterContext = () => {
  return useContext(TestQuestionContext);
};
export const QuestiongetterProvider = ({ children }) => {
  const [QuestionsData, setQuestionsData] = useState([]);
  const [loading, setLoading] = useState(false);
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

  const handleDelete = async (index, LevelId) => {
    try {
      setLoading(true);
      // Shallow copy of the mapData array
      const updatedData = [...QuestionsData[0].questions];

      // Remove the item at the specified index
      // console.log(index);
      updatedData.splice(index, 1);
      console.log(updatedData);
      // Update the document with the modified data
      const docRef = doc(db, "Test", LevelId);
      await updateDoc(docRef, { questions: updatedData });
      const snapshot = await getDocs(collection(db, "Test"));
      const QuestionList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setQuestionsData(QuestionList);
      setLoading(false);
      console.log("Successfully deleted document with index:", index);
    } catch (error) {
      console.error("Error deleting document:", error.message);
    }
  };
  const updateQuestionData = (updatedData) => {
    setLoading(true)
    // console.log("updates working", updateQuestionData);
    if (typeof updatedData === "object" && updatedData.id) {
      // console.log("updaaaaaaaaaaaaa");
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
    setLoading(false)
  };

  const addQuestionaire = async (datas) => {
    try {
      setLoading(true);
      updateQuestionData(datas);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  const DeleteQuestionarie = async (id) => {
    try {
      setLoading(true);
      setQuestionsData((prevData) => prevData.filter((faqs) => faqs.id !== id));
      setLoading(false);
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
        DeleteQuestionarie,
        handleDelete,
        loading,
        setQuestionsData
      }}
    >
      {children}{" "}
    </TestQuestionContext.Provider>
  );
};
