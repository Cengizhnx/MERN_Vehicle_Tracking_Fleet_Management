import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userSlice";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.users.user);
  console.log(user.username);

  const handleLogout = () => {
    localStorage.removeItem("user")
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div>
      <p></p>
      <button onClick={handleLogout} className="button">
        Logout
      </button>
    </div>
  );
}

export default Home;
