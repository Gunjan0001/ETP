import { createContext, useEffect, useState, useContext } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../firebase";
import Loader from "../../Pages/Loader";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomToaster from '../CustomToaster';

const authContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);

  function loginUser(email, password) {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        toast.success('Login successful', {
          position: "top-right",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setLoading(false);
        return userCredential;
      })
      .catch((error) => {
        if (error.code === 'auth/network-request-failed') {
          // Network connection failed
          toast.error('Network connection error. Please check your internet connection and try again.', {
            position: "top-right",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          // Other authentication-related errors
          toast.error('Invalid Email or Password', {
            position: "top-right",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
        throw error;
      });
  }
  

  function logoutUser() {
    return signOut(auth)
      .then(() => {
        toast.success('Logout successful', {
          position: "top-right",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((error) => {
        toast.error('Logout failed', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        throw error;
      });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      localStorage.setItem("user", JSON.stringify(currentUser));
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (loading) {
    return <Loader></Loader>;
  }

  return (
    <authContext.Provider value={{ loginUser, logoutUser }}>
      {children}
      <ToastContainer />
      <CustomToaster />
    </authContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(authContext);
}
