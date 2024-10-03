import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const handleClickLog = () => {
    navigate("/login");
  };
  const handleClickSign = () => {
    navigate("/signin");
  };
  return (
    <div className="flex items-center justify-center flex-col mt-48">
      <h1 className="text-2xl font-mono ">
        Welcome to the UNIST CSE Course Scheduler with Google Calendar API
      </h1>
      <h2 className="text-xl mt-5 font-medium">Sign In Here</h2>
      <button
        onClick={handleClickSign}
        className="rounded-lg border bd-2 border-indigo-200 p-2 mt-3"
      >
        Sign In
      </button>
      <h2 className="text-xl mt-5 font-medium">Log In Here</h2>
      <button
        onClick={handleClickLog}
        className="rounded-lg border bd-2 border-indigo-200 p-2 mt-3"
      >
        Log In
      </button>
    </div>
  );
};

export default HomePage;
