import React from "react";
import HomePage from "./components/HomePage";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import CoursePage from "./components/CoursePage";
import CourseButton from "./components/CourseButton";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RatingsPage from "./components/RatingsPage";
import RatingsGet from "./components/RatingsGet";
import CourseRender from "./components/CourseRender";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signin" element={<SignUp />} />
        <Route path="/main/:userId" element={<CoursePage />} />
        <Route path="/ratings/:userId/:courseId" element={<RatingsPage />} />
        <Route path="/ratingsGet/:courseId" element={<RatingsGet />} />
        <Route path="/courses" element={<CourseRender />} />
      </Routes>
    </Router>
  );
}

export default App;
