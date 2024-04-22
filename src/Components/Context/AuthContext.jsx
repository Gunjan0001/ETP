import { createContext, useEffect, useState, useContext } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../firebase";
import Loader from "../../Pages/Loader";
const authContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  function loginUser(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function logoutUser() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      localStorage.setItem("user", JSON.stringify(currentUser));
      setLoading(false); // Set loading to false after initial user data is set or user is logged out
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (loading) {
    return <Loader></Loader>; // Display a loading indicator while user data is being fetched
  }

  return (
    <authContext.Provider value={{ loginUser, logoutUser }}>
      {children}
    </authContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(authContext);
}
