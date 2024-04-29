
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDx9FulrMGu2CFXKsQ-VtcRqBIEewFpTaI",
  authDomain: "english-74388.firebaseapp.com",
  projectId: "english-74388",
  storageBucket: "english-74388.appspot.com",
  messagingSenderId: "201983085608",
  appId: "1:201983085608:web:e5c81a950f18040434791d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth()
const storage = getStorage(app)
export { db, auth,storage }