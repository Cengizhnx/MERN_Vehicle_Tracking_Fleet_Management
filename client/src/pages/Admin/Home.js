import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userSlice";
import Navbar from "../../components/Navbar/Navbar";
import Header from "../../components/Header/Header";
import Dashboard from "../../components/Dashboard/Dashboard";
import Footer from "../../components/Footer/Footer";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.users.user);
  console.log(user.username);

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="bg-gray-100 font-family-karla flex">
      <Navbar></Navbar>

      <div className="w-full flex flex-col h-screen overflow-y-hidden">
        <Header></Header>
        <div className="w-full overflow-x-hidden border-t flex flex-col">
          <Dashboard></Dashboard>
          <Footer></Footer>
        </div>
      </div>
      {/* <button onClick={handleLogout} className="button">
        Logout
      </button> */}
    </div>
  );
}

export default Home;
