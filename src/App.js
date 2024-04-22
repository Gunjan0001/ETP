import "./App.css";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./Components/Layout/MainLayout";
import DashBoard from "./Pages/DashBoard/DashBoard";
import Login from "./Pages/Login";
import Protected from "./Components/Protected";
import UserForm from "./Pages/settings/UserForm";
// import Questions from "./Pages/settings/Questions";
import User from "./Pages/Users/User";
import ManageTest from "./Pages/settings/ManageTest";
import { useEffect, useState } from "react";
// import Test from "./Pages/settings/Test";
import Loader from "./Pages/Loader";
function App() {
  const [loading, setloading] = useState(true);
  useEffect(() => {
    window.addEventListener("load", () => {
      setloading(false); // Set loading to false when the page has finished loading
    });

    return () => {
      window.removeEventListener("load", () => {
        setloading(false);
      });
    };
  }, []);
  return (
    <>
      {loading && (
        <div>
          <Routes>
            <Route path="login" element={<Login />} />
            <Route
              path="/"
              element={
                <Protected>
                  <MainLayout />
                </Protected>
              }
            >
              <Route index element={<DashBoard />}></Route>
              {/* User route */}
              <Route path="users" element={<User />}></Route>

              {/* Projects route */}
              <Route path="settings">
                <Route index element={<UserForm />} />
                <Route path="Questions" element={<ManageTest />}></Route>
                {/* <Route path="Questions" element={<Test />}></Route> */}
              </Route>
            </Route>
          </Routes>
        </div>
      )}
    </>
  );
}

export default App;
