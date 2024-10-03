import axios from "axios";
import React, { useState, useEffect } from "react";

interface Courses {
  id: number;
  course_code: string;
  course_name: string;
  instructor: string;
  schedule: string;
}

const CourseRender: React.FC = () => {
  const [course, setCourse] = useState<Courses[]>([]);
  const [select, setSelect] = useState<string>("");
  const [filtered, setFiltered] = useState<Courses[]>([]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const result = await axios.get("http://localhost:5001/courses");
        setCourse(result.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourse();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelect(selectedValue);
    handleFilter(selectedValue);
  };

  const handleFilter = (selectedValue: string) => {
    let level: string;
    switch (selectedValue) {
      case "sophomore":
        level = "2";
        break;
      case "junior":
        level = "3";
        break;
      case "senior":
        level = "4";
        break;
      default:
        level = "";
    }
    const filteredCourse = course.filter(
      (course) => course.course_code.charAt(3) === level
    );
    setFiltered(filteredCourse);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <label className="mt-10 font-mono text-xl bg-slate-200">
        Select your grade
      </label>
      <select
        value={select}
        onChange={handleChange}
        className="text-md font-mono mb-16 mt-4 p-4 focus:outline-none border-2 rounded-lg border-emerald-200"
      >
        <option value="">Select...</option>
        <option value="sophomore">Sophomore</option>
        <option value="junior">Junior</option>
        <option value="senior">Senior</option>
      </select>

      <tbody className=" flex flex-col p-3 font-mono text-xl mb-5 border-4 border-neutral-200 rounded-lg border-solid">
        {filtered.map((courses) => (
          <td key={courses.id} className="mb-6">
            {courses.instructor} - {courses.course_name} - {courses.schedule}
          </td>
        ))}
      </tbody>
    </div>
  );
};

export default CourseRender;
