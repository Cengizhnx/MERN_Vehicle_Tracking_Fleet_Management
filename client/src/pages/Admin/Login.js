import React, { useState } from "react";
import axios from "axios";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import { login } from "../../redux/userSlice";

export default function Login() {
  const [user, setUser] = useState({
    username: undefined,
    password: undefined,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", user);
      const decoded = jwt_decode(res.data.token);
      localStorage.setItem("user", JSON.stringify(decoded.user));
      dispatch(login(decoded.user));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#aeaeae65",
      }}
    >
      <div className="login">
        <h3 className="caption">Login</h3>

        <input
          type="text"
          name="username"
          placeholder="Username"
          id="username"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          id="password"
          onChange={handleChange}
        />

        <button onClick={handleClick} className="button">
          Login
        </button>
      </div>
    </div>
  );
}
