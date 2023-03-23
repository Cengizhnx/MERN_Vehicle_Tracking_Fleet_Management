import React, { useState } from "react";
import axios from "axios";
import "./style.css";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [user, setUser] = useState({
    username: undefined,
    password: undefined,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/register", user);
      //   localStorage.setItem("user", JSON.stringify(res.data));
      //   dispatch(login(res.data));
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
        <h3 className="caption">Register</h3>

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
          Register
        </button>
      </div>
    </div>
  );
}
