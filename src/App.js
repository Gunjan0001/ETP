import "./App.css";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./Components/Layout/MainLayout";
import DashBoard from "./Pages/DashBoard/DashBoard";
// import User from "./Pages/Users/User";
import Login from "./Pages/Login";
// import Settings from "./Pages/Settings/Settings";
import Protected from "./Components/Protected";
// import AddNewUser from "./Pages/Users/AddNewUser";
// import EditUserDetails from "./Pages/Users/EditUserDetails";
// import VeiwProfile from "./Pages/Users/ViewProfile";
import UserForm from "./Pages/settings/UserForm";
import Questions from "./Pages/settings/Questions";
import User from "./Pages/Users/User";
import ManageTest from "./Pages/settings/ManageTest";
import Test from "./Pages/settings/Test";

function App() {
  return (
    <>
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
            {/* <Route path="users/veiwprofile/:id" element={<VeiwProfile/>} /> */}
            {/* <Route path="users/newuser" element={<AddNewUser />} /> */}
            
            {/* user route */}
            {/* <Route path="users/veiwprofile/:id" element={<VeiwProfile />} /> */}
            {/* <Route path="settings" element={<Settings />}></Route> */}
            {/* <Route path="addnewuser" element={<AddNewUser />} /> */}
            {/* <Route path="edituserdetails" element={<EditUserDetails />}></Route> */}

            {/* Projects route */}
            <Route path="settings">
              <Route index element={<UserForm />} />
              <Route path="Questions" element={<ManageTest />}></Route>
              {/* <Route path="Questions" element={<Test />}></Route> */}
            </Route>
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
