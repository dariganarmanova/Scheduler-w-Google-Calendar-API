import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../index.css";

interface LogProp {
  email: string;
  password_hash: string;
}

const LogIn: React.FC = () => {
  const [loginData, setLoginData] = useState<LogProp>({
    email: "",
    password_hash: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        "http://localhost:5001/user/log",
        loginData
      );
      if (result) {
        alert("Logged In!");
        navigate("/main");
      } else {
        alert("Invalid Credentials");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-48">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          className="focus:outline-none p-2 border border-3 rounded-lg border-stone-400 mb-5"
          type="email"
          placeholder="Enter your email"
          required
          value={loginData.email}
          onChange={(e) =>
            setLoginData({ ...loginData, email: e.target.value })
          }
        />
        <input
          className="focus:outline-none p-2 border border-3 rounded-lg border-stone-400"
          type="password"
          placeholder="Enter your password"
          required
          value={loginData.password_hash}
          onChange={(e) =>
            setLoginData({ ...loginData, password_hash: e.target.value })
          }
        />
        <button
          type="submit"
          className="mt-5 rounded-lg p-2 border bd-2 border-violet-200"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default LogIn;
