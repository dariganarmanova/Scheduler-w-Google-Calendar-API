import React, { useState } from "react";
import axios from "axios";
import "../index.css";

interface ParserData {
  course_name: string;
  schedule: string;
}

interface CourseProp {
  courseData: string;
}

const CourseButton: React.FC<CourseProp> = ({ courseData }) => {
  //const [parsedData, setParsedData] = useState<ParserData | null>(null);

  const parseCourseInfo = (data: string): ParserData => {
    const colonIndex = data.indexOf(":");
    if (colonIndex === -1) {
      throw new Error("Invalid format: No colon found in the string.");
    }
    let course_name = data.slice(0, colonIndex).trim();
    let scheduleWData = data.slice(colonIndex + 1).trim();

    let schedule = "";
    for (let i = 0; i < scheduleWData.length; i++) {
      const char = scheduleWData[i];
      if (char === "(") {
        break;
      }
      schedule += char;
    }
    return {
      course_name: course_name.trim(),
      schedule: schedule.trim(),
    };
  };

  const handleClick = () => {
    const res = parseCourseInfo(courseData);
    return res;
  };

  const handleSubmit = async () => {
    const res = handleClick();
    try {
      const result = await axios.post("http://localhost:5001/calendarAdd", res);
      if (result) {
        alert("Event added! Check out your Google Calendar");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button
        onClick={handleSubmit}
        className="border rounded-lg bd-2 border-zinc-500 p-4 mt-14 font-normal"
      >
        Click to add to Google Calendar
      </button>
    </div>
  );
};

export default CourseButton;
