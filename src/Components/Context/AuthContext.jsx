import { createContext, useEffect, useState, useContext } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../firebase";

const authContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState("");

  function loginUser(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function logoutUser() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      localStorage.setItem("user", JSON.stringify(currentUser));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <authContext.Provider value={{ loginUser, logoutUser }}>
      {children}
    </authContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(authContext);
}
