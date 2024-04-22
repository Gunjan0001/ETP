import { createContext, useContext, useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase";

const AllStudentGetterContext = createContext();

export const StudentgetterContext = () => {
  return useContext(AllStudentGetterContext);
};

export const StudentgetterProvider = ({ children }) => {
  const [studentsData, setStudentsData] = useState([]);
  useEffect(() => {
    async function StudentData() {
      try {
        const snapshot = await getDocs(collection(db, "Users"));
        const StudentList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setStudentsData(StudentList);
      } catch (error) {
        console.log("error in fetching students Data", error);
      }
    }
    StudentData();
    console.log(studentsData);
  }, []);
  const updateStudentData = (updatedData) => {
    if (typeof updatedData === 'object' && updatedData.id) {
        setStudentsData(prevData => {
            const existingProductIndex = prevData.findIndex(stu => stu.id === updatedData.id);
            if (existingProductIndex !== -1) {
                const newData = [...prevData];
                newData[existingProductIndex] = { ...newData[existingProductIndex], ...updatedData };
                return newData;
            } else {
                return [...prevData, updatedData];
            }
        });
    } else if (Array.isArray(updatedData)) {
        // Update the entire array
        setStudentsData(updatedData);
    }
};
  return (
    <AllStudentGetterContext.Provider value={{ studentsData, updateStudentData}}>
      {children}
    </AllStudentGetterContext.Provider>
  );
};
