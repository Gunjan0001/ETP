// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBCEPFzTEJb3whcrSgy-HhVmSXYPkTdqU",
  authDomain: "educa-a135e.firebaseapp.com",
  projectId: "educa-a135e",
  storageBucket: "educa-a135e.appspot.com",
  messagingSenderId: "533823708894",
  appId: "1:533823708894:web:821d65085b7d757f5d2c4f",
  measurementId: "G-SM286BTS31"
};

// // Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth()
const storage = getStorage(app)
export { db, auth,storage }
