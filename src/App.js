import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './Components/Layout/MainLayout';
import DashBoard from './Pages/DashBoard/DashBoard';
import Login from './Pages/Login';
import Protected from './Components/Protected';
import UserForm from './Pages/settings/UserForm';
// import Questions from "./Pages/settings/Questions";
import User from './Pages/Users/User';
import ManageTest from './Pages/settings/ManageTest';
import { useEffect, useState } from 'react';
// import Test from "./Pages/settings/Test";
import Loader from './Pages/Loader';
import notfound from './assets/images/png/notfound.png';
import UserDetails from './Pages/Users/UserDetails';
function App() {
  const [loading, setloading] = useState(true);
  useEffect(() => {
    window.addEventListener('load', () => {
      setloading(false); // Set loading to false when the page has finished loading
    });

    return () => {
      window.removeEventListener('load', () => {
        setloading(false);
      });
    };
  }, []);
  return (
    <>
      <div className="hidden lg:block">
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
                }>
                <Route index element={<DashBoard />}></Route>
                {/* User route */}
                <Route path="users" element={<User />}></Route>
                <Route path="userprofile/:id" element={<UserDetails />} />

                {/* Projects route */}
                <Route path="settings">
                  {/* <Route index element={<UserForm />} /> */}
                  <Route index element={<ManageTest />}></Route>
                  {/* <Route path="Questions" element={<Test />}></Route> */}
                </Route>
              </Route>
            </Routes>
          </div>
        )}
      </div>
      <div className="min-h-screen flex justify-center items-center lg:hidden">
        <div className="">
          <img src={notfound} alt="notfoundimage" />
          <h2 className="font-medium text-[32px] text-[#FF0000] text-center mt-5">
            Page Not Found!
          </h2>
          <p className="mb-0 ">This web-page is not available for mobile screens.</p>
        </div>
      </div>
    </>
  );
}

export default App;
