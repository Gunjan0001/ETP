import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserAuthContextProvider } from './Components/Context/AuthContext';
import { StudentgetterProvider } from './Components/Context/AllStudentsData'
import { QuestiongetterProvider } from "./Components/Context/TestQuestions";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserAuthContextProvider>
              <StudentgetterProvider>
                <QuestiongetterProvider>
                    <App />
                    </QuestiongetterProvider>
              </StudentgetterProvider>
      </UserAuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
