import { createContext, useContext, useState, useEffect } from "react";
import {
  getDocs,
  collection,
  updateDoc,
  doc,
  Firestore,
} from "firebase/firestore";
import { db } from "../../firebase";

const AllStudentGetterContext = createContext();
export const StudentgetterContext = () => {
  return useContext(AllStudentGetterContext);
};
export const StudentgetterProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [studentsData, setStudentsData] = useState([]);

  useEffect(() => {
    const fetchStudentsData = async () => {
      setLoading(true); // Start loading
      try {
        const snapshot = await getDocs(collection(db, "Users"));
        const StudentList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setStudentsData(StudentList);
      } catch (error) {
        console.log("Error fetching students data:", error);
      } finally {
        setLoading(false); // Stop loading regardless of success or failure
      }
    };

    fetchStudentsData(); // Fetch data when component mounts
  }, []);

  const updateStudentData = (updatedData) => {
    if (typeof updatedData === "object" && updatedData.id) {
      setStudentsData((prevData) => {
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
      // Update the entire array
      setStudentsData(updatedData);
    }
  };

  const updateStatusonFirebase = async (docID, status) => {
    setLoading(true); // Start loading
    try {
      const ref = doc(db, "Users", docID);
      await updateDoc(ref, { status: status });
    } catch (error) {
      console.log("Error updating status:", error);
    } finally {
      setLoading(false); // Stop loading regardless of success or failure
    }
  };

  return (
    <AllStudentGetterContext.Provider
      value={{ studentsData, updateStudentData, updateStatusonFirebase, loading }}
    >
      {children}
    </AllStudentGetterContext.Provider>
  );
};
